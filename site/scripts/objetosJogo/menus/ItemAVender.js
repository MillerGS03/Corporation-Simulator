var iconeDica = new Image();
var iconeDicaHover = new Image();
iconeDica.src = "../imagens/iconesItens/iconeDica.png";
iconeDicaHover.src = "../imagens/iconesItens/iconeDicaHover.png";

function ItemAVender(x, y, nome, descricao, preco, img, indice) 
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
    this.botaoDica = new BotaoCircular(this.x + 25, this.y + 23, 16, 16, "#aaaaaa", "bababa", iconeDica, iconeDicaHover,
        "", "", "", false, true, false);
    this.botaoDica.onclick = function() {
        descricaoVisivel = !descricaoVisivel;
        if (descricaoVisivel)
        { 
            var bordasCanvas = event.target.getBoundingClientRect();
            xDescricao = event.clientX - bordasCanvas.left;
            yDescricao = event.clientY - bordasCanvas.top;
            canvas.addEventListener("click", fecharDescricaoERemoverEvento);
        }
        fecharDescricoes(indice);
    }
    this.getDescricaoVisivel = function() {
        return descricaoVisivel;
    }
    function fecharDescricoes(indiceExcecao)
    {
        for (var i = 0; i < construcao.itens.length; i++)
            if (i != indiceExcecao)
                construcao.itens[i].fecharDescricao();

    }
    this.fecharDescricao = function() {
        descricaoVisivel = false;
    }
    function fecharDescricaoERemoverEvento()
    {
        descricaoVisivel = false;
        canvas.removeEventListener("click", fecharDescricaoERemoverEvento);
    }
    var descricaoVisivel = false;
    var xDescricao = 0;
    var yDescricao = 0;

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
        this.botaoDica.desenhar();

        ctx.fillStyle = "Black";
        ctx.font = "bold 16pt Century Gothic";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        if (nome.length < 9)
            ctx.fillText(this.nome, this.x + this.width / 2, this.y + 8, this.width - 10);
        else
            ctx.fillText(this.nome, this.x + this.width / 2 + 5 * (nome.length - 8), this.y + 8, this.width - 10);

        ctx.restore();
    }
    this.desenharDescricao = function()
    {
        ctx.save();
            ctx.fillStyle = "#cacaca";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.fillRect(xDescricao, yDescricao, 200, 130);
            ctx.strokeRect(xDescricao, yDescricao, 200, 130);

            ctx.textBaseline = "top";
            ctx.textAlign = "center";
            ctx.font = "bold 14pt Century Gothic";
            ctx.fillStyle = "black";
            ctx.fillText(nome, xDescricao + 100, yDescricao + 5, 200);
            
            if ((typeof(descricao) == typeof([]) && descricao != null) || (typeof(descricao) == typeof("") && descricao != ""))
            {
                ctx.textAlign = "left";
                ctx.font = "bold 12pt Arial";
                ctx.fillStyle = "white";
                if (typeof(descricao) == typeof(""))
                    ctx.fillText(descricao, xDescricao + 5, yDescricao + 35, 195);
                else
                    for (var i = 0; i < descricao.length; i++)
                        ctx.fillText(descricao[i], xDescricao + 5, yDescricao + 35 + 20 * i, 190);
            }
        ctx.restore();
    }
}
class Itens
{
    static armazem = {nome: "Armazém", descricao: ["Utilizado para armazenar", "matéria-prima."] };
}