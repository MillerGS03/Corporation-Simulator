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
    $.each(arr, function(i, v){
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