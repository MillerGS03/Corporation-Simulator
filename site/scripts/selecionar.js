var numeroDeJogos;

iniciarSelecionar();

function iniciarSelecionar()
{
    $("#newGame").on('click', function(){
        $("#modalJogo").css('display', 'block');
    });
    $("#btnSair").on('click', function(){
        $("#modalJogo").css('display', 'none');
    });
    $("#criar").on('click', function(){
        validarCriacao();
        testarOpcao();
    });
    $("#nomeJogo").on('keypress', function(e) {
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

    canvasSelect = document.getElementById("canvasSelect");
    ctxSelect = canvasSelect.getContext("2d");
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

        var grdSelect = ctxSelect.createRadialGradient(x, y, 50, x, y, 500);
        grdSelect.addColorStop(0, "rgb(190, 190, 190)");
        grdSelect.addColorStop(1, "white");

        ctxSelect.fillStyle = grdSelect;
        //ctxSelect.fillRect(0, 0, canvasSelect.width, canvasSelect.height);

        roundRect(0, 0, canvasSelect.width, canvasSelect.height, {upperLeft: 10, upperRight:10, lowerLeft: 10, lowerRight:10},
                  true, false, ctxSelect);
    }
    function apagarEfeitoSelect ()
    {
        ctxSelect.fillStyle = "white";
        roundRect(0, 0, canvasSelect.width, canvasSelect.height, {upperLeft: 10, upperRight:10, lowerLeft: 10, lowerRight:10},
            true, false, ctxSelect);
    }

    function addOptions()
    {
        var s = document.getElementById("select");
        var primeiraOpcao = s.options[0];
        $("#select").empty();
        s.add(primeiraOpcao);
        $.ajax({
            url:'http://' + local + ':3000/jogos/' + user.CodUsuario
        }).done(function(dados){
            $.each(dados, function(dado){
                var o = document.createElement("option");
                o.text = dados[dado].Nome;
                s.add(o);
            })
        })
    }

    function testarOpcao()
    {
        var s = document.getElementById("select");
        if (s != null && s.selectedIndex > 0) {
            $("#btnCarregar").css("visibility", "visible");
            $("#btnCarregar").on("click", carregarJogo);
            $("#btnRemover").css("visibility", "visible");
            $("#btnRemover").on("click", removerOpcao);
        }
    }

    function carregarJogo()
    {
        $("#select").off("mousemove", criarEfeitoSelect);
        $("#select").off("change", testarOpcao);
        $("#select").off("mouseleave", apagarEfeitoSelect);
        $("#btnCarregar").off("click", carregarJogo);
        var nomeJogo = document.getElementById('select').options[document.getElementById('select').selectedIndex].value;
        ctxSelect = null;
        canvasSelect = null;
        $.ajax({
            url: 'http://' + local + ':3000/jogos/' + user.CodUsuario + "/" + nomeJogo
        }).done(function(dados){jogo = dados[0];abrirInfo('jogo.html');})
    }
    function validarCriacao()
    {
        var nome = document.getElementById("nomeJogo");

        $.get('http://' + local + `:3000/jogos/${user.CodUsuario}/${nome.value}`, function(resposta) {
            if (resposta.length > 0) {
                $("#txtNome").text('Nome do novo jogo - Nome já existente!:');
                $("#txtNome").css('color', 'darkred');
            }
            else if (nome.value.trim() == ""){
                $("#txtNome").text('Nome do novo jogo - Não pode estar vazio:');
                $("#txtNome").css('color', 'darkred');
            }
            else if (nome.value.length <= 2){
                $("#txtNome").text('Nome do novo jogo - Mínimo de 3 caracteres:');
                $("#txtNome").css('color', 'darkred');
            }
            else if (nome.value.length > 30){
                $("#txtNome").text('Nome do novo jogo - Maximo de 30 caracteres:');
                $("#txtNome").css('color', 'darkred');
            }
            else
                adicionarUmaOpcao(nome.value);
        })
    }
    function adicionarUmaOpcao(txt)
    {
        document.getElementById("nomeJogo").value = "";
        $("#btnSair").trigger('click');
        $.post('http://' + local + ':3000/addJogo/' + user.CodUsuario + '/' + txt);
        setTimeout(function() {
            addOptions();
            $.ajax({
                url: 'http://' + local + ':3000/jogos/' + user.CodUsuario + "/" + txt
            }).done(function(dados){jogo = dados[0]; abrirInfo("jogo.html");})
        }, 10);

    }
    function removerOpcao()
    {
        confirme('Excluir esse jogo', function(){
            //Guilty Crown - Episódio 
            var select = document.getElementById('select');
            var nomeJogo = select.options[select.selectedIndex].value;
            $.ajax({
                url: 'http://' + local + ':3000/jogos/' + `${user.CodUsuario}/${nomeJogo}`,
                type: 'DELETE',
            });
            setTimeout(function() {
                abrirInfo("selecionar.html");
            }, 10);
        });
    }
}
