import React, { useState } from 'react';
import { useCloaking } from '../context/CloakingContext';

interface Game {
    id: string;
    title: string;
    url: string; // The URL to embed or open
    thumbnail?: string;
}

interface GameLauncherProps {
    game: Game;
}

const GameLauncher: React.FC<GameLauncherProps> = ({ game }) => {
    const { openBlobInAboutBlank } = useCloaking();
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayInTab = () => {
        setIsPlaying(true);
    };

    const handlePlayCloaked = () => {
        openBlobInAboutBlank(game.url);
    };

    if (isPlaying) {
        return (
            <div className="fixed inset-0 z-40 bg-black flex flex-col">
                <div className="bg-gray-900 p-2 flex justify-between items-center text-white">
                    <span>{game.title}</span>
                    <button onClick={() => setIsPlaying(false)} className="text-red-400 hover:text-red-300">Close</button>
                </div>
                <iframe
                    src={game.url}
                    className="flex-1 w-full border-none"
                    title={game.title}
                    allowFullScreen
                />
            </div>
        );
    }

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-700">
            <div className="h-40 bg-gray-700 flex items-center justify-center relative group">
                {game.thumbnail ? (
                    <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-4xl">🎮</span>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 gap-2">
                    <button
                        onClick={handlePlayInTab}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium"
                    >
                        Play Here
                    </button>
                    <button
                        onClick={handlePlayCloaked}
                        className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded text-sm font-medium"
                        title="Open in about:blank (Cloaked)"
                    >
                        Cloak 👻
                    </button>
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-white truncate">{game.title}</h3>
            </div>
        </div>
    );
};

export default GameLauncher;
