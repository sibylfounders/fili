import * as React from "react";
import {
  Button, Link, Container, Brand, Divider, Switch, Select, Accordion,
  Nav, TableOfContents, SkipLink, Drawer, DeleteButton, SubmitButton, ThemeToggle,
  type SelectOption,
} from "@sibyl/react";

export type Control =
  | { k: string; type: "seg"; label?: string; opts: string[] }
  | { k: string; type: "bool"; label?: string }
  | { k: string; type: "text"; label?: string }
  | { k: string; type: "range"; label?: string; min: number; max: number; step?: number; unit?: string };

type S = Record<string, any>;
type Set = (k: string, v: any) => void;

export interface Entry {
  key: string;
  name: string;
  controls?: Control[];
  initial?: S;
  render: (s: S, set: Set) => React.ReactNode;
  code: (s: S, fw?: string) => string;
  replay?: boolean;
}
export interface Group { label: string; items: Entry[]; }

/* ---------- démos à état interne ---------- */
const DrawerDemo: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button.Root onClick={() => setOpen(true)}>Ouvrir le tiroir</Button.Root>
      <Drawer open={open} onClose={() => setOpen(false)} side="start" aria-label="Tiroir de démonstration">
        <div className="flex flex-col gap-sm p-lg">
          <b className="text-text-primary">Tiroir modal</b>
          <p className="m-0 text-sm text-text-secondary">Voile · focus piégé · Échap ferme · retour du focus.</p>
          <Button.Root style="ghost" tone="neutral" onClick={() => setOpen(false)}>Fermer</Button.Root>
        </div>
      </Drawer>
    </>
  );
};

const SITE_OPTS: SelectOption[] = [
  { value: "md", label: "Design System MD" },
  { value: "ui", label: "Design System UI" },
  { value: "audit", label: "Design System Audit", disabled: true },
];

