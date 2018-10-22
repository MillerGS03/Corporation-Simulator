function logar() {
    var username = document.getElementById('username').value;
    var senha = document.getElementById('senha').value;

    if (username && senha)
    {
        $.get('http://localhost:3000/getUsuario/' + username, function(resposta) {
            if (resposta.length > 0)
            {
                var hash = resposta[0].Senha;
                $.post('http://localhost:3000/autenticar/', {SenhaDigitada: senha, Hash: hash}, function(res) {
                    if (res)
                        abrir("html/informacoes.html");
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