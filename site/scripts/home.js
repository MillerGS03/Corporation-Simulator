function logar() {
    var username = document.getElementById('username').value;
    var senha = document.getElementById('senha').value;

    if (username && senha)
    {
        $.get('http://' + local + ':3000/getUsuario/' + username, function(resposta) {
            if (resposta.length > 0)
            {
                var hash = resposta[0].Senha;
                $.post('http://' + local + ':3000/autenticar/', {SenhaDigitada: senha, Hash: hash}, function(res) {
                    if (res)
                    {
                        setCookie("CodUsuario", resposta[0].CodUsuario, 30);
                        $("#logout").css("visibility", "visible");
                        abrir("html/informacoes.html");
                        user = resposta[0];
                    }
                    else
                        alert("Senha inválida!");
                })
            }
            else
                alert("Usuário inexistente!");
        });
    }
    else
        alert("Digite o nome de usuário e a senha!");
}