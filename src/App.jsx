import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home                   = lazy(() => import("./pages/Home"));
const About                  = lazy(() => import("./pages/About"));
const Services               = lazy(() => import("./pages/Services"));
const Contact                = lazy(() => import("./pages/Contact"));
const AIEnablement           = lazy(() => import("./pages/AIEnablement"));
const AppDevelopment         = lazy(() => import("./pages/Services/ApplicationDevelopment"));
const ApplicationIntegration = lazy(() => import("./pages/Services/ApplicationIntegration"));
const ApplicationManagement  = lazy(() => import("./pages/Services/ApplicationManagement"));
const ApplicationMaintainance= lazy(() => import("./pages/Services/ApplicationMaintainance"));
const ProjectManagement      = lazy(() => import("./pages/Services/ProjectManagement"));
const ConsultingServices     = lazy(() => import("./pages/Services/ConsultingServices"));
const TeamsIntegration       = lazy(() => import("./pages/Services/TeamsIntegration"));
const FastGrowth             = lazy(() => import("./pages/Services/FastGrowth"));
const OperationalEfficiency  = lazy(() => import("./pages/Services/OperationalEfficiency"));
const DataAnalytics          = lazy(() => import("./pages/Services/DataAnalytics"));
const DataEngineering        = lazy(() => import("./pages/Services/DataEngineering"));
const CloudEngineering       = lazy(() => import("./pages/Services/CloudEngineering"));
const DataScience            = lazy(() => import("./pages/Services/DataScience"));
const HumanInTheLoop         = lazy(() => import("./pages/Services/HumanInTheLoop"));

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
    <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
      <div key={location.pathname} className="page-transition">
        <Routes location={location}>
          <Route path="/"                                  element={<Home />} />
          <Route path="/about"                             element={<About />} />
          <Route path="/services"                          element={<Services />} />
          <Route path="/services/app-development"         element={<AppDevelopment />} />
          <Route path="/services/app-integration"         element={<ApplicationIntegration />} />
          <Route path="/services/app-management"          element={<ApplicationManagement />} />
          <Route path="/services/app-maintenance"         element={<ApplicationMaintainance />} />
          <Route path="/services/project-management"      element={<ProjectManagement />} />
          <Route path="/services/consulting"              element={<ConsultingServices />} />
          <Route path="/services/teams-integration"       element={<TeamsIntegration />} />
          <Route path="/services/fast-growth"             element={<FastGrowth />} />
          <Route path="/services/operational-efficiency"  element={<OperationalEfficiency />} />
          <Route path="/ai-enablement"                    element={<AIEnablement />} />
          <Route path="/contact"                          element={<Contact />} />
          <Route path="/services/data-analytics"         element={<DataAnalytics />} />
          <Route path="/services/data-engineering"       element={<DataEngineering />} />
          <Route path="/services/cloud-engineering"      element={<CloudEngineering />} />
          <Route path="/services/data-science"           element={<DataScience />} />
          <Route path="/services/human-in-the-loop"      element={<HumanInTheLoop />} />
          <Route path="*"                                  element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Suspense>
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
