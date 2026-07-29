/**
 * Manifeste @fili/react — SCHÉMA.
 *
 * Le manifeste est la source structurée qui décrit l'API publique RÉELLE du kit
 * (Fili Component Contract 1.0.0, § Autorité des couches) :
 *   - TypeScript fait autorité sur ce que le composant ACCEPTE (les axes sont
 *     vérifiés à la compilation contre les unions réelles via `axe<U>()` —
 *     une valeur manquante ou inventée casse `tsc`) ;
 *   - le manifeste fait autorité sur le statut, l'intention, les relations,
 *     les exemples et les anti-patterns ;
 *   - la doctrine (content/md) fait autorité sur les règles UX/UI ;
 *   - les tokens (@fili/tokens) font autorité sur les valeurs.
 *
 * Consommateurs : l'atelier (options du playground), le catalogue destiné aux
 * agents (tools/plugin/genere-catalogue.mjs), les validateurs (tools/verifie-*).
 * Généré en JSON par packages/react/build/genere-manifeste.mjs → manifest.json.
 */

export type Statut = "stable" | "experimental" | "interne" | "expressif";

export type Categorie =
  | "contrôle" | "champ" | "surface" | "collection" | "message" | "superposé"
  | "navigation" | "structure" | "gabarit" | "affichage" | "identité" | "contenu";

/** Un axe de variation public — le `kind` DOIT être un axe du Contract. */
export interface Axe {
  kind: "variant" | "tone" | "size" | "status" | "mode" | "density" | "context" | "enum";
  description: string;
  /** valeur → description d'une ligne. Les clés sont l'union RÉELLE (vérifiée par tsc). */
  values: Record<string, string>;
  default: string | null;
}

export interface Prop {
  type: string;
  description: string;
  default?: string;
  required?: boolean;
  /** Présent = prop dépréciée ; le texte dit quoi utiliser à la place. */
  deprecated?: string;
}

export interface ExempleCanonique {
  title: string;
  /** JSX complet, compilable tel quel dans le test des exemples (imports depuis @fili/react). */
  code: string;
}

export interface Entree {
  /** Nom public exporté du baril. */
  name: string;
  package: "@fili/react" | "@fili/charts";
  /** Ligne d'import exacte, prête à coller. */
  import: string;
  status: Statut;
  category: Categorie;
  /** L'intention UX en une phrase — ce que le composant EST, pas comment il est fait. */
  purpose: string;
  /** Sources doctrinales (fichiers content/md) — null EXIGE le champ `dette`. */
  doctrine: { ux?: string; ui?: string; pattern?: string } | null;
  /** Qualification EXPLICITE de la dette doctrinale d'un composant stable sans doctrine
      (le vérificateur refuse un stable sans doctrine NI dette — pas d'avertissement permanent). */
  dette?: string;
  /** Fiche RULES compilée correspondante (dist/build/RULES-<x>.md), si elle existe. */
  rules: string | null;
  /** Sous-composants de l'API compound, dans l'ordre d'imbrication. */
  anatomy?: string[];
  /** Axes de variation — clés = noms d'axes du Contract. */
  axes?: Record<string, Axe>;
  /** Props hors axes (comportement, contenu, données). */
  props?: Record<string, Prop>;
  /** Tokens/rôles consommés qui engagent le contrat visuel (étages 2-3 d'abord). */
  tokens?: string[];
  /** États gérés (machine interne ou pseudo-états stylés). */
  states?: string[];
  /** Exigences accessibles portées PAR le composant (ce que l'usage n'a pas à refaire). */
  accessibility?: string[];
  /** Comportement adaptatif (container queries, débordement annoncé…). */
  adaptiveBehavior?: string;
  /** Avec quoi il se compose (recettes). */
  allowedComposition?: string[];
  /** Ce qu'il ne faut JAMAIS faire avec (ou à la place de) ce composant. */
  antiPatterns?: string[];
  canonicalExamples?: ExempleCanonique[];
}

/**
 * Constructeur d'axe VÉRIFIÉ : `axe<U>()` exige une description pour CHAQUE membre
 * de l'union U (Record<U, string>) et refuse toute clé hors de U. Si le composant
 * gagne ou perd une valeur, tsc casse ici — le manifeste ne peut pas mentir.
 */
export function axe<U extends string>(def: {
  kind: Axe["kind"];
  description: string;
  values: Record<U, string>;
  default: U | null;
}): Axe {
  return def as Axe;
}

/**
 * Constructeur de PROPS VÉRIFIÉ : `propsDe<P>()` refuse toute clé absente de l'API
 * publique réelle P (une prop inventée ou une dépréciée disparue casse tsc).
 * Limite honnête : P étend les attributs HTML — une invention qui collisionne avec un
 * attribut DOM passe ; tout nom métier inventé (clearable sur Button…) casse.
 */
export function propsDe<P>() {
  return <K extends { [k in keyof K]: k extends keyof P ? Prop : never }>(props: K): Record<string, Prop> =>
    props as unknown as Record<string, Prop>;
}

/**
 * Anatomie VÉRIFIÉE d'une API compound : chaque sous-nom doit être une clé réelle de
 * l'objet exporté (Card.Media inventé ne compile pas).
 */
export function anatomie<T>(root: string, subs: readonly (keyof T & string)[]): string[] {
  return [root, ...subs.map((s) => `${root}.${s}`)];
}
