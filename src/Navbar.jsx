// import { useState } from "react";
// import { Link, NavLink } from "react-router-dom";

// import logo from "./assets/MTClogo.svg";

// /** The menu entries @type {[str, str][]} */
// const menuItems = [
//   ["/", "Home"],
//   ["/about", "About"],
//   ["/membership", "Membership"],
//   ["/events", "Events"],
//   // ["/contact", "Contact"],
//   ["/articles", "Articles"],
// ];

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => setIsOpen((prev) => !prev);

//   return (
//     <nav className="flex justify-center items-center bg-black p-2 w-full sticky top-0 left-0 z-[1000]">
//       <div className="flex justify-center items-center w-full max-w-[1200px] px-4 md:px-0 md:justify-between">
//         {/* Logo */}
//         <Link to="/">
//           <img
//             src={logo}
//             alt="Microsoft Tech Club"
//             className="h-10 mr-5 transition duration-200 hover:opacity-80"
//           />
//         </Link>

//         {/* Hamburger Icon - Mobile */}
//         <div
//           className={`flex flex-col cursor-pointer ml-auto md:hidden justify-center items-center w-10 ${
//             isOpen ? "gap-[0px]" : ""
//           }`}
//           onClick={toggleMenu}
//         >
//           {/* Hamburger lines */}
//           <span
//             className={`block w-6 h-[3px] bg-white my-[2px] transition-transform duration-200 ${
//               isOpen ? "translate-y-[7px] rotate-[-45deg]" : ""
//             }`}
//           ></span>
//           <span
//             className={`block w-6 h-[3px] bg-white my-[2px] transition-opacity duration-200 ${
//               isOpen ? "opacity-0" : ""
//             }`}
//           ></span>
//           <span
//             className={`block w-6 h-[3px] bg-white my-[2px] transition-transform duration-200 ${
//               isOpen ? "translate-y-[-7px] rotate-[45deg]" : ""
//             }`}
//           ></span>
//         </div>

//         {/* Nav Links */}
//         <ul
//           className={`flex list-none m-0 p-0 transition-all duration-300 md:flex md:flex-row md:static md:bg-transparent md:w-auto md:gap-6 md:opacity-100 md:translate-y-0
//           ${
//             isOpen
//               ? "flex-col absolute top-full left-0 w-full bg-[#2c2c2c] items-center py-4 gap-4"
//               : "hidden md:flex"
//           }`}
//         >
//           {menuItems.map(([to, title]) => (
//             <li key={to} className="m-0">
//               <NavLink
//                 to={to}
//                 onClick={() => setIsOpen(false)}
//                 className={({ isActive }) =>
//                   `text-white no-underline text-base px-3 py-2 rounded transition-colors duration-300
//                   ${
//                     isActive
//                       ? "bg-gray-500 text-white"
//                       : "hover:bg-white hover:text-black"
//                   }`
//                 }
//               >
//                 {title}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// }
// import {
//   Navbar,
//   NavbarBrand,
//   NavbarMenuToggle,
//   NavbarMenu,
//   NavbarMenuItem,
//   NavbarContent,
//   NavbarItem,
//   Button,
// } from "@heroui/react";
// import { Link, useLocation } from "react-router-dom";
// import logo from "./assets/MTClogo.svg";

// // export const MTClogo = () => {
// //   return (
// //     <img src={MTClogo} alt="MTC Logo" width="36" height="36" />
// //   );
// // };

// export default function App() {
//   const location = useLocation();

//   const menuItems = [
//     { path: "/", label: "Home" },
//     { path: "/about", label: "About" },
//     { path: "/events", label: "Events" },
//     { path: "/media", label: "Media" },
//     { path: "/articles", label: "Partners" },
//   ];

//   return (
//     <Navbar disableAnimation isBordered className="text-white w-full">
//       {/* Mobile - Hamburger Menu */}
//       <NavbarContent className="sm:hidden" justify="start">
//         <NavbarMenuToggle />
//       </NavbarContent>

//       {/* Mobile - Logo Centered */}
//       <NavbarContent className="sm:hidden pr-3" justify="center">
//         <NavbarBrand className="flex items-center gap-2">
//           <img src={logo} alt="MTC Logo" width="36" height="36" />
//           <p className="font-bold text-inherit">MTC</p>
//         </NavbarBrand>
//       </NavbarContent>

//       {/* Desktop - Logo and Menu spaced out */}
//       <NavbarContent className="hidden sm:flex w-full max-w-none justify-between items-center">
//         <NavbarBrand className="flex items-center gap-2">
//           <img src={logo} alt="MTC Logo" width="36" height="36" />
//           <p className="font-bold text-inherit">MTC</p>
//         </NavbarBrand>

//         <div className="flex gap-6">
//           {menuItems.map((item) => (
//             <NavbarItem key={item.path}>
//               <Link
//                 to={item.path}
//                 className={`font-semibold transition-colors ${
//                   location.pathname === item.path
//                     ? "text-stone-400"
//                     : "text-white hover:text-stone-400"
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             </NavbarItem>
//           ))}
//         </div>
//       </NavbarContent>

//       {/* Mobile Menu Content */}
//       <NavbarMenu className="text-white">
//         {menuItems.map((item, index) => (
//           <NavbarMenuItem key={`${item.path}-${index}`}>
//             <Link
//               to={item.path}
//               className={`w-full text-lg transition-colors ${
//                 location.pathname === item.path
//                   ? "text-stone-400"
//                   : "text-white hover:text-stone-400"
//               }`}
//             >
//               {item.label}
//             </Link>
//           </NavbarMenuItem>
//         ))}
//       </NavbarMenu>
//     </Navbar>
//   );
// }

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // for mobile toggle icons
import logo from "./assets/MTClogo.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/events", label: "Events" },
    { path: "/media", label: "Media" },
    { path: "/articles", label: "Partners" },
  ];

  return (
    <nav className="w-full bg-black/20 backdrop-blur-lg text-white border-b border-divider sticky top-0 z-[1000] supports-backdrop-blur:bg-black/60">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="MTC Logo" className="w-9 h-9" />
          <span className="font-bold text-xl">MTC</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-semibold transition-colors px-3 py-2 rounded-lg ${
                location.pathname === item.path
                  ? "text-stone-400 bg-white/5"
                  : "text-white hover:text-stone-400 hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      {menuOpen && (
        <>
          {/* Backdrop blur overlay */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-lg z-[999] sm:hidden"
            onClick={() => setMenuOpen(false)}
            style={{ top: '73px' }} // Start below navbar
          />
          
          {/* Menu content */}
          <div className="fixed left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-divider z-[1000] sm:hidden" style={{ top: '73px' }}>
            <div className="px-6 py-8">
              <div className="flex flex-col gap-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`text-xl font-medium transition-colors py-3 px-4 rounded-lg ${
                      location.pathname === item.path
                        ? "text-stone-400 bg-white/10"
                        : "text-white hover:text-stone-400 hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
