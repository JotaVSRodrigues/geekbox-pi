/* 
IDs
kpi-concluidos
kpi-horas
kpi-semanal
kpi-conclusao

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

document.addEventListener("DOMContentLoaded", function() {
    console.log("usuarioId:", usuarioId); // deve mostrar o id no console

    if (!usuarioId) {
        window.location.href = "../html/login.html"; // redireciona se não tiver sessão
        return;
    }

    // carregarKpis();
    carregarDonut();
    carregarLinhas();
    carregarMetas();
});

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
                    maintainAspectRatio: false,
                    plugins: { legend: { display: true }
                    },
                    scales: {
                        x: {
                            grid: { color: 'rgba(255,255,255,0.04)' },
                            ticks: { color: '#5c5a55'}
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
                        borderColor: '#0d0d0f',
                        borderWidth: 3,
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

            // let labels = []   
            // let valores = []
            // let cores = []

            // for (let i = 0; i < data.length; i++) {
            //     labels.push(data[i].nome_categoria);
            //     valores.push(data[i].total_horas);
            //     cores.push(CORES[data[i].nome_categoria] || '#888');
            // }

            // new Chart (document.getElementById("grafico-metas"), {
            //     type: '',
            //     data: { },
            //     options: { }
            // }) 
        }).catch(function(erro) {
            console.error("Erro ao carregar horas por categoria:", erro)
        });
}