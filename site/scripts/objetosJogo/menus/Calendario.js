function Calendario()
{
    var f = 5;
    this.width = 900;
    this.height = 620;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;

    var tamanhoDias = 75;
    var alturaHeader = 80;
    
    var xInicial = this.x + 40;
    var yInicial = this.y + 74;

    this.dia = 1;
    /** Mês atual, variando de 1 a 12 */
    this.mes = 1;
    this.ano = 1;

    var mesExibido = 1;
    var anoExibido = 1;

    var diasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    var meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    /** Armazena quantos dias tem o mês indicado pelo índice de 0 a 11 */
    this.qtosDiasTemOMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var comecoDoMes = 0;

    var seguirPassagemDosMeses = true;
    this.aberto = false;

    var este = this;

    var diaSelecionado = null;
    var xSelecionado = 0;
    var ySelecionado = 0; 

    this.eventos = new Array();


    this.btnFechar = new BotaoRetangular(this.x + this.width - 50, this.y + 10, 40, 40,
                             { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 40, 40,
        "#232323", "#535353", null, null, "bold 18pt Century Gothic", "red", "X", false, true, false);
    this.btnFechar.onclick = function(e) {
        este.abrirFechar();
    }

    var btnMesAnterior = new BotaoCircular(xInicial + 30, yInicial + alturaHeader/3, 22, 22, "Gray", "Silver",
                                           imgAnterior, imgAnterior, "", "", "", false, false, false);
    var btnMesPosterior = new BotaoCircular(xInicial + tamanhoDias * 7 - 30, yInicial + alturaHeader/3, 22, 22, "Gray", "Silver",
                                           imgPosterior, imgPosterior, "", "", "", false, false, false);

    btnMesAnterior.onclick = function()
    {
        seguirPassagemDosMeses = false;
        
        if (mesExibido == 1 && anoExibido != 1)
        {
            mesExibido = 12;
            anoExibido--;
        }
        else if (mesExibido != 1)
            mesExibido--;

        comecoDoMes = diaComecoDoMes(mesExibido, anoExibido);
    }
    btnMesPosterior.onclick = function()
    {
        seguirPassagemDosMeses = false;

        if (mesExibido == 12)
        {
            mesExibido = 1;
            anoExibido++;
        }
        else
            mesExibido++;

        comecoDoMes = diaComecoDoMes(mesExibido, anoExibido);
    }

    /**
     * Retorna o dia da semana do início do mês no seguinte formato:
     * 0 - Domingo
     * 1 - Segunda
     * ...
     * 6 - Sábado
     * 
     * @param {number} mes Mês cujo primeiro dia da semana é o valor retornado
     * @param {number} ano Ano a que pertence o mês
     * 
     * @returns Dia da semana
     */
    function diaComecoDoMes(mes, ano)
    {
        var diasTotais = (ano - 1) * 365;
        for (var i = 0; i < mes - 1; i++)
            diasTotais += este.qtosDiasTemOMes[i];

        return diasTotais % 7;
    }

    /**
     * Passa um dia na marcação do calendário, e automaticamente atualiza caso tenha acabado o mês ou o ano.
     */
    this.passarDia = function() {
        this.dia++;
        if (this.dia > this.qtosDiasTemOMes[this.mes - 1])
        {
            var numero = Math.floor(Math.random() * (2 - (-2) + 1)) - 2;
            if (f + numero >= 0 && f + numero <= 10)
                f += numero;
            else if ((f + numero - 1 >= 0 && f + numero - 1 <= 10) || (f + numero + 1 >= 0 && f + numero + 1 <= 10))
            {
                if (numero < 0)
                    f += numero + 1;
                else
                    f += numero - 1;
            }
            this.dia = 1;
            this.mes++;
            if (this.mes > 12)
            {
                this.mes = 1;
                this.ano++;
            } 
        }
        if (seguirPassagemDosMeses)
        {
            mesExibido = this.mes;
            anoExibido = this.ano;
            comecoDoMes = diaComecoDoMes(this.mes, this.ano);
        }
    }

    this.adicionarEvento = function(dia, mes, ano, tipo)
    {
        this.eventos.push(new EventoData(dia, mes, ano, tipo));
    }
    
    /**
     * Desenha a janela e o calendário no canvas
     */
    this.desenhar = function() {

        if (this.aberto)
        {
            ctx.save();
            
            desenharJanela();
            desenharCalendario();
            desenharEventosDiaSelecionado();

            ctx.restore();
        }
    }

    this.fatorEconomia = function () { return f;};

    /**
     * Desenha a janela do Calendário no canvas
     */
    function desenharJanela()
    {
        ctx.save();

        ctx.fillStyle = "#333333";
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        roundRect(este.x, este.y, este.width, este.height, { upperLeft: 20, upperRight: 20, lowerLeft: 20, lowerRight: 20 }, true, true)
       
        ctx.fillStyle = "White";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 24pt Century Gothic";
        ctx.fillText("Calendário", este.x + este.width/2, este.y + 10, este.width - 5);

        este.btnFechar.desenhar();

        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);

        ctx.restore();
    }

    /**
     * Desenha o calendário no canvas
     */
    function desenharCalendario()
    {
        ctx.save();

        desenharTopoCalendario();
        desenharMioloCalendario();

        ctx.restore();
    }
    function desenharEventosDiaSelecionado()
    {
        ctx.save();

        var widthCaixa = 270;

        desenharCaixaEventosDoDia(widthCaixa);
        desenharEventos(widthCaixa);

        ctx.restore();
    }
    /**
     * Desenha o topo do calendário, mostrando o ano e o mês que está sendo exibido
     */
    function desenharTopoCalendario()
    {
        ctx.strokeStyle = "black";
        ctx.fillStyle = "#232323";
        ctx.fillRect(xInicial, yInicial, tamanhoDias * 7, 2 * alturaHeader/3);
        ctx.strokeRect(xInicial, yInicial, tamanhoDias * 7, 2 * alturaHeader/3);

        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "bold 16pt Century Gothic";
        ctx.fillText(anoExibido + "° Ano", xInicial + 65, yInicial + alturaHeader/3, tamanhoDias * 2)
        ctx.textAlign = "center";
        ctx.font = "bold 22pt Century Gothic";
        ctx.fillText(meses[mesExibido - 1], xInicial + tamanhoDias * 7 / 2, yInicial + alturaHeader/3, tamanhoDias * 3);
        ctx.font = "bold 13pt Century Gothic";

        btnMesAnterior.desenhar();
        btnMesPosterior.desenhar();
    }

    /**
     * Desenha o miolo do calendário no canvas, mostrando o header dos dias da semana e todos os dias do mês
     */
    function desenharMioloCalendario()
    {
        var yMeioTexto = yInicial + 5*alturaHeader/6;

        for (var dia = 0; dia < 7; dia++)
        {
            var xMeioTexto = xInicial + tamanhoDias * (0.5 + dia);
            desenharHeaderSemana(dia, xMeioTexto, yMeioTexto);

            ctx.fillStyle = "silver";
            for (var semana = 0; semana < 6; semana++)
                desenharQuadradoDia(dia, semana, xMeioTexto, yMeioTexto);
            if (diaSelecionado != null)
            {
                ctx.save();

                ctx.lineWidth = 3;
                ctx.strokeRect(xSelecionado, ySelecionado, tamanhoDias, tamanhoDias);

                ctx.restore();
            }
        }
    }

    /**
     * Desenha o header dos dias da semana (Domingo, segunda, terça, etc.) no canvas
     * 
     * @param {number} dia Dia da semana da posição atual (de 0 a 6)
     * @param {number} xMeioTexto Posição x do meio do header
     * @param {number} yMeioTexto Posição y do meio do header
     */
    function desenharHeaderSemana(dia, xMeioTexto, yMeioTexto)
    {
        ctx.fillStyle = "Gray";
        ctx.fillRect(xInicial + dia * tamanhoDias, yInicial + 2*alturaHeader/3, tamanhoDias, alturaHeader/3);
        ctx.strokeRect(xInicial + dia * tamanhoDias, yInicial + 2*alturaHeader/3, tamanhoDias, alturaHeader/3);

        ctx.fillStyle = "White";
        ctx.font = "bold 13pt Century Gothic";

        ctx.fillText(diasDaSemana[dia].charAt(0), xMeioTexto, yMeioTexto, tamanhoDias);
    }

    /**
     * Desenha o quadrado do dia atual no canvas
     * 
     * @param {number} dia Dia da semana da posição atual (de 0 a 6)
     * @param {*} semana Semana da posição atual (de 0 a 5)
     * @param {number} xMeioTexto Posição x do meio do header
     * @param {number} yMeioTexto Posição y do meio do header
     */
    function desenharQuadradoDia(dia, semana, xMeioTexto, yMeioTexto)
    {   
        var diaAtual = dia + semana * 7 - comecoDoMes + 1;
        var xQuadrado = xInicial + dia * tamanhoDias;
        var yQuadrado = yInicial + alturaHeader + semana * tamanhoDias;

        if (diaAtual > 0 && diaAtual <= este.qtosDiasTemOMes[mesExibido - 1])
        {
            if (diaAtual == diaSelecionado || xMouse > xQuadrado && xMouse < xQuadrado + tamanhoDias && yMouse > yQuadrado && yMouse < yQuadrado + tamanhoDias)
                ctx.fillStyle = "#aaaaaa";
            else 
                ctx.fillStyle = "silver";
            ctx.fillRect(xQuadrado, yQuadrado, tamanhoDias, tamanhoDias);
            ctx.font = "bold 20pt Century Gothic";
            ctx.fillStyle = "black";
            ctx.fillText(diaAtual, xMeioTexto, yInicial + alturaHeader + tamanhoDias * (semana + 0.5), tamanhoDias);

            if (diaAtual == este.dia && mesExibido == este.mes && anoExibido == este.ano)
                desenharCirculoHoje(dia, semana);

            var xImagemIcone = xQuadrado + 5;
            var yImagemIcone = yInicial + alturaHeader + tamanhoDias * (semana + 1) - 24;

            for (var i = 0; i < este.eventos.length; i++)
                if (diaAtual == este.eventos[i].dia && mesExibido == este.eventos[i].mes && anoExibido == este.eventos[i].ano)
                {
                    ctx.drawImage(este.eventos[i].icone, xImagemIcone, yImagemIcone);
                    xImagemIcone += 30;
                }
        }
        else
        {
            ctx.fillStyle = "gray";
            ctx.fillRect(xQuadrado, yQuadrado, tamanhoDias, tamanhoDias);
        }
        ctx.strokeRect(xQuadrado, yQuadrado, tamanhoDias, tamanhoDias);
    }
    function testarClick()
    {
        diaSelecionado = null;

        var xMouseCalendario = xMouse - xInicial;
        var yMouseCalendario = yMouse - (yInicial + alturaHeader);

        if (xMouseCalendario > 0 && xMouseCalendario < tamanhoDias * 7 &&
            yMouseCalendario > 0 && yMouseCalendario < tamanhoDias * 6)
        {
            var dia = Math.floor(xMouseCalendario / tamanhoDias);
            var semana = Math.floor(yMouseCalendario / tamanhoDias);
            var diaAtual = dia + semana * 7 - comecoDoMes + 1;
            
            if (diaAtual > 0 && diaAtual <= este.qtosDiasTemOMes[mesExibido - 1] && diaAtual != diaSelecionado)
            {
                diaSelecionado = diaAtual;
                xSelecionado = xInicial + dia * tamanhoDias;
                ySelecionado = yInicial + semana * tamanhoDias + alturaHeader;
                seguirPassagemDosMeses = false;
            }
        }
    }

    /**
     * Desenha o círculo ao redor do dia atual
     * 
     * @param {number} dia Dia da semana da posição atual (de 0 a 6)
     * @param {*} semana Semana da posição atual (de 0 a 5)
     */
    function desenharCirculoHoje(dia, semana)
    {
        var paddingCirculoHoje = 10;

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(xInicial + tamanhoDias * (dia + 0.5),
                    yInicial + alturaHeader + tamanhoDias * (semana + 0.5),
                    tamanhoDias/2 - paddingCirculoHoje, tamanhoDias/2 - paddingCirculoHoje,
                    0, 0, 2 * Math.PI);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "orange";
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    function desenharCaixaEventosDoDia(widthCaixa)
    {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.fillStyle = "silver";
        ctx.fillRect(xInicial + tamanhoDias * 7 + 30, yInicial + 30, widthCaixa, alturaHeader + tamanhoDias * 6 - 60);
        ctx.strokeRect(xInicial + tamanhoDias * 7 + 30, yInicial + 30, widthCaixa, alturaHeader + tamanhoDias * 6 - 60);

        ctx.fillStyle = "#232323";
        ctx.fillRect(xInicial + tamanhoDias * 7 + 30, yInicial + 30, widthCaixa, 50);
        ctx.strokeRect(xInicial + tamanhoDias * 7 + 30, yInicial + 30, widthCaixa, 50);

        ctx.fillStyle = "white";
        ctx.font = "bold 14pt Century Gothic";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        var mensagem = "Nenhum dia selecionado";
        if (diaSelecionado != null)
            mensagem = "Eventos no dia " + diaSelecionado;
        ctx.fillText(mensagem, xInicial + tamanhoDias * 7 + 30 + widthCaixa/2, yInicial + 30 + 25, widthCaixa);

    }
    function desenharEventos(widthCaixa)
    {
        var eventosDesenhados = 0;
        for (var i = 0; i < este.eventos.length; i++)
        {
            if (este.eventos[i].dia == diaSelecionado && este.eventos[i].mes == mesExibido && este.eventos[i].ano == anoExibido)  
                desenharEvento(xInicial + tamanhoDias * 7 + 30, yInicial + 30 * (i + 3), widthCaixa, este.eventos[i]);
        }
    }
    function desenharEvento(x, y, widthCaixa, evento)
    {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.fillStyle = "#aaaaaa";
        ctx.fillRect(x, y, widthCaixa, 50);
        ctx.strokeRect(x, y, widthCaixa, 50);

        ctx.fillStyle = "black";
        ctx.font = "bold 12pt Century Gothic";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(evento.nomeTipo, x + 55, y + 25, widthCaixa - 55);

        ctx.fillStyle = "white";
        roundRect(x + 3, y + 3, 44, 44, {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10}, true, true);
        ctx.drawImage(evento.imagem, x + 5, y + 5);
    }
    this.abrirFechar = function() {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            desativarBotoes();
            this.btnFechar.ativarInteracao();
            btnMesAnterior.ativarInteracao();
            btnMesPosterior.ativarInteracao();
            mesExibido = this.mes;
            anoExibido = this.ano;
            comecoDoMes = diaComecoDoMes(mesExibido, anoExibido);   
            seguirPassagemDosMeses = true;
            $("#meuCanvas").on("click", testarClick);
        }
        else
        {
            diaSelecionado = null;
            this.btnFechar.desativarInteracao();
            btnMesAnterior.desativarInteracao();
            btnMesPosterior.desativarInteracao();
            this.btnFechar.hovering = false;
            ativarBotoes();
            $("#meuCanvas").off("click", testarClick);
        }
        atualizar();
    }
}

var imgIconeEntrega = new Image();
var imgEntrega = new Image();
imgIconeEntrega.src = "../imagens/menusBotoes/iconeEntrega.png";
imgEntrega.src = "../imagens/menusBotoes/imagemEntrega.png";

function EventoData(dia, mes, ano, tipo)
{
    this.dia = dia;
    this.mes = mes;
    this.ano = ano;
    this.tipo = tipo;

    switch (tipo)
    {
        case 1:
            this.nomeTipo = "Entrega de matéria-prima";
            this.icone = imgIconeEntrega;
            this.imagem = imgEntrega;
            break;
    }
}