/**
 * Variável contendo o elemento canvas;
 * @type {HTMLCanvasElement}
 */
var canvas = null;
/**
 * Variável de contexto do canvas.
 * @type {CanvasRenderingContext2D}
 */
var ctx = null;

var botoes;

/**
 * Barra de informações (Nível, dinheiro em caixa e dia do mês)
 * @type {BarraSuperior}
 */
var barra;
var btnEstatisticas;
var btnConstrucao;
var btnMapa;
var btnCalendario;
var btnNotificacoes;

/**
 * Painel contendo as notificações mostradas ao usuário
 * @type {PainelNotificacoes}
 */
var painelNotificacoes;
/**
 * Mapa contendo lugares externos à empresa
 * @type {Mapa}
 */
var mapa;
var menuJogo;
var tutorial;
/**
 * Calendário
 * @type {Calendario}
 */
var calendario;
/**
 * Menu de construção
 * @type {Construcao}
 */
var construcao;
/**
 * Estatísticas da empresa
 * @type {Estatisticas}
 */
var estatisticas;
var rua;

var timerDias = null;
var timerDesenhar = null;

var contador = 0;
var itensConstruidos;
var efetuacao;

var xMouse;
var yMouse;

var desenhar = true;
var carregado = false;
var pausado = false;

var xpInicial;

var qtasConstrucoesInicialmente = 0;
/**
 * 0 - Nada sendo construído
 * 1 - Algo sendo construído
 * 2 - Algo sendo reposicionado
 */
var statusConstruindo = 0;
var nomeItemEmConstrucao = null;

var fatorEscala = 1;
var emprestimos = [];

var musicas = ["musicas/airtone_-_backwaters.ogg", "musicas/rewob_-_A_White_Dream.ogg"];
var musica = document.createElement("audio");
var timeoutMusica;

function tocarMusica()
{
	var novaMusica = musicas[Math.floor(Math.random() * musicas.length)];
	while (novaMusica == musica.src && musicas.length > 1)
		novaMusica = musicas[Math.floor(Math.random() * musicas.length)];

	if (musica.canPlayType("audio/mp3"))
		novaMusica = novaMusica.replace("ogg", "mp3");

	musica.src = novaMusica;
	musica.load();
	musica.play();
	musica.onloadeddata = function() {
		timeoutMusica = setTimeout(tocarMusica, (musica.duration + 1) * 1000);
	}
}
function tocarSom(caminho)
{
	if (menuJogo.getAlturaSom() != 0)
	{
		var audio = document.createElement("audio");
		if (audio.canPlayType("audio/mp3"))
			caminho = caminho.replace("ogg", "mp3");
		audio.src = caminho;
		audio.volume = menuJogo.getAlturaSom();
		audio.load();
		audio.play();
	}
}

iniciar();
function iniciar()
{
	tocarMusica();

	canvas = document.getElementById('meuCanvas');
	ctx = canvas.getContext("2d");

	function redimensionarCanvas()
	{
		fatorEscala = window.innerWidth / 1500;
		if (96 * window.innerHeight / 100 < 700 * fatorEscala || 72 * window.innerWidth / 100 > 1000 * (96 * window.innerHeight / 70000))
			fatorEscala = 96 * window.innerHeight / 70000;

		$("#meuCanvas").css("left", "calc((76vw - 1000px * " + fatorEscala + ") / 2)")
		$("#meuCanvas").css("top", "calc((96vh - 700px * " + fatorEscala + ") / 2)");
		$("#meuCanvas").css("transform", "scale(" + fatorEscala + ")")
		$(".grafico").css("transform", "scale(" + fatorEscala + ")")
		$(".grafico").css("left", "calc((76vw - 1000px * " + fatorEscala + ") / 2 + (154.4px * " +fatorEscala+ "))")
		$(".grafico").css("top", "calc((96vh - 700px * " + fatorEscala + ") / 2 + (237.53px * " +fatorEscala+ "))");
		if (fatorEscala < 1.2864)
		{
			$(".grafico").css('width', 'calc(10 * (680px(-3.88*'+fatorEscala+'+6)))')
			$(".grafico").css('heigth', 'calc(10 * (375px(-3.88*'+fatorEscala+'+6)))')
		}
	}
	redimensionarCanvas();
	window.addEventListener("resize", redimensionarCanvas);

	carregarDados();

	setTimeout(function(){
		criarBotoes();
		ativarBotoes();

		window.requestAnimFrame = (function(callback) {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
			function(callback) {
				if (desenhar)
			  		window.setTimeout(callback, 1000 / 50);
			};
		  })();

		requestAnimationFrame(function() {atualizar()});
	}, 10);
	$("#meuCanvas").on("mousemove", (function(e){
		if (e.bubbles)
		{
			var rect = e.target.getBoundingClientRect();

			xMouse = (e.clientX - rect.left) / fatorEscala;
			yMouse = (e.clientY - rect.top) / fatorEscala;
		}
	}));

	calendario.adicionarEvento(25, 2, 1, 1);
}

