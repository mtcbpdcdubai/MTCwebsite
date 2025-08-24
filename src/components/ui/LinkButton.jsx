import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LinkButton = ({ to, newTab, className, children, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scrolling to hash on location change
  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace("#", "");
      const scrollToElement = (attempt = 0) => {
        const element = document.getElementById(hash);
        if (element) {
          // Add a small delay to ensure the page is fully rendered
          setTimeout(() => {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            // Double-check with window.scrollTo for mobile compatibility
            setTimeout(() => {
              const rect = element.getBoundingClientRect();
              const elementTop = rect.top + window.scrollY;
              window.scrollTo({
                top: elementTop - 80, // Account for potential fixed headers
                behavior: "smooth",
              });
            }, 100);
          }, 50);
        } else if (attempt < 8) {
          // Retry up to 8 times with increasing delays for slower mobile devices
          setTimeout(() => scrollToElement(attempt + 1), 150 + attempt * 50);
        }
      };

      // Start scrolling after a brief delay to ensure DOM is ready
      setTimeout(() => scrollToElement(), 200);
    }
  }, [location]);

  const handleClick = () => {
    if (newTab) {
      window.open(to, "_blank");
    } else {
      // For hash navigation, let React Router handle it naturally
      if (to.includes("#")) {
        const [path, hash] = to.split("#");

        // If we're already on the target page, just scroll
        if (window.location.pathname === path) {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
          return;
        }
      }

      // Navigate normally - the useEffect will handle hash scrolling
      navigate(to);
    }
  };

  return (
    <button onClick={handleClick} className={className} {...props}>
      {children}
    </button>
  );
};

export default LinkButton;
