// =========================
// Reveal ALL cards (staggered) on scroll
// =========================
(function () {
  const cards = document.querySelectorAll(".card");
  if (!cards.length) return;

  // Stagger animation delay (max 0.6s)
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${Math.min(i * 80, 600)}ms`;
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.12 }
  );

  cards.forEach((card) => io.observe(card));
})();
