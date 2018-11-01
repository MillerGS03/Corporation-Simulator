var c;
$("#sairModal").on('click', function(){
	$("#modal").css('display', 'none');
})
$("#sel").on('change', function(){
    var option = $("#sel").val();
    if ($("input[type=radio]").is(':checked'))
    {
        $.ajax({
            url: 'http://' + local + ':3000/simulacao/' + simulacao.CodSimulacao + '/contas/' + option + '/' + ($("input[type=radio]:checked").val())
        }).done(function(dados){
            c = dados;
            fazerTabela(c);
        })
    }
})
$("input[type=radio]").on('change', function(){
    var option = $("#sel").val();
    if (option != null)
    {
        $.ajax({
            url: 'http://' + local + ':3000/simulacao/' + simulacao.CodSimulacao + '/contas/' + option + '/' + ($("input[type=radio]:checked").val())
        }).done(function(dados){
            c = dados;
            fazerTabela(c);
        })
    }
})

function fazerTabela(arr)
{
    if ($("#divTabela").length)
        $("#divTabela").remove();
    $("#painelConta").append('<div id="divTabela" class="tabelaContas"><table id="table" class="tabela"><tr class="inicio"><td>Nome</td><td>Tipo</td><td>Valor</td><td>Frequência</td><td>Classificação</td></tr>');
    if ($("#sel").val() == 'Valor')
    {
        if ($("input[type=radio]:checked").val() == 'asc')
            arr = arr.sort(compararValor)
        else
            arr = arr.sort(compararValorDesc)
    }
    else if ($("#sel").val() == 'IntervaloDeTempo')
    {
        if ($("input[type=radio]:checked").val() == 'asc')
            arr = arr.sort(compararFreq)
        else
            arr = arr.sort(compararFreqDesc)
    }
    else if ($("#sel").val() == 'CodClassificacao')
    {
        if ($("input[type=radio]:checked").val() == 'asc')
            arr = arr.sort(compararClass)
        else
            arr = arr.sort(compararClassDesc)
    }
    $.each(arr, function(i, v){
        if (v.Marcado == 0)
        {
            var str = '';
            if (i % 2 == 0)
                str = '<tr class="par"><td>';
            else
                str = '<tr class="impar"><td>';
            str += v.Nome + '</td><td>';
            str += (v.Valor < 0?'Perda':'Ganho') + '</td><td>';
            str += Math.abs(v.Valor) + '</td><td>';
            str += v.IntervaloDeTempo.substring(0, v.IntervaloDeTempo.length - 1);
            if (v.IntervaloDeTempo.charAt(v.IntervaloDeTempo.length - 1) == 'D')
                str += ' dias' + '</td><td>';
            else if (v.IntervaloDeTempo.charAt(v.IntervaloDeTempo.length - 1) == 'M')
                str += ' meses' + '</td><td>';
            else
                str += ' anos' + '</td><td>';
            for (var i = 0; i < classificacoes.length; i++)
                if(classificacoes[i].CodClassificacao == v.CodClassificacao)
                    str += classificacoes[i].Nome + '</td>';
            str += '</tr>';
            $("#table").append(str);
        })
        $("#painelConta").append('</table></div>');
        }
}

function compararValor(a, b)
{
    var i = Math.abs(a.Valor);
    var k = Math.abs(b.Valor);
    if (i > k)
        return 1;
    if (i < k)
        return -1;
    if (i == k)
        return 0;
}
function compararValorDesc(a, b)
{
    var i = Math.abs(a.Valor);
    var k = Math.abs(b.Valor);
    if (i < k)
        return 1;
    if (i > k)
        return -1;
    if (i == k)
        return 0;
}
function compararFreq(a, b)
{
    if (a.IntervaloDeTempo.charAt(a.IntervaloDeTempo.length - 1) == b.IntervaloDeTempo.charAt(b.IntervaloDeTempo.length - 1))
    {
        if (a.IntervaloDeTempo > b.IntervaloDeTempo)
            return 1;
        else if (a.IntervaloDeTempo < b.IntervaloDeTempo)
            return -1;
        else
            return 0;
    }
    else if(a.IntervaloDeTempo.charAt(a.IntervaloDeTempo.length - 1) == 'D')
        return -1;
    else if (a.IntervaloDeTempo.charAt(a.IntervaloDeTempo.length - 1) == 'M' && b.IntervaloDeTempo.charAt(b.IntervaloDeTempo.length - 1) == 'D')
        return 1;
    else if (a.IntervaloDeTempo.charAt(a.IntervaloDeTempo.length - 1) == 'M' && b.IntervaloDeTempo.charAt(b.IntervaloDeTempo.length - 1) == 'A')
        return -1;
    else if (a.IntervaloDeTempo.charAt(a.IntervaloDeTempo.length - 1) == 'A')
        return 1;
    else
        return 0;
}
function compararFreqDesc(a, b)
{
    if (a.IntervaloDeTempo.charAt(a.IntervaloDeTempo.length - 1) == b.IntervaloDeTempo.charAt(b.IntervaloDeTempo.length - 1))
    {
        if (a.IntervaloDeTempo > b.IntervaloDeTempo)
            return -1;
        else if (a.IntervaloDeTempo < b.IntervaloDeTempo)
            return 1;
        else
            return 0;
    }
    else if(a.IntervaloDeTempo.charAt(a.IntervaloDeTempo.length - 1) == 'D')
        return 1;
    else if (a.IntervaloDeTempo.charAt(a.IntervaloDeTempo.length - 1) == 'M' && b.IntervaloDeTempo.charAt(b.IntervaloDeTempo.length - 1) == 'D')
        return -1;
    else if (a.IntervaloDeTempo.charAt(a.IntervaloDeTempo.length - 1) == 'M' && b.IntervaloDeTempo.charAt(b.IntervaloDeTempo.length - 1) == 'A')
        return 1;
    else if (a.IntervaloDeTempo.charAt(a.IntervaloDeTempo.length - 1) == 'A')
        return -1;
    else
        return 0;
}
function compararClass(a, b)
{
    var i = a.CodClassificacao;
    var k = b.CodClassificacao;
    for (var n = 0; n < classificacoes.length; n++)
        for (var m = 0; m < classificacoes.length; m++)
        {
            if (i == classificacoes[n].CodClassificacao && k == classificacoes[m].CodClassificacao)
            {
                if (classificacoes[n].Nome > classificacoes[m].Nome)
                    return 1;
                else if (classificacoes[n].Nome < classificacoes[m].Nome)
                    return -1;
                else
                    return 0;
            }
        }
}
function compararClassDesc(a, b)
{
    var i = a.CodClassificacao;
    var k = b.CodClassificacao;
    for (var n = 0; n < classificacoes.length; n++)
        for (var m = 0; m < classificacoes.length; m++)
        {
            if (i == classificacoes[n].CodClassificacao && k == classificacoes[m].CodClassificacao)
            {
                if (classificacoes[n].Nome > classificacoes[m].Nome)
                    return -1;
                else if (classificacoes[n].Nome < classificacoes[m].Nome)
                    return 1;
                else
                    return 0;
            }
        }
}