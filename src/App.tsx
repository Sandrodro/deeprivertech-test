import { useEffect, useState } from 'react';
import SportsTable from './components/SportsTable';
import { type Match, type MatchesData } from './types/sportsMatches';

function App() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        setLoading(true);
        const response = await import('./data/sportsMatchesData.json');
        const data = response.default as MatchesData;
        setMatches(data.matches);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load matches:', err);
        setError('Failed to load matches. Please try again later.');
        setLoading(false);
      }
    };

    loadMatches();
  }, []);

  return (
    <>
      <main className="min-h-screen bg-gray-50 py-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl">Loading matches...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            <p className="text-xl">{error}</p>
          </div>
        ) : (
          <SportsTable matches={matches} />
        )}
      </main>
    </>
  );
}

export default App;
