var chartPrevisao;
var hoje;
var data;
var pontosPrevisao = new Array();
$("#painelConta").css('height', '70vh')
$("#sairModal").on('click', function(){
    $("#modal").css('display', 'none');
})
$("#data").on('change', verificarDataPrevisao)
function verificarDataPrevisao()
{
    if (chartPrevisao != null)
        chartPrevisao.destroy();
    $.ajax({
        url: 'http://' + local + ':3000/getContas/' + simulacao.CodSimulacao
    }).done(function(dados){contas = dados;})
    pontosPrevisao = [];
    data = new Date($('#data').val());
    hoje = new Date();
    data.setHours(24);
    if (data < hoje)
        alerta('Data inválida')
    else
        fazerPrevisao();
}

function fazerPrevisao()
{
    if (chartPrevisao != null)
        chartPrevisao.destroy();
    pontosPrevisao = pontosPrevisao.concat(pontosSaldo);
    hoje = new Date();
    var diff = Math.round((data.getTime() - new Date().getTime())/86400000)
    var y = simulacao.Saldo;
    for (var i = 0; i <= diff; i++)
    {
        var aux = new Object();
        var dataAtual = new Date();
        dataAtual.setDate(hoje.getDate() + i);
        aux.x = dataAtual;
        aux.lineDashType = "dash";
        var perdaGanho = verificarPerdaGanho(dataAtual);
        y += perdaGanho;
        console.log(perdaGanho)
        aux.y = y;
        aux.xValueFormatString = "DD/MM"
        pontosPrevisao.push(aux);
    }
    hoje = new Date();
    criarGraficoPrevisao();
    $("#estimado").css('display', 'block')
    $("#estimado").text('Saldo estimado: $' + y)
}
function criarGraficoPrevisao()
{
	chartPrevisao = new CanvasJS.Chart("previsaoContas", {
		animationEnabled: true,
        theme: tema + '1',
        culture: 'es',
		zoomEnabled: true,
		axisX: {title: "Dias", valueFormatString: "DD/MM/YY"},
		axisY: {title: "Saldo", prefix: '$'},
		title: {text: "Saldo: " + simulacao.Saldo},
		data:
		[{
			type: "line",
			color: $("#conteudoInfo").css("background-color"),
			dataPoints: pontosPrevisao
		}]
	});
	chartPrevisao.render();
}