const cep = document.querySelector('#cepInput');
const adicionarBtn = document.querySelector('#adicionar');

adicionarBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let cep = document.querySelector('#cepInput');

    if ( parseInt(cep.value) ){
        console.log('numero');
        const API_LINK = `https://viacep.com.br/ws/${cep.value}/json/`
        fetch(API_LINK) 
        .then( response => response.json())
        .then( response => {
            criarElemento(response);
        })
        .catch(error => console.log(error));

    }else if(typeof cep.value === 'string') {
        console.log('string');

        let cepString = cep.value
        cepString = cepString.replaceAll(' ', '/');
        console.log(cepString);
        const API_LINK = `https://viacep.com.br/ws/${cepString}/json/`
        fetch(API_LINK) 
        .then( response => response.json())
        .then( response => {
            
            response.forEach((number, index) => {
                criarElemento(response[index]);

            })
            
        })
        .catch(error => console.log(error));
    }


    cep.value = "";
    cep.focus();

})

function criarElemento(valor) {
    console.log(valor)
    let erro = document.querySelector('#mensagemErro');
    if(valor.erro) {

        erro.textContent = 'CEP inválido!';
        return
    }
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

}

cep.focus();