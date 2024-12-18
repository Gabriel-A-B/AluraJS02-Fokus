const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const btnTextAreaDeleted = document.querySelector('.app__form-footer__button--delete')
const btnCancelar = document.querySelector('.app__form-footer__button--cancel')

const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas')

const tarefaEmAndamento = document.querySelector('.app__section-active-task-description')
const formularioDeTarefas = document.querySelector('.app__form-add-task')
const caixaDeTexto = document.querySelector('.app__form-textarea')
const listaDeTarefas = document.querySelector('.app__section-task-list')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null
let liTarefaSelecionada = null

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    location.reload()
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    `
    svg.classList.add('app__section-task-icon-status')

    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')
    const imagemBotao = document.createElement('img')

    botao.onclick = () => {
        const novaTarefa = prompt(`Qual e a nova tarefa de "${paragrafo.textContent}"`)
        if(novaTarefa){
            paragrafo.textContent = novaTarefa
            tarefa.descricao = novaTarefa
            atualizarTarefas()
        } else {
            paragrafo.textContent = tarefa.descricao
        }
    }

    imagemBotao.setAttribute('src', 'imagens/edit.png')
    botao.append(imagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    if(tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete')
        botao.setAttribute('disabled', 'disabled')
    }else {
        li.onclick = () => {
        document.querySelectorAll('.app__section-task-list-item-active')
        .forEach(element => {
                element.classList.remove('app__section-task-list-item-active')
        })
        if(tarefaSelecionada == tarefa){
            tarefaEmAndamento.textContent = ''
            tarefaSelecionada = null
            liTarefaSelecionada = null
            return
        }
        tarefaSelecionada = tarefa
        liTarefaSelecionada = li
        tarefaEmAndamento.textContent = tarefa.descricao
        li.classList.toggle('app__section-task-list-item-active')
    }
    }

    return li
}

btnAdicionarTarefa.addEventListener('click', () => {
    formularioDeTarefas.classList.toggle('hidden')
    if(formularioDeTarefas.classList.contains('hidden') == true) {
        caixaDeTexto.value = '';
    }
})

btnTextAreaDeleted.addEventListener('click', () => {
    caixaDeTexto.value = '';

})

btnCancelar.addEventListener('click', () => {
    formularioDeTarefas.classList.add('hidden')
    caixaDeTexto.value = '';
})

formularioDeTarefas.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: caixaDeTexto.value
    }
    tarefas.push(tarefa)
    atualizarTarefas()
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    listaDeTarefas.append(elementoTarefa)
})

document.addEventListener('focoFinalizado', () => {
    if(liTarefaSelecionada && tarefaSelecionada){
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
        tarefaSelecionada.completa = true
        atualizarTarefas()
    }
})

const removerTarefas  = (somenteCompletas) => {
    // const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"
    let seletor =  ".app__section-task-list-item"
    if (somenteCompletas) {
        seletor = ".app__section-task-list-item-complete"
    }
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : []
    atualizarTarefas()
}

btnRemoverConcluidas.onclick = () => removerTarefas(true)
btnRemoverTodas.onclick = () => removerTarefas(false)