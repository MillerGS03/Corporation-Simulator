BotaoRetangular.exceto = new Array();
BotaoRetangular.inativos = false;
BotaoRetangular.cooldown = false;
/**
 * Desativa todos os botões, exceto os que estão inclusos no argumento. Se o argumento for omitido, não haverá exceções.
 * @param {Array.<BotaoRetangular>} exceto Exceções aos botões desativados.
 */
BotaoRetangular.desativarTodos = function(exceto)
{
	if (BotaoRetangular.inativos)
		for (var i = 0; i < exceto.length; i++)
			BotaoRetangular.exceto.push(exceto[i]);
	else
	{
		if (exceto != null)
			BotaoRetangular.exceto = exceto;
		BotaoRetangular.inativos = true;
		BotaoRetangular.setTimeout = false;
		canvas.style.cursor = "default";
	}
}
/**
 * Reativa os botões
 */
BotaoRetangular.reativar = function()
{
	BotaoRetangular.exceto = new Array();
	BotaoRetangular.inativos = false;
}
/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} w width
 * @param {number} h height
 * @param {*} r radius
 * @param {number} wHover width on hover
 * @param {number} hHover height on hover
 * @param {*} bgColor background color
 * @param {*} bgHoverColor background color on hover
 * @param {*} bgImage background image
 * @param {*} bgHoverImage background image on hover
 * @param {string} f font
 * @param {*} txtStyle text color
 * @param {string} txt text
 * @param {boolean} txtOnlyOnHover text on hover
 * @param {boolean} autoUpdate 
 * @param {boolean} changeCursor 
 * @param {string} caminhoSom path to click sound
 * @param {string} imageAlign align of image
 */
function BotaoRetangular(x, y, w, h, r, wHover, hHover, bgColor, bgHoverColor, bgImage, bgHoverImage, f, txtStyle, txt, txtOnlyOnHover, autoUpdate, changeCursor, caminhoSom, imageAlign)
function BotaoRetangular(x, y, w, h, r, wHover, hHover, bgColor, bgHoverColor, bgImage, bgHoverImage, f, txtStyle, txt, txtOnlyOnHover, autoUpdate, changeCursor, caminhoSom, imageAlign, stroke)
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
	this.autoUpdate = false;
	this.changeCursor = changeCursor;
	this.som = caminhoSom;
	this.imgAlign = imageAlign==null?'center':imageAlign;

	this.stroke = stroke;

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
		if (this.imgAlign == 'center')
		{
			if (this.backgroundImage != null && !this.hovering)
				ctx.drawImage(this.backgroundImage, this.x + this.width / 2 - this.backgroundImage.width/2,
				                                this.y + this.width / 2 - this.backgroundImage.height/2);
			else if (this.backgroundHoverImage != null && this.hovering)
				ctx.drawImage(this.backgroundHoverImage, this.x + this.width / 2 - this.backgroundHoverImage.width/2,
												this.y + this.width / 2 - this.backgroundHoverImage.height/2);
		}
		else if (this.imgAlign == 'topLeft')
		{
			if (this.backgroundImage != null && !this.hovering)
				ctx.drawImage(this.backgroundImage, this.x, this.y);
			else if (this.backgroundHoverImage != null && this.hovering)
				ctx.drawImage(this.backgroundHoverImage, this.x, this.y);
		}
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
	this.onhoverchanged = function() {}

	function clicou(e) // Chama o Handler do botão pressionado
	{
		if (!BotaoRetangular.cooldown && este.hovering && (!BotaoRetangular.inativos || BotaoRetangular.exceto.includes(este, 0)))
		{
			if (este.som)
				tocarSom(este.som);
			else
				tocarSom("sons/click.ogg");
			este.onclick(este);
			canvas.dispatchEvent(new Event("mousemove"));
			BotaoRetangular.cooldown = true;
			setTimeout(function() {BotaoRetangular.cooldown = false}, 10);
		}
	}
	function testarHover(e) // Calcula se o mouse está dentro do botão e atualiza o estado de hover
	{
		if (!BotaoRetangular.inativos || BotaoRetangular.exceto.includes(este, 0) && !BotaoRetangular.cooldown)
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

			if (mudouHover && este.changeCursor)
				canvas.style.cursor = este.hovering?"pointer":"default";

			if (mudouHover)
				este.onhoverchanged();
			
			if (este.autoUpdate)
				atualizar();
		}
	}
}