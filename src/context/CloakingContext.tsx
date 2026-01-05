import React, { createContext, useContext, useState, useEffect } from 'react';

interface CloakingContextType {
    isCloaked: boolean;
    toggleCloak: () => void;
    tabTitle: string;
    setTabTitle: (title: string) => void;
    tabIcon: string;
    setTabIcon: (iconUrl: string) => void;
    openBlobInAboutBlank: (blobUrl: string) => void;
}

const CloakingContext = createContext<CloakingContextType | undefined>(undefined);

export const CloakingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isCloaked, setIsCloaked] = useState(false);
    const [tabTitle, setTabTitle] = useState('My Drive - Google Drive');
    const [tabIcon, setTabIcon] = useState('https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png');

    // Effect to update document title and favicon
    useEffect(() => {
        document.title = tabTitle;

        // Update favicon
        let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = tabIcon;
    }, [tabTitle, tabIcon]);

    const toggleCloak = () => setIsCloaked(prev => !prev);

    const openBlobInAboutBlank = (url: string) => {
        const win = window.open();
        if (win) {
            win.document.body.style.margin = '0';
            win.document.body.style.height = '100vh';
            const iframe = win.document.createElement('iframe');
            iframe.style.border = 'none';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.margin = '0';
            iframe.src = url;
            win.document.body.appendChild(iframe);

            // Try to cloak the child window too
            win.document.title = tabTitle;
            // Note: Favicons in about:blank windows are tricky and often don't work depending on browser security policies
        }
    };

    return (
        <CloakingContext.Provider value={{
            isCloaked,
            toggleCloak,
            tabTitle,
            setTabTitle,
            tabIcon,
            setTabIcon,
            openBlobInAboutBlank
        }}>
            {children}
        </CloakingContext.Provider>
    );
};

export const useCloaking = () => {
    const context = useContext(CloakingContext);
    if (context === undefined) {
        throw new Error('useCloaking must be used within a CloakingProvider');
    }
    return context;
};
