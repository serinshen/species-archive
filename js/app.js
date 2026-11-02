(() => {
  const cards = window.SPECIES_CARDS || [];
  const $ = (sel, root = document) => root.querySelector(sel);

  function formatDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return `${y}年${m}月${d}日`;
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function normalizeFacts(facts) {
    if (!Array.isArray(facts)) return [];
    return facts.map((f, i) => {
      if (f && typeof f === "object" && (f.label || f.text)) {
        return { label: f.label || `要点 ${i + 1}`, text: f.text || "" };
      }
      return { label: `要点 ${i + 1}`, text: String(f ?? "") };
    });
  }

  function renderGallery(activeId) {
    $("#gallery").innerHTML = cards
      .map((c) => {
        const active = c.id === activeId ? " is-active" : "";
        const en = c.enAlt ? `${c.en} · ${c.enAlt}` : c.en;
        return `
<button type="button" class="gallery-card${active}" data-id="${escapeHtml(c.id)}" aria-pressed="${c.id === activeId}">
  <img src="${escapeHtml(c.thumb)}" alt="${escapeHtml(c.zh)}（${escapeHtml(c.en)}）" width="640" height="480" loading="lazy" />
  <div class="gallery-meta">
    <div class="gallery-date">${escapeHtml(c.date)}</div>
    <div class="gallery-name">${escapeHtml(c.zh)}</div>
    <div class="gallery-en">${escapeHtml(en)}</div>
  </div>
</button>`;
      })
      .join("");
  }

  function renderChips(activeId) {
    $("#chips").innerHTML = cards
      .map((c) => {
        const active = c.id === activeId ? " is-active" : "";
        return `<button type="button" class="chip${active}" data-id="${escapeHtml(c.id)}" aria-pressed="${c.id === activeId}">${escapeHtml(c.date)} · ${escapeHtml(c.zh)}</button>`;
      })
      .join("");
  }

  function renderCard(c) {
    const enLine = c.enAlt
      ? `${escapeHtml(c.en)} <span aria-hidden="true">·</span> ${escapeHtml(c.enAlt)}`
      : escapeHtml(c.en);
    const facts = normalizeFacts(c.facts)
      .map(
        (f, i) => `<li data-n="${i + 1}">
  <div class="fact-label">${escapeHtml(f.label)}</div>
  <div class="fact-text">${escapeHtml(f.text)}</div>
</li>`
      )
      .join("");

    $("#featured").innerHTML = `
<article class="card" id="card-${escapeHtml(c.id)}">
  <div class="hero">
    <img src="${escapeHtml(c.image)}" alt="${escapeHtml(c.zh)} — ${escapeHtml(c.en)} (${escapeHtml(c.latin)})" width="1200" decoding="async" />
    <div class="hero-badge">卡片日期 · ${escapeHtml(formatDate(c.date))}</div>
  </div>
  <div class="card-body">
    <div class="card-kicker">
      <span class="pill">${escapeHtml(c.group)}</span>
      <span class="pill soft">${escapeHtml(c.order)}</span>
      <span class="pill soft">${escapeHtml(c.family)}</span>
    </div>
    <div class="names">
      <h2>${escapeHtml(c.zh)}</h2>
      <p class="en">${enLine}</p>
      <p class="latin">${escapeHtml(c.latin)}</p>
    </div>
    <dl class="conservation" aria-label="保护等级">
      <div class="conservation-row">
        <dt>全球保护等级</dt>
        <dd>${escapeHtml(c.conservationGlobal || "—")}</dd>
      </div>
      <div class="conservation-row">
        <dt>中国保护等级</dt>
        <dd>${escapeHtml(c.conservationChina || "—")}</dd>
      </div>
    </dl>
    <h3 class="facts-heading">小知识</h3>
    <ul class="facts" aria-label="小知识六节">${facts}</ul>
    <p class="credit"><strong>照片出处</strong> · ${escapeHtml(c.credit)}</p>
  </div>
</article>`;
  }

  function selectCard(id, scroll) {
    const card = cards.find((c) => c.id === id) || cards[0];
    if (!card) return;
    renderChips(card.id);
    renderGallery(card.id);
    renderCard(card);
    history.replaceState(null, "", `#${card.id}`);
    if (scroll) {
      $("#featured")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (!cards.length) {
    $("#featured").innerHTML = `<p class="howto">未找到物种数据。</p>`;
    return;
  }

  const onPick = (e) => {
    const btn = e.target.closest("[data-id]");
    if (!btn) return;
    selectCard(btn.dataset.id, true);
  };

  $("#chips").addEventListener("click", onPick);
  $("#gallery").addEventListener("click", onPick);

  const hash = decodeURIComponent(location.hash.replace(/^#/, ""));
  const initial = cards.find((c) => c.id === hash)?.id || cards[0].id;
  selectCard(initial, false);
})();
