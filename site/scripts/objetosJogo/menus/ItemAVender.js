function ItemAVender(x, y, nome, preco, img) 
{
    this.x = x;
    this.y = y;
    this.nome = nome;
    this.preco = preco;
    this.imagem = img;

    this.width = 180;
    this.height = 250;

    this.desenhar = function() {
        ctx.save();

        ctx.fillStyle = "Silver";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;

        roundRect(this.x, this.y, this.width, this.height, {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10}, true, true);
        ctx.restore();
    }
}