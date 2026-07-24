import * as React from "react";
import {
  Button, Link, Container, Brand, Divider, Switch, Select, Accordion,
  Nav, TableOfContents, SkipLink, Drawer, DeleteButton, SubmitButton, ThemeToggle,
  Input, Alert, Toast, Card, CompactButton, useToast,
  type SelectOption,
} from "@sibyl/react";
import { CardGroup, codeCardSolo, codeCardGrp } from "./card-group";

/* icônes + skeleton + opérations async — partagés par les entrées composants */
const IC_MAIL = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>);
const IC_CLOSE = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>);
const IC_ARROW = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>);
const Sk = ({ w, h, r = "var(--radius-sm)" }: { w: string | number; h: string | number; r?: string }) => (
  <span className="sk" style={{ display: "inline-block", width: w, height: h, borderRadius: r }} />
);
const asyncOp = (mode: string) =>
  mode === "instant"
    ? () => Promise.resolve()
    : mode === "échec"
    ? () => new Promise((_, rej) => setTimeout(() => rej(new Error("échec")), 900))
    : () => new Promise((r) => setTimeout(r, 900));

type Base = { k: string; label?: string; sec?: string; disabled?: (s: Record<string, any>) => boolean };
export type Control =
  | (Base & { type: "seg"; opts: string[] })
  | (Base & { type: "bool" })
  | (Base & { type: "text" })
  | (Base & { type: "range"; min: number; max: number; step?: number; unit?: string });

type S = Record<string, any>;
type Set = (k: string, v: any) => void;

