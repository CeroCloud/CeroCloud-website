import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import PageLoader from "@/components/PageLoader";
import ScrollToTop from "@/components/ScrollToTop";

// Lazy loading pages for performance optimization
const Home = lazy(() => import("@/pages/Home"));
const Releases = lazy(() => import("@/pages/Releases"));
const Tour = lazy(() => import("@/pages/Tour"));
const Docs = lazy(() => import("@/pages/Docs"));
const Security = lazy(() => import("@/pages/Security"));
const Roadmap = lazy(() => import("@/pages/Roadmap"));
const About = lazy(() => import("@/pages/About"));
const License = lazy(() => import("@/pages/License"));
const Contribute = lazy(() => import("@/pages/Contribute"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/releases" element={<Releases />} />
            <Route path="/tour" element={<Tour />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/security" element={<Security />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/about" element={<About />} />
            <Route path="/license" element={<License />} />
            <Route path="/contribute" element={<Contribute />} />
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
