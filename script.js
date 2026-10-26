const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

const yearElement = document.getElementById("currentYear");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Mobile navigation toggle
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close mobile navigation after clicking any link
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";
        });
    });
}

// Project filtering logic
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach((card) => {
            const category = card.dataset.category;
            const shouldShow =
                selectedFilter === "all" ||
                category === selectedFilter;

            card.hidden = !shouldShow;
        });
    });
});

// Contact form validation & submission handling
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

function setError(input, errorElement, message) {
    if (errorElement) errorElement.textContent = message;
    if (input) {
        input.classList.toggle("invalid", Boolean(message));
        input.setAttribute("aria-invalid", String(Boolean(message)));
    }
}

function validateName() {
    if (!nameInput) return false;
    const value = nameInput.value.trim();

    if (value.length < 2) {
        setError(nameInput, nameError, "Enter at least 2 characters.");
        return false;
    }

    setError(nameInput, nameError, "");
    return true;
}

function validateEmail() {
    if (!emailInput) return false;
    const value = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {
        setError(emailInput, emailError, "Enter a valid email address.");
        return false;
    }

    setError(emailInput, emailError, "");
    return true;
}

function validateMessage() {
    if (!messageInput) return false;
    const value = messageInput.value.trim();

    if (value.length < 10) {
        setError(
            messageInput,
            messageError,
            "Message must contain at least 10 characters."
        );
        return false;
    }

    setError(messageInput, messageError, "");
    return true;
}

if (nameInput) nameInput.addEventListener("input", validateName);
if (emailInput) emailInput.addEventListener("input", validateEmail);
if (messageInput) messageInput.addEventListener("input", validateMessage);

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (formFeedback) {
            formFeedback.className = "form-feedback";

            if (isNameValid && isEmailValid && isMessageValid) {
                formFeedback.textContent =
                    "Validation successful! Your message has been validated successfully.";
                formFeedback.classList.add("success");
                
                // Clear form fields upon success
                contactForm.reset();
            } else {
                formFeedback.textContent =
                    "Please correct the highlighted fields and try again.";
                formFeedback.classList.add("error");
            }
        }
    });
}