var ultimaLeituraDias = new Date();
function intervaloDias()
{
	if (ultimaLeituraDias != null)
		contador += (new Date().getTime() - ultimaLeituraDias.getTime()) / 50;
	else
		contador++;

	ultimaLeituraDias = new Date();

	for (var i = 0; i < Math.floor(contador / 25); i++)
	{
		passarDia();
		barra.ganharXP(1);
	}
	if (contador >= 25)
		contador = contador % 25;
}
function criarBotoes()
{
	btnEstatisticas = new BotaoCircular(60, 130, 40, 48,
		"#347b87", "#4c98a5", imgBtnEstatisticas, imgBtnEstatisticasHover,
		"bold 13pt Century Gothic", "#232323", "Estatísticas", true, false, false);
	btnConstrucao = new BotaoCircular(60, 230, 40, 48,
		"#347b87", "#4c98a5", imgBtnConstrucao, imgBtnConstrucaoHover,
		"bold 13pt Century Gothic", "#232323", "Construção", true, false, false);
	btnMapa = new BotaoCircular(60, 330, 40, 48,
		"#347b87", "#4c98a5", imgBtnMapa, imgBtnMapaHover,
		"bold 14pt Century Gothic", "#232323", "Mapa", true, false, false, "sons/papel.ogg");
	btnCalendario = new BotaoCircular(60, 430, 40, 48,
		"#347b87", "#4c98a5", imgBtnCalendario, imgBtnCalendarioHover,
		"bold 13pt Century Gothic", "#232323", "Calendário", true, false, false);
	btnNotificacoes = new BotaoCircular(canvas.width - 42, 110, 32, 32,
		"#232323", "#535353", imgBtnNotificacoes, imgBtnNotificacoes,
		"bold 16pt Century Gothic", "#c80000", "", false, true, true);
	btnNotificacoes.atualizarNotificacoes = function(qtasNotificacoes) {
		if (qtasNotificacoes == "0")
		{
			this.text = "";
			this.backgroundImage = imgBtnNotificacoes;
			this.backgroundHoverImage = imgBtnNotificacoes;
		}
		else
		{
			this.text = qtasNotificacoes;
			this.backgroundImage = imgBtnNotificacoes2;
			this.backgroundHoverImage = imgBtnNotificacoes2;
		}
	}
	btnNotificacoes.onclick = function() {
		painelNotificacoes.abrirFechar();
	}
	btnMapa.onclick = function() {
		mapa.abrirFechar();
	}
	btnEstatisticas.onclick = function() {
		estatisticas.abrirFechar();
	}
	btnCalendario.onclick = function() {
		calendario.abrirFechar();
	}
	btnConstrucao.onclick = function() {
		construcao.abrirFechar();
	}

	botoes.push(btnEstatisticas);
	botoes.push(btnConstrucao);
	botoes.push(btnMapa);
	botoes.push(btnCalendario);
	botoes.push(btnNotificacoes);
}
function ativarBotoes()
{
	for (var i = 0; i < botoes.length; i++)
		botoes[i].ativarInteracao();
}
function desativarBotoes()
{
	for (var i = 0; i < botoes.length; i++)
		botoes[i].desativarInteracao();
}
function atualizar()
{
	if (carregado)
	{
		desenharFundo();
		for (var i = 0; i < botoes.length; i++)
			if (botoes != null && botoes[i] != null)
				botoes[i].desenhar();
		for (var i = 0; i < itensConstruidos.length; i++)
		{
			if (itensConstruidos[i].menu.aberto || itensConstruidos[i].menu.janela.aberto)
			{
				itensConstruidos[i].menu.desenhar();
				break;
			}
		}

		barra.desenhar();

		painelNotificacoes.desenhar();
		mapa.desenhar();
		calendario.desenhar();
		construcao.desenhar();
		estatisticas.desenhar();

		desenharStatusConstrucao();

		if (carregado)
			barra.lvl.desenhar();

		tutorial.desenhar();
		if (efetuacao != null && efetuacao.ativo)
			efetuacao.desenhar();
		
		menuJogo.desenhar();
		desenharBordasCanvas();
	}
	else
		desenharCarregando();
	requestAnimationFrame(function() {atualizar()});
}
function desenharCarregando()
{
	ctx.save();

	ctx.fillStyle = "gray";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = "bold 30pt Century Gothic";
	ctx.fillText("Carregando...", canvas.width/2, canvas.height/2);

	ctx.restore();
}
function desenharStatusConstrucao()
{
	if (statusConstruindo != 0)
	{
		ctx.save();

		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillStyle = "black";
		ctx.strokeStyle = "white";
		ctx.lineWidth = 1;
		ctx.font = "bold 44pt Century Gothic";

		ctx.fillText((statusConstruindo == 1?"Construindo: ":"Reposicionando:") + nomeItemEmConstrucao,
					  canvas.width/2, 67, canvas.width - 20);
		ctx.strokeText((statusConstruindo == 1?"Construindo: ":"Reposicionando:") + nomeItemEmConstrucao,
					  canvas.width/2, 67, canvas.width - 20);

		ctx.font = "bold 20pt Century Gothic";
		ctx.fillText("Posicione onde achar adequado", canvas.width/2, 122);
		ctx.strokeText("Posicione onde achar adequado", canvas.width/2, 122);

		ctx.restore();
	}
}
function desenharBordasCanvas()
{
	ctx.save();

	ctx.lineWidth = 2;
	ctx.fillStyle = "black";

	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(canvas.width, 0);
	ctx.lineTo(canvas.width, canvas.height);
	ctx.lineTo(0, canvas.height);
	ctx.lineTo(0, 0);
	ctx.stroke();
	ctx.closePath();

	ctx.restore();
}
var areaFundo = new BotaoRetangular(125, 100, canvas.width-405, canvas.height-150,
	null,canvas.width-405, canvas.height-150, '', '', imgAreaEmpresa,
	imgAreaEmpresa, '', '', '', false, false, false, null, 'center', false);
