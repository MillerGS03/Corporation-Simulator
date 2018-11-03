function TextBox(informacoes)
{

    var este = this;

    var focused = false;
    this.ativo = false;
    this.text = "";
    this.enabled = true;

    this.x = informacoes.x?informacoes.x:0;
    this.y = informacoes.y?informacoes.y:0;
    this.width = informacoes.width?informacoes.width:200;
    this.height = informacoes.height?informacoes.height: 40;
    this.padding = informacoes.padding?informacoes.padding:2;
    this.borderRadius = informacoes.borderRadius?informacoes.borderRadius:9;
    this.font = informacoes.font?informacoes.font:"15pt Century Gothic";
    this.color = informacoes.color?informacoes.color:"black";
    this.backgroundColor = informacoes.backgroundColor?informacoes.backgroundColor:"#dddddd";
    this.maxlength = informacoes.maxlength?informacoes.maxlength:25;
    this.placeholder = informacoes.placeholder?informacoes.placeholder:"";
    this.placeholderColor = informacoes.placeholderColor?informacoes.placeholderColor:"#aaaaaa";
    this.onlynumbers = informacoes.onlynumbers?informacoes.onlynumbers:false;

    this.getFocused = function() {
        return focused;
    }
    this.setFocused = function(focus) {
        focused = focus;
    }

    var botao = new BotaoRetangular(this.x, this.y, this.width, this.height, this.borderRadius, this.width, this.height,
                                    this.backgroundColor, this.backgroundColor, null, null, "", "", "", false, false);
    botao.onclick = function() {
        este.setFocused(true);
    }
    botao.onhoverchanged = function() {
        canvas.style.cursor = botao.hovering && este.enabled?"text":"default";
    }

    this.desenhar = function() {
        ctx.save();

        ctx.fillStyle = this.backgroundColor;
        ctx.strokeStyle = focused && this.enabled?"#4c98a5":"black";
        ctx.lineWidth = focused && this.enabled?3:2;
        roundRect(this.x, this.y, this.width, this.height, this.borderRadius, true, true);

        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = this.font;

        if (this.text.length == 0)
        {
            ctx.fillStyle = this.placeholderColor;
            ctx.fillText(this.placeholder, this.x + this.padding, this.y + this.height/2, this.width - 2 * this.padding);
        }
        else
        {
            ctx.fillStyle = this.color;
            ctx.fillText(this.text, this.x + this.padding, this.y + this.height/2, this.width - 2 * this.padding);
        }

        ctx.restore();
    }

    this.clear = function() {
        this.text = "";
    }

    var funcaoKeydown = function(e) {
        if (focused && este.enabled)
        {
            var keycode = parseInt(e.which);
            
            // delete ou backspace
            if (keycode == 46 || keycode == 8) {
                event.preventDefault(); // evita que redirecione para a última página acessada com o backspace
                este.text = este.text.slice(0,este.text.length-1);
            }

            if (keycode == 32) {
                event.preventDefault(); // evita que a tela desça com o espaço
                if (!este.onlynumbers && este.text.length < este.maxlength && este.text.length > 0)
                    este.text += " ";
            }
        }
    }
    var funcaoKeypress = function(e) {
        if (focused && este.enabled)
        {
            var char = String.fromCharCode(parseInt(e.which));
            if (este.text.length < este.maxlength && (!este.onlynumbers || ((!isNaN(char) || (char == "," && !este.text.includes(","))) && (char != "0" || este.text.length > 0))))
                este.text += char;
        }
    }
    var funcaoClick = function() {
        if (xMouse <= este.x || xMouse >= este.x + este.width || yMouse <= este.y || yMouse >= este.y + este.height)
            este.setFocused(false);
    }

    this.ativarInteracao = function()
    {
        if (!this.ativo)
        {
            this.ativo = true;

            botao.ativarInteracao();

            $(document).keydown(funcaoKeydown);
            $(document).keypress(funcaoKeypress);
            $(document).click(funcaoClick);
        }
    }
    this.desativarInteracao = function()
    {
        if (this.ativo)
        {
            botao.desativarInteracao();

            $(document).off("keydown", funcaoKeydown);
            $(document).off("keypress", funcaoKeypress);
            $(document).off("click", funcaoClick);

            this.ativo = false;
        }
    }
}