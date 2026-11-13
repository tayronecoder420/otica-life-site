/* Aviso de cookies (LGPD / Guia de Cookies da ANPD)
   - Nada opcional carrega antes do consentimento; recusar é tão fácil quanto aceitar.
   - A escolha fica salva neste navegador (data, hora e versão do aviso) e pode ser mudada pelo rodapé.
   - Para ativar a medição, preencha os IDs abaixo. Enquanto estiverem vazios, nenhuma ferramenta é carregada. */
(function(){
  var CK = { versao: '2026-11-12', ga4: '' /* ex.: 'G-XXXXXXXXXX' */, googleAds: '' /* ex.: 'AW-XXXXXXXXX' */, metaPixel: '' /* ex.: '123456789012345' */, googleAdsConversao: '' /* rótulo da conversão do Google Ads, ex.: 'AbCdEfGh123' */ };
  var KEY = 'oticalife_cookies';
  var bar = document.getElementById('ckBar'), dlg = document.getElementById('ckDlg');
  var ana = document.getElementById('ckAna'), ads = document.getElementById('ckAds'), fab = document.getElementById('fab');
  var lastFocus = null, loaded = {};
  function read(){ try { var v = JSON.parse(localStorage.getItem(KEY)); return v && v.versao === CK.versao ? v : null; } catch(e){ return null; } }
  function write(v){ try { localStorage.setItem(KEY, JSON.stringify(v)); } catch(e){} }
  function lift(){ if (!fab) return; fab.style.bottom = bar.hidden ? '' : (bar.offsetHeight + 24) + 'px'; }
  function addScript(src){ var s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); }
  function apply(c){
    gtag('consent', 'update', { analytics_storage: c.analise ? 'granted' : 'denied', ad_storage: c.anuncios ? 'granted' : 'denied', ad_user_data: c.anuncios ? 'granted' : 'denied', ad_personalization: c.anuncios ? 'granted' : 'denied' });
    var gid = (c.analise && CK.ga4) || (c.anuncios && CK.googleAds);
    if (gid && !loaded.gtag) { loaded.gtag = 1; addScript('https://www.googletagmanager.com/gtag/js?id=' + gid); gtag('js', new Date()); }
    if (c.analise && CK.ga4 && !loaded.ga4) { loaded.ga4 = 1; gtag('config', CK.ga4); }
    if (c.anuncios && CK.googleAds && !loaded.ads) { loaded.ads = 1; gtag('config', CK.googleAds); }
    if (c.anuncios && CK.metaPixel && !loaded.fb) { loaded.fb = 1;
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', CK.metaPixel); fbq('track', 'PageView'); }
    if (window.fbq) fbq('consent', c.anuncios ? 'grant' : 'revoke');
  }
  function decide(analise, anuncios){
    var c = { versao: CK.versao, data: new Date().toISOString(), analise: !!analise, anuncios: !!anuncios };
    write(c); apply(c); bar.hidden = true; lift(); closeDlg();
    /* Se a pessoa retirou uma permissão já dada, recarrega para descarregar as ferramentas. */
    if ((loaded.ga4 && !analise) || ((loaded.ads || loaded.fb) && !anuncios)) location.reload();
  }
  function openDlg(){ var c = read(); ana.checked = !!(c && c.analise); ads.checked = !!(c && c.anuncios); lastFocus = document.activeElement; dlg.hidden = false; document.body.style.overflow = 'hidden'; dlg.querySelector('[data-ck=close]').focus(); }
  function closeDlg(){ if (dlg.hidden) return; dlg.hidden = true; document.body.style.overflow = ''; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  document.addEventListener('click', function(e){
    var b = e.target.closest('[data-ck]'); if (!b) { if (e.target === dlg) closeDlg(); return; }
    var a = b.dataset.ck;
    if (a === 'accept') decide(true, true);
    else if (a === 'reject') decide(false, false);
    else if (a === 'save') decide(ana.checked, ads.checked);
    else if (a === 'prefs') openDlg();
    else if (a === 'close') closeDlg();
  });
  document.addEventListener('keydown', function(e){
    if (dlg.hidden) return;
    if (e.key === 'Escape') { closeDlg(); return; }
    if (e.key === 'Tab') { var f = dlg.querySelectorAll('button,input:not([disabled])'), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }
  });
  /* Conta cada clique em botão de WhatsApp como contato (só envia dados se a pessoa aceitou os cookies). */
  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href*="wa.me/"]'); if (!a) return;
    var onde = a.id || (a.closest('#vitrineList') ? 'card_vitrine' : a.closest('#brandList') ? 'marca' : a.closest('#stores') ? 'card_loja' : a.closest('#faq') ? 'faq' : 'outro');
    var loja = (a.href.match(/wa\.me\/(\d+)/) || [])[1] === '5514988203639' ? 'jardim_america' : 'centro';
    gtag('event', 'generate_lead', { method: 'whatsapp', botao: onde, loja: loja });
    if (CK.googleAds && CK.googleAdsConversao) gtag('event', 'conversion', { send_to: CK.googleAds + '/' + CK.googleAdsConversao });
    if (window.fbq) fbq('track', 'Contact', { content_name: onde, loja: loja });
  }, true);
  window.addEventListener('resize', lift);
  var saved = read();
  if (saved) apply(saved); else { bar.hidden = false; setTimeout(lift, 0); }
})();
