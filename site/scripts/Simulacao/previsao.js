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
    pontosPrevisao = [];
    if (chartPrevisao != null)
        chartPrevisao.destroy();
    var diff = Math.round((data.getTime() - new Date().getTime())/86400000)+1
    var y = simulacao.Saldo;
    var s = new Date(simulacao.DataCriacao);
    var x = s.toUTCString();
    x = x.substring(0, x.length-5)
    s = new Date(x)
    setTimeout(function(){
        for (var i = 0; i < pontosSaldo.length; i++)
        {
            if (i == pontosSaldo.length-1)
            {
                var aux = new Object();
                aux.x = pontosSaldo[i].x;
                aux.y = pontosSaldo[i].y;
                aux.lineDashType = 'dash'
                aux.xValueFormatString = "DD/MM";
                pontosPrevisao.push(aux);
            }
            else
                pontosPrevisao.push(pontosSaldo[i])
        }
        hojeAux = new Date();
            for (var i = 1; i <= diff; i++)
            {
                var aux = new Object();
                var xd = hojeAux.toUTCString();
                xd = xd.substring(0, xd.length-5)
                aux.x = new Date(xd);
                aux.lineDashType = "dash";
                var perdaGanho = 0;
                if (!(hojeAux.getFullYear() == s.getFullYear() && hojeAux.getMonth() == s.getMonth() && hojeAux.getDate() == s.getDate()))
                    perdaGanho = verificarPerdaGanho(hojeAux)
                y += perdaGanho;
                aux.y = y;
                aux.xValueFormatString = "DD/MM";
                pontosPrevisao.push(aux);
                hojeAux = new Date();
                hojeAux.setDate(hojeAux.getDate() + i);
            }
            var hojeAux = new Date();
            if (hojeAux.getFullYear() == s.getFullYear() && hojeAux.getMonth() == s.getMonth() && hojeAux.getDate() == s.getDate())
                pontosPrevisao.shift();
            criarGraficoPrevisao();
            $("#estimado").css('display', 'block')
            $("#estimado").text('Saldo estimado: $' + y)
    }, 100)
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