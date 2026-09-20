console.log("Portfolio loaded.");
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: {
                Accept: "application/json"
            }
        });

        if (response.ok) {
            contactForm.reset();
            submitButton.textContent = "Message Sent ✓";

            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = "Send Message ↗";
            }, 3000);
        } else {
            submitButton.disabled = false;
            submitButton.textContent = "Failed to send";
        }

    } catch (error) {
        submitButton.disabled = false;
        submitButton.textContent = "Something went wrong";

        console.error(error);
    }
});
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}
document.addEventListener("click", (e) => {
    if (
        navMenu &&
        menuToggle &&
        navMenu.classList.contains("active") &&
        !navMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
    ) {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    }
});