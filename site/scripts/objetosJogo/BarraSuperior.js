var imgDinheiro = new Image();
var imgNivel = new Image();
var imgCalendario = new Image();
imgDinheiro.src = "../imagens/iconesBarraSuperior/iconeDinheiro.png";
imgNivel.src = "../imagens/iconesBarraSuperior/iconeNivel.png";
imgCalendario.src = "../imagens/iconesBarraSuperior/iconeCalendario.png";

function BarraSuperior() {
	this.nivel = 5;
	this.xp = 10;
	this.maxXP = 80;
	this.dinheiro = 5000;
	this.dia = 1;
	this.desenhar = function() {
		ctx.save();
		ctx.fillStyle = "#232323";
		ctx.lineWidth = 2;
		roundRect(0, 0, canvas.width, 60, {lowerRight: 30}, true, true);
		ctx.lineWidth = 1;

		// Desenha o nível
		ctx.drawImage(imgNivel, 50, 9);
		ctx.font = "bold 18pt Century Gothic";
		ctx.textAlign = "left";
		ctx.textBaseline = "alphabetic";
		ctx.fillStyle = "White";
		ctx.fillText(this.nivel, 62, 37)

		// Desenha a barra de experiência
		ctx.fillStyle = "#8e8e8e";
		roundRect(88, 18, 200, 20, {lowerRight: 10, upperRight:10}, true, true) // Retângulo base
		var grd = null;
		if (this.xp <= this.maxXP) // Retângulo de tamanho proporcional ao progresso naquele nível
		{
			grd = ctx.createLinearGradient(0, 0, (this.xp / this.maxXP) * 200, 20)
			grd.addColorStop(0, "#4c98a5");
			grd.addColorStop(1, "#4cbbce");
			ctx.fillStyle = grd;
			roundRect(88, 18, (this.xp / this.maxXP) * 200, 20, {lowerRight: 10, upperRight: 10}, true, true);
		}
		else
		{
			grd = ctx.createLinearGradient(0, 0, 200, 20)
			grd.addColorStop(0, "#4c98a5");
			grd.addColorStop(1, "#4cbbce");
			ctx.fillStyle = grd;
			roundRect(88, 18, 200, 20, {lowerRight: 10, upperRight: 10}, true, true);
		}
		ctx.font = "bold 12pt Century Gothic";
		ctx.textAlign = "center";
		ctx.fillStyle = "White";
		ctx.fillText(this.xp + "/" + this.maxXP + " xp", 188, 34)

		// Desenha o dinheiro
		ctx.drawImage(imgDinheiro, 420, 9);
		ctx.font = "bold 15pt Century Gothic";
		ctx.textAlign = "left";
		ctx.fillStyle = "Green";
		ctx.fillText(this.dinheiro + ",00", 463, 36)

		// Desenha o dia
		ctx.drawImage(imgCalendario, 690, 9);
		ctx.fillStyle = "White";
		ctx.fillText(this.dia + "° dia", 733, 36);
		ctx.restore();
	}
	this.atualizarDia = function(dia)
	{
		this.dia = dia;
	}
}