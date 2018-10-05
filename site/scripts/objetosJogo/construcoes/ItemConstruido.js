var imgArmazem = new Image();
var imgGaragem = new Image();
var imgOperacional = new Image();
var imgRecursosHumanos = new Image();
var imgMarketing = new Image();
imgArmazem.src = "../imagens/construcoes/armazem.png";
imgGaragem.src = "../imagens/construcoes/garagem.png";
imgOperacional.src = "../imagens/construcoes/operacional.png";
imgRecursosHumanos.src = "../imagens/construcoes/recursosHumanos.png"

ItemConstruido.armazem = {nome: "Armazém", preco: ItemAVender.armazem.preco, imagem: imgArmazem, width: 100, height: 100};
ItemConstruido.garagem = {nome: "Garagem", preco: ItemAVender.garagem.preco, imagem: imgGaragem, width: 130, height: 130};
ItemConstruido.operacional = {nome: "Operacional", preco: ItemAVender.operacional.preco, imagem: imgOperacional, width: 140, height: 140};
ItemConstruido.recursosHumanos = {nome: "R. Humanos", preco: ItemAVender.recursosHumanos.preco, imagem: imgRecursosHumanos, width: 130, height: 130};
ItemConstruido.marketing = {nome: "Marketing", preco: ItemAVender.marketing.preco, imagem: imgMarketing, width: 100, height: 100};

function ItemConstruido(informacoes) {
    this.x = 0;
    this.y = 0;
    this.width = informacoes.width;
    this.height = informacoes.height;

    var xMenu = this.x;
    var yMenu = this.y;

    var este = this;

    this.nome = informacoes.nome;
    this.imagem = informacoes.imagem;
    this.preco = informacoes.preco;

    this.botao = new BotaoRetangular(this.x, this.y, this.width, this.height, null, this.width, this.height, "Silver", "#cbcbcb",
                                     this.imagem, this.imagem, "bold 14pt Century Gothic", "Black", this.nome, true, false, false);
    this.botao.onclick = function() {abrirMenu(); }

    this.menu = new MenuItemConstruido(xMenu, yMenu, ["Vender", "Upgrade"], this.nome);

    function abrirMenu()
    {
        este.menuVisivel = true; 
        este.menu.x = xMouse; 
        este.menu.y = yMouse;
        $("#meuCanvas").on("click", testarClick);
        este.botao.adicionarTesteHover (
            function()
            {
                var estaDentro = xMouse > este.menu.x && xMouse < este.menu.x + 200 && yMouse > este.menu.y && yMouse < este.menu.y + 300;
                return !estaDentro;
            }
        );
    }
    function fecharMenu()
    {
        este.menuVisivel = false;
        este.botao.removerTestesHover();
        $("#meuCanvas").off("click", testarClick);
    }
    function testarClick()
    {
        var estaDentro = xMouse >= este.menu.x && xMouse < este.menu.x + 200 && yMouse >= este.menu.y && yMouse < este.menu.y + 300;
        if (!estaDentro)
            fecharMenu();
    }
    
    this.menuVisivel = false;

    var testandoPosicionamento = false;
    this.posicaoValida = false;

    var funcaoPosicionamento = null;

    this.desenhar = function()
    {
        ctx.save();
 
        if (testandoPosicionamento)
        {
            if (this.posicaoValida)
                this.botao.backgroundColor = "Green";
            else
                this.botao.backgroundColor = "Red";
        }
        else
            this.botao.backgroundColor = "Silver";
        this.botao.desenhar();

        ctx.restore();
    }
    this.seguirMouse = function(funcPos)
    {
        funcaoPosicionamento = funcPos;

        moverParaMouse();
        $("#meuCanvas").on("mousemove", moverParaMouse);
        $("#meuCanvas").on("click", pararDeSeguirMouse)
        if (funcaoPosicionamento != null)
        {
            $("#meuCanvas").on("mousemove", funcaoPosicionamento);
            testandoPosicionamento = true;
        }
    }
    function pararDeSeguirMouse()
    {
        $("#meuCanvas").off("mousemove", moverParaMouse);
        $("#meuCanvas").off("mousemove", funcaoPosicionamento);
        $("#meuCanvas").off("click", pararDeSeguirMouse);

        if (!este.posicaoValida)
            itensConstruidos.pop();
        else
        {
            botoes.push(este.botao);
            barra.dinheiro -= este.preco;
        }
        testandoPosicionamento = false;
        ativarBotoes();
    }
    function moverParaMouse()
    {
        este.x = xMouse;
        este.y = yMouse;
        este.botao.x = xMouse;
        este.botao.y = yMouse;
    }
}