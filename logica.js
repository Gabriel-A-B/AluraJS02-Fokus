const html = document.querySelector('html')
const foco = document.querySelector('.app__card-button--foco')
const curto = document.querySelector('.app__card-button--curto')
const longo = document.querySelector('.app__card-button--longo')

const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')

const playAudio = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const pauseAudio = new Audio('/sons/pause.mp3')
const startAudio = new Audio('/sons/play.wav')
const beepAudio = new Audio('/sons/beep.mp3')
const playTime = document.querySelector('#start-pause')
const startOuPauseBt = document.querySelector('#start-pause span')
const imageStartOuPause = document.querySelector('.app__card-primary-butto-icon')
const tempo = document.querySelector('#timer')

musica.loop = true
let temporizador = 1500
let intervaloId = null

playAudio.addEventListener("change", () => {
    if(musica.paused){
        musica.play()
    }else {
        musica.currentTime = 0
        musica.pause()
    }
})

const contagemRegresiva = () => {
    if(temporizador <= 0) {
        interromper()
       beepAudio.play()
       startOuPauseBt.textContent = "Começar"
       imageStartOuPause.setAttribute('src', '/imagens/play_arrow.png')
        temporizador = 5
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        const evento = new CustomEvent('focoFinalizado')
        document.dispatchEvent(evento)
        return
    }
    temporizador -= 1
    mostrarTempo()
}

playTime.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId) {
        interromper()
        return
    }else {
    beepAudio.pause()
    beepAudio.currentTime = 0
    startAudio.play()  
    startOuPauseBt.textContent = "Pausar"
    imageStartOuPause.setAttribute('src', '/imagens/pause.png')
    }
    intervaloId = setInterval(contagemRegresiva, 1000)
}

function interromper() {
    pauseAudio.play()
    startOuPauseBt.textContent = "Começar"
    imageStartOuPause.setAttribute('src', '/imagens/play_arrow.png')
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempo(){
    const cronometro = new Date(temporizador * 1000)
    const tempoFormatado = cronometro.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempo.innerHTML = `${tempoFormatado}`
}

foco.addEventListener('click', () => {
    temporizador = 1500
    alterarContexto('foco')
    foco.classList.add('active')
})

curto.addEventListener('click', () => {
    temporizador = 300
    alterarContexto('descanso-curto')
    curto.classList.add('active')
})

longo.addEventListener('click', () => {
    temporizador = 900
   alterarContexto('descanso-longo')
   longo.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    interromper()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada,<br>
                <strong class="app__title-strong">faça uma pausa curta.</strong>
            `
            break;
        
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar á superficie,<br>
                <strong class="app__title-strong">faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

 mostrarTempo()