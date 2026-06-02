/* 

grafico-linha
grafico-donut
grafico-metas
grafico-heatmap (uma div)

class .chart
*/

// window.onload = function() {
//     carregarLinhas();
//     // buscarHorasPorMidia();
//     // buscarMetasPorAno();
//     // buscarFrequenciaConsumo();
// }

const usuarioId = sessionStorage.getItem("ID_USUARIO");
console.log("usuarioId:", usuarioId);

if (!usuarioId) {
    console.error("usuarioId não encontrado!");
    window.location.href = "../html/login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("usuarioId:", usuarioId); 

    if (!usuarioId) {
        window.location.href = "../html/login.html";
        return;
    }

    carregarKpis();
    carregarDonut();
    carregarLinhas();
    carregarMetas();
    carregarHeatmap();
});

function carregarKpis() {
    // colocar catch em todos os fetchs ou try catch em tudo (mas acho que nao pode)

    fetch(`/estatisticas/kpi-concluidos/${usuarioId}`)
    // ENTÃO
        .then(function(resposta) { 
            // console.log("RESPOSTA DA KPI 1:", resposta.json()); // --> Erro: TypeError: Failed to execute 'json' on 'Response': body stream already read
            return resposta.json(); })
        .then(function(data) {
            
            console.log("DATA KPI 1:", data)
            console.log("QTD CONCLUIDO:", data[0].quantidade_concluido)
            
            document.getElementById("kpi-concluidos").innerHTML = data[0].quantidade_concluido;
        }).catch(function(erro) {
            console.error("Erro:", erro)
        });
        

    fetch(`/estatisticas/kpi-horas-totais/${usuarioId}`)
        .then(function(resposta) { return resposta.json(); })
        .then(function(data) {
            console.log("DATA KPI 2:", data)

            let num = data[0].total_horas
            let numInteiro = Math.trunc(num);
            let parteDecimal = ((num % 1).toFixed(2) * 60)
            let horaFormatada = `${numInteiro/10}h${parteDecimal}min`

            // console.log("QTD HORAS TOTAIS:", data[0].total_horas)

            document.getElementById("kpi-horas").innerText = data[0].total_horas;
        }).catch(function(erro) {
            console.error("Erro:", erro)
        });

    fetch(`/estatisticas/kpi-horas-semanais/${usuarioId}`)
        .then(function(resposta) { return resposta.json(); })
        .then(function(data) {
            console.log("DATA KPI 3:", data)
            console.log("QTD HORAS SEMANAIS:", data[0].total_horas)

            document.getElementById("kpi-semanal").innerText = data[0].horas_semanais;
        }).catch(function(erro) {
            console.error("Erro:", erro)
        });

    fetch(`/estatisticas/kpi-taxa-conclusao/${usuarioId}`)
        .then(function(resposta) { return resposta.json(); })
        .then(function(data) {
            console.log("DATA KPI 4:", data)
            console.log(`TAXA CONCLUSAO DO USUÁRIO ${usuarioId} ${data[0].taxa_concluido}`)

            document.getElementById("kpi-conclusao").innerText = data[0].taxa_concluido;
        }).catch(function(erro) {
            console.error("Erro:", erro)
        });
}

const CORES = {
    'jogo':   '#7f77dd',
    'livro':  '#1d9e75',
    'filme':  '#d85a30',
    'serie':  '#378ADD',
    'anime':  '#d4537e',
    'manga':  '#CAA200',
    'musica': '#639922'
};

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];


function carregarLinhas() {
    fetch(`/estatisticas/consumo-mensal/${usuarioId}`)
        .then(function(resposta) { 
            return resposta.json(); })
        .then(function(data) {
            
            console.log("DATA:", data);
            console.log("TIPO:", typeof data);
            
            var series = {};

            for (let i = 0; i < data.length; i++) {
                let row = data[i];

                if (!series[row.nome_categoria]) {
                    series[row.nome_categoria] = new Array(12).fill(0);
                }

                series[row.nome_categoria][row.mes - 1] = row.total;    
            }   

            var datasets = [];
            var categorias = Object.keys(series);


            for (let i = 0; i < categorias.length; i++) {
                var cat = categorias[i];
            
                datasets.push({
                    label: cat,
                    data: series[cat],
                    borderColor: CORES[cat] || '#888',
                    backgroundColor: (CORES[cat] || '#888') + '15',
                    borderWidth: 2,
                    pointRadius: 3,
                    pointHoverRadius: 6,
                    tension: 0.4,
                    fill: false 
                });
            }

            new Chart(document.getElementById("grafico-linha"), {
                type: 'line',
                data: { labels: MESES, datasets: datasets
                }, 
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: true }
                    },
                    scales: {
                        x: {
                            grid: { color: 'rgba(255,255,255,0.04)' },
                            ticks: { color: '#5c5a55'},
                            beginAtZero: true
                        },
                        y: {
                            grid: { color: 'rgba(255,255,255,0.04)' },
                            ticks: { color: '#5c5a55', stepSize: 1 },
                            beginAtZero: true
                        }
                    }
                }
            });
        }).catch(function(erro) {
            console.error("Erro ao carregar consumo anual:", erro)
        });
}


