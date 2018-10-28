MenuItemConstruido.armazem            = {item: "Armazém",
                                        opcoes: ["Conferir estoque", "Reposicionar"],
                                        onclicks: [
                                            function() {},
                                            function() {}
                                        ]}  
MenuItemConstruido.garagem            = {item: "Garagem",
                                        opcoes: ["Conferir estoque", "Gerenciar produção", "Gerenciar finanças", "Gerenciar vendas", "Gerenciar funcionários", "Reposicionar"],
                                        onclicks: [
                                            function() {},
                                            function() {},
                                            function() {},
                                            function() {},
                                            function() {},
                                            function() {}
                                        ]}
MenuItemConstruido.operacional        = {item: "Operacional",
                                        opcoes: ["Gerenciar produção", "Reposicionar"],
                                        onclicks: [
                                            function() {},
                                            function() {}
                                        ]}
MenuItemConstruido.recursosHumanos    = {item: "R. Humanos",
                                        opcoes: ["Gerenciar funcionários", "Reposicionar"],
                                        onclicks: [
                                            function() {},
                                            function() {}
                                        ]}
MenuItemConstruido.marketing          = {item: "Marketing",
                                        opcoes: ["Gerenciar marketing", "Reposicionar"],
                                        onclicks: [
                                            function() {},
                                            function() {}
                                        ]}
MenuItemConstruido.financeiro         = {item: "Financeiro",
                                        opcoes: ["Gerenciar finanças", "Reposicionar"],
                                        onclicks: [
                                            function() {},
                                            function() {}
                                        ]}

function MenuItemConstruido(x, y, informacoes)
{
    this.x = x;
    this.y = y;
    this.width = 220;
    this.height = 40 * (informacoes.opcoes.length + 1) + 1;

    this.item = informacoes.item;
    this.opcoes = informacoes.opcoes;
    this.onclicks = informacoes.onclicks;

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
        ctx.fillText(this.item, this.x + this.width/2, this.y + 5, this.width - 5);

        for (var i = 0; i < this.botoesOpcoes.length; i++)
            this.botoesOpcoes[i].desenhar();

        ctx.restore();
    }
    this.configurarBotoes = function() 
    {
        this.botoesOpcoes = new Array();
        for (var i = 0; i < this.opcoes.length; i++)
        {
            this.botoesOpcoes.push(new BotaoRetangular(this.x + 1, this.y + 40 * (i + 1), this.width - 2, 40, 0, 
                                   this.width - 2, 40, "#a3a3a3", "#c3c3c3", null, null, "15pt Century Gothic", "black",
                                   this.opcoes[i], false, false, false));
            this.botoesOpcoes[i].onclick = this.onclicks[i];
        }
    }
    this.configurarBotoes();
}