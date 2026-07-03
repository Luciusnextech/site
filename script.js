const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const tabs = Array.from(document.querySelectorAll("[role='tab']"));
const panels = Array.from(document.querySelectorAll("[role='tabpanel']"));
const form = document.querySelector(".contact-form");
const formNote = document.querySelector("[data-form-note]");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuButton.addEventListener("click", () => {
  const isOpen = header.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    header.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => {
      item.classList.toggle("active", item === tab);
      item.setAttribute("aria-selected", String(item === tab));
    });

    panels.forEach((panel) => {
      const isActive = panel.id === tab.getAttribute("aria-controls");
      panel.hidden = !isActive;
      panel.classList.toggle("active", isActive);
    });
  });
});

if (form) {
  form.addEventListener("submit", () => {
    if (formNote) {
      formNote.textContent = "Abrindo seu aplicativo de email para enviar o pedido.";
    }
  });
}
