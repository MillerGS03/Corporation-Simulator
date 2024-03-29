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
var imgPaginaAnterior = new Image();
var imgPaginaAnteriorHover = new Image();
var imgPaginaPosterior = new Image();
var imgPaginaPosteriorHover = new Image();

var imgTutBarraSuperior = new Image();
var imgTutCalendario = new Image();
var imgTutConstrucoes = new Image();
var imgTutPosicionandoGaragem = new Image();
var imgTutConfirmarPagamento = new Image();
var imgTutGaragemConstruida = new Image();
var imgTutMenuItemGaragem = new Image();
var imgTutGaragemAberta = new Image();
var imgTutEscolhendoNomeProduto = new Image();
var imgTutDesenvolvendoProduto = new Image();
var imgTutProdutoDesenvolvido = new Image();
var imgTutEstoqueVazio = new Image();
var imgTutMapa = new Image();
var imgTutTelaInicialFornecedores = new Image();
var imgTutTelaContratarFornecedores = new Image();
var imgTutTelaFornecedores = new Image();
var imgTutProducao = new Image();
var imgTutDinheiro = new Image();
var imgTutBanco = new Image();
var imgTutExtrato = new Image();
var imgTutInicioEmprestimos = new Image();
var imgTutVendas = new Image();
var imgTutConstrucoesArmazem = new Image();
var imgTutArmazemConstruido = new Image();
var imgTutArmazemAberto = new Image();
var imgTutConstrucoesOperacional = new Image();
var imgTutOperacionalConstruido = new Image();
var imgTutOperacionalAberto = new Image();
var imgTutConstrucoesRH = new Image();
var imgTutRHConstruido = new Image();
var imgTutRHAberto = new Image();
var imgTutInformacoesRH = new Image();

imgPaginaAnterior.src = "imagens/funcionalidades/setaEsquerdaMenor.png";
imgPaginaAnteriorHover.src = "imagens/funcionalidades/setaEsquerda.png";
imgPaginaPosterior.src = "imagens/funcionalidades/setaDireitaMenor.png";
imgPaginaPosteriorHover.src = "imagens/funcionalidades/setaDireita.png";

