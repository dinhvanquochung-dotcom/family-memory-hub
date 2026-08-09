import { NavLink, Link } from "react-router-dom";
import { Home, Clock, Users, Heart, Plus } from "lucide-react";
import { useRole } from "@/context/RoleContext";

const items = [
  { to: "/", label: "Trang nhà", icon: Home, end: true },
  { to: "/dong-thoi-gian", label: "Thời gian", icon: Clock },
  { to: "/gia-dinh", label: "Gia đình", icon: Users },
  { to: "/tuong-nho", label: "Tưởng nhớ", icon: Heart },
];

export function BottomNav() {
  const { can } = useRole();
  const canUpload = can("upload");

  return (
    <nav
      aria-label="Điều hướng"
      data-testid="bottom-nav"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-parchment bg-ivory/95 backdrop-blur-sm md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="relative mx-auto grid max-w-md grid-cols-5 items-end">
        {items.slice(0, 2).map((it) => (
          <BottomLink key={it.to} {...it} />
        ))}

        {/* Central primary upload action */}
        <div className="flex justify-center">
          {canUpload ? (
            <Link
              to="/dang-ky-niem"
              aria-label="Đăng kỷ niệm"
              data-testid="bottom-nav-upload"
              className="-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-lacquer text-ivory shadow-[0_4px_16px_rgba(155,58,50,0.35)] transition-transform duration-200 active:scale-95"
            >
              <Plus size={26} aria-hidden="true" />
            </Link>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              aria-label="Đăng kỷ niệm (cần quyền Cộng tác viên)"
              title="Bạn cần quyền Cộng tác viên để đăng kỷ niệm"
              data-testid="bottom-nav-upload-disabled"
              className="-mt-6 flex h-14 w-14 cursor-not-allowed items-center justify-center rounded-full bg-lacquer/40 text-ivory/80"
            >
              <Plus size={26} aria-hidden="true" />
            </button>
          )}
        </div>

        {items.slice(2).map((it) => (
          <BottomLink key={it.to} {...it} />
        ))}
      </div>
    </nav>
  );
}

function BottomLink({ to, label, icon: Icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      data-testid={`bottom-nav-${to === "/" ? "home" : to.slice(1)}`}
      className={({ isActive }) =>
        "flex min-h-[56px] flex-col items-center justify-center gap-1 px-1 pt-2 pb-3 text-[11px] font-medium transition-colors duration-200 " +
        (isActive ? "text-lacquer" : "text-ink/55")
      }
    >
      <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
      <span>{label}</span>
    </NavLink>
  );
}
