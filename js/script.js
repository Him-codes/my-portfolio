
console.log("Portfolio loaded.");

// ================================
// CONTACT FORM
// ================================

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    const submitButton = contactForm.querySelector("button[type='submit']");

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!submitButton) {
            console.error("Contact form submit button not found.");
            return;
        }

        const originalText = "Send Message ↗";

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

            if (!response.ok) {
                throw new Error("Form submission failed.");
            }

            contactForm.reset();
            submitButton.textContent = "Message Sent ✓";

        } catch (error) {
            console.error("Contact form error:", error);
            submitButton.textContent = "Failed to send — Try again";

        } finally {
            // Keep the success message briefly, then restore the button.
            if (submitButton.textContent === "Message Sent ✓") {
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }, 3000);
            } else {
                submitButton.disabled = false;
            }
        }
    });
}

// ================================
// MOBILE NAVIGATION
// ================================

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

function closeMenu() {
    if (!menuToggle || !navMenu) return;

    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle && navMenu) {
    menuToggle.setAttribute(
        "aria-expanded",
        navMenu.classList.contains("active") ? "true" : "false"
    );

    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        if (
            navMenu.classList.contains("active") &&
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
}
