import React from "react";
import { useNavigate } from "react-router-dom";

const LinkButton = ({ to, newTab, className, children, ...props }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (newTab) {
      window.open(to, "_blank");
    } else {
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
