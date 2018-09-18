function Estatisticas()
{
    this.width = 700;
    this.height = 500;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;

    this.aberto = false;
    this.btnFechar = new BotaoRetangular(this.x + this.width - 50, this.y + 10, 40, 40,
                             { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 40, 40,
        "#232323", "#535353", null, null, "bold 18pt Century Gothic", "red", "X", false, true, false);
    this.btnFechar.onclick = function(e) {
        estatisticas.abrirFechar();
    }

    this.desenhar = function() {

        if (this.aberto)
        {
            ctx.save();
            ctx.fillStyle = "#333333";
            ctx.globalAlpha = 0.3;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            roundRect(this.x, this.y, this.width, this.height, { upperLeft: 20, upperRight: 20, lowerLeft: 20, lowerRight: 20 }, true, true)
           
            ctx.fillStyle = "White";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.font = "bold 24pt Century Gothic";
            ctx.fillText("Estatísticas", this.x + this.width/2, this.y + 10, this.width - 5);

            estatisticas.btnFechar.desenhar();

            roundRect(this.x, this.y + 60, this.width, this.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);

            ctx.restore();
        }
    }
    this.abrirFechar = function() {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            desativarBotoes();
            this.btnFechar.ativarInteracao();
            botoes.push(this.btnFechar);
        }
        else
        {
            this.btnFechar.desativarInteracao();
            this.btnFechar.hovering = false;
            botoes.pop();
            ativarBotoes();
        }
        atualizar();
    }
}