from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'team_id', 'created_at']

    def get_id(self, obj):
        """Convert ObjectId to string"""
        return str(obj._id)


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    member_count = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'created_at', 'member_count']

    def get_id(self, obj):
        """Convert ObjectId to string"""
        return str(obj._id)
    
    def get_member_count(self, obj):
        """Count the number of users in this team"""
        return User.objects.filter(team_id=str(obj._id)).count()


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Activity
        fields = ['id', 'user_id', 'activity_type', 'duration', 'calories', 'date', 'created_at']

    def get_id(self, obj):
        """Convert ObjectId to string"""
        return str(obj._id)


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Leaderboard
        fields = ['id', 'user_id', 'team_id', 'total_calories', 'total_activities', 'rank', 'updated_at']

    def get_id(self, obj):
        """Convert ObjectId to string"""
        return str(obj._id)


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Workout
        fields = ['id', 'title', 'description', 'difficulty', 'duration', 'calories_estimate', 'exercises', 'created_at']

    def get_id(self, obj):
        """Convert ObjectId to string"""
        return str(obj._id)
