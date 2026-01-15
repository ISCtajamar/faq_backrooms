// 1. Lógica del Cronómetro (Session Time) independiente
function initTimer() {
    let seconds = 0;
    const timerElement = document.getElementById('timer');
    
    setInterval(() => {
        seconds++;
        const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        if (timerElement) {
            timerElement.innerText = `${hrs}:${mins}:${secs}`;
        }
    }, 1000);
}

// 2. Lógica de Latencia aleatoria
function initLatency() {
    const latElement = document.getElementById('latency');
    setInterval(() => {
        const randomLat = Math.floor(Math.random() * 40) + 10;
        if (latElement) {
            latElement.innerText = `${randomLat}ms`;
        }
    }, 4000);
}

// 3. Ejecución principal
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar funciones de datos
    initTimer();
    initLatency();

    // Iniciar animaciones si Anime.js está cargado
    if (typeof anime !== 'undefined') {
        const tl = anime.timeline({
            easing: 'easeOutExpo'
        });

        tl.add({
            targets: '.terminal-header',
            opacity: [0, 1],
            translateY: [-20, 0],
            duration: 1000,
            delay: 500
        })
        .add({
            targets: '.chat-window',
            opacity: [0, 1],
            scale: [0.98, 1],
            duration: 800
        }, '-=400');

        // Efecto Glitch continuo en el título
        function loopGlitch() {
            anime({
                targets: '.glitch',
                skewX: () => anime.random(-10, 10),
                translateX: () => anime.random(-2, 2),
                duration: 120,
                direction: 'alternate',
                easing: 'easeInOutQuad',
                complete: () => {
                    setTimeout(loopGlitch, anime.random(3000, 8000));
                }
            });
        }
        loopGlitch();
    } else {
        // Fail-safe: si Anime.js no carga, mostrar todo directamente
        document.querySelector('.terminal-header').style.opacity = "1";
        document.querySelector('.chat-window').style.opacity = "1";
    }
});
