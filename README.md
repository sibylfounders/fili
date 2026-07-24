# Sibyl DS — monorepo

Les sites de la constellation Sibyl sur **une même stack** : Next.js + npm workspaces,
avec des packages partagés. Un dev apprend l'organisation une fois, elle vaut pour tous.

## Lancer en local
```bash
npm install            # une fois (installe tout le workspace)
npm run dev            # -> apps/audit sur http://localhost:3000
```
Le serveur recharge à chaud : à chaque modif de fichier, la page se met à jour toute seule.

## Structure
```
packages/
  tokens/      @sibyl/tokens — source des tokens (dist servie : /css, /tailwind)
apps/
  audit/       site Audit — Next 14 (app router), export statique (GitHub Pages)
  (à venir)    ds-ui/ , ds-md/
```

## Conventions (identiques par app)
- `app/` (App Router), `content/` (markdown), `components/`, `lib/`.
- Les tokens viennent de `@sibyl/tokens` ; aucune valeur en dur.
- Build statique : `npm run build --workspace @sibyl/audit` → `apps/audit/out/`.
