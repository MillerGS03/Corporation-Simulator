function OptionSelector(informacoes)
{
    var este =this;

    this.x = informacoes.x?informacoes.x:0;
    this.y = informacoes.y?informacoes.y:0;
    this.width = informacoes.width != null?informacoes.width:250;
    this.height = informacoes.height != null?informacoes.height:50;
    this.backgroundColor = informacoes.backgroundColor != null?informacoes.backgroundColor:"#dddddd";
    this.textColor = informacoes.color != null?informacoes.color:"black";
    this.textAlign = informacoes.textAlign != null?informacoes.textAlign:"center";
    this.textBaseline = informacoes.textBaseline != null?informacoes.textBaseline:"middle";
    this.font = informacoes.font != null?informacoes.font:"bold 18pt Century Gothic";
    this.padding = informacoes.padding != null?informacoes.padding:5;
    this.opcoes = informacoes.opcoes != null?informacoes.opcoes:new Array();
    this.onOpcaoMudou = informacoes.onOpcaoMudou != null?informacoes.onOpcaoMudou:function() {};
    this.indiceOpcaoAtual = informacoes.indiceOpcaoAtual != null?informacoes.indiceOpcaoAtual:(this.opcoes.length > 0?0:-1);

    this.adicionarOpcao = function(opcao)
    {
        for (var i = 0; i < this.opcoes.length; i++)
            if (this.opcoes[i] == opcao)
                return;
        this.opcoes.push(opcao);
    }
    this.removerOpcao = function(opcao)
    {
        for (var i = 0; i < this.opcoes.length; i++)
            if (this.opcoes[i] == opcao)
            {
                this.opcoes.splice(i, 1);
                return;
            }
    }

    this.ativarInteracao = function()
    {
        if (this.indiceOpcaoAtual > 0)
        {
            this.btnLeft.ativarInteracao();
            this.btnLeft.backgroundColor = "#c3c3c3";
            this.btnLeft.backgroundHoverColor = "#dedede";
        }
        else
            this.btnLeft.backgroundColor = "#939393";

        if (this.indiceOpcaoAtual < this.opcoes.length - 1)
        {
            this.btnRight.ativarInteracao();
            this.btnRight.backgroundColor = "#c3c3c3";
            this.btnRight.backgroundHoverColor = "#dedede";
        }
        else
            this.btnRight.backgroundColor = "#939393";
    }
    this.desativarInteracao = function()
    {
        this.btnLeft.desativarInteracao();
        this.btnRight.desativarInteracao();
    }

    this.desenhar = function()
    {
        ctx.save();

        ctx.fillStyle = this.backgroundColor;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        if (this.opcoes.length > 0 && this.indiceOpcaoAtual < this.opcoes.length && this.indiceOpcaoAtual >= 0)
        {
            ctx.font = this.font;
            ctx.textAlign = this.textAlign;
            ctx.textBaseline = this.textBaseline;
            ctx.fillStyle = this.textColor;
            var x = this.textAlign == "center"?this.x + this.width/2:(this.textAlign == "left"?this.x + 30 + this.padding:this.x + this.width - 30 - this.padding);
            var y = this.textBaseline == "middle"?this.y + this.height/2:(this.textBaseline == "top"?this.y + this.padding:this.y + this.height - this.padding);
            ctx.fillText(this.opcoes[this.indiceOpcaoAtual], x, y, this.width - 2 * (30 + this.padding));
        }

        this.btnLeft.desenhar();
        this.btnRight.desenhar();

        ctx.restore();
    }

    this.btnLeft = new BotaoRetangular(this.x, this.y, 30, this.height, 0, 30, this.height,
                                       "#c3c3c3", "#dedede", null, null, "bold 18pt Century Gothic", "black", "<");
    this.btnLeft.onclick = function() {
        este.indiceOpcaoAtual--;
        este.desativarInteracao();
        este.ativarInteracao();
    }
    this.btnRight = new BotaoRetangular(this.x + this.width - 30, this.y, 30, this.height, 0, 30, this.height,
                                        "#c3c3c3", "#dedede", null, null, "bold 18pt Century Gothic", "black", ">");
    this.btnRight.onclick = function() {
        este.indiceOpcaoAtual++;
        este.desativarInteracao();
        este.ativarInteracao();
    }
}