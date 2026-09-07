// import { /*useState, useEffect,*/ lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useScrollToTop } from "./hooks/useScrollToTop";
import Home from "./Home";
import About from "./AboutPage/About";
import Membership from "./Membership";
import Events from "./EventsPage/Events";
import Media from "./MediaPage/Media";
import Partners from "./PartnersPage/Partners";
// import Contact    from './pages/Contact/Contact';
import Articles from "./Articles";
import NotFound from "./NotFoundPage";
import Leaderboard from "./LeaderboardPage/Leaderboard";
import MyPoints from "./LeaderboardPage/MyPoints";
import Join from "./JoinPage/Join";
import AdminLogin from "./AdminPage/AdminLogin";
import AdminDashboard from "./AdminPage/AdminDashboard";
import AdminAuthGuard from "./AdminPage/AdminAuthGuard";


function ScrollToTop() {
  useScrollToTop();
  return null;
}

const App = () => {
  return (
    <HeroUIProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/events" element={<Events />} />
          <Route path="/media" element={<Media />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/articles" element={<Articles />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/leaderboard/my-points" element={<MyPoints />} />
          <Route path="/join" element={<Join />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminAuthGuard>
                <AdminDashboard />
              </AdminAuthGuard>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/partners" element={<Partners />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </HeroUIProvider>
  );
};

export default App;
