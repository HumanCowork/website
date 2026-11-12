import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Qué hacemos", href: "#que-hacemos" },
  { label: "Encuentros", href: "#encuentros" },
  { label: "Comunidad", href: "#comunidad" },
  { label: "Aliados", href: "#aliados" },
];

export function NavLinks() {
  return (
    <nav className="hidden md:flex items-center gap-1 sm:gap-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors duration-150"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
