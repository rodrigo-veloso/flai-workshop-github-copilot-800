import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
        console.log('Teams - Fetching from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams - Fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Teams - Processed data:', teamsData);
        
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      } catch (err) {
        console.error('Teams - Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeams();
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
          <h4 className="alert-heading">Error Loading Teams</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-container">
      <div className="page-header">
        <h1><span className="badge bg-warning text-dark me-2">�️</span>Racing Teams</h1>
        <p className="subtitle">⚡ Join the pit crew • Team spirit drives victory • Racing together</p>
      </div>
      <div className="row g-4">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team.id} className="col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="mb-0">�️ {team.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{team.description || 'No description available'}</p>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">🏎️ Pit Crew:</span>
                    <span className="badge bg-primary rounded-pill">
                      {team.member_count || team.members?.length || 0} drivers
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">🏁 Team Founded:</span>
                    <small className="text-muted">
                      {team.created_at ? new Date(team.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      }) : 'N/A'}
                    </small>
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <button className="btn btn-outline-primary btn-sm w-100">🏎️ Join Racing Team</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center" role="alert">
              <h5>🏎️ No Racing Teams Found</h5>
              <p className="mb-0">Form your pit crew and join the championship!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
