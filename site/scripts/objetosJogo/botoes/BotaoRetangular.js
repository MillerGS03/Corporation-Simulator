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

	this.stroke = true;

	this.ativo = false;

	var este = this;

	var testesHoverAdicionais = new Array();

	/**
	 * Adiciona uma função para testar se o mouse está sobre o botão, que acontecerá além da que já testa sua posição dentro do retângulo.
	 * @param {function} teste Função de teste. Ela deve retornar verdadeiro se cumprir o critério, ou falso se não cumprir.
	 */
	this.adicionarTesteHover = function(teste)
	{
		testesHoverAdicionais.push(teste);
	}
	this.removerTestesHover = function() 
	{
		testesHoverAdicionais = new Array();
	}

	this.setX = function(novoX)
	{
		this.x = novoX;
		xAtual = novoX;
	}
	this.setY = function(novoY)
	{
		this.y = novoY;
		yAtual = novoY;
	}

	var xAtual = this.x;
	var yAtual = this.y;

	this.desenhar = function() 
	{ // Desenha o botão
		ctx.save();
		
		if (this.hovering)
		{
            ctx.fillStyle = this.backgroundHoverColor;
            roundRect(this.x, this.y, this.widthOnHover, this.heightOnHover, this.radius, true, this.stroke)
		}
		else
		{
			ctx.fillStyle = this.backgroundColor;
            roundRect(this.x, this.y, this.width, this.height, this.radius, true, this.stroke);
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
		if (!this.ativo)
		{
			$("#meuCanvas").on("mousemove", testarHover);
			$("#meuCanvas").on("click", clicou);
			this.ativo = true;
		}
	}
	this.desativarInteracao = function() { // Desativa os eventos de mousemove e click
		if (this.ativo)
		{
			$("#meuCanvas").off("mousemove", testarHover);
			$("#meuCanvas").off("click", clicou);
			this.ativo = false;

			if (this.hovering && this.changeCursor)
				canvas.style.cursor = "default";
			this.hovering = false;
		}
	}
	this.onclick = function(e) {} // Handler do evento de click. Pode ser configurado na instância

	function clicou(e) // Chama o Handler do botão pressionado
	{
		if (este.hovering)
			este.onclick(e);
	}
	function testarHover(e) // Calcula se o mouse está dentro do botão e atualiza o estado de hover
	{
		var mudouHover = este.hovering; 

		if (este.hovering)
			este.hovering = xMouse >= este.x && xMouse <= este.x + este.widthOnHover &&
									yMouse >= este.y && yMouse <= este.y + este.heightOnHover;				
		else
			este.hovering = xMouse >= este.x && xMouse <= este.x + este.width &&
									yMouse >= este.y && yMouse <= este.y + este.height;
		for (var i = 0; i < testesHoverAdicionais.length; i++)
			if (!testesHoverAdicionais[i]())
				este.hovering = false;

		mudouHover = mudouHover != este.hovering;

		if (este.changeCursor)
		{
			if (este.hovering)
				canvas.style.cursor = "pointer";
			else if (mudouHover)
				canvas.style.cursor = "default";
		}
		
		if (este.autoUpdate)
			atualizar();
	}
}