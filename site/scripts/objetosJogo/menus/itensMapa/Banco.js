function Banco(x, y)
{
    this.x = x;
    this.y = y;
    this.saldo = 0;

    var esteB = this;
    this.jaAbriuConta = false;
    this.extrato = new Extrato();

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
     * 0 -> Tela inicial
     * 1 -> Saque
     * 2 -> Depósito
     * 3 -> Informações da conta
     */
    var aberto = 0;

    this.desenhar = function()
    {
        ctx.save();

        if (this.jaAbriuConta)
        {
            desenharTeclado();
            desenharTela();

            if (aberto > 0)
                esteB.btnTelaInicial.desenhar();

            switch (aberto)
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
        else
            desenharTelaInicial();

        ctx.restore();
    }
    function desenharTelaInicial()
    {
        ctx.save();

        esteB.btnAbrirConta.desenhar();
        ctx.fillStyle = "black";
        ctx.textAlign = "right";
        ctx.textBaseline = "alphabetic";
        ctx.font = "bold 17pt Century Gothic";
        ctx.fillText("Preço: ", esteB.x + 400, esteB.y + 380, 500);
        ctx.fillText("Nível mínimo: ", esteB.x + 400, esteB.y + 430, 500);
        ctx.fillText("Taxa mensal: ", esteB.x + 400, esteB.y + 480, 500);
        ctx.font = "17pt Century Gothic";
        ctx.textAlign = "left";
        ctx.fillText("$250,00", esteB.x + 400, esteB.y + 380, 500);
        ctx.fillText("3", esteB.x + 400, esteB.y + 430, 500);
        ctx.fillText("$40,00 ", esteB.x + 400, esteB.y + 480, 500);

        ctx.restore();
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

        var texto = (aberto == 1)?"sacada.":"depositada.";

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

        var texto = [(aberto == 1)?"sacada.":"depositada.", (aberto == 1)?"sacar.":"depositar."];

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

        var operacao = (aberto == 1)?"Saque":"Depósito";
        var fonteDinheiro = (aberto == 1)?"Saldo":"Dinheiro em caixa";

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.font = "17pt Century Gothic";
        if (sucessoResultado)
        {
            ctx.fillText(operacao + " de", xTela + widthTela / 2, yTela + 70, 600);
            ctx.font = "bold 18pt Century Gothic";
            ctx.fillText("$" + quantiaResultado + ",00", xTela + widthTela / 2, yTela + 100, 600);
            ctx.font = "17pt Century Gothic";
            ctx.fillText("efetuado com sucesso.", xTela + widthTela / 2, yTela + 130, 600);
        }
        else
            ctx.fillText(fonteDinheiro + " insuficiente.", xTela + widthTela / 2, yTela + 100, 600);
        ctx.textAlign = "left";
        ctx.fillText("Seu saldo atual é: $" + esteB.saldo + ",00", xTela + 30, yTela + heightTela - 30, 700);

        ctx.restore();
    }
    function desenharTelaInfoConta()
    {
        ctx.save();

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.font = "16pt Century Gothic";
        ctx.fillText("Saldo: $" + esteB.saldo + ",00", xTela + widthTela/2, yTela + 90, widthTela - 20);

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

        var quantias = ["$50", "$100", "$250", "$500", "$1000", "$2500", "$5000", "Outro"];

        if (numero >= 4)
            xBotao = xTela + widthTela - 10 - widthBotao;

        var botao = new BotaoRetangular(xBotao, yBotao, widthBotao, heightBotao,
                                        {upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5}, 
                                        widthBotao, heightBotao, "gray", "#a3a3a3", null, null,
                                        "16pt Century Gothic", "white", quantias[numero], false, false, false);
        if (quantias[numero] != "Outro")
        {
            var intQuantia = parseInt(quantias[numero].substring(1));
            botao.onclick = function() {(aberto == 1)?sacar(intQuantia):depositar(intQuantia)};
        }
        else
            botao.onclick = function() {telaQuantia = 1; ativarTela()};
        return botao;
    }

    function configurarBotoes()
    {
        for (var i = 0; i <= 15; i++)
            botoesTeclado.push(criarBotaoTeclado(i));
        for (var i = 0; i < 8; i++)
            botoesQuantia.push(criarBotaoQuantia(i));

        esteB.btnAbrirConta = new BotaoRetangular(esteB.x + 275, esteB.y + 270, 250, 50,
                                                  {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                                  250, 50, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                  "Abrir conta corrente", false, false, false);
        esteB.btnAbrirConta.onclick = function() {
            if (!esteB.jaAbriuConta)
            {
                if (barra.nivel < 1)
                    alert("Você ainda não atingiu o nível mínimo.");
                else if (barra.dinheiro < 250)
                    alert("Não há dinheiro suficiente em caixa.");
                else
                {
                    barra.dinheiro -= 250;
                    esteB.jaAbriuConta = true;
                    esteB.ativar();
                }
            }
        }

        esteB.btnTelaInicial = new BotaoRetangular(xTela + 10, yTela + 10, 90, 40, 
                                                  {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                                  90, 40, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                  "Voltar", false, false, false);
        esteB.btnTelaInicial.onclick = function() {
            if ((aberto == 1 || aberto == 2) && telaQuantia == 1)
                telaQuantia = 0;
            else
                aberto = 0;
            ativarTela();
        };

        esteB.btnFazerSaque = new BotaoRetangular(xTela + widthTela / 2 - 150, yTela + 50, 300, 50, 
                                                 {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                                 300, 50, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                 "Fazer saque", false, false, false);
        esteB.btnFazerSaque.onclick = function() {aberto = 1; telaQuantia = 0; ativarTela()};

        esteB.btnFazerDeposito = new BotaoRetangular(xTela + widthTela / 2 - 150, yTela + 110, 300, 50, 
                                                    {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                                    300, 50, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                    "Fazer depósito", false, false, false);
        esteB.btnFazerDeposito.onclick = function() {aberto = 2; telaQuantia = 0; ativarTela()};

        esteB.btnInfoConta = new BotaoRetangular(xTela + widthTela / 2 - 150, yTela + 170, 300, 50, 
                                                {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                                300, 50, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                "Informações da Conta", false, false, false);
        esteB.btnInfoConta.onclick = function() {aberto = 3; ativarTela()};

        esteB.btnGerarExtrato = new BotaoRetangular(xTela + widthTela / 2 - 125, yTela + 130, 250, 45, 
                                                    {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                                    250, 45, "gray", "#a3a3a3", null, null, "16pt Century Gothic", "white",
                                                    "Gerar extrato", false, false, false);
        esteB.btnGerarExtrato.onclick = function() {esteB.extrato.aberto = true; ativarTela()};
    }
    this.ativar = function()
    {
        if (this.jaAbriuConta)
        {
            ativarTeclado();
            ativarTela();
        }
        else
            this.btnAbrirConta.ativarInteracao();
    }
    function ativarTeclado()
    {
        for (var i = 0; i < botoesTeclado.length; i++)
            botoesTeclado[i].ativarInteracao();
    }
    function ativarTela()
    {
        desativarTela();
        if (aberto > 0)
        {
            esteB.btnTelaInicial.ativarInteracao();
            
            if (aberto == 1 || aberto == 2)
            {
                if (telaQuantia == 0)
                    ativarBotoesQuantia();
                else if (telaQuantia == 1)
                    visor.ativar();
            }
            else if (aberto == 3)
            {
                if (esteB.extrato.aberto)
                    esteB.extrato.ativar();
                else
                    esteB.btnGerarExtrato.ativarInteracao();
            }
        }
        else
        {
            esteB.btnFazerSaque.ativarInteracao();
            esteB.btnFazerDeposito.ativarInteracao();
            esteB.btnInfoConta.ativarInteracao();
        }
    }
    function ativarBotoesQuantia()
    {
        for (var i = 0; i < botoesQuantia.length; i++)
            botoesQuantia[i].ativarInteracao();
    }
    this.desativar = function()
    {
        if (this.jaAbriuConta)
        {
            desativarTeclado();
            desativarTela();
        }
        else
            this.btnAbrirConta.desativarInteracao();
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
        desativarBotoesQuantia();
    }
    function desativarBotoesQuantia()
    {
        if ((aberto == 2 || aberto == 3) && telaQuantia == 0)
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
            ctx.fillText("$" + this.quantia + ",00", this.x + 10, this.y + this.height/2, this.width - 20);

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
                    alert("Digite uma quantia para " + (aberto == 1)?"sacar":"depositar" + "!");
                else if (aberto == 1)
                    sacar(parseInt(this.quantia));
                else if (aberto == 2)
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
        this.btnFechar.onclick = function() {_this.aberto = false; ativarTela()};

        this.ativar = function() {
            this.btnFechar.ativarInteracao();
        }
        this.desativar = function() {
            this.btnFechar.desativarInteracao();
        }
        
        this.aberto = false;

        this.desenhar = function()
        {
            ctx.save();

            desenharForma();
            desenharHeader();

            for (var i = 0; i < this.lancamentos.length; i++)
                this.lancamentos[i].desenhar(this.x, this.y + 80 + 28 * i, i%2);

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
            ctx.font = "bold 14pt Consolas";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText("    Data         Lançamento              Valor    ", _this.x, _this.y + 69);

            ctx.restore();
        }
        this.lancar = function(dia, mes, ano, nome, valor)
        {
            var novoLancamento = new Lancamento(dia, mes, ano, nome, valor);
            this.lancamentos.splice(ondeEsta(novoLancamento).onde, 0, novoLancamento);
        }
        this.removerLancamento = function(dia, mes, ano, nome, valor)
        {
            var infoOnde = ondeEsta(new Lancamento(dia, mes, ano, nome, valor));
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
        
        function Lancamento(dia, mes, ano, nome, valor)
        {
            this.dia = dia;
            this.mes = mes;
            this.ano = ano;
            this.nome = nome;
            this.valor = valor;

            this.data = ((this.dia < 10)?"0" + dia:dia) + "/" +
                        ((this.mes < 10)?"0" + mes:mes) + "/" +
                        ((this.ano < 10)?"0" + ano:ano);

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
            this.desenhar = function(x, y, paridade)
            {
                ctx.save();

                ctx.strokeStyle = "black";
                ctx.fillStyle = (paridade == 0)?"#c3c3c3":"#a3a3a3";
                ctx.fillRect(x, y, _this.width, 28);
                ctx.strokeRect(x, y, _this.width, 28);
                
                ctx.fillStyle = "black";
                ctx.textAlign = "left";
                ctx.textBaseline = "middle";
                ctx.font = "13pt Consolas";

                var pad = "                               ";

                ctx.fillText("  " + this.data + pad.substr(0, 11 - this.data.length) +
                                    this.nome + pad.substr(0, 50 - this.nome.length), x, y + 14);

                ctx.fillStyle = (this.valor > 0)?"green":"red";
                ctx.textAlign = "right";
                ctx.fillText(((this.valor > 0)?("+" + this.valor):this.valor) + ",00", x + _this.width - 10, y + 14);

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
}