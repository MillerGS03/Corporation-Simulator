var valores = new Array();
var atual = 0;
var dias;
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
    this.btnFechar.onclick = function(e) {
        este.abrirFechar();
    }

    this.desenhar = function() {

        if (this.aberto)
        {
            var escala;
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
            desenharJanela();
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
        }
        else
        {
            this.btnFechar.desativarInteracao();
            this.btnFechar.hovering = false;
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
        dias = calendario.qtosDiasTemOMes[calendario.mes - 1];
        var aux3 = x;

        ctx.beginPath();
        for (var i = 0; i <= dias; i++) {
            aux3 += (i!=0?(i<11?16:21):5);
            ctx.fillText(i, aux3, y);
            ctx.stroke();
            ctx.strokeStyle = "#4286f4";
            atual = valores[i]/Math.pow(10, e);
            yAtual = y-(34 * atual);
            if (i != 0) {
                xAtual = aux3; 
            }
            else {
                xAtual = x;
            }
            ctx.lineTo(xAtual, yAtual);
            ctx.stroke();
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
        if (!isNaN(v))
            valores[atual] = v;
        if (atual >= dias){
            for (var i = 0; i < dias; i++)
                valores[i] = valores[i+1];
        }
        else
            atual++;
    }
}