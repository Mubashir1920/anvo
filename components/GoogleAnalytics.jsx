'use client'
import Script from 'next/script';

const GoogleAnalytics = () => {
    const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    if (!GA_ID) return null; // Avoid loading scripts if GA ID is missing

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', { page_path: window.location.pathname });
                `}
            </Script>
        </>
    );
};

export default GoogleAnalytics;
