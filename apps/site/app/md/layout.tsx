import { Shell } from "../components/shell";
export default function MdLayout({ children }: { children: React.ReactNode }) {
  return <Shell section="md">{children}</Shell>;
}
