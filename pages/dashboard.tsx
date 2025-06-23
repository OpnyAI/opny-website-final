import Link from "next/link";
import {
  LayoutDashboard,
  FileEdit,
  MessageSquare,
  FileText,
  BarChart2,
  Mail,
  User,
} from "lucide-react";

const nav = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "KI-Angebotsgenerator", icon: FileEdit, href: "/auth" },
  { name: "Website-Chatbot", icon: MessageSquare, href: "/auth" },
  { name: "PDF Q&A System", icon: FileText, href: "/auth" },
  { name: "Analytics", icon: BarChart2, href: "/auth" },
  { name: "E-Mail Assistent", icon: Mail, href: "/auth" },
];

const tools = [
  {
    name: "KI-Angebotsgenerator",
    description: "Erstellen Sie professionelle Angebote automatisch mit KI.",
    icon: FileEdit,
    action: "Starten",
    href: "/auth"
  },
  {
    name: "Website-Chatbot",
    description: "Fügen Sie Ihrer Website einen KI-Assistenten hinzu.",
    icon: MessageSquare,
    action: "Starten",
    href: "/auth"
  },
  {
    name: "PDF Q&A System",
    description: "Beantworten Sie Fragen zu Ihren Dokumenten.",
    icon: FileText,
    action: "Starten",
    href: "/auth"
  },
  {
    name: "Analytics",
    description: "Erhalten Sie Einblicke in Nutzerinteraktionen.",
    icon: BarChart2,
    action: "Starten",
    href: "/auth"
  }
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#f6f8fa]">
      {/* Sidebar */}
      <aside className="bg-black text-white w-64 px-7 py-10 flex flex-col min-h-screen">
        <div className="font-extrabold text-2xl mb-12 tracking-tight">Opny</div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition hover:bg-white hover:text-black text-white cursor-pointer">
                    <item.icon size={22} strokeWidth={2.2} />
                    <span className="truncate">{item.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-center mt-8">
          <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-gray-200">
            <User size={22} strokeWidth={2} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10 flex flex-col">
        <div className="max-w-7xl w-full mx-auto">
          <h1 className="text-3xl font-extrabold mb-2 mt-1">KI-Tools für Ihr Unternehmen</h1>
          <p className="text-gray-600 mb-8">
            Wählen Sie ein Tool aus, um zu starten.
          </p>
          {/* Tool Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {tools.map((tool) => (
              <Link key={tool.name} href={tool.href}>
                <div
                  className="border border-gray-200 rounded-2xl p-7 bg-white shadow flex flex-col items-start transition hover:shadow-lg cursor-pointer"
                >
                  <div className="mb-4 text-black">
                    <tool.icon size={32} strokeWidth={2.1} />
                  </div>
                  <div className="font-bold text-lg mb-1">{tool.name}</div>
                  <div className="text-gray-600 mb-6 text-sm">{tool.description}</div>
                  <button className="mt-auto bg-black text-white rounded-xl px-6 py-2 font-bold shadow hover:bg-neutral-900 transition">
                    {tool.action}
                  </button>
                </div>
              </Link>
            ))}
          </div>

          {/* Pro Plan Box */}
          <div className="bg-white border rounded-2xl flex flex-col md:flex-row items-center justify-between p-6 mt-auto shadow max-w-3xl mx-auto">
            <div className="mb-2 md:mb-0">
              <div className="font-semibold">Pro</div>
              <div className="text-sm text-gray-500">
                Alle Funktionen freischalten <br /> 449 € / Monat
              </div>
            </div>
            <button className="bg-black text-white rounded-xl px-7 py-2 font-bold shadow hover:bg-neutral-900 transition">
              Paket verwalten
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
