import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        console.log('Workouts - Fetching from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts - Fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts - Processed data:', workoutsData);
        
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      } catch (err) {
        console.error('Workouts - Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
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
          <h4 className="alert-heading">Error Loading Workouts</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-container">
      <div className="page-header">
        <h1><span className="badge bg-info me-2">⚡</span>Training Circuit</h1>
        <p className="subtitle">🏎️ Engineered for performance • Championship-caliber training programs</p>
      </div>
      <div className="row g-4">
        {workouts.length > 0 ? (
          workouts.map((workout) => {
            // Difficulty level styling
            const difficultyColors = {
              'Easy': 'success',
              'Medium': 'warning',
              'Hard': 'danger',
              'Expert': 'dark'
            };
            const difficulty = workout.difficulty || workout.difficulty_level || 'Medium';
            const difficultyColor = difficultyColors[difficulty] || 'secondary';
            
            return (
              <div key={workout.id} className="col-md-6 col-lg-4">
                <div className="card h-100">
                  <div className="card-header">
                    <h5 className="mb-0">⚡ {workout.title}</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <span className={`badge bg-${difficultyColor} me-2`}>
                        {difficulty}
                      </span>
                      {workout.workout_type && (
                        <span className="badge bg-info">
                          {workout.workout_type}
                        </span>
                      )}
                    </div>
                    <p className="card-text">{workout.description || 'No description available'}</p>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted">🏁 Session Time:</span>
                      <span className="badge bg-primary">
                        {workout.estimated_duration_minutes || workout.duration || 'N/A'} min
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted">🔥 Calories:</span>
                      <span className="badge bg-danger">
                        {workout.estimated_calories || workout.calories_estimate || 'N/A'} kcal
                      </span>
                    </div>
                    
                    {/* Display exercises */}
                    {workout.exercises && workout.exercises.length > 0 && (
                      <div className="mt-3">
                        <hr />
                        <div className="mb-2">
                          <strong className="text-muted">🏋️ Exercises:</strong>
                        </div>
                        <ul className="list-unstyled ms-3">
                          {workout.exercises.slice(0, 4).map((exercise, idx) => (
                            <li key={idx} className="mb-1">
                              <small>
                                <span className="badge bg-light text-dark me-1">{idx + 1}</span>
                                <strong>{exercise.name}</strong>
                                {exercise.sets && <span className="text-muted"> - {exercise.sets} sets</span>}
                                {exercise.reps && <span className="text-muted"> × {exercise.reps} reps</span>}
                                {exercise.duration && <span className="text-muted"> - {exercise.duration}</span>}
                                {exercise.distance && <span className="text-muted"> - {exercise.distance}</span>}
                              </small>
                            </li>
                          ))}
                          {workout.exercises.length > 4 && (
                            <li className="text-muted">
                              <small>+ {workout.exercises.length - 4} more exercises</small>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                    
                    {workout.target_muscle_groups && (
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">🎯 Target:</span>
                        <small className="text-end">{workout.target_muscle_groups}</small>
                      </div>
                    )}
                    {workout.equipment_needed && (
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">🏋️ Equipment:</span>
                        <small className="text-end">{workout.equipment_needed}</small>
                      </div>
                    )}
                  </div>
                  <div className="card-footer bg-transparent">
                    <button className="btn btn-primary btn-sm w-100">Start Workout</button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center" role="alert">
              <h5>⚡ No Training Circuits Found</h5>
              <p className="mb-0">Championship-caliber training programs coming soon!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
