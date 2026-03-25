import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [briefs, setBriefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('./data/briefs.json')
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then(data => setBriefs(Array.isArray(data) ? data : []))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="App"><div className="loading">Loading...</div></div>;
  if (error) return <div className="App"><div className="error">Failed to load data ({error})</div></div>;

  return (
    <div className="App">
      <h1>Financial Insights Daily Brief</h1>
      <div className="last-updated">Latest: {briefs[0]?.date || 'N/A'}</div>
      {briefs.map(b => (
        <div key={b.date} className="brief">
          <div className="date">{b.date}</div>
          {b.overview && <div className="summary">{b.overview}</div>}
          {b.headlines && b.headlines.length > 0 && (
            <>
              <div className="section-title">Today's Top News</div>
              {b.headlines.map((h, i) => (
                <div key={i} className="item">
                  <div className="item-title">{h.title}</div>
                  <div>{h.why}</div>
                  <div>✅ {h.bullish}</div>
                  <div>⚠️ {h.bearish}</div>
                </div>
              ))}
            </>
          )}
          {b.sectors && Object.keys(b.sectors).length > 0 && (
            <>
              <div className="section-title">Sector Radar</div>
              {Object.entries(b.sectors).map(([k, v]) => (
                <div key={k} className="item"><strong>{k}</strong>: {v}</div>
              ))}
            </>
          )}
          {b.preMarket && (
            <>
              <div className="section-title">Pre-market Watch</div>
              <div className="item">{b.preMarket}</div>
            </>
          )}
          {b.verdict && (
            <>
              <div className="section-title">My Take</div>
              <div className="item">{b.verdict}</div>
            </>
          )}
        </div>
      ))}
      <div className="footer">Built automatically • Data updates daily around 7am PT</div>
    </div>
  );
}

export default App;
