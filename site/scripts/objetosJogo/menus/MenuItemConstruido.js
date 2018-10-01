function MenuItemConstruido(x, y, opcoes, item)
{
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 300;

    this.opcoes = opcoes;

    this.desenhar = function() {
        ctx.save();

        ctx.fillStyle = "gray";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = "white";
        ctx.font = "bold 14pt Century Gothic";
        ctx.textBaseline = "top";
        ctx.textAlign = "center";
        ctx.fillText(item, this.x + this.width/2, this.y + 5, this.width - 5);

        if (typeof(opcoes) == typeof(new Array()))
        {
            for (var i = 0; i < opcoes.length; i++)
            {
                ctx.fillStyle = "silver";
                ctx.fillRect(this.x, this.y + 30 + i * 30, this.width, 25);
            }
        }

        ctx.restore();
    }
}