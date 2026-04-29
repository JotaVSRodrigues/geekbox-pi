
function loginUser() {
    // let emailTemp = "joao@gmail.com"
    // let senhaTemp = "12345"

    let emailLogin = ipt_email_login.value
    let senhaLogin = ipt_senha_login.value 


    if (emailLogin == "" || senhaLogin == "") {
        alert("Há algum campo vazio. Preencha para prosseguir")

        // mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
        return false
    }

    // if (senhaLogin != senhaTemp || emailLogin != emailTemp) {
    //     alert("Email ou senha não correspondem")

    //     // mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
    //     return false;
    // } 

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailLogin,
            senhaServer: senhaLogin
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO loginUser()")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.ID_USUARIO = json.id;
                sessionStorage.NOME_USUARIO = json.nome; 
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.TELEFONE_USUARIO = json.telefone;

                setTimeout(function() {
                    window.location.href = "index.html";
                }, 1000); // apenas para exibir o loading
            });
        } else {
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}
