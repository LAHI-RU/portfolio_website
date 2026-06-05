const CONTACT_CONFIG = {
    recipient: "lahiiru.dananjaya@gmail.com"
};

const STACK_CONTENT = {
    backend: {
        label: "Backend",
        title: "Laravel, Node.js, Django, MySQL, MongoDB",
        copy: "API design, database-backed workflows, query tuning, authentication, and operational features.",
        skills: ["Laravel", "PHP", "Node.js", "Django", "MySQL", "MongoDB", "REST APIs", "JWT"]
    },
    frontend: {
        label: "Frontend",
        title: "React, Next.js, Tailwind CSS, Figma",
        copy: "Interfaces built for clarity, repeated use, responsive behavior, and product-quality polish.",
        skills: ["React.js", "Next.js", "JavaScript", "Tailwind CSS", "Bootstrap", "Figma", "Responsive UI"]
    },
    ai: {
        label: "AI",
        title: "OpenAI API, PyTorch, Agentic Workflows",
        copy: "Document intelligence, stale knowledge detection, prompt engineering, vector search, and workflow automation.",
        skills: ["OpenAI API", "PyTorch", "FastAPI", "Prompt Engineering", "Vector Search", "Streamlit", "Pandas"]
    },
    ops: {
        label: "Ops",
        title: "Docker, AWS EC2, Linux, GitHub",
        copy: "Deployment-aware engineering with source control, cloud basics, Linux workflows, and containerized setups.",
        skills: ["Docker", "AWS EC2", "Linux", "Git", "GitHub", "VS Code", "Jupyter"]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    initCursorGlow();
    initHeader();
    initNavigation();
    initReveal();
    initWordRotator();
    initCardTilt();
    initStackTabs();
    initProjectFilter();
    initCommandPalette();
    initContactForm();
    initBackToTop();
});

function initCursorGlow() {
    const glow = document.querySelector(".cursor-glow");
    if (!glow || window.matchMedia("(pointer: coarse)").matches) return;

    window.addEventListener("pointermove", (event) => {
        document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    }, { passive: true });
}

function initHeader() {
    const header = document.querySelector("[data-header]");
    const update = () => header?.classList.toggle("scrolled", window.scrollY > 20);

    update();
    window.addEventListener("scroll", throttle(update, 100), { passive: true });
}

function initNavigation() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const panel = document.querySelector("[data-nav-panel]");
    const links = [...document.querySelectorAll(".nav-link")];
    const sections = links
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    toggle?.addEventListener("click", () => {
        const isOpen = panel.classList.toggle("open");
        document.body.classList.toggle("menu-open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.querySelector("i").className = isOpen ? "bx bx-x" : "bx bx-menu";
    });

    links.forEach((link) => {
        link.addEventListener("click", () => closeMenu());
    });

    const observer = new IntersectionObserver((entries) => {
        const active = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!active) return;

        links.forEach((link) => {
            const isCurrent = link.getAttribute("href") === `#${active.target.id}`;
            link.classList.toggle("active", isCurrent);
            isCurrent ? link.setAttribute("aria-current", "page") : link.removeAttribute("aria-current");
        });
    }, { rootMargin: "-30% 0px -55% 0px", threshold: [0.15, 0.4, 0.65] });

    sections.forEach((section) => observer.observe(section));

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });

    function closeMenu() {
        if (!panel?.classList.contains("open")) return;
        panel.classList.remove("open");
        document.body.classList.remove("menu-open");
        toggle?.setAttribute("aria-expanded", "false");
        const icon = toggle?.querySelector("i");
        if (icon) icon.className = "bx bx-menu";
    }
}

function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        items.forEach((item) => item.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach((item) => observer.observe(item));
}

function initWordRotator() {
    const target = document.querySelector("[data-rotator]");
    if (!target) return;

    const words = ["ERP modules", "AI workflows", "React interfaces", "backend systems", "automation tools"];
    let index = 0;

    window.setInterval(() => {
        index = (index + 1) % words.length;
        target.animate(
            [
                { opacity: 1, transform: "translateY(0)" },
                { opacity: 0, transform: "translateY(-8px)" }
            ],
            { duration: 180, easing: "ease", fill: "forwards" }
        ).onfinish = () => {
            target.textContent = words[index];
            target.animate(
                [
                    { opacity: 0, transform: "translateY(8px)" },
                    { opacity: 1, transform: "translateY(0)" }
                ],
                { duration: 220, easing: "ease", fill: "forwards" }
            );
        };
    }, 2400);
}

