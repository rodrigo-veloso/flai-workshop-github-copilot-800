import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
        console.log('Leaderboard - Fetching from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard - Fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard - Processed data:', leaderboardData);
        
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      } catch (err) {
        console.error('Leaderboard - Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container page-container">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container page-container">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Leaderboard</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-container">
      <div className="page-header">
        <h1><span className="badge bg-danger me-2">�</span>Championship Standings</h1>
        <p className="subtitle">🏎️ Pole position rankings • Race for the podium • Champions are made here</p>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="text-center">🏁 Position</th>
              <th>🏎️ Driver</th>
              <th>Racing Team</th>
              <th className="text-end">Fuel Burned</th>
              <th className="text-end">Laps Completed</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => {
                const rank = index + 1;
                let rankClass = 'default';
                let positionLabel = `P${rank}`; // P1, P2, P3 format
                if (rank === 1) {
                  rankClass = 'gold';
                  positionLabel = '🥇 P1'; // Pole position
                } else if (rank === 2) {
                  rankClass = 'silver';
                  positionLabel = '🥈 P2';
                } else if (rank === 3) {
                  rankClass = 'bronze';
                  positionLabel = '🥉 P3';
                }
                
                return (
                  <tr key={entry.id || index}>
                    <td className="text-center">
                      <span className={`rank-badge ${rankClass}`}>{positionLabel}</span>
                    </td>
                    <td>
                      <strong>🏎️ {entry.user_name || entry.user}</strong>
                    </td>
                    <td>
                      {entry.team_name || entry.team ? (
                        <span className="badge bg-secondary">🏎️ {entry.team_name || entry.team}</span>
                      ) : (
                        <span className="text-muted">Independent</span>
                      )}
                    </td>
                    <td className="text-end">
                      <span className="badge bg-danger">🔥 {(entry.total_calories || 0).toLocaleString()} cal</span>
                    </td>
                    <td className="text-end">
                      <span className="badge bg-primary">🏁 {entry.total_activities || 0} laps</span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  <div className="text-muted">
                    <h5>🏁 Championship Table Empty</h5>
                    <p>Start racing to claim your position on the podium!</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
