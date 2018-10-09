// Ícones dos itens a serem construídos mostrados no menu de construção
var imgItemArmazem = new Image();
var imgItemGaragem = new Image();
var imgItemOperacional = new Image();
var imgItemRecursosHumanos = new Image();
imgItemArmazem.src = "../imagens/iconesItens/armazem.png";
imgItemGaragem.src = "../imagens/iconesItens/garagem.png";
imgItemOperacional.src = "../imagens/iconesItens/operacional.png";
imgItemRecursosHumanos.src = "../imagens/iconesItens/recursosHumanos.png"

var iconeDica = new Image();
var iconeDicaHover = new Image();
iconeDica.src = "../imagens/iconesItens/iconeDica.png";
iconeDicaHover.src = "../imagens/iconesItens/iconeDicaHover.png";

var imgBloqueado = new Image();
imgBloqueado.src = "../imagens/iconesItens/bloqueado.png";

ItemAVender.armazem     = {nome: "Armazém", descricao: ["Utilizado para armazenar", "matéria-prima."],
                            preco: 500, img: imgItemArmazem, nivelMinimo: 1};
ItemAVender.garagem     = {nome: "Garagem", descricao: ["Reza a lenda que grandes", "empresas surgem a partir", "de simples garagens..."],
                           preco: 1500, img: imgItemGaragem, nivelMinimo: 1};
ItemAVender.operacional = {nome: "Operacional", descricao: "Especialize a produção!",
                           preco: 2000, img: imgItemOperacional, nivelMinimo: 2};
ItemAVender.recursosHumanos = {nome: "RH", descricao: ["Recursos Humanos:", "São os responsáveis por", "gerenciar os funcionários." ],
                           preco: 3000, img: imgItemRecursosHumanos, nivelMinimo: 3};
ItemAVender.marketing   = {nome: "Marketing", descricao: ["Promova sua empresa e", "aumente a clientela!"],
                           preco: 3500, img: imgItemRecursosHumanos, nivelMinimo: 4};
ItemAVender.caminho     = {nome: "Caminho", descricao: "Ligue partes da empresa!", preco: 100, img: null, nivelMinimo: 1};

function ItemAVender(x, y, informacoes, indice) 
{
    this.x = x;
    this.y = y;
    this.width = 190;
    this.height = 250;

    this.nome = informacoes.nome;
    this.preco = informacoes.preco;
    this.imagem = informacoes.img;
    this.descricao = informacoes.descricao;
    this.nivelMinimo = informacoes.nivelMinimo;

    var habilitado = false;
    var bloqueado = this.nivelMinimo > 1;

    this.setNivel = function(nivel)
    {
        
        var desbloqueou = bloqueado;
        bloqueado = this.nivelMinimo > nivel;
        desbloqueou = desbloqueou != bloqueado;
        
        if (desbloqueou)
        {
            this.botaoComprar.backgroundColor = "#aaaaaa"
            if (habilitado)
                this.botaoComprar.ativarInteracao();
        }
    }

    this.habilitar = function() 
    {
        habilitado = true;
        this.botaoDica.ativarInteracao();

        if (!bloqueado) 
            this.botaoComprar.ativarInteracao();
    }
    this.desabilitar = function() 
    {
        habilitado = false;
        this.botaoDica.desativarInteracao();

        if (!bloqueado)
            this.botaoComprar.desativarInteracao();
    }

    var corBotaoComprar = "#aaaaaa";
    if (bloqueado)
        corBotaoComprar = "#909090";

    this.botaoComprar = new BotaoRetangular(this.x + 15, this.y + this.height - 40, this.width - 30, 30, 
        {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10}, this.width - 30, 30, corBotaoComprar, "#bababa", null, null, "bold 14pt Century Gothic",
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
            canvas.addEventListener("click", testeClickDescricao);
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
    function testeClickDescricao()
    {
        if (!(xMouse > xDescricao && xMouse < xDescricao + widthDescricao && 
              yMouse > yDescricao && yMouse < yDescricao + heightDescricao))
        {
            descricaoVisivel = false;
            canvas.removeEventListener("click", testeClickDescricao);
        }
    }
    var descricaoVisivel = false;
    var xDescricao = 0;
    var yDescricao = 0;
    var widthDescricao = 200;
    var heightDescricao = 130;

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
        if (this.imagem != null)
            ctx.drawImage(this.imagem, this.x + this.width/2 - this.imagem.width/2, this.y + 120 - this.imagem.height/2);

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        if (bloqueado)
        {
            ctx.globalAlpha = 0.4;
            ctx.fillRect(this.x + 25, this.y + 45, this.width - 50, 150);
            ctx.globalAlpha = 0.9;
            ctx.drawImage(imgBloqueado, this.x + (this.width - imgBloqueado.width)/2, this.y + 120 - imgBloqueado.height/2);
            ctx.globalAlpha = 1;

            ctx.font = "bold 20pt Century Gothic";
            ctx.fillStyle = "#2dd1ed";
            ctx.fillText("Nível mínimo:", this.x + this.width/2, this.y + 60, this.width - 5);
            ctx.strokeText("Nível mínimo:", this.x + this.width/2, this.y + 60, this.width - 5);
            ctx.font = "bold 34pt Century Gothic";
            ctx.fillText(this.nivelMinimo, this.x + this.width/2, this.y + 90, this.width - 5);
            ctx.strokeText(this.nivelMinimo, this.x + this.width/2, this.y + 90, this.width - 5);
            ctx.fillStyle = "black";
        }
        
        this.botaoComprar.desenhar();
        this.botaoDica.desenhar();

        ctx.font = "bold 16pt Century Gothic";
        if (this.nome.length < 9)
            ctx.fillText(this.nome, this.x + this.width / 2, this.y + 8, this.width - 10);
        else
            ctx.fillText(this.nome, this.x + this.width / 2 + 5 * (this.nome.length - 8), this.y + 8, this.width - 10);

        ctx.restore();
    }
    this.desenharDescricao = function()
    {
        ctx.save();
            ctx.fillStyle = "#bababa";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.fillRect(xDescricao, yDescricao, widthDescricao, heightDescricao);
            ctx.strokeRect(xDescricao, yDescricao, widthDescricao, heightDescricao);

            ctx.textBaseline = "top";
            ctx.textAlign = "center";
            ctx.font = "bold 14pt Century Gothic";
            ctx.fillStyle = "black";
            ctx.fillText(this.nome, xDescricao + 100, yDescricao + 5, 200);
            
            if ((typeof(this.descricao) == typeof([]) && this.descricao != null) || (typeof(this.descricao) == typeof("") && this.descricao != ""))
            {
                ctx.textAlign = "left";
                ctx.font = "bold 12pt Arial";
                ctx.fillStyle = "white";
                if (typeof(this.descricao) == typeof(""))
                    ctx.fillText(this.descricao, xDescricao + 5, yDescricao + 35, widthDescricao - 10);
                else
                    for (var i = 0; i < this.descricao.length; i++)
                        ctx.fillText(this.descricao[i], xDescricao + 5, yDescricao + 35 + 20 * i, widthDescricao - 10);
            }
        ctx.restore();
    }
}