const cep = document.querySelector('#cepInput');
const adicionarBtn = document.querySelector('#adicionar');
adicionarBtn.addEventListener('click', (event) => {
  event.preventDefault();
    const API_LINK = `https://viacep.com.br/ws/${cep.value}/json/`
    let resultado
    fetch(API_LINK) 
    .then(response => response.json())
    .then( response => console.log(response))
    .then ( response => resultado = response)
        
    .catch(error => console.log(error));
    criarElemento(resultado);

    cep.value = "";
    cep.focus();

})

function criarElemento(valor) {
    console.log(valor)
    let local = document.querySelector('#resultado');
    let div = document.createElement('div');
    div.setAttribute('class', 'containerResultado');
    local.appendChild(div);

    let texto = document.createElement('h2');
    texto.setAttribute('class', 'textoInfo');
    texto.value = valor
    div.appendChild(texto);
}

cep.focus();