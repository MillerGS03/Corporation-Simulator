function PainelNotificacoes()
{
    this.x = canvas.width + 3;
    this.y = 162;

    var este = this;

    this.abrirOuFechar = true;

    this.desenhar = function() {
        ctx.save();
        ctx.fillStyle = "#232323";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        roundRect(this.x, this.y, 260, canvas.height - this.y, {upperLeft: 15}, true, true);
        ctx.fillStyle = "White";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 24pt Century Gothic";
        ctx.fillText("Notificações", this.x + 130, this.y + 10, 260);
        ctx.restore();
    }
    this.abrirFechar = function() {
        if (este.abrirOuFechar)
        {
            este.abrirOuFechar = false;
            este.abrir();
        }
        else if (!este.abrirOuFechar)
        {
            este.abrirOuFechar = true;
            este.fechar();
        }

    }
    this.abrir = function()
    {
        if (!este.abrirOuFechar)
        {
            este.x -= 5;
            if (este.x > canvas.width - 259)
                setTimeout(este.abrir, 10);
            else
            este.x = canvas.width - 260;
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
}