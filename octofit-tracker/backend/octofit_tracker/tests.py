from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime


class UserAPITestCase(APITestCase):
    """Test cases for User API endpoints."""

    def setUp(self):
        """Set up test data."""
        self.user = User.objects.create(
            name="Test User",
            email="test@example.com",
            team_id="team123"
        )

    def test_list_users(self):
        """Test listing all users."""
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_user(self):
        """Test creating a new user."""
        url = reverse('user-list')
        data = {
            'name': 'New User',
            'email': 'newuser@example.com',
            'team_id': 'team456'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TeamAPITestCase(APITestCase):
    """Test cases for Team API endpoints."""

    def setUp(self):
        """Set up test data."""
        self.team = Team.objects.create(
            name="Test Team",
            description="A test team"
        )

    def test_list_teams(self):
        """Test listing all teams."""
        url = reverse('team-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_team(self):
        """Test creating a new team."""
        url = reverse('team-list')
        data = {
            'name': 'New Team',
            'description': 'A new team'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class ActivityAPITestCase(APITestCase):
    """Test cases for Activity API endpoints."""

    def setUp(self):
        """Set up test data."""
        self.activity = Activity.objects.create(
            user_id="user123",
            activity_type="running",
            duration=30,
            calories=250,
            date=datetime.now()
        )

    def test_list_activities(self):
        """Test listing all activities."""
        url = reverse('activity-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_activity(self):
        """Test creating a new activity."""
        url = reverse('activity-list')
        data = {
            'user_id': 'user456',
            'activity_type': 'cycling',
            'duration': 45,
            'calories': 350,
            'date': datetime.now().isoformat()
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LeaderboardAPITestCase(APITestCase):
    """Test cases for Leaderboard API endpoints."""

    def setUp(self):
        """Set up test data."""
        self.leaderboard = Leaderboard.objects.create(
            user_id="user123",
            team_id="team123",
            total_calories=1000,
            total_activities=10,
            rank=1
        )

    def test_list_leaderboard(self):
        """Test listing leaderboard entries."""
        url = reverse('leaderboard-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class WorkoutAPITestCase(APITestCase):
    """Test cases for Workout API endpoints."""

    def setUp(self):
        """Set up test data."""
        self.workout = Workout.objects.create(
            title="Morning Run",
            description="A refreshing morning run",
            difficulty="medium",
            duration=30,
            calories_estimate=250,
            exercises=["warm-up", "run", "cool-down"]
        )

    def test_list_workouts(self):
        """Test listing all workouts."""
        url = reverse('workout-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_workout(self):
        """Test creating a new workout."""
        url = reverse('workout-list')
        data = {
            'title': 'Evening Yoga',
            'description': 'Relaxing yoga session',
            'difficulty': 'easy',
            'duration': 45,
            'calories_estimate': 150,
            'exercises': ['stretching', 'poses', 'meditation']
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class APIRootTestCase(APITestCase):
    """Test cases for API root endpoint."""

    def test_api_root(self):
        """Test API root endpoint returns all available endpoints."""
        url = reverse('api-root')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)
