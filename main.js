
/* ================= TYPED TEXT EFFECT ================= */

var typed = new Typed(".text", {
    strings: [
        "Data Analyst",
        "SQL Developer",
        "Power BI Developer",
        "Python Developer"
    ],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


/* ================= FALLING SNOW EFFECT ================= */

const snowCanvas = document.createElement("canvas");
snowCanvas.id = "snow-canvas";

document.body.appendChild(snowCanvas);

const snowCtx = snowCanvas.getContext("2d");

let snowflakes = [];

const snowSettings = {
    count: 100,
    minSize: 0.3,     // Smaller snowflakes
    maxSize: 1.2,     // Maximum size
    speed: 1.2,
    glow: 3,
    opacity: 0.7
};

function resizeSnowCanvas() {
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
}

snowCanvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9998;
`;

resizeSnowCanvas();

window.addEventListener("resize", resizeSnowCanvas);


/* CREATE SNOWFLAKES */

function createSnowflake(initial = false) {
    return {
        x: Math.random() * snowCanvas.width,
        y: initial
            ? Math.random() * snowCanvas.height
            : -10,
        size: Math.random() *
            (snowSettings.maxSize - snowSettings.minSize)
            + snowSettings.minSize,
        speed: Math.random() * snowSettings.speed + 0.3,
        drift: Math.random() * 0.8 - 0.4,
        opacity: Math.random() * snowSettings.opacity + 0.2
    };
}

for (let i = 0; i < snowSettings.count; i++) {
    snowflakes.push(createSnowflake(true));
}


/* ANIMATE SNOW */

function animateSnow() {
    snowCtx.clearRect(
        0,
        0,
        snowCanvas.width,
        snowCanvas.height
    );

    snowflakes.forEach((snow, index) => {
        snow.y += snow.speed;
        snow.x += snow.drift;

        if (snow.y > snowCanvas.height + 10) {
            snowflakes[index] = createSnowflake();
        }

        if (snow.x > snowCanvas.width + 10) {
            snow.x = -10;
        }

        if (snow.x < -10) {
            snow.x = snowCanvas.width + 10;
        }

        snowCtx.beginPath();

        snowCtx.arc(
            snow.x,
            snow.y,
            snow.size,
            0,
            Math.PI * 2
        );

        snowCtx.fillStyle =
            `rgba(255, 255, 255, ${snow.opacity})`;

        snowCtx.shadowBlur = snowSettings.glow;
        snowCtx.shadowColor = "#ffffff";

        snowCtx.fill();
    });

    snowCtx.shadowBlur = 0;

    requestAnimationFrame(animateSnow);
}

animateSnow();



/* ===== ANIMATED CYAN CURSOR ===== */

if (window.matchMedia("(pointer: fine)").matches) {
    // Prevent duplicate cursors
    if (!document.getElementById("custom-cursor")) {
        const cursor = document.createElement("div");
        cursor.id = "custom-cursor";

        const trail = document.createElement("div");
        trail.id = "cursor-trail";

        document.body.appendChild(trail);
        document.body.appendChild(cursor);

        let mouseX = 0;
        let mouseY = 0;
        let trailX = 0;
        let trailY = 0;

        document.addEventListener("mousemove", function (event) {
            mouseX = event.clientX;
            mouseY = event.clientY;

            cursor.style.left = mouseX + "px";
            cursor.style.top = mouseY + "px";
        });

        function animateTrail() {
            trailX += (mouseX - trailX) * 0.15;
            trailY += (mouseY - trailY) * 0.15;

            trail.style.left = trailX + "px";
            trail.style.top = trailY + "px";

            requestAnimationFrame(animateTrail);
        }

        animateTrail();

        document.querySelectorAll(
            "a, button, input, textarea, select, .row, .close-popup"
        ).forEach(function (element) {
            element.addEventListener("mouseenter", function () {
                trail.classList.add("cursor-hover");
            });

            element.addEventListener("mouseleave", function () {
                trail.classList.remove("cursor-hover");
            });
        });
    }
}
