import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ParkingSquare,
  ClipboardList,
  Wallet,
  User,
  LogOut,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Book Slot",
    path: "/book-slot",
    icon: ParkingSquare,
  },
  {
    name: "My Bookings",
    path: "/bookings",
    icon: ClipboardList,
  },
  {
    name: "Wallet",
    path: "/wallet",
    icon: Wallet,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "250px",
        background: "#0F3D4C",
        color: "white",
        minHeight: "100vh",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          marginBottom: "32px",
          fontSize: "24px",
          fontWeight: "700",
        }}
      >
        🚗 SlotSmart
      </h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px",
                color: "white",
                textDecoration: "none",
                borderRadius: "10px",
                background: isActive ? "#1A5F7A" : "transparent",
              })}
            >
              <Icon size={20} />
              {link.name}
            </NavLink>
          );
        })}
      </nav>

      <button
        style={{
          marginTop: "auto",
          background: "#F2A65A",
          border: "none",
          color: "#222",
          padding: "12px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        <LogOut size={18} style={{ marginRight: 8 }} />
        Logout
      </button>
    </aside>
  );
}