var numeroDeJogos;

iniciarSelecionar();

$("#newGame").on('click', function(){
    $("#modalJogo").css('display', 'block');
});
$("#btnSair").on('click', function(){
    $("#modalJogo").css('display', 'none');
});
$("#criar").on('click', function(){
    validarCriacao();
    return false;
});

function iniciarSelecionar()
{
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
        numeroDeJogos = 3 //pegar do bd
        for (var i = 1; i <= numeroDeJogos; i++)
        {
            var o = document.createElement("option");
            o.text = "ola";
            s.add(o);
        }
    }

    function testarOpcao()
    {
        var s = document.getElementById("select");
        if (s != null && s.selectedIndex > 0) {
            $("#btnCarregar").css("visibility", "visible");
            $("#btnCarregar").on("click", carregarJogo);
        }
    }

    function carregarJogo()
    {
        $("#select").off("mousemove", criarEfeitoSelect);
        $("#select").off("change", testarOpcao);
        $("#select").off("mouseleave", apagarEfeitoSelect);
        $("#btnCarregar").off("click", carregarJogo);
        ctxSelect = null;
        canvasSelect = null;

        abrir("jogo.html");
    }
}
function validarCriacao()
{
    var nome = document.getElementById("nomeJogo");
    if (nome.value.trim() == ""){
        $("#txtNome").text('Nome do novo jogo - Não pode estar vazio:');
        $("#txtNome").css('color', 'darkred');
    }
    else if (nome.value.length <= 2){
        $("#txtNome").text('Nome do novo jogo - Mínimo de 3 caracteres:');
        $("#txtNome").css('color', 'darkred');
    }
    else
        adicionarUmaOpcao(nome.value);
}
function adicionarUmaOpcao(txt)
{
    $("#btnSair").trigger('click');
    var s = document.getElementById("select");
    var o = document.createElement("option");
    o.text = txt;
    s.add(o);
    s.options[++numeroDeJogos].selected = true;
    testarOpcao();
}