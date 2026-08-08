import { createContext, useContext, useState } from "react";

// Mock permission roles for the family archive. These are FRONTEND-ONLY
// representations for later backend enforcement — never real security.
export const ROLES = {
  viewer: { id: "viewer", label: "Người xem", desc: "Xem và chia sẻ kỷ niệm" },
  contributor: { id: "contributor", label: "Cộng tác viên", desc: "Đăng và bình luận" },
  owner: { id: "owner", label: "Chủ kỷ niệm", desc: "Sửa/xoá kỷ niệm của mình" },
  admin: { id: "admin", label: "Quản trị gia đình", desc: "Quản lý mọi kỷ niệm và thành viên" },
};

export const ROLE_ORDER = ["viewer", "contributor", "owner", "admin"];
export const CURRENT_USER_ID = "p-anh"; // mock signed-in member (Minh Anh)

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [role, setRole] = useState("admin");

  const can = (action, memory) => {
    switch (action) {
      case "view":
      case "share":
        return true;
      case "comment":
      case "upload":
        return ["contributor", "owner", "admin"].includes(role);
      case "edit":
      case "delete":
        if (role === "admin") return true;
        if (role === "owner") return !!memory && memory.authorId === CURRENT_USER_ID;
        return false;
      case "manageMembers":
        return role === "admin";
      default:
        return false;
    }
  };

  return (
    <RoleContext.Provider value={{ role, setRole, can, currentUserId: CURRENT_USER_ID }}>
      {children}
    </RoleContext.Provider>
  );
}

export const useRole = () => useContext(RoleContext);
