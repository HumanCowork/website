import { NavbarBrand } from "./NavbarBrand";
import { NavLinks } from "./NavLinks";
import { NavAction } from "./NavAction";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-5 z-50 w-full px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-[94vw] 2xl:max-w-[90vw] bg-white rounded-full px-5 sm:px-7 py-3 flex items-center justify-between gap-4 border border-slate-200/80 shadow-[10px_10px_24px_-4px_rgba(0,0,0,0.35)]">
        <NavbarBrand />
        <NavLinks />
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <NavAction />
        </div>
      </div>
    </header>
  );
}
