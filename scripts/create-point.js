function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json()) // função anônima retorna um valor
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

// habilitando o campo Cidade

function getCities(event) {
    // mudanda o valor de city na url
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    // informa o número do selecteedIndex
    const indexOfSelectedState = event.target.selectedIndex

    // atualiza a city
    stateInput.value = event.target.options[indexOfSelectedState].text

    const ufValue = event.target.value

    // interpolando a constante ufValue na url; url dinâmica
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    // limpando contéudo do campo Cidade
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    // campo Cidade bloqueado ao limpar
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            // ativando o campo Cidade ao selecionar o Estado
            citySelect.disabled = false
        })
}

document
    .querySelector("select[name=uf]")

    // evento de mudança
    .addEventListener("change", getCities)


// Ítens de Coleta
// pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = [2, 3]

function handleSelectedItem(event) {

    const itemLi = event.target

    // adicionar ou remover uma classe com js
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    // verificar se existem itens selecionados
    // se sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    //  se já estiver selecionado, tirar da seleção
    if (alreadySelected >= 0) {
        //tirar da selação
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        //  se não estiver selecionado, adcionar a seleção
        selectedItems.push(itemId)
    }

    //  atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}