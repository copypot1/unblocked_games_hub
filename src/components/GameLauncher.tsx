import React, { useState } from 'react';
import { useCloaking } from '../context/CloakingContext';

interface Game {
    id: string;
    title: string;
    url: string;
    thumbnail?: string;
    category: string;
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
            <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col animate-fade-in">
                <div className="flex justify-between items-center p-4 border-b border-white/10">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        {game.title}
                    </h2>
                    <div className="flex gap-4">
                        <button
                            onClick={handlePlayCloaked}
                            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition text-sm text-gray-300"
                        >
                            Open Cloaked ↗
                        </button>
                        <button
                            onClick={() => setIsPlaying(false)}
                            className="px-4 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 transition text-sm"
                        >
                            Close
                        </button>
                    </div>
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
        <div className="group relative rounded-2xl overflow-hidden bg-glass-surface border border-glass-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1">
            {/* Thumbnail Aspect Ratio Container */}
            <div className="relative aspect-video overflow-hidden">
                {game.thumbnail ? (
                    <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-surface grid place-items-center group-hover:bg-opacity-50 transition">
                        <span className="text-4xl opacity-50">🎮</span>
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                    <button
                        onClick={handlePlayInTab}
                        className="px-6 py-2 rounded-full bg-primary hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/30 transform transition-all hover:scale-105 active:scale-95"
                    >
                        Play Now
                    </button>
                    <button
                        onClick={handlePlayCloaked}
                        className="px-6 py-2 rounded-full bg-surface/50 hover:bg-surface text-white text-sm font-medium backdrop-blur-md border border-white/10 transition-colors"
                    >
                        Cloak Mode
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
                <h3 className="text-lg font-semibold text-white tracking-wide group-hover:text-primary transition-colors">
                    {game.title}
                </h3>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mt-1">
                    {game.category}
                </p>
            </div>
        </div>
    );
};

export default GameLauncher;
