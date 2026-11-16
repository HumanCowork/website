import { NavbarBrand } from "./NavbarBrand";
import { NavAction } from "./NavAction";

/*
 * A two-item bar: the brand on one side, the call to action on the other. The
 * section links that used to sit in the middle were removed, so the bar no
 * longer needs a flexible middle column — `justify-between` alone spreads the
 * two groups apart.
 *
 * The height is owned by --navbar-padding-block plus the tallest child, so it is
 * never stated here.
 */
export function Navbar() {
  return (
    <header className="sticky top-5 z-50 w-full px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-(--navbar-max-width-sm) lg:max-w-(--navbar-max-width) 2xl:max-w-(--navbar-max-width-wide) bg-white rounded-full px-(--navbar-padding-inline) sm:px-(--navbar-padding-inline-wide) py-(--navbar-padding-block) flex items-center justify-between gap-4 border border-slate-200/80 shadow-(--navbar-shadow)">
        <NavbarBrand />
        <div className="flex items-center gap-2.5">
          <NavAction />
        </div>
      </div>
    </header>
  );
}
