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
    pontosPrevisao = pontosPrevisao.concat(pontosSaldo);
    if (chartPrevisao != null)
        chartPrevisao.destroy();
    hojeAux = new Date();
    var diff = Math.round((data.getTime() - new Date().getTime())/86400000)
    var y = simulacao.Saldo;
    for (var i = 0; i <= diff; i++)
    {
        var aux = new Object();
        hojeAux = new Date();
        hojeAux.setDate(new Date().getDate() + i);
        aux.x = hojeAux;
        aux.lineDashType = "dash";
        var perdaGanho = verificarPerdaGanho(hojeAux);
        y += perdaGanho;
        aux.y = y;
        aux.xValueFormatString = "DD/MM";
        pontosPrevisao.push(aux);
    }
    pontosPrevisao.shift();
    hojeAux = new Date();
    console.log(pontosPrevisao)
    criarGraficoPrevisao();
    $("#estimado").css('display', 'block')
    $("#estimado").text('Saldo estimado: $' + y)
}
function criarGraficoPrevisao()
{
    chartPrevisao = null;
	chartPrevisao = new CanvasJS.Chart("previsaoContas", {
		animationEnabled: true,
        theme: tema + '1',
        culture: 'es',
		zoomEnabled: true,
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