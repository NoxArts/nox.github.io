const year = document.querySelector("#year");
if(year) year.textContent = new Date().getFullYear();

const path = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach(link => {
  if(link.getAttribute("href") === path) link.classList.add("active");
});

const menuBtn = document.querySelector("#menuBtn");
const navLinks = document.querySelector("#navLinks");
if(menuBtn && navLinks){
  menuBtn.addEventListener("click", () => navLinks.classList.toggle("show"));
}

const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightboxImg");
const lightboxCaption = document.querySelector("#lightboxCaption");
const closeBtn = document.querySelector("#lightboxClose");

document.querySelectorAll(".art-slot").forEach(slot => {
  const img = slot.dataset.img;
  if(img){
    slot.style.backgroundImage = `url('${img}')`;
  }

  slot.addEventListener("click", () => {
    const image = slot.dataset.img;
    const caption = slot.dataset.caption || slot.innerText.trim();
    if(!image) return;
    lightboxImg.src = image;
    lightboxCaption.textContent = caption;
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

if(closeBtn){
  closeBtn.addEventListener("click", closeLightbox);
}
if(lightbox){
  lightbox.addEventListener("click", e => {
    if(e.target === lightbox) closeLightbox();
  });
}
document.addEventListener("keydown", e => {
  if(e.key === "Escape") closeLightbox();
});
function closeLightbox(){
  if(!lightbox) return;
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}

document.querySelectorAll(".auto-scroll").forEach(gallery => {
  let direction = 1;
  setInterval(() => {
    if(gallery.matches(":hover")) return;
    const max = gallery.scrollWidth - gallery.clientWidth;
    if(max <= 0) return;
    gallery.scrollLeft += 1.2 * direction;
    if(gallery.scrollLeft >= max - 2) direction = -1;
    if(gallery.scrollLeft <= 2) direction = 1;
  }, 28);
});

document.querySelectorAll(".service-carousel").forEach(carousel => {
  const slides = carousel.querySelectorAll(".service-slide");
  let index = 0;
  if(slides.length) slides[0].classList.add("active");

  setInterval(() => {
    if(!slides.length) return;
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 2600);
});

const filterButtons = document.querySelectorAll(".filter-btn");
const filterItems = document.querySelectorAll("[data-category]");
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filterItems.forEach(item => {
      item.style.display = filter === "all" || item.dataset.category === filter ? "" : "none";
    });
  });
});

const discordForm = document.querySelector("#discordForm");
const discordStatus = document.querySelector("#discordStatus");

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1511086832824090816/W5WnPQAVud5m3zr5cZAIOQdQZmkfJ6TZyVYgh-s1-OnPJvp3K_nbz2hJjk17Y5Kfk-rA";

if(discordForm){
  discordForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(discordForm);

    const message =
`📩 **New NOX Commission Request**

**Name:** ${data.get("name")}
**Social/Contact:** ${data.get("social")}
**Type:** ${data.get("type")}
**Budget:** ${data.get("budget")}
**Deadline:** ${data.get("deadline")}

**Request:**
${data.get("message")}`;

    try{
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
  username: "NOX Commission Form",

  embeds: [{
    title: "🌙 New NOX Commission Request",
    color: 16439670,

    fields: [
      {
        name: "👤 Name",
        value: data.get("name") || "Not informed",
        inline: true
      },
      {
        name: "📱 Contact",
        value: data.get("social") || "Not informed",
        inline: true
      },
      {
        name: "🎨 Type",
        value: data.get("type") || "Not informed",
        inline: true
      },
      {
        name: "💰 Budget",
        value: data.get("budget") || "Not informed",
        inline: true
      },
      {
        name: "⏳ Deadline",
        value: data.get("deadline") || "No deadline",
        inline: true
      },
      {
        name: "📝 Request",
        value: data.get("message") || "No description"
      }
    ],

    footer: {
      text: "NOX Digital Illustrator"
    },

    timestamp: new Date().toISOString()
  }]
})
      });

      if(response.ok){
        discordForm.reset();
        discordStatus.textContent = "Request sent successfully!";
        alert("Pedido enviado para o Discord!");
      }else{
        alert("Erro ao enviar. Verifique o webhook.");
      }
    }catch(error){
      alert("Erro ao enviar. Verifique o webhook.");
    }
  });
}
function updateBrasiliaClock() {
    const now = new Date();

    const brasiliaTime = now.toLocaleTimeString("en-US", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    const clock = document.getElementById("brasiliaClock");

    if (clock) {
        clock.textContent = brasiliaTime;
    }
}

updateBrasiliaClock();
setInterval(updateBrasiliaClock, 1000);