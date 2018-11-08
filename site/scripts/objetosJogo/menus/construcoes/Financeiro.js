function Financeiro()
{
    this.width = 900;
    this.height = 620;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;

    
    var este = this;

    this.aberto = false;
    this.btnFechar = new BotaoRetangular(this.x + this.width - 50, this.y + 10, 40, 40,
                             { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 40, 40,
        "#232323", "#535353", null, null, "bold 18pt Century Gothic", "red", "X", false, false, false);
    this.btnFechar.onclick = function(e) {
        este.abrirFechar();
    }

    this.abrirFechar = function() 
    {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            desativarBotoes();
            this.btnIrParaBanco.ativarInteracao();
            this.btnFechar.ativarInteracao();
        }
        else
        {
            this.btnIrParaBanco.desativarInteracao();
            this.btnFechar.desativarInteracao();
            ativarBotoes();
        }
    }
    this.desenhar = function() 
    {
        if (this.aberto)
        {
            ctx.save();

            desenharJanela();
            desenharTabela();
            desenharInformacoes();

            ctx.restore();
        }
    }
    function desenharJanela()
    {
        ctx.save();

        ctx.fillStyle = "#333333";
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        roundRect(este.x, este.y, este.width, este.height, 20, true, true)
       
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 24pt Century Gothic";
        ctx.fillText("Financeiro", este.x + este.width/2, este.y + 10, este.width - 5);

        este.btnFechar.desenhar();

        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);

        ctx.globalAlpha = 0.15;
        ctx.drawImage(imgFundoFinanceiro, este.x + (este.width - 667)/2, este.y + 60 + (este.height - 560)/2);

        ctx.restore();
    }

    var widthTabela = 800;
    var heightTabela = 380;
    var xTabela = este.x + (este.width - widthTabela)/2;
    var yTabela = este.y + 70;
    function desenharTabela()
    {
        ctx.save();

        ctx.lineWidth = 2;
        ctx.fillStyle = "#333333";
        ctx.strokeStyle = "black";
        roundRect(xTabela, yTabela, widthTabela, heightTabela, 10, true, true);

        ctx.fillStyle = "gray";
        roundRect(xTabela, yTabela, widthTabela, 40, {upperLeft: 10, upperRight: 10}, true, true);

        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "bold 17pt Century Gothic";
        ctx.fillText(" Nome da conta                                Classificação         Caixa ou Débito", xTabela + 5, yTabela + 20);

        for (var i = 0; i < 10; i++)
        {
            if (i % 2 == 0)
            {
                ctx.fillStyle = "#555555";
                ctx.fillRect(xTabela + 1, yTabela + 41 + i * 34, widthTabela - 2, 34);
                ctx.fillStyle = "#333333";
            }
        }

        var xLinhas = [365, 565];
        for (var i = 0; i < xLinhas.length; i++)
        {
            ctx.beginPath();
            ctx.moveTo(xTabela + xLinhas[i], yTabela + 41);
            ctx.lineTo(xTabela + xLinhas[i], yTabela + heightTabela - 1);
            ctx.closePath();
            ctx.stroke();
        }

        ctx.restore();
    }
    function desenharInformacoes()
    {
        ctx.save();

        ctx.textAlign = "right";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "black";
        ctx.font = "bold 18pt Century Gothic";
        ctx.fillText("Status mensal: ", este.x + 200, yTabela + heightTabela + 65);
        ctx.fillText("Status anual: ", este.x + 200, yTabela + heightTabela + 100);

        este.btnIrParaBanco.desenhar();

        ctx.restore();
    }
    function configurar()
    {
        este.switchers = new Array();
        for (var i = 0; i < 10; i++)
        {
            este.switchers.push(new BotaoRetangular(xTabela + (565 + widthTabela - 90)/2, yTabela + 45 + i * 34,
                                                    90, 26, 8, 90, 26, "#e5e5e5", "#ececec", null, null, "",
                                                    "", "", false, false, false));
        }
        este.btnIrParaBanco = new BotaoRetangular(xTabela + widthTabela - 280, este.y + (yTabela - este.y + heightTabela + este.height)/2 - 22,
                                                  280, 44, 8, 280, 44, "#e5e5e5", "#ececec", null, null, "bold 18pt Century Gothic",
                                                  "black", "Ir para o banco", false, false, false);
    }
    configurar();
}