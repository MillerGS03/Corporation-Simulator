iniciarSelecionar();

function iniciarSelecionar()
{
    $("#newSimu").on('click', function(){
        $("#modalSimulacao").css('display', 'block');
    });
    $("#btnSair").on('click', function(){
        $("#modalSimulacao").css('display', 'none');
    });
    $("#criar").on('click', function(){
        validarCriacao();
        testarOpcao();
    });
    $("#nomeSimulacao").on('keypress', function(e){
        if (e.which == 13)
        {
            validarCriacao();
            testarOpcao();
            return false;
        }
    });
    $("#select").on("mousemove", criarEfeitoSelect);
    $("#select").on("change", testarOpcao);
    $("#select").on("mouseleave", apagarEfeitoSelect);

    canvasSimulacoes = document.getElementById("canvasSimulacoes");
    ctxSimulacoes = canvasSimulacoes.getContext("2d");
    addOptions();

    
    function roundRect(x, y, width, height, radius, fill, stroke, contexto) // Desenha um retângulo com bordas redondas
    {
        var cornerRadius = { upperLeft: 0, upperRight: 0, lowerLeft: 0, lowerRight: 0 };
        if (typeof stroke == "undefined") {
            stroke = true;
        }
        if (typeof radius === "object") {
            for (var side in radius) {
                cornerRadius[side] = radius[side];
            }
        }
        else if (typeof radius === "number")
            for (var side in cornerRadius)
                cornerRadius[side] = radius;
    
        contexto.beginPath();
        contexto.moveTo(x + cornerRadius.upperLeft, y);
        contexto.lineTo(x + width - cornerRadius.upperRight, y);
        contexto.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
        contexto.lineTo(x + width, y + height - cornerRadius.lowerRight);
        contexto.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
        contexto.lineTo(x + cornerRadius.lowerLeft, y + height);
        contexto.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
        contexto.lineTo(x, y + cornerRadius.upperLeft);
        contexto.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
        contexto.closePath();
        if (stroke) {
            contexto.stroke();
        }
        if (fill) {
            contexto.fill();
        }
    }
    function criarEfeitoSelect (e)
    {
        var height, rx, ry, width, x, xc, y, yc, w, h;

        var rect = e.target.getBoundingClientRect();

        x = e.clientX - rect.left;
        y = e.clientY - rect.top;

        var grdSelect = ctxSimulacoes.createRadialGradient(x, y, 50, x, y, 500);
        
        grdSelect.addColorStop(0, "rgb(190, 190, 190)");
        grdSelect.addColorStop(1, "white");

        ctxSimulacoes.fillStyle = grdSelect;

        roundRect(0, 0, canvasSimulacoes.width, canvasSimulacoes.height, 1.3 * window.innerWidth / 100,
                  true, false, ctxSimulacoes);
    }
    function apagarEfeitoSelect ()
    {
        ctxSimulacoes.fillStyle = "white";
        roundRect(0, 0, canvasSimulacoes.width, canvasSimulacoes.height, 1.3 * window.innerWidth / 100,
            true, false, ctxSimulacoes);
    }

    function addOptions()
    {
        var s = document.getElementById("select");
        var primeiraOpcao = s.options[0]
        $("#select").empty();
        s.add(primeiraOpcao);
        $.ajax({
            url:'http://' + local + ':3000/simulacoes/' + user.CodUsuario
        }).done(function(dados){
            if (dados + '' != '')
            {
                $.each(dados, function(i, v){
                    var o = document.createElement("option");
                    o.text = v.Nome;
                    s.add(o);
                })
            }
        })
    }

    function testarOpcao()
    {
        var s = document.getElementById("select");
        if (s.selectedIndex > 0) {
            $("#btnCarregar").css("visibility", "visible");
            $("#btnCarregar").on("click", function(){
                carregarSimulacao(s.options[s.selectedIndex].value)
            });
            $("#btnRemover").css("visibility", "visible");
            $("#btnRemover").on("click", function(){
                removerOpcao();
            });
        }
    }

    function carregarSimulacao(txt)
    {
        $.ajax({
            url:'http://' + local + ':3000/simulacoes/' + user.CodUsuario + '/' + txt
        }).done(function(dados){
            simulacao = dados[0];
            $("#select").off("mousemove");
            $("#select").off("change");
            $("#select").off("mouseleave");
            $("#btnCarregar").off("click");
            $("#btnRemover").off('click');
            ctxSimulacoes = null;
            canvasSimulacoes = null;
            abrirInfo("simulacao.html");
        })
    }
    function validarCriacao()
    {
        var nome = document.getElementById("nomeSimulacao");
        if (nome.value.trim() == ""){
            $("#txtNome").text('Nome da nova simulacao - Não pode estar vazio:');
            $("#txtNome").css('color', 'darkred');
        }
        else if (nome.value.length <= 2){
            $("#txtNome").text('Nome da nova Simulacao - Mínimo de 3 caracteres:');
            $("#txtNome").css('color', 'darkred');
        }
        else
            adicionarUmaOpcao(nome.value);
    }
    function adicionarUmaOpcao(txt)
    {
        document.getElementById("nomeSimulacao").value = "";
        $("#btnSair").trigger('click');
        $.post('http://' + local + ':3000/addSimulacao/' + user.CodUsuario + '/' + txt);
        setTimeout(function(){
            carregarSimulacao(txt)
        }, 20);
    }
    function removerOpcao()
    {
        var nomeSimulacao =document.getElementById('select').options[document.getElementById('select').selectedIndex].value;
        confirma('Deseja realmente excluir essa simulação?', function(){
            $.ajax({
                url: 'http://' + local + ':3000/simulacoes/' + `${user.CodUsuario}/${nomeSimulacao}`,
                type: 'DELETE',
            });
            setTimeout(function() {
                abrirInfo("simulacoes.html");
            }, 10);
        });
    }
}