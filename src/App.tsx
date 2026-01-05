import { useState } from 'react';
import { CloakingProvider, useCloaking } from './context/CloakingContext';
import PanicButton from './components/PanicButton';
import GameLauncher from './components/GameLauncher';
import { games } from './data/games';

const Dashboard = () => {
  const { setTabTitle, setTabIcon } = useCloaking();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(games.map(g => g.category)))];

  const filteredGames = games.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || g.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-white font-sans relative selection:bg-primary/30">

      {/* Background Glow Effects */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-hero-glow opacity-20 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-secondary opacity-10 blur-[150px] pointer-events-none" />

      <PanicButton />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/20">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-lg">🕹️</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              Nexus<span className="text-primary">Hub</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Disguise Select */}
            <div className="relative group">
              <select
                className="appearance-none bg-surface/50 border border-white/10 text-sm rounded-full px-4 py-2 pr-8 focus:outline-none focus:border-primary/50 transition-colors cursor-pointer text-gray-300 hover:text-white"
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'google') {
                    setTabTitle('Google');
                    setTabIcon('https://www.google.com/favicon.ico');
                  } else if (val === 'drive') {
                    setTabTitle('My Drive - Google Drive');
                    setTabIcon('https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png');
                  } else if (val === 'classroom') {
                    setTabTitle('Home');
                    setTabIcon('https://ssl.gstatic.com/classroom/favicon.png');
                  } else {
                    setTabTitle('NexusHub');
                    setTabIcon('/vite.svg');
                  }
                }}
              >
                <option value="none">No Disguise</option>
                <option value="drive">Google Drive</option>
                <option value="classroom">Google Classroom</option>
                <option value="google">Google Search</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 relative z-10">

        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Play <span className="text-gradient">Unknown.</span><br />
            Stay <span className="text-gray-400">Unseen.</span>
          </h2>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-25 group-focus-within:opacity-75 blur transition duration-500"></div>
            <input
              type="text"
              placeholder="Search for games..."
              className="relative w-full bg-surface/80 text-white border border-white/10 rounded-full px-8 py-4 focus:outline-none focus:ring-0 placeholder-gray-500 shadow-xl backdrop-blur-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                    ? 'bg-white text-black shadow-lg shadow-white/20 scale-105'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-slide-up">
          {filteredGames.map(game => (
            <GameLauncher key={game.id} game={game} />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center text-gray-500 mt-20 p-8 glass-panel rounded-2xl max-w-md mx-auto">
            <p className="text-xl">No games found.</p>
            <p className="text-sm mt-2">Try searching for something else.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-12 text-gray-600 text-sm relative z-10">
        <p>© 2026 NexusHub. Built for educational purposes.</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <CloakingProvider>
      <Dashboard />
    </CloakingProvider>
  );
}

export default App;
