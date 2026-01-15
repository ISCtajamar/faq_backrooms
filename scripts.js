document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Animación de entrada secuencial
    const tl = anime.timeline({
        easing: 'easeOutCyan'
    });

    tl.add({
        targets: '.terminal-header',
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 1200
    })
    .add({
        targets: '.chat-window',
        opacity: [0, 1],
        scale: [0.98, 1],
        duration: 800
    }, '-=400');

    // 2. Efecto Glitch Aleatorio en el Título
    function triggerGlitch() {
        anime({
            targets: '.glitch',
            skewX: () => anime.random(-15, 15),
            translateX: () => anime.random(-5, 5),
            duration: 150,
            direction: 'alternate',
            easing: 'easeInOutQuad',
            complete: () => {
                // Se repite en intervalos aleatorios para parecer un error real
                setTimeout(triggerGlitch, anime.random(3000, 7000));
            }
        });
    }
    triggerGlitch();

    // 3. Lógica del Cronómetro (Session Time)
    let seconds = 0;
    const timerElement = document.getElementById('timer');
    
    setInterval(() => {
        seconds++;
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        timerElement.innerText = `${h}:${m}:${s}`;
    }, 1000);

    // 4. Lógica de Latencia aleatoria (Para dar realismo)
    setInterval(() => {
        const lat = anime.random(10, 45);
        document.getElementById('latency').innerText = `${lat}ms`;
    }, 4000);
});
