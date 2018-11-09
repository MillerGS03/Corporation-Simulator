//--------------------------------------------------------------------------
// Jogo.js
// imagens dos botões circulares
var imgBtnEstatisticas = new Image();
var imgBtnConstrucao = new Image();
var imgBtnMapa = new Image();
var imgBtnCalendario = new Image();
var imgBtnNotificacoes = new Image();
var imgBtnNotificacoes2 = new Image();
imgBtnEstatisticas.src = "imagens/botoes/btnEstatisticas.png";
imgBtnConstrucao.src = "imagens/botoes/btnConstrucao.png"
imgBtnMapa.src = "imagens/botoes/btnMapa.png";
imgBtnCalendario.src = "imagens/botoes/btnCalendario.png";
imgBtnNotificacoes.src = "imagens/botoes/btnNotificacoes.png";
imgBtnNotificacoes2.src = "imagens/botoes/btnNotificacoes2.png";

// imagens dos botões circulares no evento hover
var imgBtnEstatisticasHover = new Image();
var imgBtnConstrucaoHover = new Image();
var imgBtnMapaHover = new Image();
var imgBtnCalendarioHover = new Image();
imgBtnEstatisticasHover.src = "imagens/botoes/btnEstatisticasHover.png";
imgBtnConstrucaoHover.src = "imagens/botoes/btnConstrucaoHover.png"
imgBtnMapaHover.src = "imagens/botoes/btnMapaHover.png";
imgBtnCalendarioHover.src = "imagens/botoes/btnCalendarioHover.png";

// Imagem para mostrar quando o usuário estiver construindo alguma coisa
var imgConstruindo = new Image();
imgConstruindo.src = "imagens/construcoes/construindo.png";

//--------------------------------------------------------------------------
// MenuJogo.js
var imgBtnSomMudo = new Image();
var imgBtnSomAtivo = new Image();
imgBtnSomMudo.src = "imagens/menusBotoes/somMudo.png";
imgBtnSomAtivo.src = "imagens/menusBotoes/somAtivo.png";
//--------------------------------------------------------------------------
// Tutorial.js
var imgTutCalendario = new Image();
var imgTutConstrucao = new Image();
var imgTutEstatisticas = new Image();
var imgTutMapa = new Image();
var imgPaginaAnterior = new Image();
var imgPaginaAnteriorHover = new Image();
var imgPaginaPosterior = new Image();
var imgPaginaPosteriorHover = new Image();
imgTutCalendario.src = "imagens/tutorial/calendario.png";
imgTutConstrucao.src = "imagens/tutorial/construcao.png";
imgTutEstatisticas.src = "imagens/tutorial/estatisticas.png";
imgTutMapa.src = "imagens/tutorial/mapa.png";
imgPaginaAnterior.src = "imagens/funcionalidades/setaEsquerdaMenor.png";
imgPaginaAnteriorHover.src = "imagens/funcionalidades/setaEsquerda.png";
imgPaginaPosterior.src = "imagens/funcionalidades/setaDireitaMenor.png";
imgPaginaPosteriorHover.src = "imagens/funcionalidades/setaDireita.png";

//--------------------------------------------------------------------------
// BarraSuperior.js
var imgDinheiro = new Image();
var imgNivel = new Image();
var imgCalendario = new Image();
imgDinheiro.src = "imagens/iconesBarraSuperior/iconeDinheiro.png";
imgNivel.src = "imagens/iconesBarraSuperior/iconeNivel.png";
imgCalendario.src = "imagens/iconesBarraSuperior/iconeCalendario.png";
//--------------------------------------------------------------------------
// Rua.js
var imgRua = new Image();
imgRua.src = "imagens/rua.png";

var imgsCarros = new Array();
for (var i = 0; i < 12; i++)
{
	imgsCarros.push(new Image());
	imgsCarros[i].src = "imagens/carros/carro" + (i + 1) + ".png";
}
//--------------------------------------------------------------------------
// Calendario.js
var imgAnterior = new Image();
var imgPosterior = new Image();
imgAnterior.src = "imagens/menusBotoes/anterior.png";
imgPosterior.src = "imagens/menusBotoes/posterior.png";
//--------------------------------------------------------------------------
// Estatisticas.js
var imgIconeEntrega = new Image();
var imgEntrega = new Image();
imgIconeEntrega.src = "imagens/menusBotoes/iconeEntrega.png";
imgEntrega.src = "imagens/menusBotoes/imagemEntrega.png";
//--------------------------------------------------------------------------
// ItemAVender.js
var imgItemArmazem = new Image();
var imgItemGaragem = new Image();
var imgItemOperacional = new Image();
var imgItemRecursosHumanos = new Image();
var imgItemMarketing = new Image();
var imgItemFinanceiro = new Image();
imgItemArmazem.src = "imagens/iconesItens/armazem.png";
imgItemGaragem.src = "imagens/iconesItens/garagem.png";
imgItemOperacional.src = "imagens/iconesItens/operacional.png";
imgItemRecursosHumanos.src = "imagens/iconesItens/recursosHumanos.png";
imgItemMarketing.src = "imagens/iconesItens/marketing.png";
imgItemFinanceiro.src = "imagens/iconesItens/financeiro.png";

