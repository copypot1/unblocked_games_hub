import { useState } from 'react';
import { CloakingProvider, useCloaking } from './context/CloakingContext';
import PanicButton from './components/PanicButton';
import GameLauncher from './components/GameLauncher';
import { games } from './data/games';

const Dashboard = () => {
  const { setTabTitle, setTabIcon } = useCloaking();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = games.filter(g =>
    g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-hub-dark text-white font-sans">
      <PanicButton />

      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-30">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            GameHub
          </h1>

          <div className="flex gap-4 items-center">
            <select
              className="bg-gray-800 text-sm rounded px-2 py-1 border border-gray-700"
              onChange={(e) => {
                // Simple preset disguises
                if (e.target.value === 'google') {
                  setTabTitle('Google');
                  setTabIcon('https://www.google.com/favicon.ico');
                } else if (e.target.value === 'drive') {
                  setTabTitle('My Drive - Google Drive');
                  setTabIcon('https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png');
                } else if (e.target.value === 'classroom') {
                  setTabTitle('Home');
                  setTabIcon('https://ssl.gstatic.com/classroom/favicon.png');
                } else {
                  setTabTitle('GameHub');
                  setTabIcon('/vite.svg');
                }
              }}
            >
              <option value="drive">Disguise: Drive</option>
              <option value="classroom">Disguise: Classroom</option>
              <option value="google">Disguise: Google</option>
              <option value="none">No Disguise</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Search */}
        <div className="mb-8 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search games..."
            className="w-full bg-gray-800 border border-gray-700 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGames.map(game => (
            <GameLauncher key={game.id} game={game} />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            No games found matching "{searchTerm}"
          </div>
        )}
      </main>
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
