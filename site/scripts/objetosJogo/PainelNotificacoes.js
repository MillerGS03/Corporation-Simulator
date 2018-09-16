function PainelNotificacoes()
{
    this.x = canvas.width + 3;
    this.y = 162;

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
        if (painelNotificacoes.abrirOuFechar)
        {
            painelNotificacoes.abrirOuFechar = false;
            painelNotificacoes.abrir();
        }
        else if (!painelNotificacoes.abrirOuFechar)
        {
            painelNotificacoes.abrirOuFechar = true;
            painelNotificacoes.fechar();
        }

    }
    this.abrir = function()
    {
        if (!painelNotificacoes.abrirOuFechar)
        {
            painelNotificacoes.x -= 3;
            if (painelNotificacoes.x > canvas.width - 259)
                setTimeout(painelNotificacoes.abrir, 5);
            else
                painelNotificacoes.x = canvas.width - 260;
            atualizar();
        }
    }
    this.fechar = function()
    {
        if (painelNotificacoes.abrirOuFechar)
        {
            painelNotificacoes.x += 3;
            if (painelNotificacoes.x < canvas.width + 3)
                setTimeout(painelNotificacoes.fechar, 5);
            else
                painelNotificacoes.x = canvas.width + 3;
            atualizar();
        }
    }
}