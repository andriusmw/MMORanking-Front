import { Link } from "react-router-dom";
import { Auth } from "./Auth";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { NavBar } from "./NavBar";

export const Header = () => {
    const { token, user, logout } = useContext(AuthContext);

    // Function to initialize Google Translate
    useEffect(() => {
        if (!document.getElementById('google-translate-script')) {
            const script = document.createElement('script');
            script.id = 'google-translate-script';
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);

            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                        autoDisplay: false,
                    },
                    'google_translate_element'
                );
            };
        }

        return () => {
            const script = document.getElementById('google-translate-script');
            if (script) script.remove();
            delete window.googleTranslateElementInit;
        };
    }, []);

    return (
        <header>
            <Link to={'/'}> <img src="/images/title.png" alt="title-img" className="img-title" /></Link>
            <div className="header-right">
                <NavBar />
                <Auth />
            </div>
            {/* Google Translate Widget */}
            <div className="translate-container">
                <div id="google_translate_element" className="translate-widget"></div>
            </div>
        </header>
    );
};