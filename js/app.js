const WHATSAPP_NUMBER = "5541999999999"; // Trocar pelo número oficial. Exemplo: 5541999999999

const encodeMessage = (message) => encodeURIComponent(message);

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  const message = link.dataset.message || "Oi! Vim pelo mídia kit da Banda Responsa.";
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeMessage(message)}`;
  link.target = "_blank";
  link.rel = "noopener";
});

const filterButtons = document.querySelectorAll(".filter-btn");
const songCards = document.querySelectorAll(".song-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    songCards.forEach((card) => {
      const categories = card.dataset.category || "";
      const shouldShow = filter === "all" || categories.includes(filter);
      card.classList.toggle("hide", !shouldShow);
    });
  });
});

const bottomLinks = document.querySelectorAll(".bottom-link");
const sectionMap = Array.from(bottomLinks)
  .map((link) => {
    const id = link.getAttribute("href")?.replace("#", "");
    const section = document.getElementById(id);
    return section ? { link, section } : null;
  })
  .filter(Boolean);

const updateActiveLink = () => {
  const scrollY = window.scrollY + 140;

  let current = sectionMap[0];

  sectionMap.forEach((item) => {
    if (item.section.offsetTop <= scrollY) {
      current = item;
    }
  });

  bottomLinks.forEach((link) => link.classList.remove("active"));
  current?.link.classList.add("active");
};

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

const copyButton = document.getElementById("copyRelease");
const releaseText = document.getElementById("releaseText");
const toast = document.getElementById("toast");

const showToast = (message = "Release copiado!") => {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2100);
};

copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(releaseText.innerText.trim());
    showToast("Release copiado!");
  } catch (error) {
    showToast("Não foi possível copiar.");
  }
});
