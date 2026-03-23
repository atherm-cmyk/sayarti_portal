/**
 * Sayarti Portal — i18n (EN/AR)
 * Reads from CMS data (SayartiData.translations) with localStorage overrides.
 */
(function () {
  'use strict';

  function loadTranslations() {
    // Base translations from CMS data
    const base = (typeof SayartiData !== 'undefined' && SayartiData.translations) || { en: {}, ar: {} };
    // localStorage overrides (saved from admin panel)
    const overrides = JSON.parse(localStorage.getItem('sayarti_translations') || '{}');
    return {
      en: Object.assign({}, base.en, overrides.en || {}),
      ar: Object.assign({}, base.ar, overrides.ar || {})
    };
  }

  const SayartiI18n = loadTranslations();
  // Allow hot-reload from admin: call SayartiI18n.reload()
  SayartiI18n.reload = function () {
    const fresh = loadTranslations();
    Object.assign(SayartiI18n.en, fresh.en);
    Object.assign(SayartiI18n.ar, fresh.ar);
  };

  if (typeof window !== 'undefined') window.SayartiI18n = SayartiI18n;
})();

