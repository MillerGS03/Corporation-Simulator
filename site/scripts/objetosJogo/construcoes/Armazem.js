var imgArmazem = new Image();
imgArmazem.src = "imagens/construcoes/armazem.png";

function Armazem(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h; 

    var testandoPosicionamento = false;
    this.posicaoValida = false;

    var funcaoPosicionamento = null;

    this.desenhar = function()
    {
        ctx.save();

        if (testandoPosicionamento)
        {
            if (this.posicaoValida)
                ctx.fillStyle = "Green";
            else
                ctx.fillStyle = "Red";
        }
        else
            ctx.fillStyle = "Silver";
        ctx.strokeStyle = "Black";
        ctx.lineWidth = 1;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        ctx.drawImage(imgArmazem, this.x + this.width / 2 - imgArmazem.width/2, this.y + this.height / 2 - imgArmazem.height/2)

        ctx.font = "bold 14pt Century Gothic";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "Black";
        ctx.fillText("Armazém", this.x + this.width/2, this.y + this.height/2, this.width - 5);

        ctx.restore();
    }
    this.seguirMouse = function(funcPos)
    {
        funcaoPosicionamento = funcPos;

        moverParaMouse(event);
        canvas.addEventListener("mousemove", moverParaMouse);
        canvas.addEventListener("click", this.pararDeSeguirMouse)
        if (funcaoPosicionamento != null)
        {
            canvas.addEventListener("mousemove", funcaoPosicionamento);
            testandoPosicionamento = true;
        }
    }
    this.pararDeSeguirMouse = function() 
    {
        canvas.removeEventListener("mousemove", moverParaMouse);
        canvas.removeEventListener("mousemove", funcaoPosicionamento);
        canvas.removeEventListener("click", this.pararDeSeguirMouse)
        if (!itensConstruidos[itensConstruidos.length - 1].posicaoValida)
            itensConstruidos.pop();
        testandoPosicionamento = false;
        ativarBotoes();
    }
    function moverParaMouse(e)
    {
        var rect = e.target.getBoundingClientRect();
        var xMouse = e.clientX - rect.left;
        var yMouse = e.clientY - rect.top;
        itensConstruidos[itensConstruidos.length - 1].x = xMouse;
        itensConstruidos[itensConstruidos.length - 1].y = yMouse;
    }
}