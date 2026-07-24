import * as React from "react";
import {
  Button, Link, Container, Brand, Divider, Switch, Select, Accordion,
  Nav, TableOfContents, SkipLink, Drawer, AppShell,
  DeleteButton, SubmitButton, ThemeToggle,
  type SelectOption,
} from "@sibyl/react";

export interface Entry {
  key: string;
  name: string;
  code: string;
  Demo: React.FC;
}
export interface Group {
  label: string;
  items: Entry[];
}

/* ---------- démos interactives ---------- */
const SwitchDemo: React.FC = () => {
  const [on, setOn] = React.useState(true);
  return (
    <label className="flex items-center gap-md text-sm text-text-primary">
      <Switch checked={on} onCheckedChange={setOn} aria-label="Exemple" />
      <span>{on ? "Activé" : "Désactivé"}</span>
    </label>
  );
};

const OPTS: SelectOption[] = [
  { value: "md", label: "Design System MD" },
  { value: "ui", label: "Design System UI" },
  { value: "audit", label: "Design System Audit", disabled: true },
];
const SelectDemo: React.FC = () => {
  const [v, setV] = React.useState<string | null>("md");
  return <Select options={OPTS} value={v} onValueChange={setV} aria-label="Site" />;
};

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

const AccordionDemo: React.FC = () => (
  <div className="w-80">
    <Accordion type="multiple" defaultOpen={["f"]}>
      <Accordion.Item value="f">
        <Accordion.Header>Fondations</Accordion.Header>
        <Accordion.Panel><p className="m-0 text-sm text-text-secondary">Couleur, espacement, typographie, grille.</p></Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="c">
        <Accordion.Header>Composants</Accordion.Header>
        <Accordion.Panel><p className="m-0 text-sm text-text-secondary">Select, Switch, Accordion…</p></Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  </div>
);

const NavDemo: React.FC = () => (
  <div className="w-72">
    <Nav.Root label="Navigation d'exemple">
      <Accordion type="multiple" defaultOpen={["f"]}>
        <Accordion.Item value="f">
          <Accordion.Header>Fondations</Accordion.Header>
          <Accordion.Panel>
            <Nav.List>
              <Nav.Link href="#">Couleur</Nav.Link>
              <Nav.Link href="#" current>Overlay</Nav.Link>
              <Nav.Link href="#">Grille</Nav.Link>
            </Nav.List>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Nav.Root>
  </div>
);

const TocDemo: React.FC = () => (
  <TableOfContents items={[
    { id: "s1", label: "Modal vs non-modal" },
    { id: "s2", label: "Ordre d'empilement" },
    { id: "s3", label: "Voile (scrim)" },
  ]} />
);

const ContainerDemo: React.FC = () => (
  <div className="w-full space-y-3">
    {(["narrow", "default", "wide", "full"] as const).map((s) => (
      <Container key={s} size={s}>
        <div className="rounded-md border border-border bg-surface px-md py-sm text-sm text-text-secondary">size = {s}</div>
      </Container>
    ))}
  </div>
);

const AppShellNote: React.FC = () => (
  <div className="max-w-prose text-sm text-text-secondary">
    <p className="mt-0"><b className="text-text-primary">AppShell est le cadre de cet atelier</b> — regarde autour : rail de nav à gauche, contenu au centre, rail d'outils à droite.</p>
    <p className="mb-0">Trois régions <code>Nav</code> / <code>Main</code> / <code>Tools</code> ; le rail d'outils cède sous 1280, la nav sous 1024 (redimensionne la fenêtre).</p>
  </div>
);

const DeleteDemo: React.FC = () => (
  <DeleteButton onDelete={() => new Promise((r) => setTimeout(r, 900))}>Supprimer</DeleteButton>
);

const SubmitDemo: React.FC = () => (
  <SubmitButton onSubmit={() => new Promise((r) => setTimeout(r, 900))}>Envoyer</SubmitButton>
);

const ThemeToggleDemo: React.FC = () => {
  const [dark, setDark] = React.useState(false);
  return (
    <label className="flex items-center gap-md text-sm text-text-primary">
      <ThemeToggle checked={dark} onCheckedChange={setDark} aria-label="Thème sombre" />
      <span>{dark ? "Sombre" : "Clair"}</span>
    </label>
  );
};

