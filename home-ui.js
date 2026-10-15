// home-ui.js : nouvel écran d'accueil (police Inter). L'ancien contenu de l'accueil est simplement caché.
// Script classique : à charger après i18n.js, dans le même dossier que index.html et les images.
(function () {
  const home = document.getElementById("home-screen");
  if (!home) return;

  /* ---------- réglages ---------- */
  const IMG = {
    joystick: "Joystick Dark Mode.png",
    account: "Account Dark Mode.png",
    help: "Help Dark Mode.png",
    privacy: "Privacy Policy Dark Mode.png",
    compass: "Adventure Mode Compass Dark Mode.png",
    timer: "Arcade Mode Timer Dark Mode.png",
    discord: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/discord-round-black-icon.png"
  };
  const DISCORD_URL = "https://discord.gg/52UY26TBQF";
  const HELP_URL = "https://how2play.fastcollectchallenge.com";
  const PRIVACY_URL = "https://privacy-policy.fastcollectchallenge.com";
  const src = f => (/^https?:/.test(f) ? f : encodeURI(f));

  const TXT = {
    en: { adv: "Adventure<br>Mode", arc: "Arcade<br>Mode", account: "Account Settings", help: "How to play", privacy: "Privacy Policy" },
    fr: { adv: "Mode<br>Aventure", arc: "Mode<br>Arcade", account: "Paramètres du compte", help: "Comment jouer", privacy: "Politique de confidentialité" }
  };

  /* ---------- styles ---------- */
  const css = document.createElement("style");
  css.textContent = `
  html body #home-screen{background:radial-gradient(ellipse 48% 58% at 0% 0%,rgba(125,0,255,.95) 0%,rgba(125,0,255,0) 100%),radial-gradient(ellipse 42% 52% at 100% 100%,rgba(0,55,255,.95) 0%,rgba(0,55,255,0) 100%),#000!important;border:none!important;box-shadow:none!important}
  #home-screen .home-content{display:none!important}
  #hm-root,#hm-root *{font-family:'Inter',sans-serif!important;box-sizing:border-box}
  #hm-root{--hu:min(calc(100vw / 1920),calc(100vh / 1080));position:absolute;inset:0;z-index:2;pointer-events:none;color:#000}
  .hm-card{background:linear-gradient(90deg,#fff 0%,#d9d9d9 100%);border-radius:calc(46 * var(--hu));pointer-events:auto;box-shadow:0 calc(8 * var(--hu)) calc(30 * var(--hu)) rgba(0,0,0,.35)}
  #hm-head{position:absolute;top:calc(42 * var(--hu));left:calc(42 * var(--hu));right:calc(51 * var(--hu));height:calc(186 * var(--hu));display:flex;gap:calc(40 * var(--hu))}
  #hm-left{width:calc(370 * var(--hu));display:flex;align-items:center}
  #hm-joy{width:calc(236 * var(--hu));display:flex;justify-content:center}
  #hm-joy img{height:calc(118 * var(--hu));width:auto;display:block}
  .hm-vl{width:calc(4 * var(--hu));height:calc(120 * var(--hu));background:#000;flex:none;border-radius:calc(2 * var(--hu))}
  .hm-hl{width:calc(120 * var(--hu));height:calc(3 * var(--hu));background:#000;flex:none}
  #hm-side{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(22 * var(--hu))}
  #hm-title{flex:1;display:flex;align-items:center;justify-content:center;font-size:calc(92 * var(--hu));font-weight:500;letter-spacing:-.01em;white-space:nowrap}
  #hm-right{width:calc(186 * var(--hu));height:calc(185 * var(--hu));background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(19 * var(--hu))}
  .hm-ico{position:relative;display:flex;align-items:center;justify-content:center;background:none;border:0;padding:0;margin:0;cursor:pointer;text-decoration:none;pointer-events:auto;transition:transform .15s}
  .hm-ico img{height:calc(50 * var(--hu));width:auto;display:block;pointer-events:none}
  .hm-ico:hover{transform:scale(1.14)}
  .hm-ico[data-tip]:hover::after{content:attr(data-tip);position:absolute;top:calc(100% + 10 * var(--hu));left:50%;transform:translateX(-50%);background:#111;color:#fff;font-size:calc(20 * var(--hu));font-weight:600;padding:calc(7 * var(--hu)) calc(14 * var(--hu));border-radius:calc(12 * var(--hu));white-space:nowrap;z-index:5;box-shadow:0 4px 14px rgba(0,0,0,.45)}
  #hm-modes{position:absolute;left:calc(50% + 10 * var(--hu));top:50%;transform:translate(-50%,-50%);display:flex;gap:calc(362 * var(--hu))}
  .hm-mode{width:calc(458 * var(--hu));height:calc(282 * var(--hu));display:flex;align-items:center;padding:0 calc(24 * var(--hu)) 0 calc(37 * var(--hu));cursor:pointer;transition:transform .15s,box-shadow .15s}
  .hm-mode:hover{transform:translateY(calc(-8 * var(--hu))) scale(1.03);box-shadow:0 calc(18 * var(--hu)) calc(40 * var(--hu)) rgba(0,0,0,.45)}
  .hm-mode:active{transform:translateY(0) scale(.99)}
  .hm-mico{width:calc(92 * var(--hu));flex:none;display:flex;justify-content:center}
  .hm-mico img{max-width:calc(92 * var(--hu));max-height:calc(96 * var(--hu));width:auto;height:auto;display:block}
  .hm-mode .hm-vl{height:calc(140 * var(--hu));margin:0 calc(9 * var(--hu)) 0 calc(27 * var(--hu))}
  .hm-mtxt{flex:1;text-align:center;font-weight:700;font-size:calc(48 * var(--hu));line-height:1.4}`;
  document.head.appendChild(css);

  /* ---------- structure ---------- */
  const img = (k, alt) => `<img src="${src(IMG[k])}" alt="${alt}" draggable="false">`;
  const root = document.createElement("div"); root.id = "hm-root";
  root.innerHTML = `
    <div id="hm-head">
      <div id="hm-left" class="hm-card">
        <div id="hm-joy">${img("joystick", "Fast Collect Challenge")}</div>
        <div class="hm-vl"></div>
        <div id="hm-side">
          <button class="hm-ico" id="hm-account" type="button">${img("account", "Account")}</button>
          <a class="hm-ico" href="${DISCORD_URL}" target="_blank" rel="noopener">${img("discord", "Discord")}</a>
        </div>
      </div>
      <div id="hm-title" class="hm-card">Fast Collect Challenge</div>
      <div id="hm-right" class="hm-card">
        <a class="hm-ico" id="hm-help" href="${HELP_URL}">${img("help", "Help")}</a>
        <div class="hm-hl"></div>
        <a class="hm-ico" id="hm-privacy" href="${PRIVACY_URL}">${img("privacy", "Privacy Policy")}</a>
      </div>
    </div>
    <div id="hm-modes">
      <div class="hm-mode hm-card" id="hm-adv"><div class="hm-mico">${img("compass", "")}</div><div class="hm-vl"></div><div class="hm-mtxt"></div></div>
      <div class="hm-mode hm-card" id="hm-arc"><div class="hm-mico">${img("timer", "")}</div><div class="hm-vl"></div><div class="hm-mtxt"></div></div>
    </div>`;
  home.appendChild(root);
  const $ = id => document.getElementById(id);

  /* ---------- actions ---------- */
  $("hm-account").onclick = () => { if (window.openAccountModal) window.openAccountModal(); };
  $("hm-adv").onclick = () => window.startAdventure && window.startAdventure();
  $("hm-arc").onclick = () => window.startGame && window.startGame();

  /* ---------- langue (EN / FR) ---------- */
  function applyLang() {
    const t = TXT[document.documentElement.classList.contains("fr") ? "fr" : "en"];
    $("hm-adv").querySelector(".hm-mtxt").innerHTML = t.adv;
    $("hm-arc").querySelector(".hm-mtxt").innerHTML = t.arc;
    [["hm-account", t.account], ["hm-help", t.help], ["hm-privacy", t.privacy]].forEach(([id, s]) => { $(id).dataset.tip = s; $(id).setAttribute("aria-label", s); });
  }
  window.addEventListener("langchange", applyLang);
  applyLang();
})();