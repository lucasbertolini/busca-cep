const cep = document.querySelector('#cepInput');
const adicionarBtn = document.querySelector('#adicionar');
adicionarBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const API_LINK = `https://viacep.com.br/ws/${cep.value}/json/`
    fetch(API_LINK) 
    .then( response => response.json())
    .then( response => {
        criarElemento(response);
    })
    .catch(error => console.log(error));


    cep.value = "";
    cep.focus();

})

function criarElemento(valor, tipo) {
    console.log(valor)

    let local = document.querySelector('#resultado');
    let div = document.createElement('div');
    div.setAttribute('class', 'containerResultado');
    local.appendChild(div);

    let texto = document.createElement('p');
    texto.setAttribute('class', 'textoInfo');
    texto.textContent = valor.cep
    div.appendChild(texto);
}

cep.focus();