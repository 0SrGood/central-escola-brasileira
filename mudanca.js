// Limpa somente o armazenamento e o service worker do Games Up antigo.
void (async () => {
  const aviso = document.getElementById('limpeza');
  const banco = new Promise(resolve => {
    try {
      const pedido = indexedDB.deleteDatabase('central-eb');
      pedido.onsuccess = () => resolve();
      pedido.onerror = () => resolve();
      pedido.onblocked = () => { if (aviso) aviso.textContent = 'Feche outras abas antigas do Games Up para concluir a limpeza.'; resolve(); };
    } catch { resolve(); }
  });
  const workers = (async () => {
    if (!('serviceWorker' in navigator)) return;
    const escopo = new URL('/central-escola-brasileira/', location.origin).href;
    const registros = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registros.filter(r => r.scope === escopo).map(r => r.unregister()));
  })();
  await Promise.race([Promise.allSettled([banco, workers]), new Promise(resolve => setTimeout(resolve, 3500))]);
  setTimeout(() => location.replace("https://games-up-app.github.io/"), 3000);
})();
