function Estatisticas()
{
    var datas = new Array();
    iniciarDatas();
    var valores = new Array();
    var valoresTotais = new Array();
    var posicoes = new Array();
    var atual = 0;
    var atualTudo = 0;
    var tudo = false;
    var vezes = 0;
    var x;
    var y;
    var escalaAtual = 0;
    var escalaTudo = 0;
    passouDia = true;
    this.width = 700;
    this.height = 500;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;
    var este = this;

    this.aberto = false;
    this.btnFechar = new BotaoRetangular(this.x + this.width - 50, this.y + 10, 40, 40,
                             { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 40, 40,
        "#232323", "#535353", null, null, "bold 18pt Century Gothic", "red", "X", false, false, false);

    this.btnProx = new BotaoCircular(este.x + este.width - 200, este.y + 100, 30, 30, "white", "#f2f2f2", imgProx, imgProx, "18pt Century Gothic", "white", "", false, false, true);
    this.btnAnterior = new BotaoCircular(este.x + 200, este.y + 100, 30, 30, "white", "#f2f2f2", imgAnt, imgAnt, "18pt Century Gothic", "white", "", false, false, true);
    this.btnFechar.onclick = function(e) {
        este.abrirFechar();
    }
    this.btnProx.onclick = function(e){
        tudo = true;
    }
    this.btnAnterior.onclick = function(e){
        tudo = false;
    }

    this.desenhar = function() {

        if (this.aberto)
        {
            ctx.save();
            x = este.x + 45;
            y = este.y + 450;
            desenharJanela();
            thisAtivarBotoes();
            escalaAtual = calcularEscala();
            escalaTudo = calcularEscalaTudo();
            desenharEixos();
            ctx.strokeStyle = "#4286f4";
            if (tudo)
                desenharLinhaGraficoTudo();
            else
                desenharLinhaGrafico();
            ctx.restore();
        }
    }
    this.abrirFechar = function() {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            desativarBotoes();
            this.btnFechar.ativarInteracao();
            this.btnProx.ativarInteracao();
            this.btnAnterior.desativarInteracao();
        }
        else
        {
            this.btnFechar.desativarInteracao();
            this.btnFechar.hovering = false;
            this.btnProx.desativarInteracao();
            this.btnProx.hovering = false;
            this.btnAnterior.desativarInteracao();
            this.btnAnterior.hovering = false;
            ativarBotoes();
        }
        atualizar();
    }
    function desenharJanela()
    {
        ctx.fillStyle = "#333333";
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        roundRect(este.x, este.y, este.width, este.height, { upperLeft: 20, upperRight: 20, lowerLeft: 20, lowerRight: 20 }, true, true);
       
        ctx.fillStyle = "White";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 24pt Century Gothic";
        ctx.fillText("Estatísticas", este.x + este.width/2, este.y + 10, este.width - 5);
    
        este.btnFechar.desenhar();
        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);

        ctx.fillStyle = "Black";
        ctx.font = "bold 18pt Century Gothic";
        var situacao = "";
        if (!tudo){
            situacao = "Últimos 15 dias"
            este.btnProx.desenhar();
        }
        else{
            situacao = "Todo o período";
            este.btnAnterior.desenhar();
        }
        ctx.fillText(situacao, este.x + este.width/2, este.y + 65, este.width - 5);
    }
    function desenharEixos()
    {
        ctx.save();
        desenharLinhas();
        ctx.fillStyle = "Black";
        var e = (tudo?escalaTudo:escalaAtual);
        desenharEixoY(e);
        desenharEixoX(e);
        desenharSetas();
        ctx.closePath();
        ctx.restore();
    }
    function thisAtivarBotoes()
    {
        if (tudo){
            este.btnAnterior.ativarInteracao();
            este.btnProx.desativarInteracao();
        }
        else {
            este.btnProx.ativarInteracao();
            este.btnAnterior.desativarInteracao();
        }
    }
    function desenharSetas()
    {
        ctx.beginPath();
        ctx.strokeStyle = "Black";
        ctx.moveTo(x + 620, y);
        ctx.lineTo(x + 620, y - 7.5);
        ctx.lineTo(x + 635, y);
        ctx.lineTo(x + 620, y + 7.5);
        ctx.lineTo(x + 620, y);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.strokeStyle = "Black";
        ctx.moveTo(x, y - 350);
        ctx.lineTo(x - 7.5, y - 350);
        ctx.lineTo(x, y - 365);
        ctx.lineTo(x + 7.5, y - 350);
        ctx.lineTo(x, y - 350);
        ctx.stroke();
        ctx.closePath();
    }
    function desenharLinhas()
    {
        ctx.beginPath();
        ctx.lineTo(x, y);
        ctx.moveTo(x - 30, y);
        ctx.lineTo(x + 620, y);
        ctx.moveTo(x, y - 350);
        ctx.lineTo(x, y + 30);
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.closePath();
    }
    function desenharEixoY(e)
    {
        for (var i = 1; i <= 10; i++) {
            ctx.textAlign = "right";
            ctx.font = "bold 12pt Century Gothic";
            ctx.fillText(i + "", x - 3, y - (34 * i), 3000);
        }
        ctx.textAlign = "left";
        strEscala = defineStringEscala(e);
        ctx.fillText("$ ("+ strEscala +")", x - 40, y - 385);
    }
    function desenharEixoX(e)
    {
        ctx.font = "bold 10pt Century Gothic";
        var xAtual;
        var yAtual;
        var atual;
        var aux = x;
        ctx.beginPath();
        if (!tudo){
            for (var i = 0; i < 15; i++) {
                aux += (i!=0?40:15);
                posicoes[i] = aux + 20;
                ctx.fillText(datas[i], aux, y + 5);
            }
        }
    }
    function calcularEscala()
    {
        var aux = "";
        for (var i = 0; i < valores.length; i++) {
            if (aux < valores[i])
                aux = valores[i] + "";
        }
        return aux.length - 1;
    }
    function calcularEscalaTudo()
    {
        var aux = "";
        for (var i = 0; i < valoresTotais.length; i++)
            if (aux < valoresTotais[i])
                aux = valoresTotais[i] + "";
        return aux.length - 1;
    }
    function defineStringEscala(e)
    {
        var strE = "";
        if (e == 1)
            strE = "dezenas";
        else if (e == 2)
            strE = "centenas";
        else if (e == 3)
            strE = "milhares";
        else if (e == 4)
            strE = "dezenas de milhares";
        else if (e == 5)
            strE = "centenas de milhares";
        else if (e == 6)
            strE = "milhões";
        else if (e == 7)
            strE = "dezenas de milhões";
        else if (e == 8)
            strE = "centenas de milhões";
        else if (e == 9)
            strE = "bilhões";
        else if (e == 10)
            strE = "dezenas de bilhões";
        else if (e == 11)
            strE = "centenas de bilhões";
        else if (e == 12)
            strE = "trilhões";
        else
            strE = "dezenas de trilhões"
        return strE;
    }
    function iniciarDatas()
    {
        var dia = calendario.dia;
        var mes = calendario.mes;
        for (var i = 0; i < 15; i++){
            dia++;
            datas[i] = formatarData(dia, mes, null);
            if (dia == calendario.qtosDiasTemOMes[calendario.mes - 1]){
                dia = 1;
                mes++;
            }
        }
    }
    this.adicionarValor = function (v) {
        if (!isNaN(v)) {
            if (atual >= 15) {
                for (var i = 0; i < 15; i++)
                    valores[i] = valores[i+1];
                valores[atual] = v;
            }
            else {
                valores[atual++] = v;
            }
            valoresTotais[atualTudo++] = v;
            if (vezes == 15){
                for(var i = 0; i < 14; i++){
                    datas[i] = datas[i+1];
                }
                datas[14] = formatarData(calendario.dia, calendario.mes, null);
            }
            else
                vezes++;
            passouDia = true;
        }
    }
    function desenharLinhaGrafico()
    {
        ctx.save();
        ctx.beginPath();
        var Y = 0;
        var valorAtual = 0;
        for (var i = 0; i < valores.length; i++)
        {
            if (valores[i] != null)
            {
                valorAtual = valores[i]/Math.pow(10, escalaAtual);
                Y = y-(31.5 * valorAtual);
                if (i == 0)
                    ctx.moveTo(x, Y);
                ctx.lineTo(posicoes[i], Y);
                ctx.stroke();
            }
        }
        ctx.closePath();
        ctx.restore();
        passouDia = false;
    }
    function desenharLinhaGraficoTudo()
    {
        ctx.save();
        ctx.beginPath();
        var X = x;
        var Y = 0;
        var valorAtual = 0;
        for(var i = 0; i < valoresTotais.length; i++)
        {
            X += (i!=0?(620/valoresTotais.length):0);
            valorAtual = valoresTotais[i]/Math.pow(10, escalaTudo);
            Y = y-(33 * valorAtual);
            ctx.lineTo(X, Y);
            ctx.stroke();
        }
        ctx.closePath();
        ctx.restore();
    }
}