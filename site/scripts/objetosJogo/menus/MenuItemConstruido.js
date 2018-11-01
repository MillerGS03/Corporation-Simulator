MenuItemConstruido.armazem            = {item: "Armazém",
                                        construtor: Armazem,
                                        opcoes: ["Conferir estoque", "Reposicionar"]}  
MenuItemConstruido.garagem            = {item: "Garagem",
                                        construtor: Garagem,
                                        opcoes: ["Abrir garagem", "Reposicionar"]}
MenuItemConstruido.operacional        = {item: "Operacional",
                                        construtor: Operacional,
                                        opcoes: ["Gerenciar produção", "Reposicionar"]}
MenuItemConstruido.recursosHumanos    = {item: "R. Humanos",
                                        construtor: RecursosHumanos,
                                        opcoes: ["Gerenciar funcionários", "Reposicionar"]}
MenuItemConstruido.marketing          = {item: "Marketing",
                                        construtor: Marketing,
                                        opcoes: ["Gerenciar marketing", "Reposicionar"]}
MenuItemConstruido.financeiro         = {item: "Financeiro",
                                        construtor: Financeiro,
                                        opcoes: ["Gerenciar finanças", "Reposicionar"]}

function MenuItemConstruido(x, y, itemConstruido, informacoes)
{
    this.x = x;
    this.y = y;
    this.width = 220;
    this.height = 40 * (informacoes.opcoes.length + 1) + 1;

    this.itemConstruido = itemConstruido;
    this.nome = informacoes.item;
    this.opcoes = informacoes.opcoes;
    this.onclicks = informacoes.onclicks;

    this.janela = new (informacoes.construtor)();

    var este = this;
    this.aberto = false;

    this.abrirFechar = function()
    {
        this.aberto = !this.aberto;
        if (this.aberto)
            for (var i = 0; i < this.botoesOpcoes.length; i++)
                this.botoesOpcoes[i].ativarInteracao();
        else
            for (var i = 0; i < this.botoesOpcoes.length; i++)
                this.botoesOpcoes[i].desativarInteracao();
    }
    this.ativar = function()
    {
        this.aberto = true;
        for (var i = 0; i < this.botoesOpcoes.length; i++)
            this.botoesOpcoes[i].ativarInteracao();
    }
    this.desativar = function()
    {
        this.aberto = false;
        for (var i = 0; i < this.botoesOpcoes.length; i++)
            this.botoesOpcoes[i].desativarInteracao();
    }

    this.setX = function(xNovo)
    {
        if (xNovo + this.width > canvas.width)
            xNovo = canvas.width - this.width - 1;
        this.x = xNovo;
        for (var i = 0; i < this.botoesOpcoes.length; i++)
            this.botoesOpcoes[i].setX(xNovo + 1);
    }
    this.setY = function(yNovo)
    {
        if (yNovo + this.height > canvas.height)
            yNovo = canvas.height - this.height - 1;
        this.y = yNovo;
        for (var i = 0; i < this.botoesOpcoes.length; i++)
            this.botoesOpcoes[i].setY(yNovo + 40 * (i + 1));
    }
    this.desenhar = function() 
    {
        if (this.janela.aberto)
            this.janela.desenhar();
        else
        {
            ctx.save();

            ctx.fillStyle = "gray";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.strokeRect(this.x, this.y, this.width, this.height);

            ctx.fillStyle = "black";
            ctx.font = "bold 14pt Century Gothic";
            ctx.textBaseline = "top";
            ctx.textAlign = "center";
            ctx.fillText(this.nome, this.x + this.width/2, this.y + 5, this.width - 5);

            for (var i = 0; i < this.botoesOpcoes.length; i++)
                this.botoesOpcoes[i].desenhar();

            ctx.restore();
        }
    }
    this.configurarBotoes = function() 
    {
        this.botoesOpcoes = new Array();
        for (var i = 0; i < this.opcoes.length; i++)
        {
            this.botoesOpcoes.push(new BotaoRetangular(this.x + 1, this.y + 40 * (i + 1), this.width - 2, 40, 0, 
                                   this.width - 2, 40, "#a3a3a3", "#c3c3c3", null, null, "15pt Century Gothic", "black",
                                   this.opcoes[i], false, false, false));
            var onclick;

            if (i == 0)
                onclick = function() {este.desativar(); este.janela.abrirFechar()};
            else if ((i == 1 && this.opcoes.length == 2) || i == 2)
                onclick = function() {
                    var sustentados = este.itemConstruido.sustentaQuem();
                    if (sustentados.length > 0)
                    {
                        if (sustentados.length == 1)
                            alerta("Impossível reposicionar. Este item serve de base para a seguinte construção: " + sustentados[0].nome + ".")
                        else
                        {
                            var sustentadosString = "";
                            for (var j = 0; j < sustentados.length; j++)
                                if (j < sustentados.length - 1)
                                    sustentadosString += sustentados[j].nome + ", ";
                                else
                                    sustentadosString += sustentados[j].nome + ".";
                            alerta("Impossível reposicionar. Este item serve de base para as seguintes construções: " + sustentadosString)
                        }
                    }
                    else
                        este.itemConstruido.seguirMouse(function() {construcao.testarPosicionamento(este.itemConstruido)}, true)
                };
            else
                onclick = function() {/* Upgrade */}

            this.botoesOpcoes[i].onclick = onclick;
        }
    }
    this.configurarBotoes();
}