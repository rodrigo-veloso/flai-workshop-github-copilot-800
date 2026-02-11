import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
        console.log('Activities - Fetching from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities - Fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Activities - Processed data:', activitiesData);
        
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      } catch (err) {
        console.error('Activities - Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
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
          <h4 className="alert-heading">Error Loading Activities</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-container">
      <div className="page-header">
        <h1><span className="badge bg-primary me-2">🏁</span>Performance Tracker</h1>
        <p className="subtitle">🏎️ Every activity is a lap towards your championship • Monitor your race metrics</p>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>🏎️ Driver</th>
              <th>Activity Type</th>
              <th className="text-end">Lap Time</th>
              <th className="text-end">Distance</th>
              <th className="text-end">Fuel Burned</th>
              <th>Session Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.length > 0 ? (
              activities.map((activity) => {
                // Map activity types to emojis
                const activityIcons = {
                  'running': '🏃',
                  'cycling': '🚴',
                  'swimming': '🏊',
                  'walking': '🚶',
                  'yoga': '🧘',
                  'weightlifting': '🏋️',
                  'default': '💪'
                };
                const icon = activityIcons[activity.activity_type?.toLowerCase()] || activityIcons['default'];
                
                return (
                  <tr key={activity.id}>
                    <td>
                      <strong>{activity.user_name || activity.user || activity.user_id}</strong>
                    </td>
                    <td>
                      <span className="badge bg-primary">
                        {icon} {activity.activity_type}
                      </span>
                    </td>
                    <td className="text-end">
                      <span className="badge bg-info">{activity.duration_minutes || activity.duration || 'N/A'} min</span>
                    </td>
                    <td className="text-end">
                      {activity.distance_km || activity.distance ? (
                        <span className="badge bg-success">{activity.distance_km || activity.distance} km</span>
                      ) : (
                        <span className="text-muted">N/A</span>
                      )}
                    </td>
                    <td className="text-end">
                      <span className="badge bg-danger">{activity.calories_burned || activity.calories || 'N/A'} cal</span>
                    </td>
                    <td>
                      {activity.date || activity.created_at ? (
                        new Date(activity.date || activity.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })
                      ) : (
                        <span className="text-muted">N/A</span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  <div className="text-muted">
                    <h5>🏎️ No Racing Sessions Found</h5>
                    <p>Start your engines and begin logging your performance!</p>
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

export default Activities;
