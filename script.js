document.addEventListener("DOMContentLoaded", function() {
    // Initialiseren van de scene, camera en renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('game-container').appendChild(renderer.domElement);

    // Toevoegen van een bal
    const ballGeometry = new THREE.SphereGeometry(1, 32, 32);
    const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    scene.add(ball);

    // Toevoegen van een doel
    const goalGeometry = new THREE.BoxGeometry(2, 2, 2);
    const goalMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const goal = new THREE.Mesh(goalGeometry, goalMaterial);
    goal.position.set(5, 0, 0); // Plaats het doel op x=5
    scene.add(goal);

    // Toevoegen van een lichtbron
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 5);
    scene.add(light);

    // Initialiseren van de puntentelling
    let score = 0;

    // Luisteren naar toetsaanslagen voor beweging
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        const speed = 0.1;

        switch (key) {
            case 'ArrowUp':
                ball.position.y += speed;
                break;
            case 'ArrowDown':
                ball.position.y -= speed;
                break;
            case 'ArrowLeft':
                ball.position.x -= speed;
                break;
            case 'ArrowRight':
                ball.position.x += speed;
                break;
        }

        // Controleer winvoorwaarde
        if (checkCollision(ball, goal)) {
            score++;
            goal.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, 0); // Verplaats het doel naar een willekeurige positie
            alert('Gefeliciteerd! Je hebt het doel bereikt! Score: ' + score);
        }
    });

    // Functie om botsing te controleren
    function checkCollision(ball, goal) {
        return ball.position.distanceTo(goal.position) < 1; // Botsing als de afstand tussen bal en doel kleiner is dan 1
    }

    // Animatie functie
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
});