export interface Block {
  title: string;
  render: (s: S, set: Set) => React.ReactNode;
  code: (s: S, fw?: string) => string;
}
export interface Entry {
  key: string;
  name: string;
  controls?: Control[];
  initial?: S;
  render: (s: S, set: Set) => React.ReactNode;
  code: (s: S, fw?: string) => string;
  replay?: boolean;
  blocks?: Block[];
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

const ToastTrigger: React.FC<{ s: Record<string, any> }> = ({ s }) => {
  const { toast } = useToast();
  return (
    <Button.Root onClick={() => toast({ tone: s.tone, title: s.title || "Enregistré", description: s.description || undefined, closing: s.closing })}>
      Afficher un toast
    </Button.Root>
  );
};
const ToastDemo: React.FC<{ s: Record<string, any> }> = ({ s }) => (
  <Toast.Provider>
    <ToastTrigger s={s} />
  </Toast.Provider>
);

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
          { k: "icon", type: "seg", opts: ["none", "leading", "trailing", "both", "only"], label: "Icône" },
          { k: "label", type: "text", label: "Label" },
          { k: "disabled", type: "bool", label: "Disabled", sec: "Interaction" },
          { k: "skeleton", type: "bool", label: "Skeleton", sec: "Interaction" },
        ],
        initial: { style: "filled", tone: "primary", size: "md", icon: "none", label: "Enregistrer", disabled: false, skeleton: false },
        render: (s) => {
          if (s.skeleton) return <div className="h-10 w-28 animate-pulse rounded-md bg-surface" />;
          const ic = (
            <Button.Icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Button.Icon>
          );
          const only = s.icon === "only";
          const lead = s.icon === "leading" || s.icon === "both" || only;
          const trail = s.icon === "trailing" || s.icon === "both";
          return (
            <Button.Root style={s.style} tone={s.tone} size={s.size} disabled={s.disabled} aria-label={only ? s.label || "Action" : undefined}>
              {lead ? ic : null}
              {!only ? s.label || "Bouton" : null}
              {trail ? ic : null}
            </Button.Root>
          );
        },
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
        controls: [
          { k: "context", type: "seg", opts: ["inline", "standalone", "navigation"] },
          { k: "icon", type: "seg", label: "Icône", opts: ["none", "leading", "trailing"] },
          { k: "label", type: "text", label: "Label" },
          { k: "current", type: "bool", label: "Courant (navigation)" },
          { sec: "Interaction", k: "skeleton", type: "bool", label: "Skeleton" },
        ],
        initial: { context: "standalone", icon: "none", label: "En savoir plus", current: false, skeleton: false },
        render: (s) => {
          if (s.skeleton) return <Sk w={128} h={16} />;
          const lead = s.icon === "leading";
          const trail = s.icon === "trailing";
          const inner = (
            <Link href="#" context={s.context} current={s.current}>
              {lead ? <Link.Icon>{IC_ARROW}</Link.Icon> : null}
              {s.label || "Lien"}
              {trail ? <Link.Icon>{IC_ARROW}</Link.Icon> : null}
            </Link>
          );
          return s.context === "inline" ? <p className="m-0 text-sm text-text-primary">Un {inner} dans une phrase.</p> : inner;
        },
        code: (s) => `<Link href="#" context="${s.context}"${s.current ? " current" : ""}>${s.label || "Lien"}</Link>`,
      },
    ],
  },
  {
    label: "Actions animées",
    items: [
      {
        key: "delete", name: "DeleteButton", replay: true,
        controls: [
          { k: "size", type: "seg", opts: ["sm", "md", "lg"] },
          { k: "text", type: "text", label: "Label" },
          { k: "async", type: "seg", label: "Opération", opts: ["instant", "lent", "échec"] },
          { sec: "Interaction", k: "skeleton", type: "bool", label: "Skeleton" },
        ],
        initial: { size: "lg", text: "Supprimer", async: "lent", skeleton: false },
        render: (s) =>
          s.skeleton ? <Sk w={128} h={s.size === "sm" ? 32 : s.size === "md" ? 40 : 48} r="var(--radius-md)" /> : (
            <DeleteButton size={s.size} onDelete={asyncOp(s.async)}>{s.text || "Supprimer"}</DeleteButton>
          ),
        code: (s) => `<DeleteButton size="${s.size}" onDelete={fn}>${s.text || "Supprimer"}</DeleteButton>`,
      },
      {
        key: "submit", name: "SubmitButton", replay: true,
        controls: [
          { k: "size", type: "seg", opts: ["sm", "md", "lg"] },
          { k: "text", type: "text", label: "Label" },
          { k: "async", type: "seg", label: "Opération", opts: ["instant", "lent", "échec"] },
          { sec: "Interaction", k: "skeleton", type: "bool", label: "Skeleton" },
        ],
        initial: { size: "lg", text: "Envoyer", async: "lent", skeleton: false },
        render: (s) =>
          s.skeleton ? <Sk w={128} h={s.size === "sm" ? 32 : s.size === "md" ? 40 : 48} r="var(--radius-md)" /> : (
            <SubmitButton size={s.size} onSubmit={asyncOp(s.async)}>{s.text || "Envoyer"}</SubmitButton>
          ),
        code: (s) => `<SubmitButton size="${s.size}" onSubmit={fn}>${s.text || "Envoyer"}</SubmitButton>`,
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
  {
    label: "Champs & actions",
    items: [
      {
        key: "input", name: "Input",
        controls: [
          { k: "size", type: "seg", opts: ["sm", "md", "lg"] },
          { k: "tone", type: "seg", opts: ["neutral", "error", "success", "warning"] },
          { k: "icon", type: "bool", label: "Icône (leading)" },
          { k: "placeholder", type: "text", label: "Placeholder" },
          { k: "disabled", type: "bool", label: "Disabled" },
          { sec: "Interaction", k: "skeleton", type: "bool", label: "Skeleton" },
        ],
        initial: { size: "md", tone: "neutral", icon: false, placeholder: "nom@domaine.fr", disabled: false, skeleton: false },
        render: (s) => (
          <div className="w-72">
            {s.skeleton ? (
              <Sk w="100%" h={s.size === "sm" ? 32 : s.size === "lg" ? 48 : 40} r="var(--radius-md)" />
            ) : (
              <Input.Root size={s.size} tone={s.tone}>
                <Input.Wrapper>
                  {s.icon ? <Input.Icon>{IC_MAIL}</Input.Icon> : null}
                  <Input.Input placeholder={s.placeholder} disabled={s.disabled} aria-label="Champ" />
                </Input.Wrapper>
              </Input.Root>
            )}
          </div>
        ),
        code: (s) => `<Input.Root size="${s.size}" tone="${s.tone}"><Input.Wrapper>${s.icon ? "<Input.Icon>\u2026</Input.Icon>" : ""}<Input.Input placeholder="${s.placeholder}"${s.disabled ? " disabled" : ""} /></Input.Wrapper></Input.Root>`,
      },
      {
        key: "compact", name: "CompactButton",
        controls: [
          { k: "style", type: "seg", opts: ["filled", "stroke", "lighter", "ghost"] },
          { k: "tone", type: "seg", opts: ["primary", "neutral", "destructive"] },
          { k: "size", type: "seg", opts: ["sm", "md"] },
          { k: "fullRadius", type: "bool", label: "Full radius" },
          { k: "disabled", type: "bool", label: "Disabled" },
          { sec: "Interaction", k: "skeleton", type: "bool", label: "Skeleton" },
        ],
        initial: { style: "filled", tone: "primary", size: "md", fullRadius: false, disabled: false, skeleton: false },
        render: (s) =>
          s.skeleton ? (
            <Sk w={s.size === "sm" ? 20 : 24} h={s.size === "sm" ? 20 : 24} r={s.fullRadius ? "9999px" : "var(--radius-md)"} />
          ) : (
            <CompactButton style={s.style} tone={s.tone} size={s.size} fullRadius={s.fullRadius} disabled={s.disabled} aria-label="Fermer">
              {IC_CLOSE}
            </CompactButton>
          ),
        code: (s) => `<CompactButton style="${s.style}" tone="${s.tone}" size="${s.size}"${s.fullRadius ? " fullRadius" : ""} aria-label="Fermer"><CloseIcon /></CompactButton>`,
      },
    ],
  },
  {
    label: "Contenu & feedback",
    items: [
      {
        key: "card", name: "Card",
        controls: [
          { sec: "Card", k: "media", type: "seg", label: "Media", opts: ["icône", "image", "aucun"] },
          { sec: "Card", k: "description", type: "bool", label: "Description" },
          { sec: "Card", k: "buttons", type: "bool", label: "Boutons" },
          { sec: "Card", k: "density", type: "seg", label: "Densité", opts: ["spacious", "comfortable", "compact"] },
          { sec: "Groupe", k: "orientation", type: "seg", label: "Orientation", opts: ["défaut", "inline"] },
          { sec: "Groupe", k: "cols", type: "seg", label: "Colonnes", opts: ["1", "2", "3"], disabled: (s) => s.orientation === "inline" },
          { sec: "Groupe", k: "separated", type: "bool", label: "Séparées" },
          { sec: "Interaction", k: "mode", type: "seg", label: "Mode", opts: ["static", "clickable", "selectable"] },
          { sec: "Interaction", k: "skeleton", type: "bool", label: "Skeleton" },
        ],
        initial: { media: "icône", description: true, buttons: false, density: "comfortable", orientation: "défaut", cols: "2", separated: true, mode: "selectable", skeleton: false },
        blocks: [
          { title: "Card", render: (s) => <CardGroup solo s={s as any} />, code: (s) => codeCardSolo(s as any) },
          { title: "Card group", render: (s) => <CardGroup s={s as any} />, code: (s) => codeCardGrp(s as any) },
        ],
        render: (s) => <CardGroup s={s as any} />,
        code: (s) => codeCardGrp(s as any),
      },
      {
        key: "alert", name: "Alert",
        controls: [
          { k: "tone", type: "seg", opts: ["info", "success", "warning", "danger"] },
          { k: "title", type: "text", label: "Titre" },
          { k: "description", type: "text", label: "Description" },
          { k: "dismissible", type: "bool", label: "Dismissible" },
          { sec: "Interaction", k: "skeleton", type: "bool", label: "Skeleton" },
        ],
        initial: { tone: "info", title: "Notification", description: "Un message contextuel qui s'installe dans la page.", dismissible: false, skeleton: false },
        render: (s) =>
          s.skeleton ? (
            <div className="flex max-w-md items-start gap-md rounded-md border border-border p-md">
              <Sk w={20} h={20} r="9999px" />
              <div className="flex flex-1 flex-col gap-2 pt-0.5"><Sk w="45%" h={12} /><Sk w="85%" h={10} /></div>
            </div>
          ) : (
            <Alert.Root tone={s.tone} className="max-w-md">
              <Alert.Icon />
              <Alert.Content>
                <Alert.Title>{s.title || "Notification"}</Alert.Title>
                <Alert.Description>{s.description}</Alert.Description>
              </Alert.Content>
              {s.dismissible ? <Alert.Close /> : null}
            </Alert.Root>
          ),
        code: (s) => `<Alert.Root tone="${s.tone}">\n  <Alert.Icon />\n  <Alert.Content><Alert.Title>${s.title || "Notification"}</Alert.Title><Alert.Description>\u2026</Alert.Description></Alert.Content>${s.dismissible ? "\n  <Alert.Close />" : ""}\n</Alert.Root>`,
      },
      {
        key: "toast", name: "Toast",
        controls: [
          { k: "tone", type: "seg", opts: ["reverse", "info", "success", "warning", "danger"] },
          { k: "title", type: "text", label: "Titre" },
          { k: "description", type: "text", label: "Description" },
          { k: "closing", type: "seg", label: "Fermeture", opts: ["défaut", "croix", "timer"] },
          { sec: "Interaction", k: "skeleton", type: "bool", label: "Skeleton" },
        ],
        initial: { tone: "success", title: "Enregistré", description: "Vos changements sont sauvegardés.", closing: "défaut", skeleton: false },
        render: (s) =>
          s.skeleton ? (
            <div className="flex w-80 items-start gap-md rounded-lg border border-border p-md">
              <Sk w={20} h={20} r="9999px" />
              <div className="flex flex-1 flex-col gap-2 pt-0.5"><Sk w="50%" h={12} /><Sk w="80%" h={10} /></div>
            </div>
          ) : (
            <ToastDemo s={s} />
          ),
        code: (s) => `const { toast } = useToast();\ntoast({ tone: "${s.tone}", title: "${s.title || "\u2026"}", description: "\u2026"${s.closing !== "défaut" ? `, closing: "${s.closing}"` : ""} });`,
      },
    ],
  },
];
