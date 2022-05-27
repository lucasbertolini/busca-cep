const cep = document.querySelector('#cepInput');
const adicionarBtn = document.querySelector('#adicionar');
let cabecalhoValores = ['CEP', 'Rua', 'Bairro', 'Cidade', 'Estado'];
let API_REQUEST_VALUE = ['cep', 'logradouro', 'bairro', 'localidade', 'uf'];
let tabelaCriada = false;

adicionarBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let cep = document.querySelector('#cepInput');

    if ( parseInt(cep.value) ){
        console.log('numero');
        
        /// caso os dados inseridos no input for numero uma regra de negocio diferente é aplicada ///

        const API_LINK = `https://viacep.com.br/ws/${cep.value}/json/`
        fetch(API_LINK) 
        .then( response => response.json())
        .then( response => {
            confereCep(response);
            criarTabela();
            criarCabecalhoTabela()
                cabecalhoValores.forEach((number, index) => {   
                    cabecalhoConteudo(cabecalhoValores[index]);

                });
                tabelaCriada = true;
                novaLinha()
                console.log(response)
                Object.entries(response).forEach((number, index) => {
                    tabelaConteudo(response, API_REQUEST_VALUE[index]);  

                })
            })
        .catch(error => console.log(error));

    }else if(typeof cep.value === 'string') {
        console.log('string');

        // caso os dados inseridos no input for uma string muda a regra de negocio //
        // **  [a-zA-Z]+\s+[a-zA-Z]+\s+[a-zA-Z]+\s+[a-zA-Z]+\s+[a-zA-Z]+\s+[a-zA-Z]+   ** //
        let cepString = cep.value
        cepString = cepString.replaceAll(' ', '/');
        console.log(cepString);
        const API_LINK = `https://viacep.com.br/ws/${cepString}/json/`
        fetch(API_LINK) 
        .then( response => response.json())
        .then( response => {
            response.forEach((number, index) => {
                confereCep(response[index]);
                criarTabela();
                criarCabecalhoTabela();
                cabecalhoValores.forEach((number, index) => {   
                    cabecalhoConteudo(cabecalhoValores[index]);

                });
                tabelaCriada = true;
                novaLinha();
                
                let contentArray = Object.entries(response);
                contentArray.forEach((number, index) => {
                    console.log(contentArray)
                   tabelaConteudo(response[index], API_REQUEST_VALUE[index]);  
                })
            })
        })
        .catch(error => console.log(error));
    }
    cep.value = "";
    cep.focus();

});

function criarTabela() {
    if(document.querySelector('#tabela')) return;
    let tabela = document.createElement('table');
    tabela.setAttribute('class', 'tabela');
    tabela.setAttribute('id', 'tabela');
    document.querySelector('#resultado').appendChild(tabela);

}
function criarCabecalhoTabela() {
    if(document.querySelector('.tabelaHead')) return;
    let cabecalho = document.createElement('tr');
    cabecalho.setAttribute('class', 'tabelaHead');
    document.querySelector('#tabela').appendChild(cabecalho);
}
function novaLinha() {
    let elemento = document.createElement('tr');
    elemento.setAttribute('id', 'newRow');
    document.querySelector('#tabela').appendChild(elemento);
}
function cabecalhoConteudo(conteudo) {
    if(tabelaCriada) return;
    let elemento = document.createElement('th');
    elemento.setAttribute('class', 'tableHeadItem');
    elemento.textContent = conteudo;
    document.querySelector('.tabelaHead').appendChild(elemento);
  
}
function tabelaConteudo(conteudo, item) {
    switch (item) {
        case 'cep':
            let elemento = document.createElement('td');
            elemento.setAttribute('class', 'tableContent');
            elemento.textContent = conteudo.cep;
            document.querySelector('#tabela').appendChild(elemento);
            
            break;
        case 'logradouro':
            let logradouro = document.createElement('td');
            logradouro.setAttribute('class', 'tableContent');
            logradouro.textContent = conteudo.logradouro;
            document.querySelector('#tabela').appendChild(logradouro);
            break;

        case 'bairro':
            let bairro = document.createElement('td');
            bairro.setAttribute('class', 'tableContent');
            bairro.textContent = conteudo.bairro;
            document.querySelector('#tabela').appendChild(bairro);
            break;

        case 'uf': 
            let uf = document.createElement('td');
            uf.setAttribute('class', 'tableContent');
            uf.textContent = conteudo.uf;
            document.querySelector('#tabela').appendChild(uf);
            break;

        case 'localidade':
            let localidade = document.createElement('td');
            localidade.setAttribute('class', 'tableContent');
            localidade.textContent = conteudo.localidade;
            document.querySelector('#tabela').appendChild(localidade);
            break;
    }
}

function confereCep(valor) {
    let erro = document.querySelector('#mensagemErro');
    if(valor.erro) {

        erro.textContent = 'CEP inválido!';
        return
    }

}














function criarElemento(valor) {
    console.log(valor)
    let erro = document.querySelector('#mensagemErro');
    if(valor.erro) {

        erro.textContent = 'CEP inválido!';
        return
    }



    /*
    erro.textContent = '';
    let local = document.querySelector('#resultado');
    let div = document.createElement('div');
    div.setAttribute('class', 'containerResultado');
    local.appendChild(div);

    let cep = document.createElement('p');
    cep.setAttribute('class', 'cep');
    cep.textContent = valor.cep;
    div.appendChild(cep);

    let logradouro = document.createElement('p');
    logradouro.setAttribute('class', 'logradouro');
    logradouro.textContent = valor.logradouro;
    div.appendChild(logradouro);

    let bairro = document.createElement('p');
    bairro.setAttribute('class', 'bairro');
    bairro.textContent = valor.bairro;
    div.appendChild(bairro);

    let cidade = document.createElement('p');
    cidade.setAttribute('class', 'cidade');
    cidade.textContent = valor.localidade;
    div.appendChild(cidade);

    let uf = document.createElement('p');
    uf.setAttribute('class', 'uf');
    uf.textContent = valor.uf;
    div.appendChild(uf);
    */
}

cep.focus();