function carregarDonut() {
    fetch(`/estatisticas/horas-por-categoria/${usuarioId}`)
        .then(function(resposta) { return resposta.json() })
        .then(function(data) {
            console.log("DATA DONUT: ", data);

            let labels = []   
            let valores = []
            let cores = []

            for (let i = 0; i < data.length; i++) {
                labels.push(data[i].nome_categoria);
                valores.push(data[i].total_horas);
                cores.push(CORES[data[i].nome_categoria] || '#888');
            }

            new Chart (document.getElementById("grafico-donut"), {
                type: 'doughnut',
                data: { 
                    labels: labels, 
                    datasets: [{
                        data: valores,
                        backgroundColor: cores,
                        borderColor: '#141418',
                        borderWidth: 5,
                        hoverOffset: 6  
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '50%',  
                    plugins: {
                        legend: { display: true, position: 'left' },
                        tooltip: {
                            callbacks: {
                                label: ctx => ` ${ctx.parsed} horas`
                            }
                        }
                    }
                }
            }) 
        }).catch(function(erro) {
            console.error("Erro ao carregar horas por categoria:", erro)
    });
}

function carregarMetas() {
    fetch(`/estatisticas/metas-por-ano/${usuarioId}`)
        .then(function(resposta) { return resposta.json() })
        .then(function(data) {
            console.log("DATA BARRA: ", data);

            let labels = [];
            let valoresMeta = [];
            let valoresConcluido = [];
            let cores = [];

            for (let i = 0; i < data.length; i++) {
                labels.push(data[i].nome_categoria);
                valoresMeta.push(data[i].quantidade_meta);
                valoresConcluido.push(data[i].quantidade_concluido);
                cores.push(CORES[data[i].nome_categoria] || '#888');
            
                console.log(`${labels[i]} || ${valoresMeta[i]} || ${valoresConcluido[i]}`)
            }
            
            new Chart (document.getElementById("grafico-metas"), {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Concluído',
                            data: valoresConcluido,
                            backgroundColor: cores,
                            borderRadius: 12,
                            barThickness: 8
                        },
                        {
                            label: 'Meta',
                            data: valoresMeta,
                            backgroundColor: 'rgba(255,255,255,0.06)',
                            borderRadius: 12,
                            barThickness: 8
                        }
                    ]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: true },
                        tooltip: { enabled: true }
                    },
                    scales: {
                        x: {
                            grid: { color: 'rgba(255,255,255,0.04)' },
                            ticks: { color: '#5c5a55'}
                        },
                        y: {
                            grid: { display: false },
                            ticks: { color: '#5c5a55' },
                            stacked: true
                        }
                    }
                }
            })
            

        }).catch(function(erro) {
            console.error("Erro ao carregar horas por categoria:", erro)
        });
}

function carregarHeatmap() {
    fetch(`/estatisticas/frequencia-consumo/${usuarioId}`)
        .then((resposta) => { return resposta.json() })
        .then((data) => {
            let mapa = {};

            for (let i = 0; i < data.length; i++) {
                let dia = new Date(data[i].dia).toISOString().split('T')[0];
                mapa[dia] = data[i].total;
            }

            const container = document.getElementById("grafico-heatmap");
            container.innerHTML = '';

            let tooltip = document.createElement('div');
            tooltip.classList.add("hm-tooltip");
            document.body.appendChild(tooltip)

            let hoje = new Date();
            let inicio = new Date(hoje.getFullYear(), 0, 1);

            for (let d = new Date(inicio); d <= hoje; d.setDate(d.getDate() + 1)) {
                let chave = d.toISOString().split('T')[0];
                let total = mapa[chave] || 0;

                let cell = document.createElement('div');
                cell.classList.add("cell")
                cell.title = chave + ': ' + total + ' item(s)';

                if (total === 0) {
                    cell.style.background = '#1C1C22';
                    cell.style.opacity = '1';
                } else {
                    cell.style.background = '#A26300';

                    let opacidade = Math.min(0.25 + total * 0.2, 1);
                    cell.style.opacity = String(opacidade)
                }

                let dataFormatada = new Date(chave + 'T00:00:00')
                    .toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

                let textoTooltip = total === 0
                    ? dataFormatada + ' · nenhuma atividade'
                    : dataFormatada + ' · ' + total + (total === 1 ? ' item concluído' : ' itens concluídos');

                cell.addEventListener('mouseenter', function(e) {
                    tooltip.textContent = textoTooltip;
                    tooltip.classList.add('visible');
                });

                cell.addEventListener('mousemove', function(e) {
                    tooltip.style.left = (e.clientX + 12) + 'px';
                    tooltip.style.top  = (e.clientY - 28) + 'px';
                });

                cell.addEventListener('mouseleave', function() {
                    tooltip.classList.remove('visible');
                });

                container.appendChild(cell);
            }
        })
        .catch(function(erro) {
            console.error("Erro ao carregar heatmap:", erro);
        });
}   

