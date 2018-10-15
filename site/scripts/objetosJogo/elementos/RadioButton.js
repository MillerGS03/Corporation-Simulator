function RadioButton(x, y, nome, corTexto, arrayRadioButtons)
{
    this.x = x;
    this.y = y;
    this.nome = nome;
    this.corTexto = corTexto;
    this.arrayRadioButtons = arrayRadioButtons;
    this.botao = new BotaoCircular(this.x, this.y, 15, 15, "#b2b2b2", "#d4d4d4", null, null, "", "", "", false, false, false);
    this.botao.onclick = function() 
    {
        if (!checked)
        {
            for (var i = 0; i < arrayRadioButtons.length; i++)
                if (arrayRadioButtons[i].getChecked())
                {
                    arrayRadioButtons[i].setChecked(false);
                    break;
                }
            este.setChecked(true);
        }
    }

    this.ativarInteracao = function() {if (!checked) this.botao.ativarInteracao()};
    this.desativarInteracao = function() {this.botao.desativarInteracao()};
    this.onchange = function() {};
    var checked = false;
    var este = this;

    this.setChecked = function(novoChecked) {
        var antigoChecked = checked;
        checked = novoChecked;
        if (antigoChecked != novoChecked)
            this.onchange();
        if (checked)
            this.desativarInteracao();
        else
            this.ativarInteracao();
    }
    this.getChecked = function() {return checked};

    var este = this;

    this.desenhar = function() 
    {
        ctx.save();

        ctx.strokeStyle = (checked)?"#05c8ff":"black";
        ctx.lineWidth = (checked)?3:2;
        this.botao.desenhar();

        if (checked)
        {
            ctx.fillStyle = "black";
            ctx.font = "bold 16pt Century Gothic";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("X", this.x, this.y);
        }
        
        ctx.fillStyle = this.corTexto;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "bold 17pt Century Gothic";
        ctx.fillText(this.nome, this.x + 25, this.y);

        ctx.restore();
    }
}