import { NavLink, Link } from "react-router-dom";
import { Plus, Search, User, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRole, ROLES, ROLE_ORDER } from "@/context/RoleContext";

const links = [
  { to: "/", label: "Trang nhà", end: true },
  { to: "/dong-thoi-gian", label: "Dòng thời gian" },
  { to: "/gia-dinh", label: "Gia đình" },
  { to: "/album", label: "Album" },
];

export function TopNav() {
  const { role, setRole, can } = useRole();
  const canUpload = can("upload");

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
                  {isActive && <span className="absolute -bottom-1.5 left-0 h-px w-full bg-lacquer" aria-hidden="true" />}
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

          {canUpload ? (
            <Link
              to="/dang-ky-niem"
              data-testid="nav-desktop-upload"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-lacquer px-6 text-sm font-semibold text-ivory transition-colors duration-200 hover:bg-lacquer/90"
            >
              <Plus size={18} aria-hidden="true" />
              Đăng kỷ niệm
            </Link>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="Bạn cần quyền Cộng tác viên để đăng kỷ niệm"
              data-testid="nav-desktop-upload-disabled"
              className="inline-flex min-h-[44px] cursor-not-allowed items-center gap-2 rounded-full bg-lacquer/40 px-6 text-sm font-semibold text-ivory/80"
            >
              <Plus size={18} aria-hidden="true" />
              Đăng kỷ niệm
            </button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger
              data-testid="user-menu-trigger"
              aria-label="Tài khoản và quyền"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-parchment text-ink/70 transition-colors duration-200 hover:bg-parchment focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
            >
              <User size={20} aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 border-parchment bg-card">
              <DropdownMenuLabel className="font-display text-base">Minh Anh</DropdownMenuLabel>
              <p className="px-2 pb-1 text-xs text-ink/50">Thành viên minh hoạ</p>
              <DropdownMenuSeparator className="bg-parchment" />

              <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wider text-ink/45">
                Chế độ quyền (demo)
              </DropdownMenuLabel>
              {ROLE_ORDER.map((rid) => (
                <DropdownMenuItem
                  key={rid}
                  data-testid={`role-switch-${rid}`}
                  onSelect={(e) => { e.preventDefault(); setRole(rid); }}
                  className="flex items-start justify-between gap-2"
                >
                  <span>
                    <span className="block text-sm text-ink">{ROLES[rid].label}</span>
                    <span className="block text-xs text-ink/50">{ROLES[rid].desc}</span>
                  </span>
                  {role === rid && <Check size={16} className="mt-0.5 text-moss" aria-hidden="true" />}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator className="bg-parchment" />
              <DropdownMenuItem data-testid="user-menu-profile">Trang cá nhân</DropdownMenuItem>
              <DropdownMenuItem asChild data-testid="user-menu-states">
                <Link to="/bang-trang-thai">Bảng trạng thái (demo)</Link>
              </DropdownMenuItem>
              <DropdownMenuItem data-testid="user-menu-signout">Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
