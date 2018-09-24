function BotaoRetangular(x, y, w, h, r, wHover, hHover, bgColor, bgHoverColor, bgImage, bgHoverImage, f, txtStyle, txt, txtOnlyOnHover, autoUpdate, changeCursor)
{
	this.x = x;
	this.y = y;
    this.width = w;
    this.height = h;
    this.radius = r;
    this.widthOnHover = wHover;
    this.heightOnHover = hHover;
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

	this.desenhar = function() { // Desenha o botão
		ctx.save();
		ctx.beginPath();
		
		if (this.hovering)
		{
            ctx.fillStyle = this.backgroundHoverColor;
            roundRect(this.x, this.y, this.widthOnHover, this.heightOnHover, this.radius, true, true)
		}
		else
		{
			ctx.fillStyle = this.backgroundColor;
            roundRect(this.x, this.y, this.width, this.height, this.radius, true, true);
		}
		if (this.backgroundImage != null && !this.hovering)
			ctx.drawImage(this.backgroundImage, this.x + this.width / 2 - this.backgroundImage.width/2,
				                                this.y + this.width / 2 - this.backgroundImage.height/2);
		else if (this.backgroundHoverImage != null && this.hovering)
			ctx.drawImage(this.backgroundHoverImage, this.x + this.width / 2 - this.backgroundHoverImage.width/2,
				                                     this.y + this.width / 2 - this.backgroundHoverImage.height/2);
		if (this.font != null && this.font != "" && this.text != null && this.text != "" &&
		 ((this.textOnlyOnHover && this.hovering) || !this.textOnlyOnHover))
		{
			ctx.fillStyle = this.textStyle;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = this.font;
			if (this.hovering)
				ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2, this.widthOnHover - 5);
			else
				ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2, this.width - 5);
		}
		ctx.restore();
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
		for (var i = 0; i < botoes.length; i++)
			if(botoes[i].x == x && botoes[i].y == y)
			{
				var rect = e.target.getBoundingClientRect();
				var posX = e.clientX - rect.left;
				var posY = e.clientY - rect.top;

				if (botoes[i].hovering)
                    botoes[i].hovering = posX >= botoes[i].x && posX <= botoes[i].x + botoes[i].widthOnHover &&
                                         posY >= botoes[i].y && posY <= botoes[i].y + botoes[i].heightOnHover;				
				else
                    botoes[i].hovering = posX >= botoes[i].x && posX <= botoes[i].x + botoes[i].width &&
                                         posY >= botoes[i].y && posY <= botoes[i].y + botoes[i].height;	
				//--------------------------//
				// O problema está aqui: os eventos de todos os botões disparam e interferem uns com os outros
				if (botoes[i].changeCursor)
				{
					if (botoes[i].hovering)
						canvas.style.cursor = "pointer";
					else
						canvas.style.cursor = "default";
				}
				//--------------------------//
				if (botoes[i].autoUpdate)
					atualizar();
				break;
			}
	}
}