function PainelNotificacoes()
{
    this.x = canvas.width + 3;
    this.y = 162;
    this.width = 355;
    this.height = canvas.height - this.y;

    var este = this;
    var notificacoes = new Array();
    var qtasNotificacoesNovas = 0;

    this.aberto = false;

    this.desenhar = function() 
    {
        ctx.save();

        ctx.fillStyle = "#232323";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        roundRect(this.x, this.y, this.width, this.height, {upperLeft: 15}, true, true);
        ctx.fillStyle = "White";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 24pt Century Gothic";
        ctx.fillText("Notificações", this.x + this.width / 2, this.y + 10, this.width);

        for (var i = 0; i < notificacoes.length && i < 6; i++)
            notificacoes[i].desenhar();

        ctx.restore();
    }

    this.abrirFechar = function() 
    {
        this.aberto = !this.aberto;
        
        if (this.aberto)
        {
            qtasNotificacoesNovas = 0;
            btnNotificacoes.atualizarNotificacoes(0);
            desativarBotoes();
            btnNotificacoes.ativarInteracao();
            abrir();
        }
        else
        {
            ativarBotoes();
            fechar();
        }
    }
    function abrir()
    {
        if (este.aberto)
        {
            if (!pausado)
                este.x -= 10;
            if (este.x >= canvas.width - este.width)
                setTimeout(abrir, 20);
            else
                este.x = canvas.width - este.width;
            for (var i = 0; i < notificacoes.length && i < 6; i++)
            {
                notificacoes[i].ativar();
                notificacoes[i].atualizarPosicao();
            }
        }
    }
    function fechar()
    {
        if (!este.aberto)
        {
            if (!pausado)
                este.x += 10;
            if (este.x < canvas.width + 3)
                setTimeout(fechar, 20);
            else
                este.x = canvas.width + 3;
            for (var i = 0; i < notificacoes.length; i++)
            {
                notificacoes[i].desativar();
                notificacoes[i].atualizarPosicao();
            }
        }
    }
    this.adicionarNotificacao = function(titulo, mensagem, dia, mes, ano)
    {
        notificacoes.splice(0, 0, new Notificacao(notificacoes.length, titulo, mensagem, dia, mes, ano));
        tocarSom("sons/notificacao.ogg");
        atualizarIndicesNotificacoes();
        if (this.aberto)
            for (var i = 0; i < notificacoes.length && i < 6; i++)
                notificacoes[i].ativar();
        else
        {
            qtasNotificacoesNovas++;
            btnNotificacoes.atualizarNotificacoes(qtasNotificacoesNovas);
        }
    }
    function fecharNotificacao(indice)
    {
        notificacoes.splice(indice, 1);
        atualizarIndicesNotificacoes();
    }
    function atualizarIndicesNotificacoes()
    {
        for (var i = 0; i < notificacoes.length; i++)
        {
            notificacoes[i].setIndice(i);
            notificacoes[i].ativar();
        }
    }

    function Notificacao(indice, titulo, mensagem, dia, mes, ano)
    {
        this.titulo = titulo;
        this.mensagem = mensagem;
        this.data = formatarData(dia, mes, ano);
        this.height = 75;
        this.width = este.width;

        var esteIndice = indice;
        var yNotificacao = 80 + esteIndice * (this.height + 1);

        var estaNotificacao = this;

        this.ativar = function() {
            this.btnFechar.ativarInteracao();
        }
        this.desativar = function() {
            this.btnFechar.desativarInteracao();
        }
        this.atualizarPosicao = function() {
            yNotificacao = 80 + esteIndice * (this.height + 1);
            this.btnFechar.x = este.x + 10;
            this.btnFechar.y = este.y + yNotificacao + (this.height - 35)/2;
        }

        this.setIndice = function(novoIndice)
        {
            esteIndice = novoIndice;
            yNotificacao = 80 + esteIndice * (this.height + 1);
            this.atualizarPosicao();
        }
        this.btnFechar = new BotaoRetangular(este.x + 10, este.y + yNotificacao + (this.height - 35)/2, 35, 35, 5, 35, 35, "#232323", "#535353", null, null,
                                             "bold 18pt Century Gothic", "red", "X", false, false, false);
        this.btnFechar.onclick = function() {fecharNotificacao(esteIndice)};

        this.desenhar = function()
        {
            ctx.save();

            ctx.fillStyle = "silver";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.fillRect(este.x, este.y + yNotificacao, this.width, this.height);
            ctx.strokeRect(este.x, este.y + yNotificacao, this.width, this.height);
            
            ctx.fillStyle = "black";
            ctx.font = "bold 16pt Century Gothic";
            ctx.textAlign = "left";
            ctx.textBaseline = "alphabetic";
            ctx.fillText(this.titulo, este.x + 60, este.y + yNotificacao + 28, this.width - 65);
            ctx.font = "12pt Century Gothic";
            ctx.fillText(this.mensagem, este.x + 75, este.y + yNotificacao + 48, this.width - 80);
        
            ctx.textAlign = "right";
            ctx.textBaseline = "bottom";
            ctx.font = "italic 11pt Century Gothic";
            ctx.fillText(this.data, este.x + this.width - 5, este.y + yNotificacao + this.height - 5, this.width - 10);

            this.btnFechar.desenhar();

            ctx.restore();
        }
    }
}