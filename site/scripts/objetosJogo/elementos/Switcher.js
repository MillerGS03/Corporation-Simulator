function Switcher(informacoes)
{
    this.x = informacoes.x?informacoes.x:0;
    this.y = informacoes.y?informacoes.y:0;
    this.width = informacoes.width != null?informacoes.width:84;
    this.height = informacoes.height != null?informacoes.height:26;
    this.side = informacoes.side?informacoes.side:"left";
    this.onswitch = informacoes.onswitch?informacoes.onswitch:function() {};

    /**
     * Deslocamento do círculo do switcher. Vai de 0 (esquerda) a 100 (direita)
     */
    this.deslocamento = informacoes.deslocamento?informacoes.deslocamento:(this.side=="left"?0:100);

    var este = this;

    this.desenhar = function()
    {
        ctx.save();

        this.botao.desenhar();

        ctx.strokeStyle = "black";
        ctx.fillStyle = "#333333";

        roundRect(este.x + este.deslocamento/100 * (este.width - este.height), este.y, este.height, este.height, este.height/2, true, true);

        ctx.restore();
    }

    this.ativarInteracao = function() {
        this.botao.ativarInteracao();
    }
    this.desativarInteracao = function() {
        this.botao.desativarInteracao();
    }

    this.botao = new BotaoRetangular(this.x, this.y, this.width, this.height, this.height/2, this.width, this.height,
                                     "#959595", "#adadad", null, null, "", "", "", false, false, false);
    this.botao.onclick = function() {
        este.side = este.side=="left"?"right":"left";
        var permitirSwitch = este.onswitch(este) == null?true:este.onswitch(este);
        if (permitirSwitch)
            atualizarDeslocamento();
        else
            este.side = este.side=="left"?"right":"left";
    }

    function atualizarDeslocamento()
    {
        var continuar = true;
        if (este.deslocamento > 0 && este.side == "left")
        {
            if (!pausado)
                este.deslocamento -= 5;
        }
        else if (este.deslocamento < 100 && este.side == "right")
        {
            if (!pausado)
                este.deslocamento += 5;
        }
        else
            continuar = false;

        if (continuar)
            setTimeout(atualizarDeslocamento, 16);
    }

}