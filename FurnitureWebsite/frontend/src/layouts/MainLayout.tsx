import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloatButton from "@/components/common/WhatsAppFloatButton";

export default function MainLayout() {
  const { pathname } = useLocation();

  // Scroll to top on route change so navigating pages doesn't
  // leave the visitor stranded halfway down the next page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </div>
  );
}
