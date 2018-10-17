function PainelNotificacoes()
{
    this.x = canvas.width + 3;
    this.y = 162;
    this.width = 260;
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

        for (var i = 0; i < notificacoes.length; i++)
            notificacoes[i].desenhar();

        ctx.restore();
    }

    this.abrirFechar = function() 
    {
        this.aberto = !this.aberto;
        
        if (this.aberto)
            abrir();
        else
            fechar();
    }
    function abrir()
    {
        if (este.aberto)
        {
            este.x -= 5;
            if (este.x >= canvas.width - este.width)
                setTimeout(abrir, 10);
            else
            este.x = canvas.width - este.width;
            atualizar();
        }
    }
    function fechar()
    {
        if (!este.aberto)
        {
            este.x += 5;
            if (este.x < canvas.width + 3)
                setTimeout(fechar, 10);
            else
                este.x = canvas.width + 3;
            atualizar();
        }
    }
    this.adicionarNotificacao = function(titulo, mensagem, data)
    {
        notificacoes.push(new Notificacao(notificacoes.length, titulo, mensagem, data));
        btnNotificacoes.atualizarNotificacoes(notificacoes.length);
    }
    function fecharNotificacao(indice)
    {
        notificacoes.splice(indice, 1);
        atualizarIndicesNotificacoes();
    }
    function atualizarIndicesNotificacoes()
    {
        for (var i = 0; i < notificacoes.length; i++)
            notificacoes[i].setIndice(i);
    }

    function Notificacao(indice, titulo, mensagem, data)
    {
        this.titulo = titulo;
        this.mensagem = mensagem;
        this.data = data;

        var esteIndice = indice;
        var xNotificacao = 0;
        var yNotificacao = 80 + esteIndice * 42;

        var estaNotificacao = this;

        this.ativar = function() {
            this.btnFechar.ativarInteracao();
        }
        this.desativar = function() {
            this.btnFechar.desativarInteracao();
        }

        this.setIndice = function(novoIndice)
        {
            var esteIndice = novoIndice;
            var xNotificacao = este.x;
            var yNotificacao = este.y + 80 + esteIndice * 42;
        }
        this.height = 40;
        this.width = este.width;
        this.btnFechar = new BotaoRetangular(this.x + this.width - 50, this.y + 10, 40, 40, 5, 40, 40, "#232323", "#535353", null, null,
                                             "bold 18pt Century Gothic", "red", "x", false, false, false);
        this.btnFechar.onclick = function() {fecharNotificacao(estaNotificacao.indice)};

        this.desenhar = function()
        {
            ctx.save();

            ctx.fillStyle = "silver";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.fillRect(este.x + xNotificacao, este.y + yNotificacao, this.width, this.height);
            ctx.strokeRect(este.x + xNotificacao, este.y + yNotificacao, this.width, this.height);
            this.btnFechar.desenhar();

            ctx.restore();
        }
    }
}