/* ---------- registre ---------- */
export const GROUPS: Group[] = [
  {
    label: "Layout",
    items: [
      {
        key: "container", name: "Container",
        controls: [{ k: "size", type: "seg", opts: ["narrow", "default", "wide", "full"] }],
        initial: { size: "default" },
        render: (s) => (
          <Container size={s.size}>
            <div className="rounded-md border border-border bg-surface px-md py-sm text-sm text-text-secondary">size = {s.size}</div>
          </Container>
        ),
        code: (s) => `<Container size="${s.size}">…</Container>`,
      },
      {
        key: "brand", name: "Brand",
        render: () => (
          <Brand.Root>
            <Brand.Logo><svg viewBox="0 0 24 24" fill="none"><path d="M5 6h14M5 12h14M5 18h9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg></Brand.Logo>
            <Brand.Text>Sibyl DS</Brand.Text>
          </Brand.Root>
        ),
        code: () => `<Brand.Root>\n  <Brand.Logo><Logo/></Brand.Logo>\n  <Brand.Text>Sibyl DS</Brand.Text>\n</Brand.Root>`,
      },
      {
        key: "divider", name: "Divider",
        render: () => (
          <div className="w-64"><p className="m-0 text-sm text-text-primary">Au-dessus</p><Divider /><p className="m-0 text-sm text-text-primary">En dessous</p></div>
        ),
        code: () => `<Divider />`,
      },
    ],
  },
  {
    label: "Navigation",
    items: [
      {
        key: "nav", name: "Nav",
        render: () => (
          <div className="w-72">
            <Nav.Root label="Navigation d'exemple">
              <Nav.List>
                <Nav.Link href="#">Couleur</Nav.Link>
                <Nav.Link href="#" current>Overlay</Nav.Link>
                <Nav.Link href="#">Grille</Nav.Link>
              </Nav.List>
            </Nav.Root>
          </div>
        ),
        code: () => `<Nav.Root label="…">\n  <Nav.List><Nav.Link current>…</Nav.Link></Nav.List>\n</Nav.Root>`,
      },
      {
        key: "accordion", name: "Accordion",
        render: () => (
          <div className="w-80">
            <Accordion type="multiple" defaultOpen={["f"]}>
              <Accordion.Item value="f"><Accordion.Header>Fondations</Accordion.Header><Accordion.Panel><p className="m-0 text-sm text-text-secondary">Couleur, espacement, typographie, grille.</p></Accordion.Panel></Accordion.Item>
              <Accordion.Item value="c"><Accordion.Header>Composants</Accordion.Header><Accordion.Panel><p className="m-0 text-sm text-text-secondary">Select, Switch, Accordion…</p></Accordion.Panel></Accordion.Item>
            </Accordion>
          </div>
        ),
        code: () => `<Accordion type="multiple">\n  <Accordion.Item value="f"><Accordion.Header>…</Accordion.Header><Accordion.Panel>…</Accordion.Panel></Accordion.Item>\n</Accordion>`,
      },
      {
        key: "toc", name: "TableOfContents",
        render: () => (
          <TableOfContents items={[{ id: "s1", label: "Modal vs non-modal" }, { id: "s2", label: "Ordre d'empilement" }, { id: "s3", label: "Voile (scrim)" }]} />
        ),
        code: () => `<TableOfContents items={[{ id, label }, …]} />`,
      },
      {
        key: "skiplink", name: "SkipLink",
        render: () => (
          <div className="text-sm text-text-secondary"><SkipLink href="#main">Aller au contenu</SkipLink><p className="mt-0">Appuie sur <b>Tab</b> : le lien apparaît en haut à gauche.</p></div>
        ),
        code: () => `<SkipLink href="#main">Aller au contenu</SkipLink>`,
      },
    ],
  },
  {
    label: "Overlays",
    items: [
      { key: "drawer", name: "Drawer", render: () => <DrawerDemo />, code: () => `<Drawer open={open} onClose={() => setOpen(false)} side="start" aria-label="…">…</Drawer>` },
    ],
  },
  {
    label: "Formulaire",
    items: [
      {
        key: "select", name: "Select",
        initial: { value: "md" },
        render: (s, set) => (
          <Select options={SITE_OPTS} value={s.value} onValueChange={(v) => set("value", v)} aria-label="Site" />
        ),
        code: (s) => `<Select options={OPTS} value="${s.value}" onValueChange={setV} aria-label="Site" />`,
      },
      {
        key: "switch", name: "Switch",
        controls: [{ k: "checked", type: "bool", label: "Activé" }],
        initial: { checked: true },
        render: (s, set) => (
          <label className="flex items-center gap-md text-sm text-text-primary">
            <Switch checked={s.checked} onCheckedChange={(v) => set("checked", v)} aria-label="Exemple" />
            <span>{s.checked ? "Activé" : "Désactivé"}</span>
          </label>
        ),
        code: (s) => `<Switch checked={${s.checked}} onCheckedChange={setOn} aria-label="…" />`,
      },
    ],
  },
  {
    label: "Actions",
    items: [
      {
        key: "button", name: "Button",
        controls: [
          { k: "style", type: "seg", opts: ["filled", "stroke", "lighter", "ghost"] },
          { k: "tone", type: "seg", opts: ["primary", "neutral", "destructive"] },
          { k: "size", type: "seg", opts: ["sm", "md", "lg"] },
          { k: "label", type: "text", label: "Libellé" },
        ],
        initial: { style: "filled", tone: "primary", size: "md", label: "Enregistrer" },
        render: (s) => (
          <Button.Root style={s.style} tone={s.tone} size={s.size}>{s.label || "Bouton"}</Button.Root>
        ),
        code: (s, fw) => {
          const t = s.label || "Bouton";
          if (fw === "html") return `<button class="btn btn--${s.style} btn--${s.tone} btn--${s.size}">${t}</button>`;
          if (fw === "angular") return `<button dsButton style="${s.style}" tone="${s.tone}" size="${s.size}">${t}</button>`;
          if (fw === "tailwind") return `<button class="inline-flex items-center gap-2 rounded-md px-md py-xs bg-primary text-on-primary">${t}</button>`;
          return `<Button.Root style="${s.style}" tone="${s.tone}" size="${s.size}">${t}</Button.Root>`;
        },
      },
      {
        key: "link", name: "Link",
        render: () => (
          <div className="flex flex-col gap-sm text-sm text-text-primary">
            <Link href="#">Lien autonome</Link>
            <p className="m-0">Un <Link href="#" context="inline">lien inline</Link> dans une phrase.</p>
          </div>
        ),
        code: () => `<Link href="#" context="standalone">En savoir plus</Link>`,
      },
    ],
  },
  {
    label: "Actions animées",
    items: [
      {
        key: "delete", name: "DeleteButton", replay: true,
        controls: [{ k: "size", type: "seg", opts: ["sm", "md", "lg"] }],
        initial: { size: "lg" },
        render: (s) => (
          <DeleteButton size={s.size} onDelete={() => new Promise((r) => setTimeout(r, 900))}>Supprimer</DeleteButton>
        ),
        code: (s) => `<DeleteButton size="${s.size}" onDelete={fn}>Supprimer</DeleteButton>`,
      },
      {
        key: "submit", name: "SubmitButton", replay: true,
        controls: [{ k: "size", type: "seg", opts: ["sm", "md", "lg"] }],
        initial: { size: "lg" },
        render: (s) => (
          <SubmitButton size={s.size} onSubmit={() => new Promise((r) => setTimeout(r, 900))}>Envoyer</SubmitButton>
        ),
        code: (s) => `<SubmitButton size="${s.size}" onSubmit={fn}>Envoyer</SubmitButton>`,
      },
    ],
  },
  {
    label: "Theming",
    items: [
      {
        key: "themetoggle", name: "ThemeToggle",
        controls: [{ k: "checked", type: "bool", label: "Sombre" }],
        initial: { checked: false },
        render: (s, set) => (
          <label className="flex items-center gap-md text-sm text-text-primary">
            <ThemeToggle checked={s.checked} onCheckedChange={(v) => set("checked", v)} aria-label="Thème sombre" />
            <span>{s.checked ? "Sombre" : "Clair"}</span>
          </label>
        ),
        code: (s) => `<ThemeToggle checked={${s.checked}} onCheckedChange={setDark} aria-label="Thème sombre" />`,
      },
    ],
  },
];
