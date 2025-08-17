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
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import logo from './assets/MTClogo.svg';

// export const MTClogo = () => {
//   return (
//     <img src={MTClogo} alt="MTC Logo" width="36" height="36" />
//   );
// };

export default function App() {
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar disableAnimation isBordered className="text-white w-full">
      {/* Mobile - Hamburger Menu */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile - Logo Centered */}
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand className="flex items-center gap-2">
          <img src={logo} alt="MTC Logo" width="36" height="36" />
          <p className="font-bold text-inherit">MTC</p>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop - Full Nav */}
      <NavbarContent className="hidden sm:flex gap-4 w-full" justify="center">
        <NavbarBrand className="flex items-center gap-2">
          <img src={logo} alt="MTC Logo" width="36" height="36" />
          <p className="font-bold text-inherit">MTC</p>
        </NavbarBrand>
        <NavbarItem>
          <Link href="/" color="foreground" className="font-semibold">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/about" color="foreground" className="font-semibold">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/membership" color="foreground" className="font-semibold">
            Membership
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/events" color="foreground" className="font-semibold">
            Events
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/articles" color="foreground" className="font-semibold">
            Articles
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu Content */}
      <NavbarMenu className="text-white">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
