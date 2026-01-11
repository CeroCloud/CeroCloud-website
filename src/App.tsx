import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PageLoader from "@/components/PageLoader";
import AnalyticsTracker from "@/components/AnalyticsTracker";

// Lazy loading pages for performance optimization
const Home = lazy(() => import("@/pages/Home"));
const Releases = lazy(() => import("@/pages/Releases"));
const Tour = lazy(() => import("@/pages/Tour"));
const Docs = lazy(() => import("@/pages/Docs"));
const Security = lazy(() => import("@/pages/Security"));
const Roadmap = lazy(() => import("@/pages/Roadmap"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const About = lazy(() => import("@/pages/About"));
const License = lazy(() => import("@/pages/License"));
const Contribute = lazy(() => import("@/pages/Contribute"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Demo = lazy(() => import("@/pages/Demo"));

function App() {
  const location = useLocation();
  // Hide Navbar/Footer on Demo and Blog Post details (but show on Blog Listing)
  const isFocusMode = location.pathname === '/demo' || /^\/blog\/.+/.test(location.pathname);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      {!isFocusMode && <Navbar />}
      <AnalyticsTracker />
      <main className={isFocusMode ? "" : "flex-grow"}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/releases" element={<Releases />} />
            <Route path="/tour" element={<Tour />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/security" element={<Security />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/license" element={<License />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isFocusMode && <Footer />}
    </div>
  );
}

export default App;
