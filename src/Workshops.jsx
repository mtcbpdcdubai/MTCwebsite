import { useState } from "react";

// Components
import LinkButton from "./components/LinkButton.jsx";
import testimonials from "../content/testimonials/Testimonials.js";

import BlurText from "./components/BlurText.jsx";
import { CardBody, CardContainer, CardItem } from "./components/3d-card";
import Balatro from "./components/Balatro.jsx";

export default function Workshops() {
  return (
    <div className="bg-transparent text-white">
        <Balatro
                isRotate={true}
                mouseInteraction={true}
                pixelFilter={700}
                color1="#000000" // darkest base
                color2="#0a0a0a" // slightly lighter
                color3="#111111" // soft contrast
              />
      <p>Workshops Page</p>
    </div>
  );
}
