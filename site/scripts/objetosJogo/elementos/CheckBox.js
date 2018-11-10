function CheckBox()
{
    var este = this;

    this.ativo = false;

    this.checked = informacoes.checked!=null?informacoes.checked:false;
    this.x = informacoes.x?informacoes.x:0;
    this.y = informacoes.y?informacoes.y:0;
    this.width = informacoes.width != null?informacoes.width: 40;
    this.height = informacoes.height != null?informacoes.height: 40;
    this.backgroundColor = informacoes.backgroundColor?informacoes.backgroundColor:"#232323";
    this.backgroundHoverColor = informacoes.backgroundHoverColor?informacoes.backgroundHoverColor:"#434343";
    this.onchange = informacoes.onchange?informacoes.onchange:function() {};

    var botao = new BotaoRetangular(this.x, this.y, this.width, this.height, 2, this.width, this.height, this.backgroundColor,
                                    this.backgroundHoverColor, this.checked?imgChecked:imgUnchecked, this.checked?imgChecked:imgUnchecked, "", "", "",
                                    false, false, true);
    botao.onclick = function() {
        este.checked = !este.checked;
        botao.backgroundImage = este.checked?imgChecked:imgUnchecked;
        botao.backgroundHoverImage = este.checked?imgChecked:imgUnchecked;
    }
    
    this.desenhar = function() {
        botao.desenhar();
    }
    this.ativarInteracao = function() {
        botao.ativarInteracao();
    }
    this.desativarInteracao = function() {
        botao.desativarInteracao();
    }
}