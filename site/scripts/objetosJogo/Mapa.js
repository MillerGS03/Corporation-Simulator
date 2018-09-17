function Mapa()
{
    this.aberto = false;
    this.desenhar = function() {
        this.width = 700;
        this.height = 500;
        this.x = (canvas.width - this.width)/2;
        this.y = 130
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
            ctx.fillText("Mapa", this.x + this.width/2, this.y + 10, this.width - 5);

            var btnFechar = new BotaoCircular(this.x + this.width - 30, this.y + 30, 20, 20, "#232323", "#535353", null, null);
            btnFechar.desenhar();

            roundRect(this.x, this.y + 60, this.width, this.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);

            ctx.restore();
        }
    }
    this.abrirFechar = function() {
        this.aberto = !this.aberto;
        if (this.aberto)
            desativarBotoes();
        else
            ativarBotoes();
        atualizar();
    }
}