/* ---------- registre ---------- */
export const GROUPS: Group[] = [
  {
    label: "Layout",
    items: [
      { key: "appshell", name: "AppShell", code: `<AppShell.Root>\n  <AppShell.Nav>…</AppShell.Nav>\n  <AppShell.Main>…</AppShell.Main>\n  <AppShell.Tools>…</AppShell.Tools>\n</AppShell.Root>`, Demo: AppShellNote },
      { key: "container", name: "Container", code: `<Container size="default">…</Container>`, Demo: ContainerDemo },
      { key: "brand", name: "Brand", code: `<Brand.Root><Brand.Logo><Logo/></Brand.Logo><Brand.Text>Design System</Brand.Text></Brand.Root>`, Demo: () => (
        <Brand.Root>
          <Brand.Logo><svg viewBox="0 0 24 24" fill="none"><path d="M5 6h14M5 12h14M5 18h9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg></Brand.Logo>
          <Brand.Text>Design System UI</Brand.Text>
        </Brand.Root>
      ) },
      { key: "divider", name: "Divider", code: `<Divider />\n<Divider orientation="vertical" />`, Demo: () => (
        <div className="w-64"><p className="m-0 text-sm">Au-dessus</p><Divider /><p className="m-0 text-sm">En dessous</p></div>
      ) },
    ],
  },
  {
    label: "Navigation",
    items: [
      { key: "nav", name: "Nav", code: `<Nav.Root label="…"><Nav.List><Nav.Link current>…</Nav.Link></Nav.List></Nav.Root>`, Demo: NavDemo },
      { key: "accordion", name: "Accordion", code: `<Accordion type="multiple">\n  <Accordion.Item value="f"><Accordion.Header>…</Accordion.Header><Accordion.Panel>…</Accordion.Panel></Accordion.Item>\n</Accordion>`, Demo: AccordionDemo },
      { key: "toc", name: "TableOfContents", code: `<TableOfContents items={[{id, label}, …]} />`, Demo: TocDemo },
      { key: "skiplink", name: "SkipLink", code: `<SkipLink href="#main">Aller au contenu</SkipLink>`, Demo: () => (
        <div className="text-sm text-text-secondary"><SkipLink href="#main">Aller au contenu</SkipLink><p className="mt-0">Appuie sur <b>Tab</b> : le lien apparaît en haut à gauche.</p></div>
      ) },
    ],
  },
  {
    label: "Overlays",
    items: [
      { key: "drawer", name: "Drawer", code: `const [open, setOpen] = useState(false);\n<Drawer open={open} onClose={() => setOpen(false)} side="start" aria-label="…">…</Drawer>`, Demo: DrawerDemo },
    ],
  },
  {
    label: "Formulaire",
    items: [
      { key: "select", name: "Select", code: `<Select options={OPTS} value={v} onValueChange={setV} aria-label="Site" />`, Demo: SelectDemo },
      { key: "switch", name: "Switch", code: `<Switch checked={on} onCheckedChange={setOn} aria-label="…" />`, Demo: SwitchDemo },
    ],
  },
  {
    label: "Actions",
    items: [
      { key: "button", name: "Button", code: `<Button.Root style="filled" tone="primary" size="md">Enregistrer</Button.Root>`, Demo: () => (
        <div className="flex flex-wrap gap-sm">
          <Button.Root>Primary</Button.Root>
          <Button.Root style="stroke" tone="neutral">Neutral</Button.Root>
          <Button.Root tone="destructive">Danger</Button.Root>
        </div>
      ) },
      { key: "link", name: "Link", code: `<Link href="#" context="standalone">En savoir plus</Link>`, Demo: () => (
        <div className="flex flex-col gap-sm text-sm">
          <Link href="#">Lien autonome</Link>
          <p className="m-0">Un <Link href="#" context="inline">lien inline</Link> dans une phrase.</p>
        </div>
      ) },
    ],
  },
  {
    label: "Actions anim\u00e9es",
    items: [
      { key: "delete", name: "DeleteButton", code: `<DeleteButton onDelete={fn}>Supprimer</DeleteButton>`, Demo: DeleteDemo },
      { key: "submit", name: "SubmitButton", code: `<SubmitButton onSubmit={fn}>Envoyer</SubmitButton>`, Demo: SubmitDemo },
    ],
  },
  {
    label: "Theming",
    items: [
      { key: "themetoggle", name: "ThemeToggle", code: `<ThemeToggle checked={dark} onCheckedChange={setDark} aria-label="Th\u00e8me sombre" />`, Demo: ThemeToggleDemo },
    ],
  },
];
