import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSeo } from "@/hooks/useSeo";

/** Scrolls to the top on route change and keeps page metadata in sync */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useSeo();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
};

export default ScrollToTop;
