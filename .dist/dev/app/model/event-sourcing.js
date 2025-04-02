// app/model/event-sourcing.js
async function loadChunks(use_rust) {
  const chunks = [await loadChunk()];
  const ts = localStorage.getItem("_ts") || 0;
  if (ts)
    chunks.push(await loadChunk(ts));
  localStorage.setItem("_ts", Date.now());
  return chunks;
}
async function loadChunk(ts) {
  const base = sessionStorage.rust ? "big-chunk" : "chunk";
  const path = ts ? `${base}-1.json?ts=${ts}` : `${base}-0.json`;
  const url = "/app/mocks/" + path;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error loading chunk ${path}: ${res.status}`);
    }
    return await res.text();
  } catch (error) {
    console.error(`Failed to load event chunk ${url}:`, error);
    return "";
  }
}
export {
  loadChunks
};
