function Banco(x, y)
{
    this.x = x;
    this.y = y;
    this.saldo = 0;

    var esteB = this;
    this.jaAbriuConta = false;
    this.jaTemCartaoDeCredito = false;
    this.extrato = new Extrato();

    var widthTela = 620;
    var heightTela = 295;
    var xTela = this.x + 400 - widthTela/2;
    var yTela = this.y + 105;

    var xInfoConta = xTela + 30;
    var yInfoConta = yTela + 30;

    var emprestimoAtual;

    function sacar (quantia)
    {
        if (sucessoResultado = quantia <= esteB.saldo)
        {
            esteB.saldo -= quantia;
            barra.dinheiro += quantia;
            esteB.extrato.lancar(calendario.dia, calendario.mes, calendario.ano, "Saque", -quantia);
        }
        telaQuantia = 2;
        quantiaResultado = quantia;
    }
    function depositar (quantia)
    {
        if (sucessoResultado = quantia <= barra.dinheiro)
        {
            barra.dinheiro -= quantia;
            esteB.saldo += quantia;
            esteB.extrato.lancar(calendario.dia, calendario.mes, calendario.ano, "Depósito", quantia);
        }
        telaQuantia = 2;
        quantiaResultado = quantia;
    }

    /**
     * Qual modalidade está aberta
     * 0 -> Nenhuma. Ele está na entrada do banco.
     * 1 -> Conta corrente.
     * 2 -> Cartão de crédito.
     * 3 -> Emprestimos.
     */
    var abertoModalidade = 0;

    /**
     * Qual tela da conta corrente está aberta
     * 0 -> Tela inicial
     * 1 -> Saque
     * 2 -> Depósito
     * 3 -> Informações da conta
     */
    var abertoContaCorrente = 0;

    this.desenhar = function()
    {
        ctx.save();

        switch (abertoModalidade)
        {
            case 0:
                desenharTelaInicial();
                break;
            case 1:
                desenharContaCorrente();
                break;
            case 2:
                //desenharCartaoCredito();
                break;
            case 3:
                desenharEmprestimos();
                break;
        }

        ctx.restore();
    }
    function desenharTelaInicial()
    {
        ctx.save();

        esteB.btnContaCorrente.desenhar();
        //esteB.btnCartaoCredito.desenhar();
        if (!esteB.jaAbriuConta)
            desenharRequisitosContaCorrente();
        else
            esteB.btnEmprestimos.desenhar();
        //if (!esteB.jaTemCartaoDeCredito)
        //    desenharRequisitosCartaoCredito();

        ctx.restore();
    }
    function desenharRequisitosContaCorrente()
    {
        var xRequisitos = esteB.x + 590;
        var yRequisitos = esteB.y + 300;

        ctx.fillStyle = "black";
        ctx.textAlign = "right";
        ctx.textBaseline = "alphabetic";
        ctx.font = "bold 17pt Century Gothic";
        ctx.fillText("Taxa de abertura: ", xRequisitos, yRequisitos, 500);
        ctx.fillText("Nível mínimo: ", xRequisitos,yRequisitos + 40, 500);
        ctx.fillText("Taxa mensal: ", xRequisitos, yRequisitos + 80, 500);
        ctx.font = "17pt Century Gothic";
        ctx.textAlign = "left";
        ctx.fillText("$100,00", xRequisitos, yRequisitos, 500);
        ctx.fillText("3", xRequisitos, yRequisitos + 40, 500);
        ctx.fillText("$40,00 ", xRequisitos, yRequisitos + 80, 500);
    }
    function desenharContaCorrente()
    {
        desenharTeclado();
        desenharTela();

        esteB.btnTelaInicial.desenhar();

        switch (abertoContaCorrente)
        {
            case 0:
                desenharTelaComOperacoes();
                break;
            case 1:
                desenharTelaSaque();
                break;
            case 2:
                desenharTelaDeposito();
                break;
            case 3:
                desenharTelaInfoConta();
                break;
        }
    }
    function desenharTeclado()
    {
        ctx.save();

        ctx.fillStyle = "#a1a1a1";
        ctx.strokeStyle = "black";
        roundRect(xTeclado, yTeclado, widthTeclado, heightTeclado, {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight:10}, true, true);
        for (var i = 0; i < botoesTeclado.length; i++)
            botoesTeclado[i].desenhar();
    
        ctx.restore();
    }
    function desenharTela()
    {
        ctx.save();

        ctx.fillStyle = "#d1d1d1";
        ctx.strokeStyle = "black";
        roundRect(xTela, yTela, widthTela, heightTela, {upperLeft:10, upperRight:10, lowerLeft:10, lowerRight:10}, true, true);
        
        ctx.restore();
    }
    function desenharTelaComOperacoes()
    {
        esteB.btnFazerDeposito.desenhar();
        esteB.btnFazerSaque.desenhar();
        esteB.btnInfoConta.desenhar();
    }

    /**
     * 0 -> Tela com os botões de quantia
     * 1 -> Tela com o visor para digitar a quantia
     * 2 -> Tela mostrando o resultado da operação
     */
    var telaQuantia = 0;
    var quantiaResultado = 0;
    var sucessoResultado = false;

    function desenharTelaSaque()
    {
        ctx.save();

        if (telaQuantia == 0)
            desenharBotoesQuantia();
        else if (telaQuantia == 1)
            desenharTelaVisorQuantia();
        else
            desenharResultadoOperacao();
        
        ctx.restore();
    }
    function desenharTelaDeposito()
    {
        ctx.save();

        if (telaQuantia == 0)
            desenharBotoesQuantia();
        else if (telaQuantia == 1)
            desenharTelaVisorQuantia();
        else
            desenharResultadoOperacao();

        ctx.restore();
    }

    function desenharBotoesQuantia()
    {
        ctx.save();

        for (var i = 0; i < botoesQuantia.length; i++)
            botoesQuantia[i].desenhar();

        var texto = (abertoContaCorrente == 1)?"sacada.":"depositada.";

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "18pt Century Gothic";
        ctx.fillText("Selecione a quantia", xTela + widthTela/2, yTela + 80, widthTela - 100);
        ctx.fillText("a ser " + texto, xTela + widthTela/2, yTela + 105, widthTela - 100);

        ctx.restore();
    }

    var visor = new Visor();
    function desenharTelaVisorQuantia()
    {
        ctx.save();

        var texto = [(abertoContaCorrente == 1)?"sacada.":"depositada.", (abertoContaCorrente == 1)?"sacar.":"depositar."];

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "18pt Century Gothic";
        ctx.fillText("Digite a quantia a ser " + texto[0], xTela + widthTela/2, yTela + 40);
        ctx.textBaseline = "bottom";
        ctx.fillText("Aperte \"entra\" para " + texto[1], xTela + widthTela/2, yTela + heightTela - 40);

        visor.desenhar();

        ctx.restore();
    }
    function desenharResultadoOperacao()
    {
        ctx.save();

        var operacao = (abertoContaCorrente == 1)?"Saque":"Depósito";
        var fonteDinheiro = (abertoContaCorrente == 1)?"Saldo":"Dinheiro em caixa";

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.font = "17pt Century Gothic";
        if (sucessoResultado)
        {
            ctx.fillText(operacao + " de", xTela + widthTela / 2, yTela + 70, 600);
            ctx.font = "bold 18pt Century Gothic";
            ctx.fillText(formatarDinheiro(quantiaResultado), xTela + widthTela / 2, yTela + 100, 600);
            ctx.font = "17pt Century Gothic";
            ctx.fillText("efetuado com sucesso.", xTela + widthTela / 2, yTela + 130, 600);
        }
        else
            ctx.fillText(fonteDinheiro + " insuficiente.", xTela + widthTela / 2, yTela + 100, 600);
        ctx.textAlign = "left";
        ctx.fillText("Seu saldo atual é: " + formatarDinheiro(esteB.saldo), xTela + 30, yTela + heightTela - 30, 700);

        ctx.restore();
    }
    function desenharTelaInfoConta()
    {
        ctx.save();

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.font = "16pt Century Gothic";
        ctx.fillText("Saldo: " + formatarDinheiro(esteB.saldo), xTela + widthTela/2, yTela + 90, widthTela - 20);

        esteB.btnGerarExtrato.desenhar();
        if (esteB.extrato.aberto)
            esteB.extrato.desenhar();
        ctx.restore();
    }
    function desenharEmprestimos()
    {
        ctx.save();

        ctx.fillStyle = "#a1a1a1";
        ctx.strokeStyle = "black";
        var heightEmprestimo = 100 + 54*(emprestimos.length+1);
        roundRect(xTela, yTela, widthTela, heightEmprestimo, {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight:10}, true, true);
        esteB.btnTelaInicial.desenhar();
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        esteB.btnRealizarEmprestimo.y = (yTela + 150) + 54*(emprestimos.length+1);
        esteB.btnPagarEmprestimo.y = (yTela + 150) + 54*(emprestimos.length+1);

        if (emprestimos.length > 0)
        {
            ctx.fillText('Empréstimos', 500, 225)
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            for (var i = 0; i < 4; i++)
            {
                ctx.moveTo((xTela + 50) + i*175, yTela + 75);
                ctx.lineTo((xTela + 50) + i*175, (yTela + 75) + 54*(emprestimos.length+1));
                ctx.stroke();
            }
            ctx.closePath();
            ctx.font = 'bold 18pt Century Gothic';
            ctx.beginPath();
            for (var i = 0; i < emprestimos.length + 2; i++)
            {
                ctx.font = 'bold 18pt Century Gothic';
                var Y = (yTela+75) + i*54;
                ctx.moveTo(xTela + 50,  Y);
                ctx.lineTo(xTela + 575, Y);
                if (i < emprestimos.length)
                {
                    Y = (yTela+75) + ((i+2)*54) - 30;
                    ctx.fillText('Empréstimo ' + (i+1), xTela + 130, Y)
                    ctx.fillText(emprestimos[i].dataCriacao, xTela + 300, Y)
                    ctx.font = 'bold 14pt Century Gothic';
                    ctx.fillText(formatarDinheiro(emprestimos[i].valor), xTela + 475, Y)
                }
                ctx.stroke();
            }
            ctx.font = 'bold 16pt Century Gothic';
            ctx.fillText('Empréstimo', xTela + 137.5, yTela + 102);
            ctx.fillText('Data de criação', xTela + 312.5, yTela + 102);
            ctx.fillText('Devendo', xTela + 487.5, yTela + 102);
            ctx.font = '16pt Century Gothic';
            ctx.textAlign = 'left';
        }
        else
            ctx.fillText('Nenhum empréstimo feito', 500, 275)
        if (emprestimos.length < 5)
            esteB.btnRealizarEmprestimo.desenhar();
        if(emprestimos.length > 0)
        {
            esteB.btnPagarEmprestimo.desenhar();
            esteB.btnRealizarEmprestimo.x = widthTela - 75;
        }
        else
            esteB.btnRealizarEmprestimo.x = canvas.width/2 - 125;

        if (emprestimoAtual != null)
            emprestimoAtual.desenhar();

        ctx.restore();
    }
    function PagamentoEmprestimo(b)
    {
        var aberto = false;
        this.btnPagar = new BotaoRetangular(canvas.width/6 + 100, 500, 200, 50,
            {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
            200, 50, 'green', '#329B24', null, null, 'bold 14pt Century Gothic',
            'white', 'Pagar empréstimo', false, false, false);
        this.btnCancelar = new BotaoRetangular(canvas.width/6 + 350, 500, 200, 50,
              {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
              200, 50, 'darkred', '#AA2918', null, null, 'bold 14pt Century Gothic',
              'white', 'Cancelar', false, false, false);
        var nomesItens = [];
        for (var i = 0; i < emprestimos.length; i++)
            nomesItens[i] = 'Empréstimo ' + (emprestimos[i].indice+1) + ' (' + formatarDinheiro(emprestimos[i].valor) + ')'
        this.itensEmprestimo = new OptionSelector({
            x: canvas.width/2 - 125,
            y: 300,
            width: 250,
            height: 75,
            textAlign: 'left',
            font: 'bold 15pt Century Gothic',
            opcoes: nomesItens,
        })
        var estePE = this;
        this.btnPagar.onclick = function() {Emprestimo.excluirEmprestimo(estePE.itensEmprestimo.indiceOpcaoAtual, estePE, b)}
        this.btnCancelar.onclick = function() {estePE.abrirFechar()}

        this.abrirFechar = function()
        {
            aberto = !aberto;
            if (aberto)
            {
                estePE.btnPagar.ativarInteracao();
                estePE.btnCancelar.ativarInteracao();
                estePE.itensEmprestimo.ativarInteracao();
                b.desativar();
            }
            else
            {
                estePE.btnPagar.desativarInteracao();
                estePE.btnCancelar.desativarInteracao();
                estePE.itensEmprestimo.desativarInteracao();
                b.ativar();
            }
        }
        this.desenhar = function()
        {
            if (aberto)
            {
                ctx.save();
                ctx.fillStyle = 'lightgray';
                ctx.strokeStyle = 'black';
                roundRect((canvas.width)/4, canvas.height/4, canvas.width/2, 400, {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight:10}, true, true);
                ctx.fillStyle = '#333333';
                roundRect((canvas.width)/4, canvas.height/4, canvas.width/2, 60, {upperLeft: 10, upperRight: 10, lowerLeft: 0, lowerRight:0}, true, false);
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.font = 'bold 20pt Century Gothic'
                ctx.fillText('Pagar empréstimo', canvas.width/2, canvas.height/4 + 30)
                estePE.btnPagar.desenhar();
                estePE.btnCancelar.desenhar();
                estePE.itensEmprestimo.desenhar();
                ctx.restore();
            }
        }
    }
    this.btnRealizarEmprestimo = new BotaoRetangular(widthTela - 75, (yTela + 150) + 54*(emprestimos.length+1), 250, 50,
                                                    {upperLeft: 10, upperRight:10, lowerLeft: 10,
                                                    lowerRight: 10}, 250, 50, '#0066FF', '#4B7FFF',
                                                    null, null, 'bold 14pt Century Gothic', 'black',
                                                    'Realizar Empréstimo', false, false, false)
    this.btnRealizarEmprestimo.onclick = function(){
        emprestimoAtual = new Emprestimo(esteB);
        emprestimoAtual.abrirFechar();
    }
    this.btnPagarEmprestimo = new BotaoRetangular(xTela + 25, (yTela + 150) + 54*(emprestimos.length+1), 250, 50,
                                                {upperLeft: 10, upperRight:10, lowerLeft: 10,
                                                lowerRight: 10}, 250, 50, 'gold', '#FFF338',
                                                null, null, 'bold 14pt Century Gothic', 'black',
                                                'Pagar Empréstimo', false, false, false)
    this.btnPagarEmprestimo.onclick = function(){
        emprestimoAtual = new PagamentoEmprestimo(esteB);
        emprestimoAtual.abrirFechar();
    }
    function ativarEmprestimos()
    {
        esteB.btnTelaInicial.ativarInteracao();
        esteB.btnRealizarEmprestimo.ativarInteracao();
        esteB.btnPagarEmprestimo.ativarInteracao();
    }

    var widthTeclado = 250;
    var heightTeclado = 180;
    var xTeclado = esteB.x + 400 - widthTeclado/2;
    var yTeclado = esteB.y + 410;

    var botoesTeclado = new Array();
    var botoesQuantia = new Array();
    
    configurarBotoes();

    function criarBotaoTeclado(numero)
    {
        var xBotao = 0;
        var yBotao = 0;
        var widthBotao = 35;
        var heightBotao = 35;
        var corBotao = "gray";
        var corBotaoHover = "#a3a3a3";
        var texto = "";
        var fonte = "bold 17pt Century Gothic";
        var funcaoClick = null;

        if (numero > 11)
        {
            widthBotao = 80;
            xBotao =  xTeclado + widthTeclado - 20 - widthBotao;
            yBotao = yTeclado + 15 +  (heightBotao + 5) * (numero - 12);
            fonte = "bold 14pt Century Gothic";
            switch (numero)
            {
                case 12:
                    corBotao = "#cc4040";
                    corBotaoHover = "#dd5050";
                    texto = "Cancela";
                    funcaoClick = function() {visor.apertouCancela()};
                    break;
                case 13:
                    corBotao = "#fffb21";
                    corBotaoHover = "#fffd8d";
                    texto = "Corrige";
                    funcaoClick = function() {visor.apertouCorrige()};
                    break;
                case 14:
                    corBotao = "#40cc40";
                    corBotaoHover = "#50dd50";
                    texto = "Entra";
                    funcaoClick = function() {visor.apertouEntra()};
                    break;
            }
        }
        else
        {
            if (numero < 10)
            {
                texto = numero + "";
                funcaoClick = function() {visor.apertouDigito(numero)};
            }
            if (numero != 0)
            {
                if (numero != 11)
                    xBotao = xTeclado + 20 + ((numero - 1) % 3) * (widthBotao + 5);
                else
                    xBotao = xTeclado + 30 + widthBotao * 2;
                yBotao = yTeclado + 15 + Math.ceil(numero / 3 - 1) * (heightBotao + 5);
            }
            else
            {
                xBotao = xTeclado + 25 + widthBotao;
                yBotao = yTeclado + 30 + heightBotao * 3;
            }
        }
        var botao = new BotaoRetangular(xBotao, yBotao, widthBotao, heightBotao,
                                        {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 
                                        widthBotao, heightBotao, corBotao, corBotaoHover, null, null,
                                        fonte, "black", texto, false, false, false);
        if (funcaoClick != null)
            botao.onclick = funcaoClick;
        return botao;
    }
    function criarBotaoQuantia(numero)
    {
        var widthBotao = 90;
        var heightBotao = 40;
        var xBotao = xTela + 10;
        var yBotao = yTela + 80 + (numero % 4) * (heightBotao + 5);

        var quantias = [50, 100, 250, 500, 1000, 2500, 5000, "Outro"];

        if (numero >= 4)
            xBotao = xTela + widthTela - 10 - widthBotao;

        var botao = new BotaoRetangular(xBotao, yBotao, widthBotao, heightBotao,
                                        {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 
                                        widthBotao, heightBotao, "gray", "#a3a3a3", null, null,
                                        "16pt Century Gothic", "white",
                                         typeof(quantias[numero]) == "number"?formatarDinheiro(quantias[numero]):quantias[numero],
                                         false, false, false);
        if (quantias[numero] != "Outro")
        {
            var intQuantia = quantias[numero];
            botao.onclick = function() {(abertoContaCorrente == 1)?sacar(intQuantia):depositar(intQuantia)};
        }
        else
            botao.onclick = function() {telaQuantia = 1; ativarTelaContaCorrente()};
        return botao;
    }

    function configurarBotoes()
    {
        for (var i = 0; i <= 15; i++)
            botoesTeclado.push(criarBotaoTeclado(i));
        for (var i = 0; i < 8; i++)
            botoesQuantia.push(criarBotaoQuantia(i));

        var funcCriarCCorrente = function() {
            if (barra.nivel < 3)
                alerta("Você ainda não atingiu o nível mínimo.");
            else
            {
                fazerCompra("Abertura de conta corrente", 100, true, false, 2, function() {
                    esteB.jaAbriuConta = true;
                    esteB.ativar();
                    esteB.btnContaCorrente.text = "Conta corrente";
                    esteB.btnContaCorrente.x = esteB.x + (800 - esteB.btnContaCorrente.width)/2;
                })
            }
        }
        var funcMostrarCCorrente = function() {
            abertoModalidade = 1;
            esteB.ativar();
        }
        esteB.btnContaCorrente = new BotaoRetangular(esteB.x + 95, esteB.y + 290, 270, 50, 10,
                                                    270, 50, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                    (esteB.jaAbriuConta)?"Conta corrente":"Abrir conta corrente", false, false, false);
        esteB.btnContaCorrente.onclick = function() {
            if (esteB.jaAbriuConta)
                funcMostrarCCorrente();
            else
                funcCriarCCorrente();
        }
        esteB.btnEmprestimos = new BotaoRetangular(esteB.x + 265, esteB.y + 375, 270, 50, 10,
                                                  270, 50, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                  "Visualizar empréstimos", false, false, false);
        esteB.btnEmprestimos.onclick = function(){
            abertoModalidade = 3;
            esteB.ativar();
        }
        esteB.btnTelaInicial = new BotaoRetangular(xTela + 10, yTela + 10, 90, 40, 
                                                  {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                                  90, 40, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                  "Voltar", false, false, false);
        esteB.btnTelaInicial.onclick = function() {
            if (abertoModalidade == 1)
            {
                if (abertoContaCorrente == 0)
                    abertoModalidade = 0;
                else if ((abertoContaCorrente == 1 || abertoContaCorrente == 2) && telaQuantia == 1)
                    telaQuantia = 0;
                else
                    abertoContaCorrente = 0;
            }
            else if (abertoModalidade == 2)
                abertoModalidade = 0;
            else if (abertoModalidade == 3)
                abertoModalidade = 0;
            esteB.ativar();
        };

        esteB.btnFazerSaque = new BotaoRetangular(xTela + widthTela / 2 - 150, yTela + 50, 300, 50, 
                                                 {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                                 300, 50, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                 "Fazer saque", false, false, false);
        esteB.btnFazerSaque.onclick = function() {abertoContaCorrente = 1; telaQuantia = 0; esteB.ativar()};

        esteB.btnFazerDeposito = new BotaoRetangular(xTela + widthTela / 2 - 150, yTela + 110, 300, 50, 
                                                    {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                                    300, 50, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                    "Fazer depósito", false, false, false);
        esteB.btnFazerDeposito.onclick = function() {abertoContaCorrente = 2; telaQuantia = 0; esteB.ativar()};

        esteB.btnInfoConta = new BotaoRetangular(xTela + widthTela / 2 - 150, yTela + 170, 300, 50, 
                                                {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                                300, 50, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                "Informações da Conta", false, false, false);
        esteB.btnInfoConta.onclick = function() {abertoContaCorrente = 3; esteB.ativar()};

        esteB.btnGerarExtrato = new BotaoRetangular(xTela + widthTela / 2 - 125, yTela + 130, 250, 45, 
                                                    {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                                    250, 45, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                    "Gerar extrato", false, false, false, "sons/papel.ogg");
        esteB.btnGerarExtrato.onclick = function() {esteB.extrato.aberto = true; esteB.ativar()};
    }
    this.ativar = function()
    {
        this.desativar();
        switch (abertoModalidade)
        {
            case 0:
                if (this.jaAbriuConta)
                {
                    this.btnContaCorrente.text = "Conta corrente";
                    this.btnContaCorrente.x = esteB.x + (800 - esteB.btnContaCorrente.width)/2;
                    this.btnEmprestimos.ativarInteracao();
                }
                this.btnContaCorrente.ativarInteracao();
                break;
            case 1:
                ativarTeclado();
                ativarTelaContaCorrente();
                break;
            case 2:
                //ativarCartaoCredito();
                break;
            case 3:
                ativarEmprestimos();
                break;
        }
    }
    function ativarTeclado()
    {
        for (var i = 0; i < botoesTeclado.length; i++)
            botoesTeclado[i].ativarInteracao();
    }
    function ativarTelaContaCorrente()
    {
        esteB.btnTelaInicial.ativarInteracao();
        switch (abertoContaCorrente)
        {
            case 0: // Tela inicial
                esteB.btnFazerSaque.ativarInteracao();
                esteB.btnFazerDeposito.ativarInteracao();
                esteB.btnInfoConta.ativarInteracao();
                break;
            case 3: // Informações da conta
                if (esteB.extrato.aberto)
                    esteB.extrato.ativar();
                else
                    esteB.btnGerarExtrato.ativarInteracao();
                break;
            default: // Saque ou depósito
                if (telaQuantia == 0)
                    ativarBotoesQuantia();
                else if (telaQuantia == 1)
                    visor.ativar();
                break;

        }
    }
    function ativarBotoesQuantia()
    {
        for (var i = 0; i < botoesQuantia.length; i++)
            botoesQuantia[i].ativarInteracao();
    }
    this.desativar = function()
    {
        this.btnContaCorrente.desativarInteracao();
       // this.btnCartaoCredito.desativarInteracao();
        desativarTeclado();
        desativarTela();
    }
    function desativarTeclado()
    {
        for (var i = 0; i < botoesTeclado.length; i++)
            botoesTeclado[i].desativarInteracao();
    }
    function desativarTela()
    {
        esteB.btnTelaInicial.desativarInteracao();
        esteB.btnGerarExtrato.desativarInteracao();
        esteB.btnFazerSaque.desativarInteracao();
        esteB.btnFazerDeposito.desativarInteracao();
        esteB.btnInfoConta.desativarInteracao();
        esteB.extrato.desativar();
        visor.desativar();
        esteB.btnRealizarEmprestimo.desativarInteracao();
        esteB.btnPagarEmprestimo.desativarInteracao();
        esteB.btnEmprestimos.desativarInteracao();
        if (emprestimoAtual != null)
            emprestimoAtual.desativar();

        desativarBotoesQuantia();
    }
    function desativarBotoesQuantia()
    {
        if (botoesQuantia[0].ativo)
            for (var i = 0; i < botoesQuantia.length; i++)
                botoesQuantia[i].desativarInteracao();
    }

    function Visor()
    {
        this.width = 250;
        this.height = 50;
        this.x = xTela + (widthTela - this.width)/2;
        this.y = yTela + 120;

        this.quantia = "0";
        var ativo = false;

        this.desenhar = function()
        {
            ctx.save();

            ctx.fillStyle = "gray";
            ctx.strokeStyle = "black";
            roundRect(this.x, this.y, this.width, this.height, {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight:10}, true, true);
            
            ctx.fillStyle = "black";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.font = "bold 18pt Century Gothic";
            ctx.fillText(formatarDinheiro(parseInt(this.quantia)), this.x + 10, this.y + this.height/2, this.width - 20);

            ctx.restore();
        }
        this.ativar = function() {ativo = true; this.quantia = "0"};
        this.desativar = function() {ativo = false; this.quantia = "0"};

        this.apertouDigito = function(digito)
        {
            if (ativo && this.quantia.length < 8)
            {
                if (this.quantia == "0")
                    this.quantia = digito + "";
                else
                    this.quantia += digito + "";
            }
        }
        this.apertouCancela = function()
        {
            if (ativo)
                this.quantia = "0";
        }
        this.apertouCorrige = function()
        {
            if (ativo)
            {
                if (this.quantia.length == 1)
                    this.quantia = "0";
                else
                    this.quantia = this.quantia.substring(0, this.quantia.length - 1);
            }
        }
        this.apertouEntra = function()
        {
            if (ativo)
            {
                if (this.quantia == "0")
                    alerta("Digite uma quantia para " + (abertoContaCorrente == 1)?"sacar":"depositar" + "!");
                else if (abertoContaCorrente == 1)
                    sacar(parseInt(this.quantia));
                else if (abertoContaCorrente == 2)
                    depositar(parseInt(this.quantia))
            }
        }
    }
    function Extrato()
    {
        this.width = 500;
        this.height = 650;
        this.x = (canvas.width - this.width)/2;
        this.y = (canvas.height - this.height)/2;

        this.lancamentos = new Array();
        var _this = this;

        this.btnFechar = new BotaoRetangular(this.x + this.width - 45, this.y + 10, 35, 35,
                                             {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 },
                                             35, 35, "gray", "#a3a3a3", null, null, "bold 18pt Century Gothic",
                                             "white", "X", false, true, false);
        this.btnFechar.onclick = function() {_this.aberto = false; esteB.ativar()};

        this.ativar = function() {
            BotaoRetangular.desativarTodos([this.btnFechar]);
            this.btnFechar.ativarInteracao();
        }
        this.desativar = function() {
            BotaoRetangular.reativar();
            this.btnFechar.desativarInteracao();
        }
        
        this.aberto = false;

        this.desenhar = function()
        {
            ctx.save();

            ctx.globalAlpha = 0.3;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;

            desenharForma();
            desenharHeader();

            for (var i = 0; i < this.lancamentos.length; i++)
                this.lancamentos[i].desenhar(this.x, this.y + 80 + 28 * i, i%2, true);

            ctx.restore();
        }
        function desenharForma()
        {
            ctx.save();

            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            roundRect(_this.x, _this.y, _this.width, _this.height, {upperLeft: 15, upperRight: 15, lowerLeft: 15, lowerRight : 15}, true, true);
            ctx.fillStyle = "black";
            roundRect(_this.x, _this.y, _this.width, 55, {upperLeft: 15, upperRight: 15}, true, false);

            ctx.fillStyle = "white";
            ctx.font = "bold 18pt Century Gothic";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Extrato Bancário", _this.x + _this.width/2, _this.y + 27, _this.width);

            _this.btnFechar.desenhar();

            ctx.restore();
        }
        function desenharHeader()
        {
            ctx.save();

            ctx.fillStyle = "gray";
            ctx.strokeStyle = "black";
            ctx.fillRect(_this.x, _this.y + 55, _this.width, 28);
            ctx.strokeRect(_this.x, _this.y + 55, _this.width, 28)

            ctx.fillStyle = "black";
            ctx.font = "bold 13pt Consolas";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText("    Data         Lançamento              Valor    ", _this.x, _this.y + 69);

            ctx.restore();
        }
        this.lancar = function(dia, mes, ano, nome, valor)
        {
            var novoLancamento = new Lancamento(dia, mes, ano, nome, valor, this);
            this.lancamentos.splice(ondeEsta(novoLancamento).onde, 0, novoLancamento);
        }
        this.removerLancamento = function(dia, mes, ano, nome, valor)
        {
            var infoOnde = ondeEsta(new Lancamento(dia, mes, ano, nome, valor, this));
            if (infoOnde.existe)
                this.lancamentos.splice(infoOnde.onde, 1);
        }
        function ondeEsta(novoLancamento)
        {
            var inicio = 0;
            var fim = _this.lancamentos.length -1;
            var meio;
            while (inicio <= fim)
            {
                meio = Math.floor((inicio + fim) / 2);
                if (_this.lancamentos[meio].compareTo(novoLancamento) > 0)
                    fim = meio - 1;
                else if (_this.lancamentos[meio].compareTo(novoLancamento) < 0)
                    inicio = meio + 1;
                else
                    return {existe: true, onde: meio};
            }
            return {existe: false, onde: inicio};
        }
    }
    
    function Lancamento(dia, mes, ano, nome, valor, origem)
        {
            this.dia = dia;
            this.mes = mes;
            this.ano = ano;
            this.nome = nome;
            this.valor = valor;

            this.data = formatarData(this.dia, this.mes, this.ano);

            var esteLancamento = this;

            this.compareTo = function(outroLancamento)
            {
                if (this.ano != outroLancamento.ano)
                    return this.ano - outroLancamento.ano;
                if (this.mes != outroLancamento.mes)
                    return this.mes - outroLancamento.mes;
                if (this.dia != outroLancamento.dia)
                    return this.dia - outroLancamento.dia;
                if (this.valor != outroLancamento.valor);
                    return this.valor - outroLancamento.valor;
                return this.nome.localeCompare(outroLancamento.nome);
            }
            this.desenhar = function(x, y, paridade, colorido)
            {
                ctx.save();

                ctx.strokeStyle = "black";
                ctx.fillStyle = (paridade == 0)?"#c3c3c3":"#a3a3a3";
                ctx.fillRect(x, y, 500, 28);
                ctx.strokeRect(x, y, 500, 28);
                
                ctx.fillStyle = "black";
                ctx.textAlign = "left";
                ctx.textBaseline = "middle";
                ctx.font = "12pt Consolas";

                var pad = "                               ";

                ctx.fillText("  " + this.data + pad.substr(0, 12 - this.data.length) +
                                    this.nome + pad.substr(0, 50 - this.nome.length), x, y + 14);

                if (colorido)
                    ctx.fillStyle = (this.valor > 0)?"green":"red";
                else
                    ctx.fillStyle = "black";
                ctx.textAlign = "right";
                var valor = formatarDinheiro(this.valor);
                if (this.valor > 0 && colorido)
                    valor = "$+" + valor.substring(1);
                ctx.fillText(valor, x + 490, y + 14);

                ctx.beginPath();
                ctx.moveTo(x + 115, y);
                ctx.lineTo(x + 115, y + 28);
                ctx.stroke();
                ctx.closePath();

                ctx.beginPath();
                ctx.moveTo(x + 390, y);
                ctx.lineTo(x + 390, y + 28);
                ctx.stroke();
                ctx.closePath();

                ctx.restore();
            }
        }
}