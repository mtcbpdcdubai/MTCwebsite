import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/MTClogo.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: "/about#ambassador", label: "Ambassador Program" },
    { path: "/partners", label: "Partners" },
    { path: "/sponsors", label: "Sponsors" },
    { path: "/media#blogs", label: "Blogs" },
  ];

  const programs = [
    {
      label: "Workshops",
      href: "/workshops",
      external: false,
    },
    {
      label: "Speaker Sessions",
      href: "https://mtcbpdc.org",
      external: true,
    },
    {
      label: "Technical Blogs",
      href: "https://medium.com/@microsofttechclub",
      external: true,
    },
    {
      label: "Competitions",
      href: "https://mtcbpdc.org",
      external: true,
    },
  ];

  const socialLinks = [
    {
      icon: faInstagram,
      href: "https://instagram.com/mtcbpdc",
      label: "@mtcbpdc",
    },
    {
      icon: faEnvelope,
      href: "mailto:mtc@bpdc.org",
      label: "mtc@bpdc.org",
    },
    {
      icon: faPhone,
      href: "tel:+1234567890",
      label: "+1 (234) 567-890",
    },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Code of Conduct", href: "#" },
  ];

  return (
    <footer className="w-full bg-black/20 backdrop-blur-lg border-t border-white/20 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="MTC Logo" className="w-10 h-10" />
              <span className="font-bold text-xl">Microsoft Tech Club</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              BITS Pilani Dubai Campus student community promoting technology
              learning through events, workshops, and mentorship programs.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon
                    icon={social.icon}
                    className="text-white text-sm"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-white text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-white text-lg mb-4">Programs</h3>
            <ul className="space-y-3">
              {programs.map((program, index) => (
                <li key={index}>
                  {program.external ? (
                    <a
                      href={program.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {program.label}
                    </a>
                  ) : (
                    <Link
                      to={program.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {program.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-white text-lg mb-4">Contact</h3>
            <div className="space-y-4">
              {socialLinks.map((contact, index) => (
                <div key={index} className="flex items-start gap-3">
                  <FontAwesomeIcon
                    icon={contact.icon}
                    className="text-gray-400 mt-1 text-sm"
                  />
                  <div>
                    <p className="text-gray-300 text-xs uppercase tracking-wide">
                      {contact.icon === faEnvelope
                        ? "Email"
                        : contact.icon === faInstagram
                        ? "Instagram"
                        : "Phone"}
                    </p>
                    <a
                      href={contact.href}
                      target={
                        contact.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        contact.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-white text-sm hover:text-gray-300 transition-colors"
                    >
                      {contact.label}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        {/* <div className="border-t border-divider mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Microsoft Tech Club, BITS Pilani Dubai Campus. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((legal, index) => (
              <a
                key={index}
                href={legal.href}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {legal.label}
              </a>
            ))}
          </div>
        </div> */}
      </div>
    </footer>
  );
}
