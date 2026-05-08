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
    console.log("usuarioId:", usuarioId); // id no console

    if (!usuarioId) {
        window.location.href = "../html/login.html"; // redireciona se não tiver sessão
        return;
    }

    carregarKpis();
    carregarDonut();
    carregarLinhas();
    carregarMetas();
});

function carregarKpis() {
    // colocar catch em todos os fetchs ou try catch em tudo (mas acho que nao pode)

    fetch(`/estatisticas/kpi-concluidos/${usuarioId}`)
        .then(function(resposta) { return resposta.json(); })
        .then(function(data) {
            console.log("DATA KPI 1:", data)
            console.log("QTD CONCLUIDO:", data[0].quantidade_concluido)
            
            document.getElementById("kpi-concluidos").innerHTML = data[0].quantidade_concluido;
        });
        

    fetch(`/estatisticas/kpi-horas-totais/${usuarioId}`)
        .then(function(resposta) { return resposta.json(); })
        .then(function(data) {
            console.log("DATA KPI 2:", data)
            console.log("QTD HORAS TOTAIS:", data[0].total_horas)

            document.getElementById("kpi-horas").innerText = data[0].total_horas;
        });

    fetch(`/estatisticas/kpi-horas-semanais/${usuarioId}`)
        .then(function(resposta) { return resposta.json(); })
        .then(function(data) {
            console.log("DATA KPI 3:", data)
            console.log("QTD HORAS SEMANAIS:", data[0].total_horas)

            document.getElementById("kpi-semanal").innerText = data[0].horas_semanais;
        });

    fetch(`/estatisticas/kpi-taxa-conclusao/${usuarioId}`)
        .then(function(resposta) { return resposta.json(); })
        .then(function(data) {
            console.log("DATA KPI 4:", data)
            console.log(`TAXA CONCLUSAO DO USUÁRIO ${usuarioId} ${data[0].taxa_concluido}`)

            document.getElementById("kpi-conclusao").innerText = data[0].taxa_concluido;
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
// funções fetch do gráfico


function carregarLinhas() {
    fetch(`/estatisticas/consumo-mensal/${usuarioId}`)
        .then(function(resposta) { return resposta.json(); })
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
                    maintainAspectRatio: true,
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
                            ticks: { color: '#5c5a55', stepSize: 1 /* sempre vai de 1 em 1 */},
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
                            // stacked: true
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