var username;
var conteudoAberto = null;
var jogo;
var simulacao;

function colocarDados() {
	$("#user").text(user.Username);
	$("#rank").text(user.Rank);
	$("#conteudoInfo").css("height", "900");
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
	//var newStyleElement = $("head").children(':last');
	//newStyleElement.html(
	//);
}
function abrirInfo(arq) 
{
	var tempoEsperaFinalizar = 0;
	if (conteudoAberto == "jogo.html")
	{
		finalizarJogo();
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
	$("#conteudo").append(str)
	$("#modalConfirma").css('display', 'block');
	$("#sairModalConfirma").on('click', function(){
		$("#modalConfirma").css('display', 'none');
	})
	$("#btnSim").on('click', function(){
		funcao();
		$("#modalConfirma").css('display', 'none');
	})
	$("#btnCancelar").on('click', function(){
		$("#modalConfirma").css('display', 'none');
	});
}
colocarDados();