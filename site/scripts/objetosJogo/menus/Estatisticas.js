var valores = new Array();
var valoresTotais = new Array();
var datas = new Array();
var atual = 0;
var atualTudo = 0;
var dataAtual = 0;
var dias;
var imgProx = new Image();
var imgAnterior = new Image();
var tudo = false;
var updateDeGrafico = false;
var vezes = 0;
var primerioUpdateDeData = true;
function Estatisticas()
{
    this.width = 700;
    this.height = 500;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;

    var este = this;

    this.aberto = false;
    this.btnFechar = new BotaoRetangular(this.x + this.width - 50, this.y + 10, 40, 40,
                             { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 40, 40,
        "#232323", "#535353", null, null, "bold 18pt Century Gothic", "red", "X", false, true, false);

    imgProx.src = '../imagens/funcionalidades/setaDireita.png';
    imgAnterior.src = '../imagens/funcionalidades/setaEsquerda.png';
    this.btnProx = new BotaoCircular(este.x + este.width - 200, este.y + 100, 30, 30, "white", "#f2f2f2", imgProx, imgProx, "18pt Century Gothic", "white", "", false, false, true);
    this.btnAnterior = new BotaoCircular(este.x + 200, este.y + 100, 30, 30, "white", "#f2f2f2", imgAnterior, imgAnterior, "18pt Century Gothic", "white", "", false, false, true);
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
            if (tudo){
                este.btnAnterior.ativarInteracao();
                este.btnProx.desativarInteracao();
            }
            else {
                este.btnProx.ativarInteracao();
                este.btnAnterior.desativarInteracao();
            }
            var escala;
            var escalaTudo;
            var X = este.x + 65;
            var Y = este.y + 450;
            ctx.save();
            var aux = 0;
            for (var i = 0; i < valores.length; i++) {
                if (aux < valores[i])
                    aux = valores[i];
            }
            var aux2 = aux + "";
            escala = aux2.length - 1;
            for (var i = 0; i < valoresTotais.length; i++)
                if (aux < valoresTotais[i])
                    aux = valoresTotais[i];
            aux2 = aux + "";
            escalaTudo = aux2.length;
            desenharJanela();
            if (!tudo)
                desenharEixos(X, Y, escala);
            else
                desenharEixos(X, Y, escala);
            ctx.beginPath();
            ctx.moveTo(X, Y);
            var atual, atualY = Y, atualX = X;

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
            iniciarDatas();
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
        ctx.fillText(situacao, este.x + este.width/2, este.y + 90, este.width - 5);
    }
    function desenharEixos(x, y, e)
    {
        ctx.save();
        
        ctx.beginPath();
        ctx.lineTo(x, y);
        ctx.moveTo(x - 30, y);
        ctx.lineTo(x + 620, y);
        ctx.moveTo(x, y - 350);
        ctx.lineTo(x, y + 30);
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = "Black";
        var str = "";
        for (var i = 1; i <= 10; i++) {
            str = (i!=10?i + " x 10":"10");
            ctx.textAlign = "center";
            ctx.font = "bold 12pt Century Gothic";
            ctx.fillText(str, x - (i!=10?35:22), y - (34 * i), x);
            ctx.font = "bold 8pt Century Gothic";
            ctx.fillText((i!=10?e:e+1), x - 9, y - (34 * i) - 3);
        }
        ctx.font = "bold 16pt Century Gothic";
        ctx.fillText("R$", x - 30, y - 385);
        ctx.font = "bold 10pt Century Gothic";
        var xAtual;
        var yAtual;
        var atual;
        var aux3 = x;
        ctx.beginPath();
        if (!tudo){
            for (var i = 0; i < 15; i++) {
                aux3 += (i!=0?40:15);
                ctx.fillText(datas[i], aux3, y);
                ctx.stroke();
                ctx.strokeStyle = "#4286f4";
                atual = valores[i]/Math.pow(10, e);
                yAtual = y-(33 * atual);
                if (i != 0) {
                    xAtual = aux3; 
                }
                else {
                    xAtual = x;
                }
                ctx.lineTo(xAtual, yAtual);
                ctx.stroke();
            }
        }
        else {
            for(var i = 0; i < valoresTotais.length; i++) {
                aux3 += 620/valoresTotais.length;
                ctx.strokeStyle = "#4286f4";
                atual = valoresTotais[i]/Math.pow(10, e);
                yAtual = y-(33 * atual);
                if (i != 0) {
                    xAtual = aux3; 
                }
                else {
                    xAtual = x;
                }
                ctx.lineTo(xAtual, yAtual);
                ctx.stroke();
            }
        }
        ctx.closePath();

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

        ctx.restore();
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
            if (vezes == 14){
                for(var i = 0; i < 14; i++){
                    datas[i] = datas[i+1];
                }
                datas[14] = calendario.dia + "/" + calendario.mes;
            }
            else
                vezes++;
        }
    }
    function iniciarDatas()
    {
        var dia;
        var mes;
        for (var i = 0; i < 15; i++){
            mes = calendario.mes;
            dia = calendario.dia + (i - 1);
            if (dia == calendario.qtosDiasTemOMes[calendario.mes - 1]){
                dia = 1;
                mes++;
            }
            else{
                dia++;
            }
            datas[i] = dia + "/" + mes;
        }
    }
}