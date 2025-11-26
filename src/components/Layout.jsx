import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Layout.css";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    {
      label: "Visitas Técnicas",
      icon: "📋",
      submenu: [
        { path: "/agendamento", label: "Agendamento", icon: "📅" },
        { path: "/agendadas", label: "Agendadas", icon: "✅" },
      ],
    },
    { path: "/visita", label: "Formulário de Visita", icon: "📝" },
    { path: "/upload-ata", label: "Validação de ATAs", icon: "📄" },
    { path: "/consultas", label: "Consultas", icon: "🔍" },
    { path: "/config-questoes", label: "Configurações", icon: "⚙️" },
  ];

  // Abrir submenu automaticamente se estiver em uma das rotas filhas
  useEffect(() => {
    const visitasItem = menuItems.find((item) => item.submenu);
    if (visitasItem) {
      const isInSubmenu = visitasItem.submenu.some((subItem) =>
        location.pathname.startsWith(subItem.path)
      );
      if (isInSubmenu) {
        const menuKey = `menu-${menuItems.indexOf(visitasItem)}`;
        setOpenSubmenu(menuKey);
      }
    }
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const toggleSubmenu = (menuKey) => {
    setOpenSubmenu(openSubmenu === menuKey ? null : menuKey);
  };

  const hasActiveSubmenu = (submenu) => {
    return submenu.some((item) => isActive(item.path));
  };

  return (
    <div className="layout">
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>MENU</h2>
          <button
            className="toggle-sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => {
            if (item.submenu) {
              const menuKey = `menu-${index}`;
              const isOpen = openSubmenu === menuKey;
              const hasActive = hasActiveSubmenu(item.submenu);

              return (
                <div key={menuKey} className="nav-group">
                  <button
                    className={`nav-item nav-parent ${
                      hasActive ? "active" : ""
                    } ${isOpen ? "open" : ""}`}
                    onClick={() => toggleSubmenu(menuKey)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {sidebarOpen && (
                      <>
                        <span className="nav-label">{item.label}</span>
                        <span className={`nav-arrow ${isOpen ? "open" : ""}`}>
                          ▼
                        </span>
                      </>
                    )}
                  </button>
                  {sidebarOpen && (
                    <div className={`nav-submenu ${isOpen ? "open" : ""}`}>
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`nav-item nav-subitem ${
                            isActive(subItem.path) ? "active" : ""
                          }`}
                        >
                          <span className="nav-icon">{subItem.icon}</span>
                          <span className="nav-label">{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive(item.path) ? "active" : ""}`}
              >
                <span className="nav-icon">{item.icon}</span>
                {sidebarOpen && <span className="nav-label">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>PAES na Escola</h1>
          <div className="header-actions">
            <span className="user-info">Josemar [Técnico do PAES]</span>
          </div>
        </header>
        <div className="content">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
