var imgDinheiro = new Image();
var imgNivel = new Image();
var imgCalendario = new Image();
imgDinheiro.src = "../imagens/iconesBarraSuperior/iconeDinheiro.png";
imgNivel.src = "../imagens/iconesBarraSuperior/iconeNivel.png";
imgCalendario.src = "../imagens/iconesBarraSuperior/iconeCalendario.png";

function BarraSuperior() {
	this.nivel = 1;
	this.xp = 0;
	this.maxXP = 20;
	this.dinheiro = 5000;
	this.dia = 1;

	var este = this;

	this.ganharXP = function(xp)
	{
		this.xp += xp;
		if (this.xp > this.maxXP)
		{
			var xpAdicional = this.xp - this.maxXP;
			uparNivel();
			this.xp = 0;
			this.ganharXP(xpAdicional);
		}
	}
	function uparNivel()
	{
		este.nivel++;
		
		var base = 1.1;

		if (este.nivel < 10)
			base = 1.35;
		else if (este.nivel < 20)
			base = 1.3;
		else if (este.nivel < 30)
			base = 1.25;
		else if (este.nivel < 40)
			base = 1.2;
		else if (este.nivel < 50)
			base = 1.15;

		este.maxXP = Math.round(este.maxXP * base);
	}

	this.desenhar = function() {
		ctx.save();

		ctx.fillStyle = "#232323";
		ctx.lineWidth = 2;
		roundRect(0, 0, canvas.width, 60, {lowerRight: 30}, true, true);
		ctx.lineWidth = 1;

		// Desenha a barra de experiência
		ctx.fillStyle = "#8e8e8e";
		roundRect(88, 20, 200, 20, {lowerRight: 10, upperRight:10}, true, true) // Retângulo base
		var grd = null;
		if (this.xp <= this.maxXP) // Retângulo de tamanho proporcional ao progresso naquele nível
		{
			grd = ctx.createLinearGradient(88, 20, (this.xp / this.maxXP) * 200 + 88, 40)
			grd.addColorStop(0, "#4c98a5");
			grd.addColorStop(1, "#4cbbce");
			ctx.fillStyle = grd;
			roundRect(88, 20, (this.xp / this.maxXP) * 200, 20, {lowerRight: 10, upperRight: 10}, true, true);
		}
		else
		{
			grd = ctx.createLinearGradient(88, 20, 288, 40)
			grd.addColorStop(0, "#4c98a5");
			grd.addColorStop(1, "#4cbbce");
			ctx.fillStyle = grd;
			roundRect(88, 28, 200, 20, {lowerRight: 10, upperRight: 10}, true, true);
		}
		ctx.font = "bold 12pt Century Gothic";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "White";
		ctx.fillText(this.xp + "/" + this.maxXP + " xp", 188, 30)

		// Desenha o nível
		ctx.drawImage(imgNivel, 50, 9);
		ctx.font = "bold 18pt Century Gothic";
		ctx.fillStyle = "White";
		ctx.fillText(this.nivel, 69, 28);

		// Desenha o dinheiro
		ctx.drawImage(imgDinheiro, 420, 11);
		ctx.font = "bold 15pt Century Gothic";
		ctx.textAlign = "left";
		ctx.fillStyle = "Green";
		ctx.fillText(this.dinheiro + ",00", 463, 30)

		// Desenha o dia
		ctx.drawImage(imgCalendario, 690, 11);
		ctx.fillStyle = "White";
		ctx.fillText(this.dia + "° dia", 733, 30);
		
		ctx.restore();
	}
	this.atualizarDia = function(dia)
	{
		this.dia = dia;
	}
}