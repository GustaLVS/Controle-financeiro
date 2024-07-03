document.getElementById('ButAdd').addEventListener('click', adicionarGastoLucro);

function adicionarGastoLucro() {
    const descricao = document.getElementById('desc').value;
    const valor = parseFloat(document.getElementById('valor').value.replace(',', '.'));
    const tipo = document.getElementById('type').value;

    if (!descricao || isNaN(valor)) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    const tabela = document.querySelector('.info table tbody');
    const novaLinha = tabela.insertRow();

    const celulaDescricao = novaLinha.insertCell(0);
    const celulaValor = novaLinha.insertCell(1);
    const celulaTipo = novaLinha.insertCell(2);
    const celulaRemover = novaLinha.insertCell(3);
    const celulaEditar = novaLinha.insertCell(4);

    celulaDescricao.textContent = descricao;
    celulaValor.textContent = `R$${valor.toFixed(2).replace('.', ',')}`;
    
    const iconeTipo = document.createElement('i');
    iconeTipo.className = tipo === 'Entrada' ? 'bi bi-arrow-up-square-fill' : 'bi bi-arrow-down-square-fill';
    iconeTipo.id = tipo === 'Entrada' ? 'Arrow-Up' : 'Arrow-Down';
    celulaTipo.appendChild(iconeTipo);

    const botaoRemover = document.createElement('button');
    botaoRemover.className = 'remove';
    botaoRemover.innerHTML = '<i class="bi bi-x-square-fill"></i>';
    botaoRemover.addEventListener('click', removerGastoLucro);
    celulaRemover.appendChild(botaoRemover);

    const botaoEditar = document.createElement('button');
    botaoEditar.className = 'edit';
    botaoEditar.innerHTML = '<i class="bi bi-pencil-square"></i>';
    botaoEditar.addEventListener('click', editarGastoLucro);
    celulaEditar.appendChild(botaoEditar);

    // Atualiza os valores totais
    atualizarValores(tipo, valor);

    // Limpa os campos de entrada
    document.getElementById('desc').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('type').value = 'Entrada';
}

function removerGastoLucro(event) {
    const row = event.target.parentElement.parentElement.parentElement;
    const valor = parseFloat(row.children[1].textContent.replace('R$', '').replace(',', '.'));
    const tipo = row.children[2].firstElementChild.id === 'Arrow-Up' ? 'Entrada' : 'Saída';

    // Remove a linha da tabela
    row.remove();

    // Atualiza os valores totais
    atualizarValores(tipo, -valor);
}

function editarGastoLucro(event) {
    const row = event.target.parentElement.parentElement.parentElement;
    const descricao = row.children[0].textContent;
    const valor = parseFloat(row.children[1].textContent.replace('R$', '').replace(',', '.'));
    const tipo = row.children[2].firstElementChild.id === 'Arrow-Up' ? 'Entrada' : 'Saída';

    // Preenche os campos de entrada com os valores atuais
    document.getElementById('desc').value = descricao;
    document.getElementById('valor').value = valor.toFixed(2).replace('.', ',');
    document.getElementById('type').value = tipo;

    // Remove a linha da tabela
    row.remove();

    // Atualiza os valores totais removendo o valor atual
    atualizarValores(tipo, -valor);
}

function atualizarValores(tipo, valor) {
    const entradaSpan = document.querySelector('.Total .ent span');
    const saidaSpan = document.querySelector('.Total .Saida span');
    const totalSpan = document.querySelector('.Total .Total span');

    let entrada = parseFloat(entradaSpan.textContent.replace(',', '.')) || 0;
    let saida = parseFloat(saidaSpan.textContent.replace(',', '.')) || 0;

    if (tipo === 'Entrada') {
        entrada += valor;
    } else {
        saida += valor;
    }

    const total = entrada - saida;

    // Atualiza os valores no DOM
    entradaSpan.textContent = entrada.toFixed(2).replace('.', ',');
    saidaSpan.textContent = saida.toFixed(2).replace('.', ',');
    totalSpan.textContent = total.toFixed(2).replace('.', ',');

    // Atualiza as cores com base nos valores
    totalSpan.classList.toggle('positivo', total >= 0);
    totalSpan.classList.toggle('negativo', total < 0);
}
