var username;
var conteudoAberto = null;
var jogo;
var simulacao;

function colocarDados() {
	$("#user").text(user.Username);
	$("#rank").text(user.Rank);
	$("head").append('<style type="text/css">' +
	'.active'+
		'{'+
			'position: absolute;'+
			'width: 23.9vw;'+
			'height: 7.8vh;'+
			'font-family: "Century Gothic";'+
			'font-size: 1.4vw;'+
			'line-height: 7.8vh;'+
			'vertical-align: middle;'+
			'text-align: center;'+
			'font-weight: bold;'+
			'cursor:pointer;'+
			'transition: background-color 0.2s ease-out;'+
			'z-index: 3;'+
			'background-color:' + user.CorFundo + ';'+
		'}'+
	'</style>');
}
function abrirInfo(arq) 
{
	var tempoEsperaFinalizar = 0;
	if (conteudoAberto == "jogo.html")
	{
		finalizarJogo();
		tempoEsperaFinalizar = 20;
	}
	else if (conteudoAberto == 'simulacao.html')
	{
		finalizarSimulacao();
		tempoEsperaFinalizar = 20;
	}
	setTimeout(function() {
		$("#conteudoInfo").empty();
		$('#conteudoInfo').load("html/" + arq);
		conteudoAberto = arq;
		$("#configuracoes").removeClass('active');
		$("#classificacao").removeClass('active');
		$("#manual").removeClass('active');
		$("#simulacoes").removeClass('active');
		$("#jogos").removeClass('active');
		$("#configuracoes").addClass('opcao');
		$("#classificacao").addClass('opcao');
		$("#manual").addClass('opcao');
		$("#simulacoes").addClass('opcao');
		$("#jogos").addClass('opcao');
	
		if (arq.includes("configurar"))
			{$("#configuracoes").addClass('active'); $("#configuracoes").removeClass('opcao');}
		else if (arq.includes("classificacao"))
			{$("#classificacao").addClass('active'); $("#classificacao").removeClass('opcao');}
		else if (arq.includes("manual"))
			{$("#manual").addClass('active');$("#manual").removeClass('opcao');}
		else if (arq.includes("simulac"))
			{$("#simulacoes").addClass('active');$("#simulacoes").removeClass('opcao');}
		else
			{$("#jogos").addClass('active');$("#jogos").removeClass('opcao');}
	}, tempoEsperaFinalizar)
}
abrirInfo('configurar.html');
function confirma(txt, funcao)
{
	var str = '<div id="modalConfirma" class="modal"><div id="modalConfirma-content">'+
	'<span class="btnSair" id="sairModalConfirma"></span>'+
	'<h1 id="txtConfirma">Deseja realmente ' + txt + '?</h1>'+
	'<button id="btnSim">Sim</button>'+
	'<button id="btnCancelar">Cancelar</button>'+
	'</div></div>'
	$("#conteudoInfo").append(str)
	$("#modalConfirma").css('display', 'block');
	$("#sairModalConfirma").on('click', function(){
		$("#modalConfirma").css('display', 'none');
	})
	$("#btnSim").on('click', function(){
		funcao();
		$("#modalConfirma").css('display', 'none');
		$("#modalConfirma").remove();
	})
	$("#btnCancelar").on('click', function(){
		$("#modalConfirma").css('display', 'none');
		$("#modalConfirma").remove();
	});
}
function alerta(txt)
{
	var str = '<div id="modalAlerta" class="modal"><div id="modalConfirma-content">'+
	'<h1 id="txtConfirma">' + txt + '</h1>'+
	'<button id="btnOK">OK</button>'+
	'</div></div>'
	$("#conteudoInfo").append(str)
	$("#modalAlerta").css('display', 'block');
	$("#modalAlerta").css('z-index', '100000');
	$("#btnOK").on('click', function(){
		$("#modalAlerta").css('display', 'none');
		$("#modalAlerta").remove();
	})
}
colocarDados();