var numberOgButton = document.querySelectorAll(".drum").length;
for (var i = 0; i < numberOgButton; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var buttonClick = this.innerHTML;
        playSound(buttonClick);
        buttonAnimation(buttonClick);
    });   
}
document.addEventListener("keydown", function(event) {
    var buttonPress = event.key; 
    playSound(buttonPress);
    buttonAnimation(buttonPress);
});

document.addEventListener("DOMContentLoaded", function() {
    createBackgroundElements();
    animateBackground();
});

function createBackgroundElements() {
    const background = document.createElement('div');
    background.id = 'background';
    document.body.appendChild(background);

    for (let i = 0; i < 10; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        background.appendChild(circle);
    }

    for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape');
        background.appendChild(shape);
    }

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        background.appendChild(particle);
    }
}



// Animate Background
function animateBackground() {
    // Dynamic gradient animation for the body
    gsap.to("body", {
        background: "linear-gradient(90deg, #ff7eb3, #65c7f7, #0052d4, #ffcc70)",
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "linear",
        backgroundSize: "400% 400%",
    });

    // Circle animation for pulse effect
    gsap.to(".circle", {
        duration: 3,
        scale: "random(1, 4)",
        opacity: 0.7,
        repeat: -1,
        stagger: 0.3,
        ease: "power3.inOut",
        yoyo: true,
    });

    // Shape rotation with bounce effect
    gsap.to(".shape", {
        duration: 6,
        rotation: "random(-360, 360)",
        repeat: -1,
        ease: "elastic.inOut(1, 0.5)",
        stagger: {
            each: 1.5,
            yoyo: true,
        },
    });

    // Particle motion for a floating effect
    gsap.to(".particle", {
        duration: 4,
        x: "random(-150, 150)",
        y: "random(-150, 150)",
        opacity: "random(0.2, 1)",
        repeat: -1,
        ease: "sine.inOut",
        stagger: {
            each: 0.2,
            yoyo: true,
        },
    });
}

// Trigger burst effect on button click or key press
function triggerBurst(key) {
    const burst = gsap.timeline();

    // Burst animation for circles
    burst.to(".circle", {
        scale: "random(3, 6)",
        opacity: 0,
        duration: 0.6,
        ease: "expo.out",
        stagger: 0.1,
    });

    // Particle explosion effect
    burst.to(
        ".particle",
        {
            x: "random(-300, 300)",
            y: "random(-300, 300)",
            opacity: 0,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.05,
        },
        0
    );
}

// Play sound on key press
function playSound(key) {
    switch (key) {
        case "w":
            new Audio("sounds/tom-1.mp3").play();
            break;
        case "a":
            new Audio("sounds/tom-2.mp3").play();
            break;
        case "s":
            new Audio("sounds/tom-3.mp3").play();
            break;
        case "d":
            new Audio("sounds/tom-4.mp3").play();
            break;
        case "j":
            new Audio("sounds/crash.mp3").play();
            break;
        case "k":
            new Audio("sounds/snare.mp3").play();
            break;
        case "l":
            new Audio("sounds/kick-bass.mp3").play();
            break;
        default:
            console.log(key);
    }
}

// Button animation on key press
function buttonAnimation(currentKey) {
    const activeButton = document.querySelector("." + currentKey);
    if (activeButton) {
        activeButton.classList.add("pressed");
        setTimeout(() => {
            activeButton.classList.remove("pressed");
        }, 100);
    }
}

// Add event listeners for button clicks and key presses
document.querySelectorAll(".drum").forEach((button) => {
    button.addEventListener("click", (event) => {
        const key = event.target.innerHTML;
        playSound(key);
        triggerBurst(key);
        buttonAnimation(key);
    });
});

document.addEventListener("keydown", (event) => {
    playSound(event.key);
    triggerBurst(event.key);
    buttonAnimation(event.key);
});

// Start background animation
animateBackground();
