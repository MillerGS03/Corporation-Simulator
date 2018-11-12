function RecursosHumanos()
{
    this.width = 900;
    this.height = 620;
    this.x = (canvas.width - this.width)/2;
    this.y = (canvas.height - this.height - 60)/2 + 60;

    
    var este = this;
    var funcionarios;
    var fDesenv = 0;
    var fProd = 0;
    var fFin = 0;
    var fMark = 0;
    var fRh = 0;
    var capacitacao = 0;
    var custo = 0;

    this.aberto = false;
    this.btnFechar = new BotaoRetangular(this.x + this.width - 50, this.y + 10, 40, 40,
                             { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 40, 40,
        "#232323", "#535353", null, null, "bold 18pt Century Gothic", "red", "X", false, false, false);

    this.btnIrParaGaragem = new BotaoRetangular(this.x + 10, this.y + 10, 40, 40, 5, 40, 40,
                                                "#232323", "#535353", imgIrParaGaragem, imgIrParaGaragem, "", "", "", false, false, false);
    this.btnIrParaGaragem.onclick = function(e) {
        este.abrirFechar();
        getJanelaConstrucao("Garagem").abrirFechar();
    }
    
    this.btnContratarDesenv = new BotaoRetangular(this.x + 395, this.y + 190, 80, 50,
        {}, 80, 50, '#2b6aff', '#447cff',
        imgContratar, imgContratarHover, 'bold 16pt Century Gothic', 'white', '', true, false, false, null, 'topLeft');
    this.btnDemitirDesenv = new BotaoRetangular(this.x + 485, this.y + 190, 80, 50,
        {}, 80, 50, 'darkred', '#c10000',
        imgDemitir, imgDemitirHover, 'bold 16pt Century Gothic', 'white', '', true, false, false, null, 'topLeft');

    this.btnContratarProd = new BotaoRetangular(this.x + 395, this.y + 267, 80, 50,
        {}, 80, 50, '#2b6aff', '#447cff',
        imgContratar, imgContratarHover, 'bold 16pt Century Gothic', 'white', '', true, false, false, null, 'topLeft');
    this.btnDemitirProd = new BotaoRetangular(this.x + 485, this.y + 267, 80, 50,
        {}, 80, 50, 'darkred', '#c10000',
        imgDemitir, imgDemitirHover, 'bold 16pt Century Gothic', 'white', '', true, false, false, null, 'topLeft');

    this.btnContratarFin = new BotaoRetangular(this.x + 395, this.y + 344, 80, 50,
        {}, 80, 50, '#2b6aff', '#447cff',
        imgContratar, imgContratarHover, 'bold 16pt Century Gothic', 'white', '', true, false, false, null, 'topLeft');
    this.btnDemitirFin = new BotaoRetangular(this.x + 485, this.y + 344, 80, 50,
        {}, 80, 50, 'darkred', '#c10000',
        imgDemitir, imgDemitirHover, 'bold 16pt Century Gothic', 'white', '', true, false, false, null, 'topLeft');

    this.btnContratarMark = new BotaoRetangular(this.x + 395, this.y + 421, 80, 50,
        {}, 80, 50, '#2b6aff', '#447cff',
        imgContratar, imgContratarHover, 'bold 16pt Century Gothic', 'white', '', true, false, false, null, 'topLeft');
    this.btnDemitirMark = new BotaoRetangular(this.x + 485, this.y + 421, 80, 50,
        {}, 80, 50, 'darkred', '#c10000',
        imgDemitir, imgDemitirHover, 'bold 16pt Century Gothic', 'white', '', true, false, false, null, 'topLeft');

    this.btnContratarRh = new BotaoRetangular(this.x + 395, this.y + 498, 80, 50,
        {}, 80, 50, '#2b6aff', '#447cff',
        imgContratar, imgContratarHover, 'bold 16pt Century Gothic', 'white', '', true, false, false, null, 'topLeft');
    this.btnDemitirRh = new BotaoRetangular(this.x + 485, this.y + 498, 80, 50,
        {}, 80, 50, 'darkred', '#c10000',
        imgDemitir, imgDemitirHover, 'bold 16pt Century Gothic', 'white', '', true, false, false, null, 'topLeft');

    this.btnTreinar = new BotaoRetangular(this.x + 600, this.y + 425, 275, 50,
        { upperLeft: 5, upperRight: 5, lowerLeft: 5, lowerRight: 5 }, 275, 50, 'grey', 'lightgray',
        null, null, 'bold 20pt Century Gothic', 'black', 'Treinar funcionários', false, false, false);
    
    this.btnFechar.onclick = function(e) {
        este.abrirFechar();
    }
    this.btnContratarDesenv.onclick = function() {getJanelaConstrucao('Garagem').reformada?contratar('fDesenv'):alerta('Você precisa reformar a garagem para contratar funcionários no desenvolvimento!')}
    this.btnDemitirDesenv.onclick = function() {getJanelaConstrucao('Garagem').reformada?demitir('fDesenv'):alerta('Você precisa reformar a garagem para ter funcionários no desenvolvimento!')}

    this.btnContratarProd.onclick = function() {getJanelaConstrucao('Operacional')?contratar('fProd'):alerta('Você não possui setor Operacional.')}
    this.btnDemitirProd.onclick = function() {getJanelaConstrucao('Operacional')?demitir('fProd'):alerta('Você não possui setor Operacional.')}

    this.btnContratarFin.onclick = function() {getJanelaConstrucao('Financeiro')?contratar('fFin'):alerta('Você não possui o setor Financeiro.')}
    this.btnDemitirFin.onclick = function() {getJanelaConstrucao('Financeiro')?demitir('fFin'):alerta('Você não possui o setor Financeiro.')}

    this.btnContratarMark.onclick = function() {getJanelaConstrucao('Marketing')?contratar('fMark'):alerta('Você não possui o setor de Marketing.')}
    this.btnDemitirMark.onclick = function() {getJanelaConstrucao('Marketing')?demitir('fMark'):alerta('Você não possui o setor de Marketing.')}

    this.btnContratarRh.onclick = function() {contratar('fRh')}
    this.btnDemitirRh.onclick = function() {demitir('fRh')}

    this.btnTreinar.onclick = function() {treinar()}

    this.abrirFechar = function() 
    {
        this.aberto = !this.aberto;
        if (this.aberto)
        {
            desativarBotoes();
            this.btnFechar.ativarInteracao();
            this.btnIrParaGaragem.ativarInteracao();
            this.btnContratarDesenv.ativarInteracao();
            this.btnDemitirDesenv.ativarInteracao();
            this.btnContratarProd.ativarInteracao();
            this.btnDemitirProd.ativarInteracao();
            this.btnContratarFin.ativarInteracao();
            this.btnDemitirFin.ativarInteracao();
            this.btnContratarMark.ativarInteracao();
            this.btnDemitirMark.ativarInteracao();
            this.btnContratarRh.ativarInteracao();
            this.btnDemitirRh.ativarInteracao();
            this.btnTreinar.ativarInteracao();
        }
        else
        {
            this.btnFechar.desativarInteracao();
            this.btnIrParaGaragem.desativarInteracao();
            this.btnContratarDesenv.desativarInteracao();
            this.btnDemitirDesenv.desativarInteracao();
            this.btnContratarProd.desativarInteracao();
            this.btnDemitirProd.desativarInteracao();
            this.btnContratarFin.desativarInteracao();
            this.btnDemitirFin.desativarInteracao();
            this.btnContratarMark.desativarInteracao();
            this.btnDemitirMark.desativarInteracao();
            this.btnContratarRh.desativarInteracao();
            this.btnDemitirRh.desativarInteracao();
            this.btnTreinar.desativarInteracao();
            ativarBotoes();
        }
    }
    this.desenhar = function() 
    {
        funcionarios = fDesenv + fProd + fFin + fMark + fRh;
        if (this.aberto)
        {
            ctx.save();

            desenharJanela();

            ctx.restore();
        }
    }
    function desenharJanela()
    {
        ctx.fillStyle = "#333333";
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        roundRect(este.x, este.y, este.width, este.height, { upperLeft: 20, upperRight: 20, lowerLeft: 20, lowerRight: 20 }, true, true)
       
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 24pt Century Gothic";
        ctx.fillText("Recursos Humanos", este.x + este.width/2, este.y + 10, este.width - 5);

        este.btnIrParaGaragem.desenhar();
        este.btnFechar.desenhar();
        roundRect(este.x, este.y + 60, este.width, este.height - 60, {lowerLeft: 20, lowerRight: 20 }, true, true);

        desenharTabela();
        escrever();
        este.btnContratarDesenv.desenhar();
        este.btnDemitirDesenv.desenhar();
        este.btnContratarProd.desenhar();
        este.btnDemitirProd.desenhar();
        este.btnContratarFin.desenhar();
        este.btnDemitirFin.desenhar();
        este.btnContratarMark.desenhar();
        este.btnDemitirMark.desenhar();
        este.btnContratarRh.desenhar();
        este.btnDemitirRh.desenhar();
        calcularPrecos();
        colocarDados();
        este.btnTreinar.desenhar();
        ctx.fillStyle = 'green';
        ctx.font = 'bold 24pt Century Gothic';
        custo = calcularTreinamento();
        ctx.fillText('Custo: ' + custo, este.x + 725, este.y + 500)
    }
    function desenharTabela()
    {
        ctx.fillStyle = 'lightgray';
        roundRect(este.x + 30, este.y + 100, 540, 460, {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10}, true, true);
        ctx.fillStyle = 'gray';
        roundRect(este.x + 30, este.y + 100, 540, 75, {upperLeft: 10, upperRight: 10}, true, true)
        ctx.strokeStyle = 'black';
        for (var i = 1; i < 3; i++)
        {
            ctx.beginPath();
            var X = (i * 180) + este.x + 30;
            ctx.moveTo(X, este.y + 100)
            ctx.lineTo(X, este.y + 560)
            ctx.stroke();
            ctx.closePath();
        }
        ctx.beginPath();
        ctx.moveTo(este.x + 30, este.y + 175);
        ctx.lineTo(este.x + 570, este.y + 175);
        ctx.stroke();
        ctx.closePath();
        for (var i = 1; i < 5; i++)
        {
            ctx.beginPath();
            var Y = (i * 77) + este.y + 175;
            ctx.moveTo(este.x + 30, Y)
            ctx.lineTo(este.x + 570, Y)
            ctx.stroke();
            ctx.closePath();
        }
    }
    function escrever()
    {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24pt Century Gothic'
        ctx.fillText('Área', este.x + 120, este.y + 120);
        ctx.font = 'bold 20pt Century Gothic'
        ctx.fillText('Funcionários', este.x + 300, este.y + 125);
        ctx.font = 'bold 24pt Century Gothic'
        ctx.fillText('Ações', este.x + 470, este.y + 120);
        var areas = ['Desenvolvimento', 'Produção', 'Finanças', 'Marketing'];
        ctx.fillStyle = 'black';
        for (var i = 0; i < 4; i++)
        {
            if (i == 0)
                ctx.font = 'bold 16pt Century Gothic'
            else
                ctx.font = 'bold 24pt Century Gothic'
            var Y = este.y + 175 + (i * 77) + 20
            ctx.fillText(areas[i], este.x + 120, Y);
        }
        ctx.fillText('Recursos', este.x + 120, este.y + 490);
        ctx.fillText('Humanos', este.x + 120, este.y + 520);
        ctx.font = 'bold 26pt Century Gothic'
        ctx.fillText(fDesenv, este.x + 300, este.y + 195);
        ctx.fillText(fProd, este.x + 300, este.y + 272);
        ctx.fillText(fFin, este.x + 300, este.y + 349);
        ctx.fillText(fMark, este.x + 300, este.y + 426);
        ctx.fillText(fRh, este.x + 300, este.y + 503);
    }
    function calcularPrecos()
    {
        var preco = 2000 * capacitacao
        este.btnContratarDesenv.text = fDesenv>=10?'--':formatarDinheiro(preco);
        este.btnDemitirDesenv.text = fDesenv>0?formatarDinheiro(preco * ((calendario.dia)/calendario.qtosDiasTemOMes[calendario.mes-1] + 1)):'--';

        preco = 2000 * capacitacao
        este.btnContratarProd.text = fProd>=10?'--':formatarDinheiro(preco);
        este.btnDemitirProd.text = fProd>0?formatarDinheiro(preco * ((calendario.dia)/calendario.qtosDiasTemOMes[calendario.mes-1] + 1)):'--';

        preco = 2000 * capacitacao
        este.btnContratarFin.text = fFin>=10?'--':formatarDinheiro(preco)
        este.btnDemitirFin.text = fFin>0?formatarDinheiro(preco * ((calendario.dia)/calendario.qtosDiasTemOMes[calendario.mes-1] + 1)):'--'

        preco = 2000 * capacitacao
        este.btnContratarMark.text = fMark>=10?'--':formatarDinheiro(preco)
        este.btnDemitirMark.text = fMark>0?formatarDinheiro(preco * ((calendario.dia)/calendario.qtosDiasTemOMes[calendario.mes-1] + 1)):'--'

        preco = 2000 * capacitacao
        este.btnContratarRh.text = fRh>=10?'--':formatarDinheiro(preco)
        este.btnDemitirRh.text = fRh>0?formatarDinheiro(ppreco * ((calendario.dia)/calendario.qtosDiasTemOMes[calendario.mes-1] + 1)):'--'
    }
    function colocarDados()
    {
        ctx.fillStyle = 'black';
        ctx.font = 'bold 20pt Century Gothic';
        ctx.fillText('Total de funcionários:', este.x + 725, este.y + 100)
        ctx.font = 'bold 22pt Century Gothic';
        ctx.fillText(funcionarios, este.x + 725, este.y + 125)
        ctx.font = 'bold 20pt Century Gothic';
        ctx.fillText('Gasto com salário:', este.x + 725, este.y + 175)
        ctx.font = 'bold 22pt Century Gothic';
        ctx.fillText(formatarDinheiro(este.calcularSalario()), este.x + 725, este.y + 200)
        ctx.font = 'bold 20pt Century Gothic';
        ctx.fillText('Média dos salários:', este.x + 725, este.y + 250)
        ctx.font = 'bold 22pt Century Gothic';
        if (funcionarios > 0)
            ctx.fillText(formatarDinheiro(este.calcularSalario()/funcionarios), este.x + 725, este.y + 275)
        else
            ctx.fillText(formatarDinheiro(0), este.x + 725, este.y + 275)
        ctx.font = 'bold 20pt Century Gothic';
        ctx.fillText('Provisão de funcionários:', este.x + 735, este.y + 325);
        ctx.font = 'bold 22pt Century Gothic';
        ctx.fillText('31.4%', este.x + 725, este.y + 350)
    }
    this.calcularSalario = function()
    {
        var total = 0;
        total += fDesenv * 2000 * capacitacao
        total += fProd * 2000 * capacitacao
        total += fFin * 2000 * capacitacao
        total += fMark * 2000 * capacitacao
        total += fRh * 2000 * capacitacao
        return total;
    }
    function calcularTreinamento()
    {
        var total = 0;
        total = 8000 * Math.pow(2, capacitacao);
        if (capacitacao < 10)
            return formatarDinheiro(total);
        else
            return '---';
    }
    function contratar(txt)
    {
        var atual = eval(txt);
        if (atual >= 10)
            alerta('Número máximo de funcionários atingido.')
        else
            fazerCompra('Contratação', 2000 * capacitacao, false, true, 0, function(){eval(txt + "=" + ++atual)})
    }
    function demitir(txt)
    {
        var atual = eval(txt);
        if (atual < 1)
            alerta('Número mínimo de funcionários atingido.');
        else
            fazerCompra('Demissão', (2000 * capacitacao) * ((calendario.dia)/calendario.qtosDiasTemOMes[calendario.mes-1] + 1), true, true, 1, function(){
                if (txt == 'fRh')
                {
                    if (funcionarios > 5 * atual - 1)
                        alerta('Demita mais funcionários de outras áreas para prosseguir.')
                    else
                        eval(txt + "=" + --atual)
                }
                else
                    eval(txt + "=" + --atual)
            })
    }
    function treinar()
    {
        if (funcionarios > 0)
        {
            if (capacitacao < 10)
                fazerCompra('Treinar', 8000 * Math.pow(2, capacitacao), false, true, 0, function(){capacitacao++;});
            else
                alerta('Os funcionários já estão com o treinamento máximo.');
        }
        else
            alerta('Você não tem funcionários para treinar!');
    }
    this.setRH = function(obj)
    {
        capacitacao = obj.Capacitacao;
        fDesenv = obj.FuncionariosDesenvolvimento;
        fProd = obj.FuncionariosProducao;
        fFin = obj.FuncionariosFinanceiro;
        fMark = obj.FuncionariosMarketing;
        fRh = obj.FuncionariosRH;
    }
    this.getRH = function()
    {
        var obj = new Object();
        obj.Capacitacao = capacitacao;
        obj.FuncionariosDesenvolvimento = fDesenv;
        obj.FuncionariosProducao = fProd;
        obj.FuncionariosFinanceiro = fFin;
        obj.FuncionariosMarketing = fMark;
        obj.FuncionariosRH = fRh;
        return obj;
    }
}
function pagarSalarios()
{
    var rh = getJanelaConstrucao('R. Humanos');
    if (rh)
    {
        var salario = rh.calcularSalario() * 1.314;
        barra.dinheiro -= salario;
    }
}