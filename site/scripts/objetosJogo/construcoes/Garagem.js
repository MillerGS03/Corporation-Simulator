function Garagem(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h; 

    this.desenhar = function()
    {
        ctx.save();

        ctx.fillStyle = "Gray";
        ctx.strokeStyle = "Black";
        ctx.lineWidth = 1;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        ctx.restore();
    }
    this.seguirMouse = function()
    {
        canvas.addEventListener("mousemove", moverParaMouse)
    }
    this.pararDeSeguirMouse = function() 
    {
        canvas.removeEventListener("mousemove", moverParaMouse)
    }
    function moverParaMouse(e)
    {
        var rect = e.target.getBoundingClientRect();
        var xMouse = e.clientX - rect.left; //x position within the element.
        var yMouse = e.clientY - rect.top;
        itensConstruidos[itensConstruidos.length - 1].x = xMouse;
        itensConstruidos[itensConstruidos.length - 1].y = yMouse;
    }
}