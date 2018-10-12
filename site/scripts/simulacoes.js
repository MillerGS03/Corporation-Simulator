iniciarSelecionar();

function iniciarSelecionar()
{
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

        roundRect(0, 0, canvasSimulacoes.width, canvasSimulacoes.height, {upperLeft: 10, upperRight:10, lowerLeft: 10, lowerRight:10},
                  true, false, ctxSimulacoes);
    }
    function apagarEfeitoSelect ()
    {
        ctxSimulacoes.fillStyle = "white";
        roundRect(0, 0, canvasSimulacoes.width, canvasSimulacoes.height, {upperLeft: 10, upperRight:10, lowerLeft: 10, lowerRight:10},
            true, false, ctxSimulacoes);
    }

    function addOptions()
    {
        var s = document.getElementById("select");
        var numeroDeJogos = 3 //pegar do bd
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
        if (s.selectedIndex > 0) {
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
        ctxSimulacoes = null;
        canvasSimulacoes = null;

        abrir("simulacao.html");
    }
}