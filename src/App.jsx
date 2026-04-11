import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import AIEnablement from "./pages/AIEnablement";
import AppDevelopment from "./pages/AppDevelopment";
import ApplicationIntegration from "./pages/Services/ApplicationIntegration";
import ApplicationManagement from "./pages/Services/ApplicationManagement";
import ApplicationMaintainance from "./pages/Services/ApplicationMaintainance";
import ProjectManagement from "./pages/Services/ProjectManagement";
import ConsultingServices from "./pages/Services/ConsultingServices";
import TeamsIntegration from "./pages/Services/TeamsIntegration";
import FastGrowth from "./pages/Services/FastGrowth";
import OperationalEfficiency from "./pages/Services/OperationalEfficiency";
import DataAnalytics from "./pages/Services/DataAnalytics";
import DataEngineering from "./pages/Services/DataEngineering";
import CloudEngineering from "./pages/Services/CloudEngineering";
import DataScience from "./pages/Services/DataScience";
import HumanInTheLoop from "./pages/Services/HumanInTheLoop";

const pageTransitionStyles = `
  @keyframes pageIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .page-transition {
    animation: pageIn 0.38s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
`;

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/app-development" element={<AppDevelopment />} />
        <Route path="/services/app-integration" element={<ApplicationIntegration />} />
        <Route path="/services/app-management" element={<ApplicationManagement />} />
        <Route path="/services/app-maintenance" element={<ApplicationMaintainance />} />
        <Route path="/services/project-management" element={<ProjectManagement />} />
        <Route path="/services/consulting" element={<ConsultingServices />} />
        <Route path="/services/teams-integration" element={<TeamsIntegration />} />
        <Route path="/services/fast-growth" element={<FastGrowth />} />
        <Route path="/services/operational-efficiency" element={<OperationalEfficiency />} />
        <Route path="/ai-enablement" element={<AIEnablement />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/data-analytics" element={<DataAnalytics />} />
        <Route path="/services/data-engineering" element={<DataEngineering />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/services/cloud-engineering" element={<CloudEngineering />} />
        <Route path="/services/data-science" element={<DataScience />} />
        <Route path="/services/human-in-the-loop" element={<HumanInTheLoop />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <style>{pageTransitionStyles}</style>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <main className="main">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}