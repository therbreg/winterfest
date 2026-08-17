(() => {
  const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  let installPrompt = null;

  document.documentElement.classList.toggle("is-standalone", standalone);

  function installButtons() {
    return [...document.querySelectorAll("[data-install-app]")];
  }

  function syncButtons() {
    installButtons().forEach(button => {
      button.classList.toggle("is-ready", !standalone);
      button.hidden = standalone;
    });
  }

  function closeHelp() {
    const overlay = document.querySelector(".pwa-install-overlay");
    if (overlay) overlay.classList.remove("open");
  }

  function ensureHelp() {
    let overlay = document.querySelector(".pwa-install-overlay");
    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.className = "pwa-install-overlay";
    overlay.innerHTML = `
      <section class="pwa-install-card" role="dialog" aria-modal="true" aria-labelledby="pwaInstallTitle">
        <button class="pwa-install-close" type="button" aria-label="Schließen">✕</button>
        <img class="pwa-install-mark" src="./icons/icon.svg" alt="">
        <h2 id="pwaInstallTitle">Winterfest als App installieren</h2>
        <div data-install-instructions></div>
        <button class="pwa-install-primary" type="button" data-native-install hidden>App installieren</button>
      </section>`;
    overlay.addEventListener("click", event => {
      if (event.target === overlay || event.target.closest(".pwa-install-close")) closeHelp();
    });
    document.body.appendChild(overlay);
    return overlay;
  }

  function showHelp() {
    const overlay = ensureHelp();
    const instructions = overlay.querySelector("[data-install-instructions]");
    const nativeButton = overlay.querySelector("[data-native-install]");

    if (installPrompt) {
      instructions.innerHTML = "<p>Installiere den Orga-Hub einmal. Danach startet er im eigenen App-Fenster und merkt sich deinen Event-Zugang auf diesem Gerät.</p>";
      nativeButton.hidden = false;
      nativeButton.onclick = triggerInstall;
    } else if (isIOS) {
      instructions.innerHTML = "<p>Auf iPhone oder iPad funktioniert die Installation direkt über Safari:</p><ol><li>Unten auf <strong>Teilen</strong> tippen.</li><li><strong>Zum Home-Bildschirm</strong> wählen.</li><li>Oben rechts auf <strong>Hinzufügen</strong> tippen.</li></ol>";
      nativeButton.hidden = true;
    } else {
      instructions.innerHTML = "<p>Öffne das Browser-Menü und wähle <strong>App installieren</strong> oder <strong>Zum Startbildschirm hinzufügen</strong>. Falls der Punkt fehlt, öffne die Seite in Chrome, Edge oder Safari.</p>";
      nativeButton.hidden = true;
    }
    overlay.classList.add("open");
  }

  async function triggerInstall() {
    if (!installPrompt) {
      showHelp();
      return;
    }
    const prompt = installPrompt;
    installPrompt = null;
    await prompt.prompt();
    const choice = await prompt.userChoice;
    if (choice.outcome === "accepted") closeHelp();
    syncButtons();
  }

  window.WINTERFEST_PWA = { install: () => installPrompt ? triggerInstall() : showHelp(), closeHelp };

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    installPrompt = event;
    syncButtons();
  });

  window.addEventListener("appinstalled", () => {
    installPrompt = null;
    closeHelp();
    syncButtons();
  });

  document.addEventListener("DOMContentLoaded", () => {
    syncButtons();
    installButtons().forEach(button => button.addEventListener("click", () => window.WINTERFEST_PWA.install()));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeHelp();
    });
  });

  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js", { scope: "./" }).catch(error => console.error("Service Worker:", error));
    });
  }
})();
