let classificacao = document.querySelector('.avaliacao');

function aplicarClassificacaoSalva(classificacaoSalva) {
    if (!classificacaoSalva) return;

    let stars = document.querySelectorAll('.star-icon');

    stars.forEach((star) => {
        let valor = parseFloat(star.getAttribute('data-avaliacao'));

        if (valor <= parseFloat(classificacaoSalva)) {
            star.classList.add('ativo');
        } else {
            star.classList.remove('ativo');
        }
    });
}

function changeClassificacao(e, itemId) {
    let stars = document.querySelectorAll('.star-icon');
    let dataAvaliacao = e.target.getAttribute('data-avaliacao');

    stars.forEach(function(star) {
        let valor = parseFloat(star.getAttribute('data-avaliacao'));
        if (valor <= parseFloat(dataAvaliacao)) {
            star.classList.add('ativo');
        } else {
            star.classList.remove('ativo');
        }
    });

    console.log(dataAvaliacao);

    fetch(`/itens/atualizar-classificacao`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            itemIdServer: itemId,
            classificacaoServer: dataAvaliacao,
        }),
    }).catch((error) => {
        console.error("erro ao fazer update de status: ", error);
    });

    return false;
}



function updateStatus(itemId) {
    let inputValue = select_status_item.value
    console.log(inputValue)

    fetch(`/itens/atualizar-status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            itemIdServer: itemId,
            statusServer: inputValue,
        }),
    }).then((resposta) => {
        getItem(itemId)

        if(inputValue === 'concluido') carregarItens()
    }).catch ((error) => {
        console.error("erro ao fazer update de status: ", error);
    });

    return false;
}

function updateResenha(itemId) {
    let resenhaText = textarea_resenha.value

    if (!resenhaText || resenhaText.trim().length === 0) {
        alert("Preencha a resenha para salvar.")
        return false
    }

     fetch(`/itens/atualizar-resenha`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            itemIdServer: itemId,
            resenhaServer: resenhaText,
        }),
    }).then(function (resposta) {
        console.log("resposta: ", resposta);

        if(resposta.ok) {
            alert("Update de resenha realizado com sucesso");
            
            setTimeout(() => {
                getItem(itemId);
            }, "1000");
        } else {
            throw "Houve um erro ao realizar o update de resenha!";
        }
    }).catch (function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

function editarResenha(itemId) {
    const container = document.querySelector(".select-card-resenha");

    container.innerHTML = `
        <h3>Editar resenha.</h3>
        <div class="wishlist-content-text">
            <textarea id="textarea_resenha">${itemAtual.resenha}</textarea>

            <div class="btn-cadastro-div">
                <button onclick="updateResenha(${itemId})" class="btn-cadastro">Salvar Resenha</button>
            </div>
        </div>
    `;

}

function openMiniModal(itemId, btn) {
    const existingModal = document.querySelector('.mini-modal');
    if (existingModal) existingModal.remove();

    const miniModal = document.createElement('div');
    miniModal.classList.add('mini-modal');
    miniModal.innerHTML = `
        <div class="mini-modal-content">
            <p>Deseja excluir este item?</p>

            <button onclick="excluirItem(${itemId})" class="btn-excluir">Excluir</button>
            <button onclick="fecharMiniModal()" class="btn-cancelar">Cancelar</button>
        </div>
    `;

    btn.parentNode.appendChild(miniModal);
    requestAnimationFrame(() => {
        miniModal.classList.add('show')
    })
}

function fecharMiniModal() {
    const miniModal = document.querySelector('.mini-modal');

    if (miniModal) {
        miniModal.classList.add('closing')
        setTimeout(() => {
            miniModal.remove();
        }, 600)
    }
}

function excluirItem(itemId) {
    fetch(`/itens/excluir/${itemId}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
            console.log("Item excluído:", data);
            fecharMiniModal();
            carregarItens();
        })
        .catch(e => console.error("Erro ao excluir:", e));
}