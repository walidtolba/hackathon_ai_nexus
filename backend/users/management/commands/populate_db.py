import random
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from django.utils.timezone import now
from users.models import User, Absence, leave, Payslip, Policy, Contract




class Command(BaseCommand):
    help = 'Populate the database with random values.'

    def handle(self, *args, **kwargs):
        # Create random users
        for i in range(20):
            user = User.objects.create_user(
                email=f'user{i}@example.com',
                password='password123',
                first_name=f'FirstName{i}',
                last_name=f'LastName{i}',
                phone=f'+213{random.randint(600000000, 699999999)}',
                role=random.choice(['worker', 'ceo', 'hr']),
                leave_days=random.uniform(0, 30),
                companyName=f'Company{random.randint(1, 3)}',
                social_security_number=f'{random.randint(100000000, 999999999)}',
                min_number_worker=random.randint(1, 50),
                position=random.choice(['ai nexus', 'manager', 'director', 'coder']),
                base_salary=random.uniform(20000, 100000)
            )

        users = list(User.objects.all())

        # Create random absences
        for _ in range(10):
            Absence.objects.create(
                user=random.choice(users),
                date=now().date() - timedelta(days=random.randint(0, 30)),
                state=random.choice(['pending', 'accepted', 'rejected'])
            )

        # Create random leaves
        for _ in range(10):
            start_date = now().date() - timedelta(days=random.randint(1, 15))
            end_date = start_date + timedelta(days=random.randint(1, 10))
            leave.objects.create(
                user=random.choice(users),
                start_date=start_date,
                end_date=end_date,
                reason=f'Reason {random.randint(1, 100)}',
                status=random.choice(['pending', 'accepted', 'rejected'])
            )

        # Create random payslips
        for _ in range(10):
            Payslip.objects.create(
                user=random.choice(users),
                amount=random.uniform(20000, 100000)
            )

        # Create random policies
        for _ in range(5):
            Policy.objects.create(
                company=f'Company{random.randint(1, 10)}',
                fixed_salary_part=random.uniform(5000, 20000),
                variable_part=random.uniform(1000, 5000)
            )

        # Create random contracts
        for _ in range(10):
            Contract.objects.create(
                company=f'Company{random.randint(1, 10)}',
                user=random.choice(users),
                role=random.choice(['worker', 'manager', 'director']),
                base_salary=random.uniform(20000, 100000),
                description=f'Description {random.randint(1, 100)}'
            )

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
