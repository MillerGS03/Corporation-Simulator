function MenuItemConstruido(x, y, opcoes)
{
    this.x = x;
    this.y = y;
    this.opcoes = opcoes;

    this.desenhar = function() {
        ctx.save();

        ctx.fillStyle = "gray";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.fillRect(this.x, this.y, 200, 300);
        ctx.strokeRect(this.x, this.y, 200, 300);

        ctx.restore();
    }
}