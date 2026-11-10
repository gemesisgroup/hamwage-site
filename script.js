// ============================================================
//  $HAMWAGE — all real-world values live here. Fill before launch.
//  Leave "" for anything not ready: buttons will scroll to #how instead.
// ============================================================
const CONFIG = {
  ca: "",            // contract address
  chain: "",         // e.g. "Solana" / "Base" / "Ethereum"
  buyUrl: "",        // DEX swap link (pump.fun / Jupiter / Uniswap ...)
  chartUrl: "",      // DexScreener / DEXTools link
  xUrl: "https://x.com/hamwagefun", // X / Twitter
  tgUrl: "",         // Telegram
  supply: "",        // e.g. "1,000,000,000"
  tax: "",           // e.g. "0/0"
  lp: "",            // e.g. "Burned"
  // meme images in assets/memes/ — add file names here
  memes: [
    // "assets/memes/meme-1.jpg",
  ],
};

const $$ = (s) => document.querySelectorAll(s);

function setLink(sel, url, fallback) {
  $$(sel).forEach((a) => {
    if (url) { a.href = url; }
    else { a.href = fallback; a.removeAttribute("target"); }
  });
}
setLink(".js-buy", CONFIG.buyUrl, "#how");
setLink(".js-chart", CONFIG.chartUrl, "#how");
setLink(".js-x", CONFIG.xUrl, "#top");
setLink(".js-tg", CONFIG.tgUrl, "#top");

const text = (sel, v) => v && $$(sel).forEach((el) => (el.textContent = v));
text(".js-ca", CONFIG.ca);
text(".js-chain", CONFIG.chain);
text(".js-supply", CONFIG.supply);
text(".js-tax", CONFIG.tax);
text(".js-lp", CONFIG.lp);

// copy CA
$$(".js-copy").forEach((btn) =>
  btn.addEventListener("click", async () => {
    if (!CONFIG.ca) { btn.textContent = "Soon"; setTimeout(() => (btn.textContent = "Copy"), 1200); return; }
    try { await navigator.clipboard.writeText(CONFIG.ca); btn.textContent = "Copied!"; }
    catch { btn.textContent = "Select it"; }
    setTimeout(() => (btn.textContent = "Copy"), 1400);
  })
);

// memes grid
const grid = document.querySelector(".js-memes");
if (grid) {
  const list = CONFIG.memes.length ? CONFIG.memes : [null, null, null];
  grid.innerHTML = list
    .map((src) =>
      src
        ? `<figure class="meme"><img src="${src}" alt="$HAMWAGE meme" loading="lazy"></figure>`
        : `<figure class="meme meme--empty">Meme incoming.<br>Hamster is still on shift.</figure>`
    )
    .join("");
}

// scroll reveal
const io = new IntersectionObserver(
  (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
  { threshold: 0.12 }
);
$$(".sec .h2, .sec .body, .card, .stat, .steps li, .receipt, .meme").forEach((el) => {
  el.classList.add("reveal");
  io.observe(el);
});
