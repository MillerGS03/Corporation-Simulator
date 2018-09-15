var username = "Vinschers";										//acessar banco para pegar dados
var rank = "# " + 45;
var canvas;
var ctx;
function iniciar(){
	canvas = document.getElementById("meuCanvas");
	ctx = canvas.getContext("2d");
    canvasSelect = document.getElementById("canvasSelect");
    ctxSelect = canvasSelect.getContext("2d");
	roundRect(50, 100, 900, 500, {upperLeft: 50, upperRight:50, lowerLeft: 50, lowerRight:50}, true, true, "white", null);
	ctx.font = "bold 20pt Century Gothic";
	ctx.fillStyle = "Black";
	ctx.textAlign = "center";
	ctx.fillText("Selecione o jogo desejado:", canvas.width/2, 200);
    addOptions();
}

function roundRect(x, y, width, height, radius, fill, stroke, cor, txt) // Desenha um retângulo com bordas redondas
{
	var cornerRadius = { upperLeft: 0, upperRight: 0, lowerLeft: 0, lowerRight: 0 };
    if (typeof stroke == "undefined") {
        stroke = true;
    }
    if (typeof radius === "object") {
        for (var side in radius) {
            cornerRadius[side] = radius[side];
        }
    }

    ctx.beginPath();
    ctx.moveTo(x + cornerRadius.upperLeft, y);
    ctx.lineTo(x + width - cornerRadius.upperRight, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
    ctx.lineTo(x + width, y + height - cornerRadius.lowerRight);
    ctx.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
    ctx.lineTo(x + cornerRadius.lowerLeft, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
    ctx.lineTo(x, y + cornerRadius.upperLeft);
    ctx.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
    ctx.closePath();
    if (stroke) {
        ctx.stroke();
    }
    if (fill) {
    	var grd = ctx.createLinearGradient(x, y, width + 2000, 1300);
    	grd.addColorStop(0, cor);
    	grd.addColorStop(1, cor);
    	ctx.fillStyle = grd;
        ctx.fill();
        if(txt != null) {
            ctx.font = "bold Century Gothic 10pt"
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText(txt, x + 95, y + 33);
        }
	}
}
function CriarEfeitoSelect(e)
{
    var height, rx, ry, width, x, xc, y, yc, w, h;
    h = canvasSelect.height;
    w = canvasSelect.width;
    width = window.innerWidth;
    height = window.innerHeight;
    x = event.clientX;
    y = event.clientY;
    rx = w * x / width;
    ry = h * y / height;

    var grdSelect = ctxSelect.createRadialGradient(rx, ry, 1, rx, ry, w);
    grdSelect.addColorStop(0, "rgb(190, 190, 190)");
    grdSelect.addColorStop(1, "white");

    ctxSelect.fillStyle = grdSelect;
    ctxSelect.fillRect(0, 0, canvasSelect.width, canvasSelect.height)
}

function addOptions()
{
    var s = document.getElementById("select");
    var numeroDeJogos = 3 //pegar do bd
    for (var i = 1; i <= numeroDeJogos; i++)
    {
        var o = document.createElement("option")
        o.text = "ola";
        s.add(o);
    }
}

function TestarOpcao()
{
    var s = document.getElementById("select");
    if (s.selectedIndex > 0) {
        roundRect(canvas.width/2 - 100, 470, 200, 50, {upperLeft: 15, upperRight:15, lowerLeft: 15, lowerRight:15}, true, true, "green", "Carregar!");
    }
}