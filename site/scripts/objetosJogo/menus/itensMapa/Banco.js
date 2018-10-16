function Banco(x, y)
{
    this.x = x;
    this.y = y;
    this.saldo = 0;

    var esteB = this;
    this.jaAbriuConta = false;
    this.jaTemCartaoDeCredito = false;
    this.extrato = new Extrato();
    this.fatura = new FaturaCartaoCredito(5);

    var widthTela = 620;
    var heightTela = 295;
    var xTela = this.x + 400 - widthTela/2;
    var yTela = this.y + 105;

    var xInfoConta = xTela + 30;
    var yInfoConta = yTela + 30;

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
                desenharCartaoCredito();
                break;
        }

        ctx.restore();
    }
    function desenharTelaInicial()
    {
        ctx.save();

        esteB.btnContaCorrente.desenhar();
        esteB.btnCartaoCredito.desenhar();
        if (!esteB.jaAbriuConta)
            desenharRequisitosContaCorrente();
        if (!esteB.jaTemCartaoDeCredito)
            desenharRequisitosCartaoCredito();

        ctx.restore();
    }
    function desenharRequisitosContaCorrente()
    {
        ctx.fillStyle = "black";
        ctx.textAlign = "right";
        ctx.textBaseline = "alphabetic";
        ctx.font = "bold 17pt Century Gothic";
        ctx.fillText("Taxa de abertura: ", esteB.x + 590, esteB.y + 180, 500);
        ctx.fillText("Nível mínimo: ", esteB.x + 590, esteB.y + 220, 500);
        ctx.fillText("Taxa mensal: ", esteB.x + 590, esteB.y + 260, 500);
        ctx.font = "17pt Century Gothic";
        ctx.textAlign = "left";
        ctx.fillText("$100,00", esteB.x + 590, esteB.y + 180, 500);
        ctx.fillText("3", esteB.x + 590, esteB.y + 220, 500);
        ctx.fillText("$40,00 ", esteB.x + 590, esteB.y + 260, 500);
    }
    function desenharRequisitosCartaoCredito()
    {
        ctx.fillStyle = "black";
        ctx.textAlign = "right";
        ctx.textBaseline = "alphabetic";
        ctx.font = "bold 17pt Century Gothic";
        ctx.fillText("Taxa de emissão: ", esteB.x + 590, esteB.y + 380, 500);
        ctx.fillText("Nível mínimo: ", esteB.x + 590, esteB.y + 420, 500);
        ctx.fillText("Anuidade: ", esteB.x + 590, esteB.y + 460, 500);
        ctx.font = "17pt Century Gothic";
        ctx.textAlign = "left";
        ctx.fillText("$50,00", esteB.x + 590, esteB.y + 380, 500);
        ctx.fillText("3", esteB.x + 590, esteB.y + 420, 500);
        ctx.fillText("$380,00 ", esteB.x + 590, esteB.y + 460, 500);
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
    function desenharCartaoCredito()
    {
        esteB.btnTelaInicial.desenhar();
        esteB.btnGerarFaturaMesAtual.desenhar();
        if (esteB.fatura.aberto)
            esteB.fatura.desenhar();
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
            if (barra.nivel < 1)
                alert("Você ainda não atingiu o nível mínimo.");
            else
            {
                fazerCompra("Abertura de conta corrente", 100, true, false, 2, function() {
                    esteB.jaAbriuConta = true;
                    esteB.ativar();
                    esteB.btnContaCorrente.text = "Conta corrente";
                    esteB.btnContaCorrente.x = esteB.x + (800 - esteB.btnContaCorrente.width)/2
                })
            }
        }
        var funcMostrarCCorrente = function() {
            abertoModalidade = 1;
            esteB.ativar();
        }
        esteB.btnContaCorrente = new BotaoRetangular(esteB.x + 95, esteB.y + 190, 270, 50,
                                                    {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                                    270, 50, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                    (esteB.jaAbriuConta)?"Conta corrente":"Abrir conta corrente", false, false, false);
        esteB.btnContaCorrente.onclick = function() {
            if (esteB.jaAbriuConta)
                funcMostrarCCorrente();
            else
                funcCriarCCorrente();
        }

        var funcEmitirCartao = function() {
            if (barra.nivel < 1)
                alert("Você ainda não atingiu o nível mínimo.");
            else
            {
                fazerCompra("Emissão de cartão de crédito", 50, false, true, 1, function() {
                    esteB.jaTemCartaoDeCredito = true;
                    esteB.ativar();
                    esteB.btnCartaoCredito.text = "Cartão de crédito";
                    esteB.btnCartaoCredito.x = esteB.x + (800 - esteB.btnCartaoCredito.width)/2
                })
            }
        }
        var funcMostrarCartao = function() {
            abertoModalidade = 2;
            esteB.ativar();
        }
        esteB.btnCartaoCredito = new BotaoRetangular(esteB.x + 95, esteB.y + 380, 270, 50,
                                                    {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                                    270, 50, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                    (esteB.jaTemCartaoDeCredito)?"Cartão de Crédito":"Emitir cartão de crédito", false, false, false);
        esteB.btnCartaoCredito.onclick = function() {
            if (esteB.jaTemCartaoDeCredito)
                funcMostrarCartao();
            else
                funcEmitirCartao();
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
                                                    "Gerar extrato", false, false, false);
        esteB.btnGerarExtrato.onclick = function() {esteB.extrato.aberto = true; esteB.ativar()};

        esteB.btnGerarFaturaMesAtual = new BotaoRetangular(esteB.x + 275, yTela + 130, 250, 45, 
                                                           {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                                           250, 45, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                           "Fatura do mês atual", false, false, false);
        esteB.btnGerarFaturaMesAtual.onclick = function() {esteB.fatura.gerarFatura(calendario.mes, calendario.ano); esteB.fatura.aberto = true; esteB.ativar()};
    }
    this.ativar = function()
    {
        this.desativar();
        switch (abertoModalidade)
        {
            case 0:
                this.btnContaCorrente.ativarInteracao();
                this.btnCartaoCredito.ativarInteracao();
                break;
            case 1:
                ativarTeclado();
                ativarTelaContaCorrente();
                break;
            case 2:
                ativarCartaoCredito();
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
    function ativarCartaoCredito()
    {
        esteB.btnTelaInicial.ativarInteracao();
        esteB.btnGerarFaturaMesAtual.ativarInteracao();
        if (esteB.fatura.aberto)
            esteB.fatura.ativar();
    }
    function ativarBotoesQuantia()
    {
        for (var i = 0; i < botoesQuantia.length; i++)
            botoesQuantia[i].ativarInteracao();
    }
    this.desativar = function()
    {
        this.btnContaCorrente.desativarInteracao();
        this.btnCartaoCredito.desativarInteracao();
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
        esteB.btnGerarFaturaMesAtual.desativarInteracao();

        esteB.btnGerarExtrato.desativarInteracao();
        esteB.btnFazerSaque.desativarInteracao();
        esteB.btnFazerDeposito.desativarInteracao();
        esteB.btnInfoConta.desativarInteracao();
        esteB.extrato.desativar();
        esteB.fatura.desativar();
        visor.desativar();
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
            ctx.fillText(formatarDinheiro(this.quantia), this.x + 10, this.y + this.height/2, this.width - 20);

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
                    this.quantia += digito;
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
                    alert("Digite uma quantia para " + (abertoContaCorrente == 1)?"sacar":"depositar" + "!");
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

        //"gray", "#a3a33", null, null, "bold 18pt Century Gothic", "white", "X",
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
    function FaturaCartaoCredito(diaFechamento)
    {
        this.width = 880;
        this.height = 650;
        this.x = (canvas.width - this.width)/2;
        this.y = (canvas.height - this.height)/2;

        this.limiteTotal = 10000; // Posteriormente substituir pela renda mensal

        this.getLimiteDisponivel = function(mes, ano)
        {
            var limiteDisp = this.limiteTotal;
            for (var i = 0; i < this.lancamentos.length; i++)
            {
                if ((this.lancamentos[i].mes == mes &&
                     this.lancamentos[i].ano == ano) &&
                     this.lancamentos[i].dia > this.diaFechamento 
                     ||
                    (this.lancamentos[i].mes == Calendario.proximoMes(mes) &&
                     this.lancamentos[i].ano == Calendario.anoProximoMes(mes, ano) &&
                     this.lancamentos[i].dia < this.diaFechamento))
                {
                    limiteDisp -= this.lancamentos[i].valor;
                }
            }
            return limiteDisp;
        }
        this.getLimiteSaqueDisponivel = function(mes, ano)
        {
            var limiteDisp = this.limiteTotal / 4;
            for (var i = 0; i < this.lancamentos.length; i++)
            {
                if  (this.lancamentos[i].nome == "Saque"
                     &&
                    (this.lancamentos[i].mes == mes &&
                     this.lancamentos[i].ano == ano) &&
                     this.lancamentos[i].dia > this.diaFechamento 
                     ||
                    (this.lancamentos[i].mes == Calendario.proximoMes(mes) &&
                     this.lancamentos[i].ano == Calendario.anoProximoMes(mes, ano) &&
                     this.lancamentos[i].dia < this.diaFechamento))
                {
                    limiteDisp -= this.lancamentos[i].valor;
                }
            }
            return limiteDisp;
        }

        /**
         * Checa se todas as parcelas estão dentro do limite disponível do cartão.
         * @param {number} mesInicial 
         * @param {number} anoInicial 
         * @param {number} parcelas 
         * @param {number} valorPorParcela
         * @returns Se estão(true) ou não(false) dentro do limite.
         */
        this.checarLimiteParcelas = function(diaInicial, mesInicial, anoInicial, parcelas, valorPorParcela)
        {
            var mes = diaInicial < this.diaFechamento?mesInicial:Calendario.proximoMes(mes);
            for (var i = 0, ano = anoInicial;
                     i < parcelas;
                     i++, mes = Calendario.proximoMes(mes), ano = Calendario.anoProximoMes(mes, ano))
                if (this.getLimiteDisponivel(mes, ano) < valorPorParcela)
                    return false;
            return true;
        }
        this.diaFechamento = diaFechamento<28?diaFechamento:28;
        this.lancamentos = new Array();
        this.lancamentosDestaFatura = new Array();

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

        var totalFatura = 0;
        var totalFaturaFormatado = "";
        var dataVencimento = "";
        var dataFechamento = "";
        var entrada = 0;
        var entradaFormatada = "";
        var valorParcelasFatura = 0;
        var valorParcelasFaturaFormatado = "";
        var limiteDisponivel = 0;
        var limiteDisponivelFormatado = "";
        var limiteSaqueDisponivel = 0;
        var limiteSaqueDisponivelFormatado = "";
        var mesFatura = 0;
        var anoFatura = 0;

        this.gerarFatura = function(mes, ano) 
        {
            mesFatura = mes;
            anoFatura = ano;

            this.lancamentosDestaFatura = new Array();
            totalFatura = 0;
            for (var i = 0; i < this.lancamentos.length; i++)
            {
                if ((this.lancamentos[i].mes == mes &&
                     this.lancamentos[i].ano == ano) &&
                     this.lancamentos[i].dia > this.diaFechamento 
                     ||
                    (this.lancamentos[i].mes == Calendario.proximoMes(mes) &&
                     this.lancamentos[i].ano == Calendario.anoProximoMes(mes, ano) &&
                     this.lancamentos[i].dia < this.diaFechamento))
                {
                    this.lancamentosDestaFatura.push(this.lancamentos[i]);
                    totalFatura += this.lancamentos[i].valor;
                }
            }
            var diaVencimento = this.diaFechamento + 10;
            var mesVencimento = Calendario.proximoMes(mes);
            var anoVencimento = Calendario.anoProximoMes(mes);
            if (diaVencimento > calendario.qtosDiasTemOMes[mesVencimento - 1])
            {
                anoVencimento = Calendario.anoProximoMes(mesVencimento);
                mesVencimento = Calendario.proximoMes(mesVencimento);
                diaVencimento -= calendario.qtosDiasTemOMes[mesVencimento - 1];
            }
            
            dataFechamento = formatarData(this.diaFechamento, Calendario.proximoMes(mes), Calendario.anoProximoMes(ano));
            dataVencimento = formatarData(diaVencimento, mesVencimento, anoVencimento);
            totalFaturaFormatado = formatarDinheiro(totalFatura);
            var valorComJuros = totalFatura * 1.3;
            entrada = valorComJuros / 7;
            entradaFormatada = formatarDinheiro(entrada);
            valorParcelasFatura = (valorComJuros - entrada) / 12;
            valorParcelasFaturaFormatado = formatarDinheiro(valorParcelasFatura);
            limiteDisponivel = this.getLimiteDisponivel(mes, ano);
            limiteDisponivelFormatado = formatarDinheiro(limiteDisponivel);
            limiteSaqueDisponivel = this.getLimiteSaqueDisponivel(mes, ano);
            limiteSaqueDisponivelFormatado = formatarDinheiro(limiteSaqueDisponivel);
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
            desenharHistoricoLancamentos();
            desenharInformacoesAdicionais(); // Data de vencimento, total da fatura, pagamento mínimo

            ctx.restore();
        }
        function desenharForma()
        {
            ctx.save();

            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            roundRect(_this.x, _this.y, _this.width, _this.height, 15, true, true);
            ctx.fillStyle = "black";
            roundRect(_this.x, _this.y, _this.width, 55, {upperLeft: 15, upperRight: 15}, true, false);

            ctx.fillStyle = "white";
            ctx.font = "bold 18pt Century Gothic";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Fatura do cartão", _this.x + _this.width/2, _this.y + 27, _this.width);

            _this.btnFechar.desenhar();

            ctx.restore();
        }
        function desenharHistoricoLancamentos()
        {
            ctx.save();

            ctx.fillStyle = "#dddddd";
            ctx.strokeStyle = "black";
            roundRect(_this.x, _this.y + 55, 500, _this.height - 55, {lowerLeft: 15}, true, true);

            ctx.fillStyle = "gray";
            ctx.strokeStyle = "black";
            ctx.fillRect(_this.x, _this.y + 55, 500, 28);
            ctx.strokeRect(_this.x, _this.y + 55, 500, 28)

            ctx.fillStyle = "black";
            ctx.font = "bold 13pt Consolas";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText("    Data    Histórico de Lançamentos     Valor    ", _this.x, _this.y + 69);

            for (var i = 0; i < _this.lancamentosDestaFatura.length; i++)
                _this.lancamentosDestaFatura[i].desenhar(_this.x, _this.y + 80 + 28 * i, i % 2, false);

            desenharTotal();

            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.moveTo(_this.x + 500, _this.y + 55);
            ctx.lineTo(_this.x + 500, _this.y + _this.height);
            ctx.stroke();

            ctx.restore();
        }
        function desenharTotal()
        {
            ctx.save();

            ctx.strokeStyle = "black";
            ctx.fillStyle = (_this.lancamentosDestaFatura.length % 2 == 0)?"#c3c3c3":"#a3a3a3";
            ctx.fillRect(_this.x, _this.y + 80 + 28 * _this.lancamentosDestaFatura.length, 500, 28);
            ctx.strokeRect(_this.x, _this.y+ 80 + 28 * _this.lancamentosDestaFatura.length, 500, 28);

            ctx.fillStyle = "black";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.font = "bold 13pt Century Gothic";
            ctx.fillText(" Total", _this.x, _this.y + 94 + 28 * _this.lancamentosDestaFatura.length);
            ctx.textAlign = "right";
            ctx.fillText(totalFaturaFormatado, _this.x + 480, _this.y + 94 + 28 * _this.lancamentosDestaFatura.length)
        
            ctx.restore();
        }
        function desenharInformacoesAdicionais() // Data de vencimento, total da fatura, pagamento mínimo
        {
            desenharInfoPagamento();
            desenharInfoLimites();
        }
        function desenharInfoPagamento()
        {
            ctx.save();
            
            ctx.strokeStyle = "black";
            ctx.fillStyle = "#dddddd";

            // Data de fechamento
            ctx.fillRect(_this.x + 520, _this.y + 85, 150, 35);
            ctx.strokeRect(_this.x + 520, _this.y + 85, 150, 35);
            // Data de vencimento
            ctx.fillRect(_this.x + _this.width - 170, _this.y + 85, 150, 35);
            ctx.strokeRect(_this.x + _this.width - 170, _this.y + 85, 150, 35);
            // Total da fatura
            ctx.fillRect(_this.x + 520, _this.y + 140, 150, 35);
            ctx.strokeRect(_this.x + 520, _this.y + 140, 150, 35);
            // Parcelamento da fatura
            ctx.fillRect(_this.x + _this.width - 170, _this.y + 140, 150, 35);
            ctx.strokeRect(_this.x + _this.width - 170, _this.y + 140, 150, 35);

            ctx.font = "10pt Century Gothic";
            ctx.fillStyle = "black";
            ctx.textBaseline = "bottom";
            ctx.textAlign = "center";
            
            ctx.fillText("Data de fechamento", _this.x + 595, _this.y + 83, 150);
            ctx.fillText("Data de vencimento", _this.x + _this.width - 95, _this.y + 83, 150);
            ctx.fillText("Total da fatura", _this.x + 595, _this.y + 138, 150);
            ctx.fillText("Parcelamento da fatura ", _this.x + _this.width - 95, _this.y + 138, 150);

            ctx.font  = "bold 12pt Century Gothic";
            ctx.textBaseline = "middle";
            ctx.fillText(dataFechamento, _this.x + 595, _this.y + 102, 150);
            ctx.fillText(dataVencimento, _this.x + _this.width - 95, _this.y + 102, 150);
            ctx.fillText(totalFaturaFormatado, _this.x + 595, _this.y + 157, 150);
            ctx.font = "bold 10pt Century Gothic";
            ctx.textBaseline = "top";
            ctx.fillText("Entrada " + entradaFormatada, _this.x + _this.width - 95, _this.y + 142, 150);
            ctx.textBaseline = "bottom";
            ctx.fillText(" + 12x " + valorParcelasFaturaFormatado, _this.x + _this.width - 95, _this.y + 173, 150);

            ctx.restore();
        }
        function desenharInfoLimites()
        {
            ctx.save();

            var xLimites = _this.x + 520;
            var yLimites = _this.y + 240;
            var widthLimites = _this.width - 540;
            var heightLimites = 250;
            
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.fillRect(xLimites, yLimites, widthLimites, heightLimites);
            ctx.strokeRect(xLimites, yLimites, widthLimites, heightLimites);

            ctx.fillStyle = "gray";
            ctx.fillRect(xLimites, yLimites, widthLimites, 35);
            ctx.strokeRect(xLimites, yLimites, widthLimites, 35);

            ctx.fillStyle = "black";
            ctx.font = "bold 16pt Century Gothic";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Resumo de limite de crédito", xLimites + widthLimites/2, yLimites + 17);

            ctx.font = "bold 14pt Century Gothic";
            ctx.textAlign = "left";
            ctx.textAlign = "alphabetic";
            ctx.fillText("Lim. total: ", xLimites + 5, yLimites + 50);
            ctx.fillText("Lim. de saque: ", xLimites + 5, yLimites + 80);
            ctx.fillText("Lim. de saque disponível: ", xLimites + 5, yLimites + 110);
            ctx.fillText("Lim. disponível: ", xLimites + 5, yLimites + 140);
            ctx.font = "14pt Century Gothic";
            ctx.fillText(formatarDinheiro(_this.limiteTotal), xLimites + 100, yLimites + 50);
            ctx.fillText(formatarDinheiro(_this.limiteTotal/4), xLimites + 145, yLimites + 80);
            ctx.fillText(limiteSaqueDisponivelFormatado, xLimites + 190, yLimites + 110);
            ctx.fillText(limiteDisponivelFormatado, xLimites + 155, yLimites + 140);

            ctx.restore();
        }
        this.lancar = function(dia, mes, ano, nome, valorPorParcela, parcelas)
        {
            var novoLancamento = new Lancamento(dia, mes, ano, nome, valorPorParcela, this);
            this.lancamentos.splice(ondeEsta(novoLancamento).onde, 0, novoLancamento);

            var anoFutLanc = ano;
            var mesFutLanc = mes;

            for (var i = 1; i < parcelas; i++)
            {
                var anoFutLanc = Calendario.anoProximoMes(mesFutLanc, anoFutLanc);
                var mesFutLanc = Calendario.proximoMes(mesFutLanc);
                var diaFutLanc = (dia <= calendario.qtosDiasTemOMes[mesFutLanc - 1])?(dia):(calendario.qtosDiasTemOMes[mesFutLanc - 1]);

                this.lancar(diaFutLanc, mesFutLanc, anoFutLanc, nome, valorPorParcela, 1);
            }
        }
        this.removerLancamento = function(dia, mes, ano, nome, valorPorParcela)
        {
            var infoOnde = ondeEsta(new Lancamento(dia, mes, ano, nome, valorPorParcela, this));
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