import { NavLink, Link } from "react-router-dom";
import { Plus, Search, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { to: "/", label: "Trang nhà", end: true },
  { to: "/dong-thoi-gian", label: "Dòng thời gian" },
  { to: "/gia-dinh", label: "Gia đình" },
  { to: "/album", label: "Album" },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 hidden border-b border-parchment bg-ivory/85 backdrop-blur-sm md:block">
      <div className="mx-auto flex h-20 max-w-editorial items-center justify-between px-8">
        <Link to="/" className="flex items-baseline gap-2" data-testid="brand-home-link">
          <span className="font-display text-2xl tracking-tight text-navy">Kho Ký Ức</span>
          <span className="font-display text-2xl italic text-lacquer">Gia Đình</span>
        </Link>

        <nav className="flex items-center gap-9" aria-label="Điều hướng chính">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              data-testid={`nav-desktop-${l.to === "/" ? "home" : l.to.slice(1)}`}
              className={({ isActive }) =>
                "relative text-sm font-medium tracking-wide transition-colors duration-200 " +
                (isActive ? "text-navy" : "text-ink/60 hover:text-ink")
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 h-px w-full bg-lacquer" aria-hidden="true" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <NavLink
            to="/tim-kiem"
            aria-label="Tìm trong ký ức"
            data-testid="nav-desktop-search"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink/70 transition-colors duration-200 hover:bg-parchment hover:text-navy"
          >
            <Search size={20} aria-hidden="true" />
          </NavLink>

          <Link
            to="/dang-ky-niem"
            data-testid="nav-desktop-upload"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-lacquer px-6 text-sm font-semibold text-ivory transition-colors duration-200 hover:bg-lacquer/90"
          >
            <Plus size={18} aria-hidden="true" />
            Đăng kỷ niệm
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger
              data-testid="user-menu-trigger"
              aria-label="Tài khoản"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-parchment text-ink/70 transition-colors duration-200 hover:bg-parchment focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
            >
              <User size={20} aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 border-parchment bg-card">
              <DropdownMenuLabel className="font-display text-base">Minh Anh</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-parchment" />
              <DropdownMenuItem data-testid="user-menu-profile">Trang cá nhân</DropdownMenuItem>
              <DropdownMenuItem data-testid="user-menu-branches">Quản lý nhánh gia đình</DropdownMenuItem>
              <DropdownMenuItem data-testid="user-menu-settings">Cài đặt</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-parchment" />
              <DropdownMenuItem data-testid="user-menu-signout">Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
