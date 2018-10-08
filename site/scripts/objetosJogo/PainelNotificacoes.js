function PainelNotificacoes()
{
    this.x = canvas.width + 3;
    this.y = 162;
    this.width = 260;
    this.height = canvas.height - this.y;

    var este = this;
    var notificacoes = new Array();

    this.abrirOuFechar = true;

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
            notificacoes[i].desenhar(this.x, this.y + 80 + i * 42);

        ctx.restore();
    }

    this.abrirFechar = function() 
    {
        este.abrirOuFechar = !este.abrirOuFechar;
        
        if (!este.abrirOuFechar)
            este.abrir();
        else if (este.abrirOuFechar)
            este.fechar();
    }
    this.abrir = function()
    {
        if (!este.abrirOuFechar)
        {
            este.x -= 5;
            if (este.x >= canvas.width - este.width)
                setTimeout(este.abrir, 10);
            else
            este.x = canvas.width - este.width;
            atualizar();
        }
    }
    this.fechar = function()
    {
        if (este.abrirOuFechar)
        {
            este.x += 5;
            if (este.x < canvas.width + 3)
                setTimeout(este.fechar, 10);
            else
                este.x = canvas.width + 3;
            atualizar();
        }
    }
    this.adicionarNotificacao = function(titulo, mensagem, data)
    {
        notificacoes.push(new Notificacao(titulo, mensagem, data));
    }

    function Notificacao(titulo, mensagem, data)
    {
        this.titulo = titulo;
        this.mensagem = mensagem;
        this.data = data;

        this.height = 40;
        this.width = este.width;

        this.desenhar = function(x, y)
        {
            ctx.save();

            ctx.fillStyle = "silver";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.fillRect(x, y, this.width, this.height);
            ctx.strokeRect(x, y, this.width, this.height);

            ctx.restore();
        }
    }
}