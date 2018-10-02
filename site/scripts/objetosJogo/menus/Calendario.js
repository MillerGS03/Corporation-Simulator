function Calendario()
{
    this.width = 850;
    this.height = 620;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;

    this.dia = 1;
    this.mes = 1;
    this.ano = 1;

    this.passarDia = function() {
        this.dia++;
        if (this.dia > 30)
        {
            this.dia = 1;
            this.mes++;
            if (this.mes > 12)
            {
                this.mes = 1;
                this.ano++;
            }
        }
    }

    var este = this;

    this.aberto = false;
    this.btnFechar = new BotaoRetangular(this.x + this.width - 50, this.y + 10, 40, 40,
                             { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 40, 40,
        "#232323", "#535353", null, null, "bold 18pt Century Gothic", "red", "X", false, true, false);
    this.btnFechar.onclick = function(e) {
        este.abrirFechar();
    }

    var diasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    var meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    this.desenhar = function() {

        if (this.aberto)
        {
            ctx.save();
            
            desenharJanela();
            desenharCalendario();

            ctx.restore();
        }
    }
    function desenharJanela()
    {
        ctx.fillStyle = "#333333";
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        roundRect(este.x, este.y, este.width, este.height, { upperLeft: 20, upperRight: 20, lowerLeft: 20, lowerRight: 20 }, true, true)
       
        ctx.fillStyle = "White";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 24pt Century Gothic";
        ctx.fillText("Calendário", este.x + este.width/2, este.y + 10, este.width - 5);

        este.btnFechar.desenhar();

        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);
    }
    function desenharCalendario()
    {
        var tamanhoDias = 102;
        var alturaHeader = 90;
        var xInicial = este.x + (este.width - tamanhoDias * 7) / 2;
        var yInicial = este.y + 90;
        var yMeioTexto = yInicial + 5*alturaHeader/6;

        ctx.strokeStyle = "black";
        ctx.fillStyle = "#232323";
        ctx.fillRect(xInicial, yInicial, tamanhoDias * 7, 2 * alturaHeader/3);
        ctx.strokeRect(xInicial, yInicial, tamanhoDias * 7, 2 * alturaHeader/3);

        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "bold 16pt Century Gothic";
        ctx.fillText(este.ano + "Ano", xInicial + 30, yInicial + alturaHeader/3, tamanhoDias * 2)
        ctx.textAlign = "center";
        ctx.font = "bold 22pt Century Gothic";
        ctx.fillText(meses[este.mes], xInicial + tamanhoDias * 7 / 2, yInicial + alturaHeader/3, tamanhoDias * 3);
        ctx.font = "bold 14pt Century Gothic";

        for (var dias = 0; dias < 7; dias++)
        {
            ctx.fillStyle = "Gray";
            ctx.fillRect(xInicial + dias * tamanhoDias, yInicial + 2*alturaHeader/3, tamanhoDias, alturaHeader/3);
            ctx.strokeRect(xInicial + dias * tamanhoDias, yInicial + 2*alturaHeader/3, tamanhoDias, alturaHeader/3);

            ctx.fillStyle = "White";
            var xMeioTexto = xInicial + tamanhoDias * (0.5 + dias);
            ctx.fillText(diasDaSemana[dias], xMeioTexto, yMeioTexto, tamanhoDias);

            ctx.fillStyle = "silver";
            for (var semanas = 0; semanas < 4; semanas++)
            {
                ctx.fillRect(xInicial + dias * tamanhoDias, yInicial + alturaHeader + semanas * tamanhoDias, tamanhoDias, tamanhoDias);
                ctx.strokeRect(xInicial + dias * tamanhoDias, yInicial + alturaHeader + semanas * tamanhoDias, tamanhoDias, tamanhoDias);
            }
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
}