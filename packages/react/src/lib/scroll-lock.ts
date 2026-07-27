/**
 * Verrou de défilement du fond (OVERLAY-UX « un superposé modal verrouille le défilement »).
 *
 * Dans un shell applicatif, le DOCUMENT ne défile pas : c'est une RÉGION (le <main> de
 * l'AppLayout) qui porte `overflow-y: auto`. Verrouiller `document.body` seul ne verrouille
 * donc rien — le fond continue de défiler sous la surface, et le retour du focus au
 * déclencheur, à la fermeture, ramène brutalement la page ailleurs. On verrouille le body ET
 * chaque ancêtre défilant du déclencheur.
 */
function ancetresDefilants(depart: HTMLElement | null): HTMLElement[] {
  const out: HTMLElement[] = [];
  let el = depart?.parentElement ?? null;
  while (el && el !== document.body) {
    const st = getComputedStyle(el);
    if (/(auto|scroll|overlay)/.test(st.overflowY) && el.scrollHeight > el.clientHeight) out.push(el);
    el = el.parentElement;
  }
  return out;
}

/** Verrouille le défilement ; rend la fonction qui restaure l'état d'origine. */
export function verrouilleDefilement(depuis?: HTMLElement | null): () => void {
  if (typeof document === "undefined") return () => {};
  const cibles = [document.body, ...ancetresDefilants(depuis ?? null)];
  const anciens = cibles.map((c) => c.style.overflow);
  cibles.forEach((c) => {
    c.style.overflow = "hidden";
  });
  return () => cibles.forEach((c, i) => {
    c.style.overflow = anciens[i];
  });
}