imgTutBarraSuperior.src = "imagens/tutorial/barraSuperior.png";
imgTutCalendario.src = "imagens/tutorial/calendario.png";
imgTutConstrucoes.src = "imagens/tutorial/construcoes.png";
imgTutPosicionandoGaragem.src = "imagens/tutorial/posicionandoGaragem.png";
imgTutConfirmarPagamento.src = "imagens/tutorial/confirmarPagamento.png";
imgTutGaragemConstruida.src = "imagens/tutorial/garagemConstruida.png";
imgTutMenuItemGaragem.src = "imagens/tutorial/menuItemGaragem.png";
imgTutGaragemAberta.src = "imagens/tutorial/garagemAberta.png";
imgTutEscolhendoNomeProduto.src = "imagens/tutorial/escolhendoNomeProduto.png";
imgTutDesenvolvendoProduto.src = "imagens/tutorial/desenvolvendoProduto.png";
imgTutProdutoDesenvolvido.src = "imagens/tutorial/produtoDesenvolvido.png";
imgTutEstoqueVazio.src = "imagens/tutorial/estoqueVazio.png";
imgTutMapa.src = "imagens/tutorial/mapa.png";
imgTutTelaInicialFornecedores.src = "imagens/tutorial/telaInicialFornecedores.png";
imgTutTelaContratarFornecedores.src = "imagens/tutorial/telaContratacaoFornecedores.png";
imgTutTelaFornecedores.src = "imagens/tutorial/telaFornecedores.png";
imgTutProducao.src = "imagens/tutorial/producao.png";
imgTutDinheiro.src = "imagens/tutorial/gerenciarDinheiro.png";
imgTutBanco.src = "imagens/tutorial/banco.png";
imgTutExtrato.src = "imagens/tutorial/extrato.png";
imgTutInicioEmprestimos.src = "imagens/tutorial/telaEmprestimos.png";
imgTutVendas.src = "imagens/tutorial/vendas.png";
imgTutConstrucoesArmazem.src = "imagens/tutorial/construcoesArmazem.png";
imgTutArmazemConstruido.src = "imagens/tutorial/armazemConstruido.png";
imgTutArmazemAberto.src = "imagens/tutorial/armazemAberto.png";
imgTutConstrucoesOperacional.src = "imagens/tutorial/construcoesOperacional.png";
imgTutOperacionalConstruido.src = "imagens/tutorial/operacionalConstruido.png";
imgTutOperacionalAberto.src = "imagens/tutorial/operacionalAberto.png";
imgTutConstrucoesRH.src = "imagens/tutorial/construcoesRH.png";
imgTutRHConstruido.src = "imagens/tutorial/rhConstruido.png";
imgTutRHAberto.src = "imagens/tutorial/rhAberto.png";
imgTutInformacoesRH.src = "imagens/tutorial/informacoesRH.png";

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
var imgEscritorio = new Image();
var imgGaragem = new Image();
var imgOperacional = new Image();
var imgRecursosHumanos = new Image();
var imgMarketing = new Image();
var imgFinanceiro = new Image();
imgArmazem.src = "imagens/construcoes/armazem.png";
imgEscritorio.src = "imagens/construcoes/escritorio.png";
imgGaragem.src = "imagens/construcoes/garagem.png";
imgOperacional.src = "imagens/construcoes/operacional.png";
imgRecursosHumanos.src = "imagens/construcoes/recursosHumanos.png";
imgMarketing.src = "imagens/construcoes/marketing.png";
imgFinanceiro.src = "imagens/construcoes/financeiro.png";
//--------------------------------------------------------------------------
// Armazem.js
var imgMercadoria = new Image();
var imgFundoArmazem = new Image();
var imgIrParaGaragem = new Image();
var imgIrParaEscritorio = new Image();
imgMercadoria.src = "imagens/construcoes/mercadorias.png";
imgFundoArmazem.src = "imagens/construcoes/fundoArmazem.png";
imgIrParaGaragem.src = "imagens/construcoes/irParaGaragem.png";
imgIrParaEscritorio.src = "imagens/construcoes/irParaEscritorio.png";
//--------------------------------------------------------------------------
// Garagem.js
var imgFundoGaragem = new Image();
var imgFundoEscritorio = new Image();
var imgDinheiroGaragem = new Image();
var imgCartaoGaragem = new Image();
imgFundoGaragem.src = "imagens/construcoes/fundoGaragem.png";
imgFundoEscritorio.src = "imagens/construcoes/fundoEscritorio.png";
imgDinheiroGaragem.src = "imagens/construcoes/dinheiroGrg.png";
imgCartaoGaragem.src = "imagens/construcoes/cartaoDeCreditoGrg.png";
//--------------------------------------------------------------------------
// Operacional.js
var imgFundoOperacional = new Image();
imgFundoOperacional.src = "imagens/construcoes/fundoOperacional.jpg";
//--------------------------------------------------------------------------
// RecursosHumanos.js
var imgContratar = new Image();
var imgContratarHover = new Image();
var imgDemitir = new Image();
var imgDemitirHover = new Image();
var imgFeito = new Image();
var imgNaoFeito = new Image();
imgContratar.src = 'imagens/botoes/btnContratar.png';
imgContratarHover.src = 'imagens/botoes/btnContratarHover.png';
imgDemitir.src = 'imagens/botoes/btnDemitir.png';
imgDemitirHover.src = 'imagens/botoes/btnDemitirHover.png';
imgFeito.src = "imagens/botoes/feito.png";
imgNaoFeito.src = "imagens/botoes/naoFeito.png";
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
//--------------------------------------------------------------------------
// CheckBox.js
var imgChecked = new Image();
var imgUnchecked = new Image();
//imgChecked.src = "imagens/botoes/checked.png";
//imgUnchecked.src = "imagens/botoes/unchecked.png";

//--------------------------------------------------------------------------
// Area da empresa
var imgAreaEmpresa = new Image();
imgAreaEmpresa.src = 'imagens/areaFundo.png'