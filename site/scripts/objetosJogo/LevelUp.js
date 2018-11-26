function LevelUp(n)
{
    this.nivel = n;
    this.aberto = false;

    this.btnFechar = new BotaoRetangular(canvas.width/4 + 400, canvas.height/3 + 10, 40, 40,
                                        { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 40, 40,
                                        "#232323", "#535353", null, null, "bold 18pt Century Gothic", "red", "X", false, false, false);
    this.btnFechar.onclick = function() {
        este.abrirFechar();
    }
    this.btnOK = new BotaoRetangular(canvas.width/4 + 125, canvas.height/3 + canvas.height/2 - 75, 200, 50,
                                    {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10}, 200, 50,
                                    "green", "#329B24", null, null, "bold 22pt Century Gothic", "white", "OK", false, false, true)
    this.btnOK.onclick = function() {este.abrirFechar()}
    var este = this;

    this.abrirFechar = function()
    {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            tocarSom('sons/levelUp.ogg');
            this.ativar();
        }
        else
            this.desativar();
    }
    this.ativar = function() {
        pausar();
        este.btnFechar.ativarInteracao();
        este.btnOK.ativarInteracao();

        BotaoCircular.desativarTodos();
        BotaoRetangular.desativarTodos([este.btnFechar, este.btnOK]);
    }
    this.desativar = function() {
        BotaoCircular.reativar();
        BotaoRetangular.reativar();

        despausar();
        este.btnFechar.desativarInteracao();
        este.btnOK.desativarInteracao();
    }

    this.desenhar = function()
    {
        if (this.aberto)
        {
            ctx.save();

            ctx.globalAlpha = 0.2;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;

            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            roundRect(canvas.width/4, canvas.height/3, 450, canvas.height/2, { upperLeft: 20, upperRight: 20, lowerLeft: 20, lowerRight: 20 }, true, true)
            ctx.fillStyle = "#333333";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.font = "bold 24pt Century Gothic";
            roundRect(canvas.width/4, canvas.height/3, 450, 60, {upperLeft: 20, upperRight: 20 }, true, true);
            ctx.fillStyle = 'white'
            ctx.fillText("Level Up!", canvas.width/4 + 225, canvas.height/3 + 10, 445);
            ctx.fillStyle = 'black';
            ctx.font = 'bold 18pt Century Gothic'
            ctx.fillText('Você acaba de atingir o nível ' + este.nivel + '!', canvas.width/2, canvas.height/3 + 100)
            var desbloqueado = 'batata';
            if (este.nivel == 2)
                desbloqueado = 'Armazém'
            else if (este.nivel == 3)
                desbloqueado = 'Operacional'
            else if (este.nivel == 4)
                desbloqueado = 'Recursos Humanos'
            else if (este.nivel == 5)
                desbloqueado = 'Marketing'
            else if (este.nivel == 6)
                desbloqueado = 'Setor Financeiro'
            if (desbloqueado != 'batata')
            {
                ctx.font = 'bold 15pt Century Gothic'
                ctx.textAlign = 'left'
                ctx.fillText('- ' + desbloqueado + ' desbloqueado!', canvas.width/4 + 50, canvas.height/3 + 150)
            }
            este.btnFechar.desenhar();
            este.btnOK.desenhar();
    
            ctx.restore();
        }
    }
}