const somAlarme = new Audio("audio/notification.mp3");
somAlarme.volume = 0.8;

const btnIniciar = document.getElementById("btn-iniciar");
const btnInfo = document.getElementById("btn-info");
const dialogInfo = document.getElementById("info");
const dialogTempoExtra = document.getElementById("tempo-extra");
const tempoRestanteTxt = document.getElementById("tempo-restante-txt");
const qtdpomodoriEl = document.getElementById("qtd-pomodori");
const tempoRestanteEl = document.getElementById("tempo-restante");
const tempoDescansoEl = document.getElementById("tempo-descanso");

let btnIniciarAtivado = false;
let pomodori = 0;

btnIniciar.addEventListener("click", contarTempo);

btnInfo.addEventListener("click", () => dialogInfo.showModal());
document.getElementById("fechar-info").addEventListener("click", () => dialogInfo.close());

function contarTempo() {
  let tempoRestante = 1500;
  let tempoDescanso = 300;
  
  
  if (btnIniciarAtivado) return;
  btnIniciarAtivado = true;
  btnIniciar.disabled = true;


  

  const contagem = setInterval(() => {
    const minutosRestante = Math.floor((tempoRestante % 3600) / 60);
    const segundosRestante = tempoRestante % 60;

    tempoRestanteEl.textContent =
      minutosRestante + " minuto(s): " + segundosRestante + " segundo(s)";

    tempoRestante--;

    if (tempoRestante < 0) {
      clearInterval(contagem);
      pomodori = pomodori + 1;
        qtdpomodoriEl.innerText = pomodori;
      somAlarme.play();

   if (pomodori === 4) {
        dialogTempoExtra.showModal();
        document.getElementById("fechar-tempo-extra").addEventListener("click", () => dialogTempoExtra.close());

        tempoDescanso = 1800;
        pomodori = 0;
        tempoRestanteEl.innerHTML =
          "";
      } else {
        tempoRestanteEl.innerHTML =
          "<p>O tempo acabou!</p><p>Iniciando o tempo de descanso de 5 minutos.</p>";
      }
    

      setTimeout(() => {
        tempoRestanteEl.innerText = "";
        btnIniciar.disabled = true

        const contagemDescanso = setInterval(() => {
          const minutosDescanso = Math.floor((tempoDescanso % 3600) / 60);
          const segundosDescanso = tempoDescanso % 60;

          tempoDescansoEl.textContent =
            minutosDescanso + " minuto(s): " + segundosDescanso + " segundo(s)";

          tempoDescanso--;

          if (tempoDescanso < 0) {
            clearInterval(contagemDescanso);
            tempoDescansoEl.textContent = "Fim do tempo de descanso!";
            somAlarme.play();

            btnIniciarAtivado = false;
            btnIniciar.disabled = false;

            setTimeout(() => {
              tempoDescansoEl.textContent = "";
            }, 2000);
          }
        }, 1000);
      }, 1500);
    };
  }, 1000);
  qtdpomodoriEl.innerText = pomodori;
}
