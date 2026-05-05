// M365 Model Selector — Simple: click Auto, click GPT, click model
(function() {
  'use strict';
  const TARGET = 'GPT 5.5 Think Deeper';

  function post(type, msg, extra) {
    window.postMessage({ source: 'm365-model-selector', type, message: msg, ...(extra||{}) }, '*');
  }

  function click(el) {
    const r = el.getBoundingClientRect();
    const x = r.left + r.width/2, y = r.top + r.height/2;
    const o = { bubbles:true, cancelable:true, view:window, clientX:x, clientY:y, button:0, buttons:0 };
    el.dispatchEvent(new PointerEvent('pointerdown', {...o, pointerId:1, pointerType:'mouse', isPrimary:true}));
    el.dispatchEvent(new MouseEvent('mousedown', o));
    el.dispatchEvent(new PointerEvent('pointerup', {...o, pointerId:1, pointerType:'mouse', isPrimary:true}));
    el.dispatchEvent(new MouseEvent('mouseup', o));
    el.dispatchEvent(new MouseEvent('click', o));
  }

  function find(text) {
    for (const p of document.body.querySelectorAll(':scope > div')) {
      if ((parseInt(getComputedStyle(p).zIndex)||0) < 1000000) continue;
      for (const el of p.querySelectorAll('[role="option"], [role="menuitem"]')) {
        if ((el.textContent||'').trim().includes(text)) return el;
      }
    }
    return null;
  }

  function run() {
    for (const b of document.querySelectorAll('button')) {
      const t = (b.textContent||'').trim().toLowerCase();
      const r = b.getBoundingClientRect();
      if (r.top >= 100 || r.width <= 30 || r.height <= 0 || r.width >= 400) continue;
      if (t !== 'auto' && !/gpt|think/i.test(t)) continue;
      if ((b.textContent||'').includes(TARGET)) {
        post('found','✅ '+TARGET,{already:true}); return;
      }
      click(b);
      setTimeout(() => {
        const g = find('GPT');
        if (!g) return;
        click(g);
        setTimeout(() => {
          const m = find('GPT 5.5 Think Deeper');
          if (!m) return;
          click(m);
          post('found','✅ '+TARGET,{set:true});
        }, 600);
      }, 600);
      return;
    }
    setTimeout(run, 1000);
  }

  setTimeout(run, 3000);
})();
