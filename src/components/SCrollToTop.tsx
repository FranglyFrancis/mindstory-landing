import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {

    //gets URL path
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0,0);
    }, [pathname]);

    return null;
}

export default ScrollToTop;