function desenharFundo()
{
	var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
	grd.addColorStop(0, "#08a52a");
	grd.addColorStop(1,"#09bc30");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	rua.desenhar();

	if (itensConstruidos.length == 0 ||statusConstruindo)
		areaFundo.desenhar();

	for (var i = 0; i < itensConstruidos.length; i++)
		itensConstruidos[i].desenhar();
}
function passarDia()
{
	calendario.passarDia();
	barra.atualizarDia(calendario.dia);
	estatisticas.adicionarValor(barra.dinheiro);
	mapa.passarDia();
	var garagem = getJanelaConstrucao("Garagem");
	if (garagem)
		garagem.passarDia();
}

function getJanelaConstrucao(nome)
{
	function tratar(nom)
	{
		return nom.toUpperCase().trim();
	}
	nome = tratar(nome);

	for (var i = 0; i < itensConstruidos.length; i++)
		if (tratar(itensConstruidos[i].nome) == nome)
			return itensConstruidos[i].menu.janela;

	return false;
}

/**
 * Retorna o meio de pagamento de uma conta.
 * @param {string} conta Nome da conta cujo meio de pagamento será retornado.
 * @return 0 -> Débito, 1 -> Caixa, null -> Conta não encontrada.
 */
function getMeioDePagamento(conta)
{
	var garagem = getJanelaConstrucao("Garagem");
	
	if (garagem)
	{
		for (var i = 0; i < garagem.contas.length; i++)
			if (garagem.contas[i].nome == conta)
				return garagem.contas[i].efetuarNoDebito?1:0;
		return null;
	}
	else
		return null;
}

