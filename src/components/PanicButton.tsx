import React, { useEffect } from 'react';

interface PanicButtonProps {
    panicUrl?: string;
    triggerKey?: string;
}

const PanicButton: React.FC<PanicButtonProps> = ({
    panicUrl = 'https://google.com',
    triggerKey = ']'
}) => {

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === triggerKey) {
                window.location.href = panicUrl;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [panicUrl, triggerKey]);

    return (
        <div className="fixed bottom-4 right-4 z-50 opacity-20 hover:opacity-100 transition-opacity">
            <button
                onClick={() => window.location.href = panicUrl}
                className="bg-red-600 text-white px-3 py-1 rounded text-xs"
                title={`Panic Button (Press '${triggerKey}')`}
            >
                Panic
            </button>
        </div>
    );
};

export default PanicButton;