var iconeDica = new Image();
var iconeDicaHover = new Image();
iconeDica.src = "imagens/iconesItens/iconeDica.png";
iconeDicaHover.src = "imagens/iconesItens/iconeDicaHover.png";

var imgBloqueado = new Image();
imgBloqueado.src = "imagens/iconesItens/bloqueado.png";
//--------------------------------------------------------------------------
// Mapa.js
var imgRuas = new Image();
var imgBtnVoltar = new Image();

var imgBanco = new Image();
var imgFabrica = new Image();
var imgComercio = new Image();
var imgFornecedores = new Image();
var imgEmpresa = new Image();

var imgIconeBanco = new Image();
var imgIconeComercio = new Image();
var imgIconeFabrica = new Image();
var imgIconeFornecedores = new Image();

imgRuas.src = "imagens/mapa/ruas.png";
imgBtnVoltar.src = "imagens/mapa/btnVoltar.png";

imgBanco.src = "imagens/mapa/banco.png";
imgComercio.src = "imagens/mapa/comercio.png";
imgFabrica.src = "imagens/mapa/fabrica.png";
imgFornecedores.src = "imagens/mapa/fornecedores.png";
imgEmpresa.src = "imagens/mapa/empresa.png";

imgIconeBanco.src = "imagens/mapa/iconeBanco.png";
imgIconeComercio.src = "imagens/mapa/iconeComercio.png";
imgIconeFabrica.src = "imagens/mapa/iconeFabrica.png";
imgIconeFornecedores.src = "imagens/mapa/iconeFornecedores.png";
//--------------------------------------------------------------------------
// ItensConstruidos.js
var imgArmazem = new Image();
var imgGaragem = new Image();
var imgOperacional = new Image();
var imgRecursosHumanos = new Image();
var imgMarketing = new Image();
var imgFinanceiro = new Image();
imgArmazem.src = "imagens/construcoes/armazem.png";
imgGaragem.src = "imagens/construcoes/garagem.png";
imgOperacional.src = "imagens/construcoes/operacional.png";
imgRecursosHumanos.src = "imagens/construcoes/recursosHumanos.png";
imgMarketing.src = "imagens/construcoes/marketing.png";
imgFinanceiro.src = "imagens/construcoes/financeiro.png";
//--------------------------------------------------------------------------
// Armazem.js
var imgMercadoria = new Image();
var imgFundoArmazem = new Image();
imgMercadoria.src = "imagens/construcoes/mercadorias.png";
imgFundoArmazem.src = "imagens/construcoes/fundoArmazem.png";
//--------------------------------------------------------------------------
// Garagem.js
var imgFundoGaragem = new Image();
var imgDinheiroGaragem = new Image();
var imgCartaoGaragem = new Image();
imgFundoGaragem.src = "imagens/construcoes/fundoGaragem.png";
imgDinheiroGaragem.src = "imagens/construcoes/dinheiroGrg.png";
imgCartaoGaragem.src = "imagens/construcoes/cartaoDeCreditoGrg.png";
//--------------------------------------------------------------------------
// RecursosHumanos.js
var imgContratar = new Image();
var imgContratarHover = new Image();
var imgDemitir = new Image();
var imgDemitirHover = new Image();
imgContratar.src = 'imagens/botoes/btnContratar.png';
imgContratarHover.src = 'imagens/botoes/btnContratarHover.png'
imgDemitir.src = 'imagens/botoes/btnDemitir.png'
imgDemitirHover.src = 'imagens/botoes/btnDemitirHover.png'
//--------------------------------------------------------------------------
// Marketing.js
var imgFundoMarketing = new Image();
imgFundoMarketing.src = "imagens/construcoes/fundoMarketing.png";
//--------------------------------------------------------------------------
// Financeiro.js
var imgFundoFinanceiro = new Image();
var imgFinanceiroDinheiro = new Image();
var imgFinanceiroCartao = new Image();
imgFundoFinanceiro.src = "imagens/construcoes/fundoFinanceiro.jpg";
imgFinanceiroDinheiro.src = "imagens/construcoes/dinheiro.png";
imgFinanceiroCartao.src = "imagens/construcoes/cartaoDeCredito.png";