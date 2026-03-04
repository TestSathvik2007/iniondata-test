import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = { home: Home, about: About, services: Services, contact: Contact, careers: Careers };
  const PageComponent = pages[currentPage] || Home;

  if (isLoading) {
    return (
      <div className="loader-screen">
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
            <span style={{ color: "#fff" }}>Inion</span>
            <span style={{ color: "#14B8A6" }}>Data</span>
          </div>
          <div className="loader-bar">
            <div className="loader-fill" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main>
        <PageComponent navigate={navigate} />
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}