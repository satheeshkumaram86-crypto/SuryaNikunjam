import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MenuItem {
  name: string;
  path: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  menus: MenuItem[];
  moreMenus: MenuItem[];
}

export default function MobileMenu({
  open,
  onClose,
  menus,
  moreMenus,
}: MobileMenuProps) {
  const [moreOpen, setMoreOpen] =
    useState(false);

  return (
    <div
      className={`fixed top-[92px] left-0 w-full bg-white shadow-lg transition-all duration-300 z-40 overflow-hidden ${
        open
          ? "max-h-screen opacity-100"
          : "max-h-0 opacity-0"
      }`}
    >
      <nav className="flex flex-col px-6 py-4">

        {/* Main Menus */}

        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            onClick={onClose}
            className={({ isActive }) =>
              `py-3 border-b transition ${
                isActive
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-green-600"
              }`
            }
          >
            {menu.name}
          </NavLink>
        ))}

        {/* More */}

        <button
          onClick={() =>
            setMoreOpen(!moreOpen)
          }
          className="flex items-center justify-between py-3 border-b text-gray-700 hover:text-green-600 transition"
        >
          <span>More</span>

          {moreOpen ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>

        {moreOpen && (
          <div className="pl-4">

            {moreMenus.map((menu) => (
              <NavLink
                key={menu.path}
                to={menu.path}
                onClick={() => {
                  onClose();
                  setMoreOpen(false);
                }}
                className={({ isActive }) =>
                  `block py-3 border-b transition ${
                    isActive
                      ? "text-green-600 font-semibold"
                      : "text-gray-600 hover:text-green-600"
                  }`
                }
              >
                {menu.name}
              </NavLink>
            ))}

          </div>
        )}

        {/* Book Site Visit */}

        <NavLink
          to="/site-visit"
          onClick={onClose}
          className="mt-6 rounded-xl bg-green-600 py-3 text-center font-semibold text-white hover:bg-green-700 transition"
        >
          Book Site Visit
        </NavLink>

      </nav>
    </div>
  );
}