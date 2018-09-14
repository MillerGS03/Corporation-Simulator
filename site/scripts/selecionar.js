var username = "Vinschers";										//acessar banco para pegar dados
var rank = "# " + 45;
var canvas;
var ctx;
function iniciar(){
	canvas = document.getElementById("meuCanvas");
	ctx = canvas.getContext("2d");
	roundRect(50, 100, 900, 500, {upperLeft: 50, upperRight:50, lowerLeft: 50, lowerRight:50}, true, true);
	ctx.font = "bold 20pt Century Gothic";
	ctx.fillStyle = "Black";
	ctx.textAlign = "center";
	ctx.fillText("Selecione o jogo desejado:", canvas.width/2, 200);
}

function roundRect(x, y, width, height, radius, fill, stroke) // Desenha um retângulo com bordas redondas
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
    	grd.addColorStop(0, "White");
    	grd.addColorStop(1, "Black");
    	ctx.fillStyle = grd;
        ctx.fill();
	}
}