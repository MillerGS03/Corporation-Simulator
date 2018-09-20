function ItemAVender(x, y, nome, descricao, preco, img) 
{
    this.x = x;
    this.y = y;
    this.nome = nome;
    this.preco = preco;
    this.imagem = img;

    this.width = 190;
    this.height = 250;

    this.botaoComprar = new BotaoRetangular(this.x + 15, this.y + this.height - 40, this.width - 30, 30, 
        {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10}, this.width - 30, 30, "#aaaaaa", "#bababa", null, null, "bold 14pt Century Gothic",
        "green", "$" + this.preco, false, true, false);

    this.desenhar = function() {
        ctx.save();

        ctx.fillStyle = "Gray";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        roundRect(this.x, this.y, this.width, this.height, {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10}, true, true);
        
        ctx.fillStyle = "White";
        ctx.lineWidth = 1;
        ctx.fillRect(this.x + 25, this.y + 45, this.width - 50, 150);
        ctx.strokeRect(this.x + 25, this.y + 45, this.width - 50, 150)
        ctx.drawImage(this.imagem, this.x + this.width/2 - this.imagem.width/2, this.y + 120 - this.imagem.height/2);

        this.botaoComprar.desenhar();

        ctx.fillStyle = "Black";
        ctx.font = "bold 18pt Century Gothic";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(this.nome, this.x + this.width / 2, this.y + 3, this.width - 10);

        ctx.restore();
    }
}