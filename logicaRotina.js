const rotinaDeEstudos = document.querySelectorAll(".app__rotina-textarea");
const tarefaDiaria = document.querySelector("#taskDiary");
const diaAtual = document.querySelector("#day");
const diaSemanal = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado", "Domingo"]

const lista = document.querySelector(".app__card-rotina-list");

const listaDaSemana = [
    {valor: ""}, 
    {valor: ""}, 
    {valor: ""}, 
    {valor: ""},
    {valor: ""}, 
    {valor: ""}, 
    {valor: ""}
];

criarRotina();

function salvarRotina(){
    h2.textContent = "";
    h2.remove();
    for (let i = 0; i < listaDaSemana.length; i++) {
        listaDaSemana[i].valor = rotinaDeEstudos[i].value;
    }
    const semana = JSON.stringify(listaDaSemana);
    localStorage.setItem("Tarefa", semana);
    criarRotina()
}

verificarLista = JSON.parse(localStorage.getItem("Tarefa"));

function criarRotina() {
    let pegarTarefas = JSON.parse(localStorage.getItem("Tarefa"));
    console.log(pegarTarefas);
    for (let i = 0; i < pegarTarefas.length; i++) {
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        const h3 = document.createElement('h3');
        h2.textContent = pegarTarefas[i].valor;
        h3.textContent = diaSemanal[i];
        div.classList.add(".app__card-rotina-list-item");
        h2.classList.add(".app__card-rotina-list-item-temas");
        h3.classList.add(".app__card-rotina-list-item-dia");
        lista.appendChild(div);
        div.append(h2);
        div.append(h3);
    }
}