/**
 * Mostra uma tela de confirmação de compra, exibindo o nome, o preço e as opções de pagamento.
 * @param {string} nome Nome do item a ser comprado.
 * @param {number} preco Preço do item.
 * @param {boolean} aceitaCredito Se aceita ou não pagamento com crédito.
 * @param {boolean} aceitaDebito Se aceita ou não pagamento com débito.
 * @param {number} qtasParcelasMaximo Máximo de parcelas no crédito.
 * @param {Function} funcaoSucesso Função executada caso a compra seja realizada com sucesso.
 */
function fazerCompra(nome, preco, aceitaCredito, aceitaDebito, qtasParcelasMaximo, funcaoSucesso)
{
	efetuacao = new EfetuacaoDeCompra(nome, preco, aceitaCredito, aceitaDebito, qtasParcelasMaximo, funcaoSucesso);
	efetuacao.ativar();
}

/**
 * Adiciona o valor pedido do meio de pagamento especificado
 * @param {number} valor 
 * @param {number} destino 0 -> Caixa; 1 -> Débito
 */
function receber(valor, destino)
{
	if (destino == 0)
		barra.dinheiro += valor;
	else if (destino == 1)
		mapa.banco.saldo += valor;

	ganhosTotaisDoMes += valor;
}


var custosTotaisDoMes = 0;
var ganhosTotaisDoMes = 0;

/**
 * Desconta o valor pedido do meio de pagamento especificado
 * @param {number} valor 
 * @param {number} meioDePagamento 0 -> Caixa; 1 -> Débito
 */
function descontar(valor, meioDePagamento)
{
	if (meioDePagamento == 0)
		barra.dinheiro -= valor;
	else if (meioDePagamento == 1)
		mapa.banco.saldo -= valor;	

	custosTotaisDoMes += valor;
}
/**
 * Recebe um valor inteiro e retorna uma string no formato $xxxx,xx.
 * @param {number} valor Valor inteiro.
 */
function formatarDinheiro(valor)
{
	return "$" + valor.toFixed(2).replace(".", ",");
}

/**
 * Recebe o dia, o mês e o ano e retorna uma data no formato dd/mm/aa. Se o ano for omitido, retorna dd/mm.
 * @param {number} dia
 * @param {number} mes
 * @param {number} ano
 * @return {string} Data
 */
function formatarData(dia, mes, ano)
{
	var data = (dia < 10?"0" + dia:dia) + "/" + (mes < 10?"0" + mes:mes);
	if (ano != null)
		data += "/" + (ano < 10?"0" + ano:ano);
	return data;
}
function desformatarData(data)
{
	var dataDesformatada = {
		dia: parseInt(data.substr(0, 2)),
		mes: parseInt(data.substr(3, 2)),
		ano: parseInt(data.substr(6))
	}
	return dataDesformatada;
}

