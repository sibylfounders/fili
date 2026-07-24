import * as React from "react";
import {
  Button, Link, Container, Brand, Divider, Switch, Select, Accordion,
  Nav, TableOfContents, SkipLink, Drawer, DeleteButton, SubmitButton, ThemeToggle,
  Input, Alert, Toast, Card, CompactButton, useToast,
  type SelectOption,
} from "@sibyl/react";
import { CardGroup, codeCardSolo, codeCardGrp } from "./card-group";
import {
  StatCard, ChartCard, KpiGroup,
  AreaChart, BarChart, ComposedChart, DonutChart, LineChart,
  fmtEur, fmtInt, fmtCompact,
  type ComposedPoint, type DonutDatum, type KpiItem, type LineSeries,
} from "@sibyl/charts";

/* ── données atelier « adacard » : dogfooding de @sibyl/charts ── */
const ADA_SPARK = [1420, 1560, 1490, 1720, 1640, 1580, 1810, 1750, 1930, 1880, 2050, 1990, 2180, 2310];
const ADA_MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const ADA_CA = [32, 40, 36, 52, 47, 61, 55, 68, 63, 79, 73, 88];
const ADA_WEEKS = ["S1", "S2", "S3", "S4", "S5", "S6", "S7"];
const ADA_BARS = [38, 52, 44, 65, 58, 77, 70];
const ADA_COMPOSED: ComposedPoint[] = [
  { bar: 38, line: 52 }, { bar: 52, line: 48 }, { bar: 44, line: 61 },
  { bar: 65, line: 57 }, { bar: 58, line: 71 }, { bar: 77, line: 66 }, { bar: 70, line: 83 },
];
const ADA_PIE: DonutDatum[] = [
  { label: "Vie", value: 34, color: "var(--ch-cat-1)" },
  { label: "Santé", value: 23, color: "var(--ch-cat-2)" },
  { label: "Retraite", value: 18, color: "var(--ch-cat-3)" },
  { label: "Habitation", value: 14, color: "var(--ch-cat-4)" },
  { label: "Auto", value: 11, color: "var(--ch-cat-5)" },
];
const ADA_DETAILS: [string, string][] = [
  ["Nouveaux clients", "312"],
  ["Panier moyen", "154 €"],
  ["Taux de retour", "2,1 %"],
];
const ADA_KPIS: KpiItem[] = [
  { label: "Revenu net", value: "48 210 €", countTo: 48210, format: fmtEur, delta: { value: "+6,4 %", tone: "up" }, spark: ADA_SPARK, color: "var(--primary)" },
  { label: "Commandes", value: "1 284", delta: { value: "+8,1 %", tone: "up" }, spark: [30, 44, 58, 50, 66, 72, 88, 84, 96], color: "var(--info)" },
  { label: "Conversion", value: "3,7 %", delta: { value: "-1,2 %", tone: "down" }, spark: [71, 66, 68, 60, 58, 62, 55, 53, 50], color: "var(--success)" },
];
const ADA_TRAFFIC_MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
const ADA_TRAFFIC: LineSeries[] = [
  { label: "Organique", data: [4200, 4600, 4100, 5200, 5000, 5800, 6100, 5900, 6600, 7000, 7400, 8100], color: "var(--ch-cat-1)" },
  { label: "Payant", data: [2600, 3100, 2900, 3300, 3000, 3600, 3400, 3900, 3700, 4200, 4000, 4600], color: "var(--ch-cat-4)" },
];
const kEur = (n: number) => fmtInt(n) + " k€";

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
          const isz = s.context === "inline" ? "sm" : "md";
          const iconCls = s.context === "inline" ? "self-center" : undefined;
          const inner = (
            <Link href="#" context={s.context} current={s.current} className={s.context === "inline" ? "items-baseline" : undefined}>
              {lead ? <Link.Icon size={isz} className={iconCls}>{IC_ARROW}</Link.Icon> : null}
              {s.label || "Lien"}
              {trail ? <Link.Icon size={isz} className={iconCls}>{IC_ARROW}</Link.Icon> : null}
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
      {
        key: "adacard", name: "StatCard",
        blocks: [
          {
            title: "StatCard — KPI adaptative (compact / regular / expanded)",
            render: () => (
              <StatCard title="Revenu net" period="30 derniers jours" value={48210} format={fmtEur}
                delta={{ value: "+6,4 %", tone: "up" }} spark={ADA_SPARK} details={ADA_DETAILS} showState />
            ),
            code: () => `<StatCard
  title="Revenu net"
  period="30 derniers jours"
  value={48210}
  format={fmtEur}
  delta={{ value: "+6,4 %", tone: "up" }}
  spark={revenus}
  details={[
    ["Nouveaux clients", "312"],
    ["Panier moyen", "154 €"],
    ["Taux de retour", "2,1 %"],
  ]}
  showState
/>`,
          },
          {
            title: "KpiGroup — en-tête + KPI animés (façon HeroUI « With KPIs »)",
            render: () => (
              <KpiGroup title="Métriques clés" period="30 derniers jours" items={ADA_KPIS} />
            ),
            code: () => `<KpiGroup
  title="Métriques clés"
  period="30 derniers jours"
  items={[
    // 1re colonne : valeur animée (count-up) via countTo + format
    { label: "Revenu net", value: "48 210 €", countTo: 48210, format: fmtEur,
      delta: { value: "+6,4 %", tone: "up" }, spark: revenus, color: "var(--primary)" },
    { label: "Commandes", value: "1 284", delta: { value: "+8,1 %", tone: "up" }, spark: commandes, color: "var(--info)" },
    { label: "Conversion", value: "3,7 %", delta: { value: "-1,2 %", tone: "down" }, spark: conv, color: "var(--success)" },
  ]}
/>`,
          },
          {
            title: "AreaChart — aire responsive & animée",
            render: () => (
              <ChartCard title="Chiffre d'affaires" sub="12 derniers mois" delta={{ value: "+14,2 %", tone: "up" }}>
                <AreaChart data={ADA_CA} labels={ADA_MONTHS} label="CA" format={kEur} height={150} />
              </ChartCard>
            ),
            code: () => `<ChartCard title="Chiffre d'affaires" sub="12 derniers mois" delta={{ value: "+14,2 %", tone: "up" }}>
  <AreaChart data={ca} labels={mois} label="CA" format={(n) => fmtInt(n) + " k€"} height={150} />
</ChartCard>`,
          },
          {
            title: "BarChart — barres responsives",
            render: () => (
              <ChartCard title="Souscriptions" sub="7 dernières semaines" delta={{ value: "+9,3 %", tone: "up" }}>
                <BarChart data={ADA_BARS} labels={ADA_WEEKS} label="Souscriptions" height={150} />
              </ChartCard>
            ),
            code: () => `<ChartCard title="Souscriptions" sub="7 dernières semaines" delta={{ value: "+9,3 %", tone: "up" }}>
  <BarChart data={[38, 52, 44, 65, 58, 77, 70]} labels={semaines} label="Souscriptions" height={150} />
</ChartCard>`,
          },
          {
            title: "ComposedChart — barres + ligne",
            render: () => (
              <ChartCard title="Souscriptions vs objectif" sub="7 dernières semaines" delta={{ value: "+9,3 %", tone: "up" }}>
                <ComposedChart data={ADA_COMPOSED} labels={ADA_WEEKS} barLabel="Souscriptions" lineLabel="Objectif" height={150} />
              </ChartCard>
            ),
            code: () => `<ChartCard title="Souscriptions vs objectif" sub="7 dernières semaines" delta={{ value: "+9,3 %", tone: "up" }}>
  <ComposedChart data={data} labels={semaines} barLabel="Souscriptions" lineLabel="Objectif" height={150} />
</ChartCard>`,
          },
          {
            title: "LineChart — multi-séries (façon HeroUI « With Line Chart »)",
            render: () => (
              <ChartCard title="Trafic" sub="12 derniers mois" delta={{ value: "+18,6 %", tone: "up" }}>
                <LineChart series={ADA_TRAFFIC} labels={ADA_TRAFFIC_MONTHS} format={fmtCompact} height={160} />
              </ChartCard>
            ),
            code: () => `<ChartCard title="Trafic" sub="12 derniers mois" delta={{ value: "+18,6 %", tone: "up" }}>
  <LineChart
    series={[
      { label: "Organique", data: organique, color: "var(--ch-cat-1)" },
      { label: "Payant", data: payant, color: "var(--ch-cat-4)" },
    ]}
    labels={mois}
    format={fmtCompact}
    height={160}
  />
</ChartCard>`,
          },
          {
            title: "DonutChart — anneau responsive",
            render: () => (
              <ChartCard title="Répartition des contrats" sub="Par catégorie · 2024">
                <DonutChart data={ADA_PIE} total="12,4k" totalLabel="assurés" ariaLabel="Répartition des contrats par catégorie" />
              </ChartCard>
            ),
            code: () => `<ChartCard title="Répartition des contrats" sub="Par catégorie · 2024">
  <DonutChart
    data={[
      { label: "Vie", value: 34, color: "var(--ch-cat-1)" },
      { label: "Santé", value: 23, color: "var(--ch-cat-2)" },
      { label: "Retraite", value: 18, color: "var(--ch-cat-3)" },
      { label: "Habitation", value: 14, color: "var(--ch-cat-4)" },
      { label: "Auto", value: 11, color: "var(--ch-cat-5)" },
    ]}
    total="12,4k"
    totalLabel="assurés"
    ariaLabel="Répartition des contrats par catégorie"
  />
</ChartCard>`,
          },
        ],
        render: () => (
          <StatCard title="Revenu net" period="30 derniers jours" value={48210} format={fmtEur}
            delta={{ value: "+6,4 %", tone: "up" }} spark={ADA_SPARK} details={ADA_DETAILS} showState />
        ),
        code: () =>
          `<StatCard title="Revenu net" period="30 derniers jours" value={48210} format={fmtEur} delta={{ value: "+6,4 %", tone: "up" }} spark={revenus} details={details} showState />`,
      }
    ],
  },
];
