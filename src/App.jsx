// import { /*useState, useEffect,*/ lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";

import "./App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Membership from "./Membership";
import Events from "./Events";
import Workshops from "./Workshops";
// import Contact    from './pages/Contact/Contact';
import Articles from "./Articles";
import NotFound from "./NotFoundPage";

const App = () => {
  return (
    <HeroUIProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/events" element={<Events />} />
          <Route path="/workshops" element={<Workshops />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/articles" element={<Articles />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  );
};

export default App;
