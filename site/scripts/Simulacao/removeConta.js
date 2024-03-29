$("#painelConta").css('height', '70vh')
$("#sairModal").on('click', function(){
    $("#modal").css('display', 'none');
})
$("#selectContas").change(function(){
    if (document.getElementById('selectContas').selectedIndex > 0)
    {
        $("#valorE").text('Valor: ').append('$' + contas[document.getElementById('selectContas').selectedIndex - 1].Valor);
        $("#valorE").css('display', 'inline-block');
    }
    else
        $("#valorE").css('display', 'none');
});
$("#btnExcluirConta").on('click', function(){
    if (document.getElementById('selectContas').selectedIndex > 0)
        confirma('Deseja realmente excluir essa conta?', function(){
            $.ajax({
                url: 'http://' + local + ':3000/excluirConta/' + contas[document.getElementById('selectContas').selectedIndex - 1].CodPatrimonio,
                type: 'DELETE'
            })
            setTimeout(function() {
                $.ajax({url: 'http://' + local + ':3000/getContas/' + simulacao.CodSimulacao}).done(function(dados) {
                    contas = dados;
                    atualizarPontosConta();
                    atualizarPontosClass();
                    $("#valorE").css('display', 'none');
                    document.getElementById('selectContas').options[0].selected = 'selected';
                    setTimeout(function() {
                        addOptions();
                    }, 300);
                })
            }, 300)
        })
})

function addOptions()
{
    var s = document.getElementById('selectContas');
    var p = s.options[0];
    $("#selectContas").empty();
    s.add(p)
    for (var i = 0; i < contas.length; i++)
    {
        if (contas[i].Marcado != 1)
        {
            var o = document.createElement('option');
            o.text = contas[i].Nome;
            s.add(o);
        }
    }
}

setTimeout(addOptions, 300)