function BotaoCircular(x, y, r, bgColor, bgHoverColor, bgImage, f, txtStyle, txt, txtOnlyOnHover, autoUpdate)
{
	this.x = x;
	this.y = y;
	this.radius = r;
	this.backgroundColor = bgColor;
	this.backgroundHoverColor = bgHoverColor;
	this.currentBackgroundColor = this.backgroundColor;
	this.backgroundImage = bgImage;
	this.font = f;
	this.textStyle = txtStyle;
	this.text = txt;
	this.textOnlyOnHover = txtOnlyOnHover;
	this.hovering = false;
	this.autoUpdate = autoUpdate;

	this.desenhar = function() { // Desenha o botão
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		if (this.hovering)
			ctx.fillStyle = this.backgroundHoverColor;
		else
			ctx.fillStyle = this.backgroundColor;
		ctx.fill();
		ctx.stroke();

		if (this.backgroundImage != null)
			ctx.drawImage(this.backgroundImage, this.x - this.backgroundImage.width/2, this.y - this.backgroundImage.height/2);
		if (this.font != null && this.font != "" && this.text != null && this.text != "" &&
		 ((this.textOnlyOnHover && this.hovering) || !this.textOnlyOnHover))
		{
			ctx.fillStyle = this.textStyle;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = this.font;
			ctx.fillText(this.text, this.x, this.y, this.radius * 2 - 5);
		}
	}
	this.ativarInteracao = function() { // Ativa os eventos de mousemove e click
		canvas.addEventListener("mousemove", testarHover);
		canvas.addEventListener("click", clicou)
	}
	this.desativarInteracao = function() { // Desativa os eventos de mousemove e click
		canvas.removeEventListener("mousemove", testarHover);
		canvas.removeEventListener("click", clicou);
	}
	this.onclick = function(e) {} // Handler do evento de click. Pode ser configurado na instância

	function clicou(e) // Chama o Handler do botão pressionado
	{
		for (var i = 0; i < botoes.length; i++)
			if(botoes[i].hovering && botoes[i].x == x && botoes[i].y == y)
			{
				botoes[i].onclick(e);
				break;
			}
	}
	function testarHover(e) // Calcula se o mouse está dentro do botão e atualiza o estado de hover
	{
		var rect = e.target.getBoundingClientRect();

		var posX = e.clientX - rect.left;
		var posY = e.clientY - rect.top;
		var distCentro = Math.sqrt(Math.pow(x - posX, 2) + Math.pow(y - posY, 2));

		for (var i = 0; i < botoes.length; i++)
		if(botoes[i].x == x && botoes[i].y == y)
		{
			botoes[i].hovering = distCentro < r;
			if (botoes[i].autoUpdate)
				atualizar();
		}
	}
}