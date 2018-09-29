iniciarSelecionar();

function iniciarSelecionar()
{
    $("#select").on("mousemove", criarEfeitoSelect);
    $("#select").on("change", testarOpcao);
    $("#select").on("mouseleave", apagarEfeitoSelect);


    var canvas = document.getElementById("meuCanvas");
    var ctx = canvas.getContext("2d");

    canvasSelect = document.getElementById("canvasSelect");
    ctxSelect = canvasSelect.getContext("2d");
    ctx.fillStyle = "white";
    roundRect(50, 100, 900, 500, {upperLeft: 50, upperRight:50, lowerLeft: 50, lowerRight:50}, true, true, ctx);
    ctx.font = "bold 20pt Century Gothic";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.fillText("Selecione o jogo desejado:", canvas.width/2, 200);
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
        ctxSelect = null;
        ctx = null;
        canvasSelect = null;
        canvas = null;

        abrir("jogo.html");
    }
}