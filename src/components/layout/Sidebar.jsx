import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ParkingSquare,
  LogOut,
  Shield,
  User,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

const linksByRole = {
  driver: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Parking Availability",
      path: "/parking",
      icon: ParkingSquare,
    },
  ],

  gate_staff: [
    {
      name: "Gate Dashboard",
      path: "/gate",
      icon: Shield,
    },
    {
      name: "Parking Slots",
      path: "/parking",
      icon: ParkingSquare,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ],

  admin: [
    {
      name: "Admin Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Gate Dashboard",
      path: "/gate",
      icon: Shield,
    },
    {
      name: "Parking Slots",
      path: "/parking",
      icon: ParkingSquare,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ],
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const links = linksByRole[user?.role] || linksByRole.driver;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.name}
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
                transition: "0.2s",
              })}
            >
              <Icon size={20} />
              {link.name}
            </NavLink>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "auto",
          background: "#F2A65A",
          border: "none",
          color: "#222",
          padding: "12px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LogOut
          size={18}
          style={{ marginRight: 8 }}
        />
        Logout
      </button>
    </aside>
  );
}