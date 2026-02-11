from django.core.management.base import BaseCommand
from django.utils import timezone
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING('Clearing existing data...'))
        
        # Delete all existing data using Django ORM
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        
        self.stdout.write(self.style.SUCCESS('Existing data cleared'))
        
        # Create teams
        self.stdout.write(self.style.WARNING('Creating teams...'))
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Earth\'s Mightiest Heroes',
            created_at=timezone.now()
        )
        
        team_dc = Team.objects.create(
            name='Team DC',
            description='Justice League Champions',
            created_at=timezone.now()
        )
        
        self.stdout.write(self.style.SUCCESS(f'Created teams: {team_marvel.name}, {team_dc.name}'))
        
        # Create users (superheroes)
        self.stdout.write(self.style.WARNING('Creating superhero users...'))
        
        marvel_heroes = [
            {'name': 'Iron Man', 'email': 'tony.stark@marvel.com'},
            {'name': 'Captain America', 'email': 'steve.rogers@marvel.com'},
            {'name': 'Thor', 'email': 'thor.odinson@marvel.com'},
            {'name': 'Black Widow', 'email': 'natasha.romanoff@marvel.com'},
            {'name': 'Hulk', 'email': 'bruce.banner@marvel.com'},
            {'name': 'Spider-Man', 'email': 'peter.parker@marvel.com'},
        ]
        
        dc_heroes = [
            {'name': 'Superman', 'email': 'clark.kent@dc.com'},
            {'name': 'Batman', 'email': 'bruce.wayne@dc.com'},
            {'name': 'Wonder Woman', 'email': 'diana.prince@dc.com'},
            {'name': 'The Flash', 'email': 'barry.allen@dc.com'},
            {'name': 'Aquaman', 'email': 'arthur.curry@dc.com'},
            {'name': 'Green Lantern', 'email': 'hal.jordan@dc.com'},
        ]
        
        marvel_users = []
        for hero in marvel_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team_id=str(team_marvel._id),
                created_at=timezone.now()
            )
            marvel_users.append(user)
        
        dc_users = []
        for hero in dc_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team_id=str(team_dc._id),
                created_at=timezone.now()
            )
            dc_users.append(user)
        
        all_users = marvel_users + dc_users
        self.stdout.write(self.style.SUCCESS(f'Created {len(all_users)} superhero users'))
        
        # Create activities
        self.stdout.write(self.style.WARNING('Creating activities...'))
        
        activity_types = [
            {'type': 'Running', 'cal_per_min': 10},
            {'type': 'Weightlifting', 'cal_per_min': 7},
            {'type': 'Cycling', 'cal_per_min': 8},
            {'type': 'Swimming', 'cal_per_min': 11},
            {'type': 'Boxing', 'cal_per_min': 12},
            {'type': 'Yoga', 'cal_per_min': 4},
        ]
        
        activities_created = 0
        for user in all_users:
            # Create 5-10 random activities for each user
            num_activities = random.randint(5, 10)
            for i in range(num_activities):
                activity_data = random.choice(activity_types)
                duration = random.randint(20, 90)
                calories = duration * activity_data['cal_per_min']
                days_ago = random.randint(0, 30)
                
                Activity.objects.create(
                    user_id=str(user._id),
                    activity_type=activity_data['type'],
                    duration=duration,
                    calories=calories,
                    date=timezone.now() - timedelta(days=days_ago),
                    created_at=timezone.now()
                )
                activities_created += 1
        
        self.stdout.write(self.style.SUCCESS(f'Created {activities_created} activities'))
        
        # Create leaderboard entries
        self.stdout.write(self.style.WARNING('Creating leaderboard entries...'))
        
        leaderboard_entries = []
        for user in all_users:
            # Calculate total calories and activities for this user
            user_activities = Activity.objects.filter(user_id=str(user._id))
            total_calories = sum(activity.calories for activity in user_activities)
            total_activities = user_activities.count()
            
            leaderboard_entries.append({
                'user': user,
                'total_calories': total_calories,
                'total_activities': total_activities
            })
        
        # Sort by total calories to assign ranks
        leaderboard_entries.sort(key=lambda x: x['total_calories'], reverse=True)
        
        for rank, entry in enumerate(leaderboard_entries, start=1):
            Leaderboard.objects.create(
                user_id=str(entry['user']._id),
                team_id=entry['user'].team_id,
                total_calories=entry['total_calories'],
                total_activities=entry['total_activities'],
                rank=rank,
                updated_at=timezone.now()
            )
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(leaderboard_entries)} leaderboard entries'))
        
        # Create workouts
        self.stdout.write(self.style.WARNING('Creating workouts...'))
        
        workouts_data = [
            {
                'title': 'Superhero Strength Training',
                'description': 'Build strength worthy of a superhero with this intense workout',
                'difficulty': 'Hard',
                'duration': 60,
                'calories_estimate': 450,
                'exercises': [
                    {'name': 'Bench Press', 'sets': 4, 'reps': 10},
                    {'name': 'Squats', 'sets': 4, 'reps': 12},
                    {'name': 'Deadlifts', 'sets': 3, 'reps': 8},
                    {'name': 'Pull-ups', 'sets': 3, 'reps': 15}
                ]
            },
            {
                'title': 'Speed Force Cardio',
                'description': 'Flash-inspired cardio workout for lightning-fast results',
                'difficulty': 'Medium',
                'duration': 30,
                'calories_estimate': 350,
                'exercises': [
                    {'name': 'Sprint Intervals', 'sets': 5, 'duration': '2 min'},
                    {'name': 'Jump Rope', 'sets': 3, 'duration': '3 min'},
                    {'name': 'Burpees', 'sets': 3, 'reps': 20}
                ]
            },
            {
                'title': 'Warrior Yoga Flow',
                'description': 'Wonder Woman-inspired flexibility and balance routine',
                'difficulty': 'Easy',
                'duration': 45,
                'calories_estimate': 180,
                'exercises': [
                    {'name': 'Warrior Pose', 'sets': 3, 'duration': '1 min each side'},
                    {'name': 'Tree Pose', 'sets': 3, 'duration': '1 min each side'},
                    {'name': 'Sun Salutation', 'sets': 5, 'reps': 10}
                ]
            },
            {
                'title': 'Hulk Smash HIIT',
                'description': 'High-intensity workout to unleash your inner Hulk',
                'difficulty': 'Hard',
                'duration': 40,
                'calories_estimate': 500,
                'exercises': [
                    {'name': 'Box Jumps', 'sets': 4, 'reps': 15},
                    {'name': 'Kettlebell Swings', 'sets': 4, 'reps': 20},
                    {'name': 'Mountain Climbers', 'sets': 4, 'reps': 30},
                    {'name': 'Battle Ropes', 'sets': 3, 'duration': '45 sec'}
                ]
            },
            {
                'title': 'Atlantean Swimming Circuit',
                'description': 'Aquaman-approved aquatic workout routine',
                'difficulty': 'Medium',
                'duration': 50,
                'calories_estimate': 550,
                'exercises': [
                    {'name': 'Freestyle', 'sets': 10, 'distance': '100m'},
                    {'name': 'Backstroke', 'sets': 5, 'distance': '100m'},
                    {'name': 'Underwater Swimming', 'sets': 5, 'distance': '25m'}
                ]
            },
            {
                'title': 'Web-Slinger Core Workout',
                'description': 'Spider-Man inspired core strengthening routine',
                'difficulty': 'Medium',
                'duration': 35,
                'calories_estimate': 280,
                'exercises': [
                    {'name': 'Plank', 'sets': 3, 'duration': '2 min'},
                    {'name': 'Hanging Leg Raises', 'sets': 3, 'reps': 15},
                    {'name': 'Russian Twists', 'sets': 3, 'reps': 30},
                    {'name': 'Bicycle Crunches', 'sets': 3, 'reps': 40}
                ]
            }
        ]
        
        for workout_data in workouts_data:
            Workout.objects.create(
                title=workout_data['title'],
                description=workout_data['description'],
                difficulty=workout_data['difficulty'],
                duration=workout_data['duration'],
                calories_estimate=workout_data['calories_estimate'],
                exercises=workout_data['exercises'],
                created_at=timezone.now()
            )
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts_data)} workout routines'))
        
        # Summary
        self.stdout.write(self.style.SUCCESS('\n=== Database Population Complete ==='))
        self.stdout.write(self.style.SUCCESS(f'Teams: {Team.objects.count()}'))
        self.stdout.write(self.style.SUCCESS(f'Users: {User.objects.count()}'))
        self.stdout.write(self.style.SUCCESS(f'Activities: {Activity.objects.count()}'))
        self.stdout.write(self.style.SUCCESS(f'Leaderboard Entries: {Leaderboard.objects.count()}'))
        self.stdout.write(self.style.SUCCESS(f'Workouts: {Workout.objects.count()}'))
