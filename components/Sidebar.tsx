import Link from "next/link";
import { LayoutDashboard, FileEdit } from "lucide-react";

const nav = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "KI-Angebotsgenerator", icon: FileEdit, href: "/offer-generator" },
  // ...weitere Einträge
];

export default function Sidebar() {
  return (
    <aside className="bg-primary text-secondary w-64 px-7 py-10 flex flex-col min-h-screen">
      <div className="font-extrabold text-2xl mb-12 tracking-tight">Opny</div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {nav.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium hover:bg-secondary hover:text-primary transition">
                <item.icon size={22} strokeWidth={2.2} />
                <span className="truncate">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
