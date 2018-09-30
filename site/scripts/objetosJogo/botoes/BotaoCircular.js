function BotaoCircular(x, y, r, rHover, bgColor, bgHoverColor, bgImage, bgHoverImage, f, txtStyle, txt, txtOnlyOnHover, autoUpdate, changeCursor)
{
	this.x = x;
	this.y = y;
	this.radius = r;
	this.radiusOnHover = rHover;
	this.backgroundColor = bgColor;
	this.backgroundHoverColor = bgHoverColor;
	this.backgroundImage = bgImage;
	this.backgroundHoverImage = bgHoverImage;
	this.font = f;
	this.textStyle = txtStyle;
	this.text = txt;
	this.textOnlyOnHover = txtOnlyOnHover;
	this.hovering = false;
	this.autoUpdate = autoUpdate;
	this.changeCursor = changeCursor;

	this.ativo = false;

	var este = this;

	this.testeHoverAdicional = function() {return true;}

	this.desenhar = function() { // Desenha o botão
		ctx.save();
		ctx.beginPath();
		
		if (this.hovering)
		{
			ctx.arc(this.x, this.y, this.radiusOnHover, 0, Math.PI * 2);
			ctx.fillStyle = this.backgroundHoverColor;
		}
		else
		{
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			ctx.fillStyle = this.backgroundColor;
		}
		ctx.fill();
		ctx.stroke();

		if (this.backgroundImage != null && !this.hovering)
			ctx.drawImage(this.backgroundImage, this.x - this.backgroundImage.width/2, this.y - this.backgroundImage.height/2);
		else if (this.backgroundHoverImage != null && this.hovering)
			ctx.drawImage(this.backgroundHoverImage, this.x - this.backgroundHoverImage.width/2,
				                                     this.y - this.backgroundHoverImage.height/2);
		if (this.font != null && this.font != "" && this.text != null && this.text != "" &&
		 ((this.textOnlyOnHover && this.hovering) || !this.textOnlyOnHover))
		{
			ctx.fillStyle = this.textStyle;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = this.font;
			if (this.hovering)
				ctx.fillText(this.text, this.x, this.y, this.radiusOnHover * 2 - 5);
			else
				ctx.fillText(this.text, this.x, this.y, this.radius * 2 - 5);
		}
		ctx.restore();
	}
	this.ativarInteracao = function() { // Ativa os eventos de mousemove e click
		if (!this.ativo)
		{
			canvas.addEventListener("mousemove", testarHover);
			canvas.addEventListener("click", clicou);

			this.ativo = true;
		}
	}
	this.desativarInteracao = function() { // Desativa os eventos de mousemove e click
		if (this.ativo)
		{
			canvas.removeEventListener("mousemove", testarHover);
			canvas.removeEventListener("click", clicou);
			
			this.ativo = false;
		}
	}
	this.onclick = function(e) {} // Handler do evento de click. Pode ser configurado na instância

	function clicou(e) // Chama o Handler do botão pressionado
	{
		if(este.hovering)
			este.onclick(e);
	}
	function testarHover(e) // Calcula se o mouse está dentro do botão e atualiza o estado de hover
	{
		var rect = e.target.getBoundingClientRect();
		
		var posX = e.clientX - rect.left;
		var posY = e.clientY - rect.top;

		if (Math.abs(posX - este.x) <= este.radius && Math.abs(posY - este.y) <= este.radius)
		{
			var distCentro = Math.sqrt(Math.pow(x - posX, 2) + Math.pow(y - posY, 2));

			if (este.hovering)
				este.hovering = distCentro < rHover;				
			else
				este.hovering = distCentro < r;
			if (!este.testeHoverAdicional())
				este.hovering = false;
		}
		else
			este.hovering = false;
		//--------------------------//
		// O problema está aqui: os eventos de todos os botões disparam e interferem uns com os outros
		if (este.changeCursor)
		{
			if (este.hovering)
				canvas.style.cursor = "pointer";
			else
				canvas.style.cursor = "default";
		}
		//--------------------------//
		if (este.autoUpdate)
			atualizar();
	}
}