Emprestimo.excluirEmprestimo = function(i, e, b)
{
    if (i > -1 && e && b)
    {
        fazerCompra('Pagar empréstimos', emprestimos[i].valor, false, true, 1, function(){
            emprestimos.splice(i, 1);
            e.abrirFechar();
            b.btnRealizarEmprestimo.y -= 54;
            b.btnPagarEmprestimo.y -= 54;
        })
    }
    else if (i > -1)
        emprestimos.splice(i, 1);
}
Emprestimo.atualizarValor = function()
{
    var valor = 0;
    for (var i = 0; i < emprestimos.length; i++)
    {
        valor = Emprestimo.calcularMensal(emprestimos[i])
        emprestimos[i].valor -= valor;
        barra.dinheiro -= valor;
        if (emprestimos[i].valor <= 0)
            Emprestimo.excluirEmprestimo(i)
    }
}
Emprestimo.calcularMensal = function(x)
{
    var valor = 0;
    valor = (x.j/(1 - (1/(Math.pow(1 + x.j, x.p)))))
    valor = valor * x.valorInicial;
    return valor;
}
function Emprestimo(b)
{
    var falhou = false;
    var este = this;
    var nParcelas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    this.parcelas = new OptionSelector({
        x: canvas.width/2 - 125,
        y: 400,
        width: 250,
        height: 75,
        textAlign: 'left',
        font: 'bold 15pt Century Gothic',
        opcoes: nParcelas,
    })
    this.txtValor = new TextBox({
        enabled: true,
        text: '',
        x: canvas.width/2 - 175,
        y: 500,
        width: 350,
        height: 75,
        padding: null,
        borderRadius: null,
        font: '20pt Century Gothic',
        color: 'black',
        backgroundColor: null,
        maxlength: null,
        placeholder: 'Digite aqui o valor do empréstimo',
        placeholderColor: null,
        onlynumbers: true,
        acceptFloats: true,
        maxvalue: Math.abs(barra.dinheiro * 2),
        textAlign: 'right',
        beforeTextChanged: null,
        afterTextChanged: null
    })
    var aberto = false;

    this.btnTentar = new BotaoRetangular(canvas.width/6 + 100, 600, 200, 50,
                                        {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                        200, 50, 'green', '#329B24', null, null, 'bold 14pt Century Gothic',
                                        'white', 'Efetuar empréstimo', false, false, false);
    this.btnCancelar = new BotaoRetangular(canvas.width/6 + 350, 600, 200, 50,
                                          {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10},
                                          200, 50, 'darkred', '#AA2918', null, null, 'bold 14pt Century Gothic',
                                          'white', 'Cancelar', false, false, false);
    this.btnTentar.onclick = function(){tentarEmprestimo()}
    this.btnCancelar.onclick = function(){este.abrirFechar()}

    function tentarEmprestimo()
    {
        var ret = chance();
        console.log(ret)
        if (ret >= 30)
        {
            var aux = new Object();
            aux.dataCriacao = formatarData(calendario.dia, calendario.mes, calendario.ano); 
            aux.valorInicial = parseInt(este.txtValor.text);
            aux.j = calcularJuros();
            aux.p = nParcelas[este.parcelas.indiceOpcaoAtual];
            aux.valor = Emprestimo.calcularMensal(aux) * aux.p;
            aux.indice = emprestimos.length;
            barra.dinheiro += aux.valorInicial;
            emprestimos.push(aux);
            if (emprestimos.length < 5 && b != null)
            {
                b.btnRealizarEmprestimo.y += 54;
                b.btnPagarEmprestimo.y += 54;
            }
            else if (b != null)
            {
                b.btnPagarEmprestimo.x = canvas.width/2 - 125;
                b.btnPagarEmprestimo.y += 10;
            }
            este.abrirFechar();
        }
        else
            falhou = true;
    }
    this.desenhar = function()
    {
        if (aberto)
            desenharTelaAdicionarEmprestimo();
    }
    this.abrirFechar = function()
    {
        aberto = !aberto;
        if (aberto)
        {
            b.desativar();
            this.ativar();
        }
        else
        {
            this.desativar();
            b.ativar();
        }
    }
    this.ativar = function()
    {
        este.btnCancelar.ativarInteracao();
        este.btnTentar.ativarInteracao();
        este.txtValor.ativarInteracao();
        este.parcelas.ativarInteracao();
        aberto = true;
    }
    this.desativar = function()
    {
        este.btnCancelar.desativarInteracao();
        este.btnTentar.desativarInteracao();
        este.txtValor.desativarInteracao();
        este.parcelas.desativarInteracao();
        aberto = false;
    }
    function desenharTelaAdicionarEmprestimo()
    {
        ctx.save();
        ctx.fillStyle = 'lightgray';
        ctx.strokeStyle = 'black';
        roundRect(canvas.width/6, canvas.height/4, (4*canvas.width)/6, 500, {upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight:10}, true, true);
        ctx.fillStyle = '#333333';
        roundRect(canvas.width/6, canvas.height/4, (4*canvas.width)/6, 60, {upperLeft: 10, upperRight: 10, lowerLeft: 0, lowerRight:0}, true, false);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = 'bold 20pt Century Gothic'
        ctx.fillText('Realizar empréstimo', (3*canvas.width)/6, canvas.height/4 + 30)
        ctx.textAlign = 'center';
        ctx.font = '15pt Century Gothic';
        ctx.fillStyle = 'green'
        ctx.fillText('Valor máximo: ' + formatarDinheiro(barra.dinheiro*2), canvas.width/2, 325)
        ctx.fillStyle = 'darkred';
        var aux = {
            j: calcularJuros(),
            p: nParcelas[este.parcelas.indiceOpcaoAtual],
            valorInicial: isNaN(parseInt(este.txtValor.text))?0:parseInt(este.txtValor.text)
        }
        ctx.fillText('Pagamento mensal: ' + formatarDinheiro(Emprestimo.calcularMensal(aux)), canvas.width/2, 350)
        ctx.fillStyle = 'black';
        ctx.fillText('Taxa de juros: ' + (calcularJuros()*100).toFixed(2) + '%', canvas.width/2, 375)
        este.txtValor.desenhar();
        este.btnCancelar.desenhar();
        este.btnTentar.desenhar();
        este.parcelas.desenhar();
        if (falhou)
        {
            ctx.font = 'bold 20pt Century Gothic'
            ctx.textAlign = 'center'
            ctx.fillStyle = 'darkred';
            ctx.fillText('Empréstimo falhou.', canvas.width/2, 275)
        }
        ctx.restore();
    }
    function calcularJuros()
    {
        var fat = Math.sqrt(calendario.f);
        return Math.pow(Math.E, (fat * (-1.1))) * 0.15;
    }
    function chance()
    {
        var v = 0;
        var valorDoEmprestimo = isNaN(parseInt(este.txtValor.text))?0:parseInt(este.txtValor.text);
        var nFinanceiro = getJanelaConstrucao('R. Humanos')?getJanelaConstrucao('R. Humanos').fFin:1;
        v = Math.sqrt(calendario.f) * Math.pow(barra.nivel, 3) * Math.pow(nFinanceiro, 2) * Math.pow(valorDoEmprestimo, -1/3)
        return v;
    }
}