const cards = document.querySelectorAll(".routine-card");
const buttons = document.querySelectorAll(".filter-btn");
const progressBar = document.getElementById("progress-bar");
const progressPercent = document.getElementById("progress-percent");
const completionCount = document.getElementById("completion-count");
const toast = document.getElementById("toast");

let toastTimer;

function updateProgress() {
    const completed = document.querySelectorAll(
        ".routine-card.completed"
    ).length;

    const total = cards.length;
    const percent = Math.round((completed / total) * 100);

    progressBar.style.width = percent + "%";
    progressPercent.textContent = percent + "%";
    completionCount.textContent = completed + " / " + total;

    if (completed === total) {
        showToast("🏆 Amazing! You completed your entire routine!");
    }
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

cards.forEach((card, index) => {
    const button = card.querySelector(".complete-btn");

    card.style.animationDelay = (index * 0.08) + "s";

    button.addEventListener("click", () => {
        const isCompleted = card.classList.toggle("completed");

        if (isCompleted) {
            button.textContent = "✓ Completed";
            showToast("🎉 Great job! One more step forward!");
        } else {
            button.textContent = "○ Mark as Complete";
            showToast("↩ Activity marked as incomplete.");
        }

        updateProgress();
    });
});

buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        cards.forEach(card => {
            const category = card.dataset.category;

            if (filter === "all" || category === filter) {
                card.classList.remove("hidden");
                card.style.animation = "none";
                card.offsetHeight;
                card.style.animation = "slideUp 0.5s ease both";
            } else {
                card.classList.add("hidden");
            }
        });
    });
});

function updateClock() {
    const now = new Date();

    document.getElementById("current-date").textContent =
        now.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });

    document.getElementById("current-time").textContent =
        now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

    const hour = now.getHours();
    let greeting = "Good evening! 👋";

    if (hour >= 5 && hour < 12) {
        greeting = "Good morning! ☀️";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good afternoon! 🌤️";
    } else if (hour >= 17 && hour < 21) {
        greeting = "Good evening! 🌆";
    } else {
        greeting = "Good night! 🌙";
    }

    document.getElementById("greeting").textContent = greeting;
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(
    ".goal-card, .tip-card, .quote-section, .final-section"
).forEach(element => {
    observer.observe(element);
});

updateClock();
setInterval(updateClock, 1000);
updateProgress();