function initCardTilt() {
    const cards = document.querySelectorAll("[data-tilt]");
    if (window.matchMedia("(pointer: coarse)").matches) return;

    cards.forEach((card) => {
        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const rotateX = ((y / rect.height) - 0.5) * -7;
            const rotateY = ((x / rect.width) - 0.5) * 7;

            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });

        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });
}

function initStackTabs() {
    const buttons = document.querySelectorAll("[data-stack-tab]");
    const panel = document.querySelector("[data-stack-panel]");
    if (!panel) return;

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const key = button.dataset.stackTab;
            const item = STACK_CONTENT[key];
            if (!item) return;

            buttons.forEach((tab) => {
                const isActive = tab === button;
                tab.classList.toggle("active", isActive);
                tab.setAttribute("aria-selected", String(isActive));
            });

            panel.innerHTML = `
                <div class="stack-copy">
                    <p class="stack-label">${item.label}</p>
                    <h3>${item.title}</h3>
                    <p>${item.copy}</p>
                </div>
                <div class="skill-cloud" aria-label="${item.label} skills">
                    ${item.skills.map((skill) => `<span>${skill}</span>`).join("")}
                </div>
            `;
        });
    });
}

function initProjectFilter() {
    const buttons = document.querySelectorAll("[data-filter]");
    const projects = document.querySelectorAll("[data-project]");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            buttons.forEach((item) => {
                const isActive = item === button;
                item.classList.toggle("active", isActive);
                item.setAttribute("aria-selected", String(isActive));
            });

            projects.forEach((project) => {
                const categories = project.dataset.category.split(" ");
                project.classList.toggle("hidden", filter !== "all" && !categories.includes(filter));
            });
        });
    });
}

function initCommandPalette() {
    const modal = document.querySelector("[data-command-modal]");
    const openers = document.querySelectorAll("[data-command-open]");
    const closers = document.querySelectorAll("[data-command-close], [data-command-link]");

    openers.forEach((button) => button.addEventListener("click", open));
    closers.forEach((button) => button.addEventListener("click", close));

    document.addEventListener("keydown", (event) => {
        const isCommandShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
        if (isCommandShortcut) {
            event.preventDefault();
            modal?.classList.contains("open") ? close() : open();
        }
        if (event.key === "Escape") close();
    });

    function open() {
        modal?.classList.add("open");
        modal?.setAttribute("aria-hidden", "false");
        document.body.classList.add("command-open");
    }

    function close() {
        modal?.classList.remove("open");
        modal?.setAttribute("aria-hidden", "true");
        document.body.classList.remove("command-open");
    }
}

function initContactForm() {
    const form = document.querySelector("#contactForm");
    const status = document.querySelector("#formStatus");
    if (!form || !status) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        const errors = validate(data);

        clearErrors(form);
        if (Object.keys(errors).length > 0) {
            showErrors(form, errors);
            setStatus(status, "Fix the highlighted fields.", "error");
            return;
        }

        const subject = encodeURIComponent(String(data.subject).trim());
        const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`);
        window.location.href = `mailto:${CONTACT_CONFIG.recipient}?subject=${subject}&body=${body}`;
        setStatus(status, "Your email client is ready with the message.", "success");
        form.reset();
    });
}

function validate(data) {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (String(data.name || "").trim().length < 2) errors.name = "Enter your name.";
    if (!emailPattern.test(String(data.email || "").trim())) errors.email = "Enter a valid email.";
    if (String(data.subject || "").trim().length < 3) errors.subject = "Add a subject.";
    if (String(data.message || "").trim().length < 10) errors.message = "Write at least 10 characters.";

    return errors;
}

function clearErrors(form) {
    form.querySelectorAll("label").forEach((label) => label.classList.remove("has-error"));
    form.querySelectorAll("small").forEach((small) => {
        small.textContent = "";
    });
}

function showErrors(form, errors) {
    Object.entries(errors).forEach(([field, message]) => {
        const control = form.querySelector(`[name="${field}"]`);
        const label = control?.closest("label");
        const error = form.querySelector(`[data-error-for="${field}"]`);
        label?.classList.add("has-error");
        if (error) error.textContent = message;
    });
}

function setStatus(status, message, type) {
    status.textContent = message;
    status.className = type ? `form-status ${type}` : "form-status";
}

function initBackToTop() {
    const button = document.querySelector("[data-back-to-top]");
    if (!button) return;

    const update = () => button.classList.toggle("show", window.scrollY > 700);
    update();
    window.addEventListener("scroll", throttle(update, 100), { passive: true });
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function throttle(callback, limit) {
    let blocked = false;

    return (...args) => {
        if (blocked) return;
        callback(...args);
        blocked = true;
        window.setTimeout(() => {
            blocked = false;
        }, limit);
    };
}
