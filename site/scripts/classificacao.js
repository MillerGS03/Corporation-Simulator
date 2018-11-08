var rank;
var chartRank;
var chartJogos;
var valJogos;
var valRank = new Array();
var diaAtual;
var primeiraVezGraf = true;
function colocarDados()
{
    $.get('http://' + local + ':3000/jogos/' + user.CodUsuario).done(function(dados){
        valJogos = [];
        $.each(dados, function(i, dado){
            var aux = new Object();
            aux.y = dado.XP/user.SomaXP * 100;
            aux.label = dado.Nome;
            aux.x = dado.Nome;
            valJogos.push(aux);
        })
        criarGraficoJogos();
    })
    $.get('http://' + local + ':3000/rankUsuario/' + user.CodUsuario).done(function(dados){
        var obj = dados[0];
        valRank = [];
        var from = obj.DiaAtual.split("/")
        diaAtual = new Date(from[2], from[1], from[0])
        valRank = JSON.parse(obj.GraficoRank);
        valRank = valRank.Grafico;
        criarGraficoRank();
    })
}
colocarDados();
function criarGraficoRank()
{
    chartRank = new CanvasJS.Chart("grafRank", {
        animationEnabled: true,
        culture: 'en',
        zoomEnabled: true,
        axisX: {title: "Tempo"},
        axisY: {title: "Rank"},
        title: {text: "Ranking de " + user.Username},
        data:
        [{
            type: "line",
            color: '#4286f4',
            dataPoints: valRank
        }]
    });
    chartRank.render();
}
function criarGraficoJogos()
{
	chartJogos = new CanvasJS.Chart("grafJogos", {
		animationEnabled: true,
		theme: 'light1',
		culture: 'es',
		title: {text: "Jogos criados"},
		data: [{
			type: "pie",
			startAngle: 25,
			toolTipContent: "<b>{label}</b>: {y}%",
			showInLegend: "true",
			legendText: "{label}",
			indexLabelFontSize: 16,
			indexLabel: "{label} - {y}%",
			indexLabelPlacement: "outside",
			dataPoints: valJogos
		}]
	});
	chartJogos.render();
}
function atualizarGrafs()
{
    $.get('http://' + local + ':3000/getRanking').done(function(dados){
        for (var i = 0; i < dados.length; i++)
            if (dados[i].CodUsuario == user.CodUsuario)
                rank = i + 1;
        $("#rankUsuario").text("Rank atual: #" + rank)
        $("#userAtual").text('Username: ' + user.Username)
        $("#xpTotal").text('XP total: ' + user.SomaXP)
        if (!passouDia() || primeiraVezGraf)
        {
            valRank[valRank.length - 1].y = rank;
            valRank[valRank.length - 1].label = diaAtual.getDate() + '/' + diaAtual.getMonth() + '/' + diaAtual.getFullYear();
            if (primeiraVezGraf)
                primeiraVezGraf = false;
        }
        else
        {
            var aux = new Object();
            aux.y = rank;
            aux.label = diaAtual.getDate() + '/' + diaAtual.getMonth() + '/' + diaAtual.getFullYear();
            valRank.push(aux)
            if (valRank.length >= 30)
                valRank.shift();
        }
    })
}
function passouDia()
{
    var hoje = new Date();
    if (hoje >= diaAtual)
	{
		diaAtual = hoje;
		return true;
	}
	else
		return false;
}
atualizarGrafs();
function salvarGrafico()
{
    var obj = new Object();
    var aux = new Object();
    aux.Grafico = valRank;
    obj.GraficoRank = JSON.stringify(aux);
    console.log(valRank)
    obj.DiaAtual = diaAtual.getDate() + '/' + diaAtual.getMonth() + '/' + diaAtual.getFullYear();
    $.ajax({
        url: 'http://' + local + ':3000/updateUsuarioRank/' + user.CodUsuario,
        type: 'patch',
        data: obj
    })
}