function desenharGraficoPizza(raio, xCentro, yCentro, valores, total, cores, corBase)
{
	ctx.save();

	ctx.lineWidth = 4;
	ctx.fillStyle = corBase;
	ctx.beginPath();
	ctx.ellipse(xCentro, yCentro, raio, raio, 0, 0, Math.PI * 2);
	ctx.stroke();
	ctx.fill();

	var anguloInicial = - Math.PI / 2;
	var anguloFinal = anguloInicial;

	for (var i = 0; i < valores.length; i++)
	{
		if (valores[i] > 0)
		{
			anguloInicial = anguloFinal;
			anguloFinal = anguloInicial + 2 * Math.PI * (valores[i])/total;

			ctx.lineWidth = 2;
			ctx.fillStyle = cores[i];
			ctx.beginPath();
			ctx.moveTo(xCentro, yCentro);
			ctx.arc(xCentro, yCentro, raio, anguloInicial, anguloFinal);
			ctx.closePath();
			ctx.fill();
		}
	}

	ctx.restore();
}
function roundRect(x, y, width, height, radius, fill, stroke) // Desenha um retângulo com bordas redondas
{
	var cornerRadius = { upperLeft: 0, upperRight: 0, lowerLeft: 0, lowerRight: 0 };
    if (typeof stroke == "undefined") {
        stroke = true;
    }
    if (typeof radius === "object") {
        for (var side in radius) {
            cornerRadius[side] = radius[side];
        }
	}
	else if (typeof radius === "number")
		for (var side in cornerRadius)
			cornerRadius[side] = radius;

    ctx.beginPath();
    ctx.moveTo(x + cornerRadius.upperLeft, y);
    ctx.lineTo(x + width - cornerRadius.upperRight, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
    ctx.lineTo(x + width, y + height - cornerRadius.lowerRight);
    ctx.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
    ctx.lineTo(x + cornerRadius.lowerLeft, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
    ctx.lineTo(x, y + cornerRadius.upperLeft);
    ctx.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
    ctx.closePath();
    if (stroke) {
        ctx.stroke();
    }
    if (fill) {
        ctx.fill();
	}
}
function pausar()
{
	ultimaLeituraDias = null;
	if (timerDias)
		clearInterval(timerDias);
	timerDias = null;
	rua.pausar();
	pausado = true;
}
function despausar()
{
	ultimaLeituraDias = new Date();
	if (!timerDias)
		timerDias = setInterval(intervaloDias, 50);
	rua.despausar();
	pausado = false;
}
function carregarDados()
{
	itensConstruidos = new Array();
	botoes = new Array();

	barra = new BarraSuperior();
	barra.onNivelMudou = function() {
		construcao.setNivel(barra.nivel);
	}
	painelNotificacoes = new PainelNotificacoes();

	mapa = new Mapa();
	calendario = new Calendario();
	estatisticas = new Estatisticas();
	construcao = new Construcao();

	tutorial = new Tutorial();
	menuJogo = new MenuJogo();
	$(document).on("keydown", function(e) {
		if (e.keyCode == 27)
			menuJogo.abrirFechar();
	})

	rua = new Rua();
	rua.iniciarMovimentacao(true);

	var aux = jogo.Data;
	var ano = parseInt(aux.substring(6));
	var mes = parseInt(aux.substring(3, 5));
	var dia = parseInt(aux.substring(0, 2));
	calendario.setFator(jogo.Estatisticas);
	calendario.dia = dia;
	calendario.mes = mes;
	calendario.ano = ano;
	estatisticas.setEstatisticas(jogo.Estatisticas);
	barra.atualizarDia(dia);
	barra.ganharXP(jogo.XP, false);
	mapa.banco.saldo = jogo.ContaBancoMovimento; // @TODO Resolver informações do banco
	menuJogo.setAlturaSom(user.VolumeJogos);
	menuJogo.setIsComMusica(user.ComMusicaNosJogos);
	mapa.setNumeros(parseInt(jogo.NumeroFranquias), parseInt(jogo.NumeroFornecedores), parseInt(jogo.NumeroIndustrias));
	$.ajax({
		url: 'http://' + local + ':3000/construcao/' + jogo.CodJogo
	}).done(function(dados){
		qtasConstrucoesInicialmente = dados.length;
		for (var i = 0; i < dados.length; i++)
		{
			var isPrimeiro = i == 0;
			switch(dados[i].ItemConstruido)
			{
				case 'Armazém':
					itensConstruidos[i] = new ItemConstruido(ItemConstruido.armazem, isPrimeiro);
				break;

				case 'Garagem':
					itensConstruidos[i] = new ItemConstruido(ItemConstruido.garagem, isPrimeiro);
				break;

				case 'Operacional':
					itensConstruidos[i] = new ItemConstruido(ItemConstruido.operacional, isPrimeiro);
				break;

				case 'R. Humanos':
					itensConstruidos[i] = new ItemConstruido(ItemConstruido.recursosHumanos, isPrimeiro);
				break;

				case 'Marketing':
					itensConstruidos[i] = new ItemConstruido(ItemConstruido.marketing, isPrimeiro);
				break;

				case 'Financeiro':
					itensConstruidos[i] = new ItemConstruido(ItemConstruido.financeiro, isPrimeiro);
			}
			itensConstruidos[i].sustentador = dados[i].Sustentador;
			itensConstruidos[i].setX(dados[i].X);
			itensConstruidos[i].setY(dados[i].Y);
			itensConstruidos[i].passarItens(itensConstruidos);
		}
		for(var i = 0; i < itensConstruidos.length; i++){
			botoes.push(itensConstruidos[i].botao)
		}

		$.ajax({
			url: 'http://' + local + ':3000/infoEmpresa/' + jogo.CodJogo
		}).done(function(dados){
			var infoJogo = dados[0];

			if (infoJogo)
			{
				mapa.banco.jaAbriuConta = infoJogo.JaTemContaNoBanco == 1?true:false;
				mapa.fornecedores.osFrequenciaEntrega.indiceOpcaoAtual = infoJogo.FreqFornecedores;
				mapa.fornecedores.materiaPrimaAcumulada = infoJogo.MateriaPrimaAcumulada;

				var armazem = getJanelaConstrucao("Armazém");

				/**
				 * @type {Garagem}
				 */
				var garagem = getJanelaConstrucao("Garagem");
				var operacional = getJanelaConstrucao("Operacional");
				var rh = getJanelaConstrucao('R. Humanos');
				var marketing = getJanelaConstrucao("Marketing");

				if (armazem)
				{
					if (infoJogo.CapacidadeArmazem != null)
						armazem.capacidade = infoJogo.CapacidadeArmazem;
					if (infoJogo.PrecoUpgradeArmazem != null)
						armazem.precoUpgrade = infoJogo.PrecoUpgradeArmazem;
				}
				if (garagem)
				{
					var produtosCarregados = false;
					var contasCarregadas = false;
					if (infoJogo.QtdeMateriaPrima != null)
						garagem.qtdeMateriaPrima = infoJogo.QtdeMateriaPrima;
					if (infoJogo.CapacidadeProducao != null)
						garagem.capacidadeProducao = infoJogo.CapacidadeProducao;
					if (infoJogo.Reformada != null)
					{
						garagem.reformada = infoJogo.Reformada==1;
						if (garagem.reformada)
							garagem.reformar();
					}
					$.ajax({
						url: 'http://' + local + ':3000/produtos/' + jogo.CodJogo
					}).done(function(produtos){
						for (var i = 0; i < produtos.length; i++)
						{
							var produto = new Produto(produtos[i].Nome, produtos[i].Preco);
							produto.qtdeEmEstoque = produtos[i].QuantidadeEmEstoque;
							produto.diasRestantes = produtos[i].DiasRestantes;
							produto.dataDeCriacao = produtos[i].DataDeCriacao;
							produto.status = produtos[i].Status;
							produto.qualidade = produtos[i].Qualidade;
							produto.producao = produtos[i].Producao;
							produto.totalDeVendas = produtos[i].TotalDeVendas;
							produto.fatorMarketing = produtos[i].fatorMarketing;

							garagem.produtos.push(produto);
							garagem.txtsProducao[i].text = produto.producao + "";

							if (produto.status != 1)
							{
								garagem.txtNome.text = produto.nome;
								garagem.txtPreco.text = produto.preco + "";
							}

							if (operacional)
								operacional.txtsProducao[i].text = produto.producao + "";
						}
						if (operacional && infoJogo.PrecoUpgradeOperacional != null)
							operacional.precoUpgrade = infoJogo.PrecoUpgradeOperacional;

						if (marketing)
						{
							marketing.promocaoEmpresa = infoJogo.PromocaoEmpresa;
							marketing.diasRestantesPromocaoEmpresa = infoJogo.DiasRestantesPromocaoEmpresa;
							marketing.diasTotaisPromocaoEmpresa = infoJogo.DiasTotaisPromocaoEmpresa;
						}

						produtosCarregados = true;
						if (contasCarregadas)
						{
							carregado = true;
							ativarBotoes();
						}
					})
					$.ajax({
						url: 'http://' + local + ':3000/contasJogo/' + jogo.CodJogo
					}).done(function(contas){
						for (var i = 0; i < contas.length; i++)
						{
							var conta = new Conta(contas[i].Nome, contas[i].Classificacao);
							conta.efetuarNoDebito = contas[i].EfetuarNoDebito==1;
							garagem.contas.push(conta);
							garagem.switchers[i].side = conta.efetuarNoDebito?"right":"left";
							garagem.switchers[i].deslocamento = conta.efetuarNoDebito?100:0;
						}

						contasCarregadas = true;
						if (produtosCarregados)
						{
							carregado = true;
							ativarBotoes();
						}
					})
				}
				else
				{
					carregado = true;
					ativarBotoes();
				}
				if (rh)
					rh.setRH(infoJogo)
			}
			else
				carregado = true;
		})
		xpInicial = jogo.XP;
	})
	contador = 0;

	if (jogo.Caixa == -1)
	{
		barra.dinheiro = 25000;
		tutorial.abrirFechar();
	}
	else
	{
		barra.dinheiro = jogo.Caixa;
		if (!timerDias)
			timerDias = setInterval(intervaloDias, 50);
	}
	mapa.desativar();
	$.get('http://' + local + ':3000/getEmprestimos/' + jogo.CodJogo).done(function(dados)
	{
		emprestimos = [];
		for (var i = 0; i < dados.length; i++)
		{
			emprestimos[i] = new Object();
			emprestimos[i].valorInicial = dados[i].Valor;
			emprestimos[i].indice = dados[i].Indice;
			emprestimos[i].dataCriacao = dados[i].DataCriacao;
			emprestimos[i].j = dados[i].Juros;
			emprestimos[i].p = dados[i].Parcelas;
			var diff;
			diff = parseInt(emprestimos[i].dataCriacao.substring(emprestimos[i].dataCriacao.lastIndexOf('/')+1));
			diff = (calendario.ano - diff)*12
			diff -= parseInt(emprestimos[i].dataCriacao.substring(emprestimos[i].dataCriacao.indexOf('/')+1, emprestimos[i].dataCriacao.lastIndexOf('/')));
			diff += calendario.mes;
			diff = diff <= 0 ? 0 : diff;
			valor = (emprestimos[i].j/(1 - (1/(Math.pow(1 + emprestimos[i].j, emprestimos[i].p)))))
			valor = valor * emprestimos[i].valorInicial * (emprestimos[i].p - diff);
			emprestimos[i].valor = valor;
		}
	})
}
function salvar()
{
	var atualizar = new Object();
	atualizar.XP = barra.getXPTotal();
	atualizar.Data = formatarData(calendario.dia, calendario.mes, calendario.ano);
	atualizar.Caixa = barra.dinheiro;
	atualizar.ContaBancoMovimento = mapa.banco.saldo;
	atualizar.NumeroFranquias = mapa.numeroFranquias;
	atualizar.NumeroFornecedores = mapa.numeroFornecedores;
	atualizar.NumeroIndustrias = mapa.numeroIndustrias;
	atualizar.Estatisticas = JSON.stringify(estatisticas.getEstatisticas());
		$.post('http://' + local + ':3000/jogo/' + jogo.CodJogo, atualizar);

	atualizar = new Object();
	atualizar.VolumeJogos = menuJogo.getAlturaSom() * 6 - 1;
	$.ajax({
		url: 'http://' + local + ':3000/usuario/mudarVolumeJogos/' + user.CodUsuario,
		type: 'patch',
		data: atualizar
	})
	user.VolumeJogos = menuJogo.getAlturaSom() * 6 - 1;

	atualizar = new Object();
	atualizar.ComMusicaNosJogos = menuJogo.isComMusica()?1:0;
	$.ajax({
		url: 'http://' + local + ':3000/usuario/mudarComMusicaNosJogos/' + user.CodUsuario,
		type: 'patch',
		data: atualizar
	})
	user.ComMusicaNosJogos = menuJogo.isComMusica()?1:0;

	for (var i = 0; i < qtasConstrucoesInicialmente; i++)
	{
		atualizar = new Object();
		atualizar.CodJogo = jogo.CodJogo;
		atualizar.ItemConstruido = itensConstruidos[i].nome;
		atualizar.X = itensConstruidos[i].x;
		atualizar.Y = itensConstruidos[i].y;
		atualizar.Sustentador = itensConstruidos[i].sustentador;

		$.ajax({
			url: 'http://' + local + ':3000/construcao',
			type: 'patch',
			data: atualizar
		})
	}
	for (var i = qtasConstrucoesInicialmente; i < itensConstruidos.length; i++)
	{
		if (itensConstruidos[i].jaComprado)
		{
			var novoItem = new Object();
			novoItem.ItemConstruido = itensConstruidos[i].nome;
			novoItem.X = itensConstruidos[i].getX();
			novoItem.Y = itensConstruidos[i].getY();
			novoItem.Sustentador = itensConstruidos[i].sustentador;

			$.post('http://' + local + ':3000/construir/' + jogo.CodJogo, novoItem);
		}
	}

	atualizar = new Object();

	var armazem = getJanelaConstrucao("Armazém");
	var garagem = getJanelaConstrucao("Garagem");
	var operacional = getJanelaConstrucao("Operacional");
	var rh = getJanelaConstrucao('R. Humanos');
	var marketing = getJanelaConstrucao("Marketing");

	if (armazem)
	{
		atualizar.CapacidadeArmazem = armazem.capacidade;
		atualizar.PrecoUpgradeArmazem = armazem.precoUpgrade;
	}
	if (garagem)
	{
		atualizar.QtdeMateriaPrima = garagem.qtdeMateriaPrima;
		atualizar.CapacidadeProducao = garagem.capacidadeProducao;
		atualizar.Reformada = garagem.reformada?1:0;
		atualizar.FreqFornecedores = mapa.fornecedores.osFrequenciaEntrega.indiceOpcaoAtual;
		atualizar.MateriaPrimaAcumulada = mapa.fornecedores.materiaPrimaAcumulada;
		for (var i = 0; i < garagem.produtosRemovidos.length; i++)
			$.ajax({
				url: 'http://' + local + ':3000/produto/' + jogo.CodJogo + "/" + garagem.produtosRemovidos[i].nome,
				type: 'delete',
				data: {}
			})
		garagem.produtosRemovidos = new Array();
		setTimeout(function() {
			for (var i = 0; i < garagem.produtos.length; i++)
			{
				var produto = new Object();
				produto.CodJogo = jogo.CodJogo;
				produto.Nome = garagem.produtos[i].nome;
				produto.Preco = garagem.produtos[i].preco;
				produto.QuantidadeEmEstoque = garagem.produtos[i].qtdeEmEstoque;
				produto.DataDeCriacao = garagem.produtos[i].dataDeCriacao;
				produto.Status = garagem.produtos[i].status;
				produto.Qualidade = garagem.produtos[i].qualidade;
				produto.DiasRestantes = garagem.produtos[i].diasRestantes;
				produto.Producao = garagem.produtos[i].producao;
				produto.TotalDeVendas = garagem.produtos[i].totalDeVendas;
				produto.FatorMarketing = garagem.produtos[i].fatorMarketing;

				$.post('http://' + local + ':3000/produto', produto);
			}
		}, 40);
		for (var i = 0; i < garagem.contas.length; i++)
		{
			var conta = new Object();
			conta.CodJogo = jogo.CodJogo;
			conta.Nome = garagem.contas[i].nome;
			conta.Classificacao = garagem.contas[i].classificacao;
			conta.EfetuarNoDebito = garagem.contas[i].efetuarNoDebito?1:0;

			$.post('http://' + local + ':3000/contasJogo', conta);
		}
	}
	if (operacional)
		atualizar.PrecoUpgradeOperacional = operacional.precoUpgrade;
	if (marketing)
	{
		atualizar.PromocaoEmpresa = marketing.promocaoEmpresa;
		atualizar.DiasRestantesPromocaoEmpresa = marketing.diasRestantesPromocaoEmpresa;
		atualizar.DiasTotaisPromocaoEmpresa = marketing.diasTotaisPromocaoEmpresa;
	}
	if (rh)
		jQuery.extend(atualizar, rh.getRH())
	atualizar.JaTemContaNoBanco = mapa.banco.jaAbriuConta?1:0;

	$.post('http://' + local + ':3000/infoEmpresa/' + jogo.CodJogo, atualizar);

	qtasConstrucoesInicialmente = itensConstruidos.length;
	var xpFinal = barra.getXPTotal() - xpInicial;
	$.ajax({
		url: 'http://' + local + ':3000/updateTotalXp/' + user.CodUsuario + '/' + xpFinal,
		type: 'patch'
	})
	aux = new Object();
	for (var i = 0; i < emprestimos.length; i++)
	{
		aux = emprestimos[i];
		setTimeout(function(){
			$.post('http://' + local + ':3000/emprestimos/' + jogo.CodJogo, aux)
		}, 15)
	}
}
function finalizarJogo()
{
	$("#meuCanvas").off();
	$(document).off();
	rua.pausar();
	clearInterval(timerDias);
	desenhar = false;
	salvar();
	musica.pause();

	if (timeoutMusica)
		clearTimeout(timeoutMusica);
}