from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager

class User(AbstractUser):
    email = models.EmailField(unique=True, max_length=254, verbose_name='email address')
    password = models.CharField(max_length=128, verbose_name='password')
    username = None
    last_name = models.CharField(max_length=128)
    first_name = models.CharField(max_length=128)
    phone = models.CharField(max_length=32)
    role = models.CharField(max_length=32, default='worker')
    leave_days = models.FloatField(default=0.0)
    companyName = models.CharField(max_length=128, blank=True, null=True)
    social_security_number = models.CharField(max_length=9,)
    min_number_worker = models.IntegerField(default=0,)
    position = models.CharField(max_length=128, default='worker')
    base_salary = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()


class Absence(models.Model):
    choices = [('pending','pending'),('accepted','accepted'),('rejected','rejected')]
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    check_in = models.TimeField(auto_now_add=True)
    check_out = models.TimeField(auto_now_add=True)
    state = models.CharField(max_length=32,default='pending', choices=choices)    

    deserved_time = models.IntegerField(editable=False,null=True)

    def __str__(self):
        return f'{self.user_profile}-{self.date}-absent:{self.is_absent}'
    
class leave(models.Model):
    choices = [('pending','pending'),('accepted','accepted'),('rejected','rejected')]
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    start_date = models.DateField()  
    end_date = models.DateField()
    reason = models.TextField()
    file = models.FileField(upload_to='leave_files',null=True,blank=True)
    status = models.CharField(max_length=32,default='pending', choices=choices)

class Payslip(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    file = models.FileField(upload_to='payslips',null=True,blank=True)

    def __str__(self):
        return f'{self.user}-[{self.start_date}-{self.end_date}]'

class Policy(models.Model):
    company = models.CharField(max_length=128)
    fixed_salary_part = models.FloatField(default=0.0, blank=True, null=True)
    variable_part = models.FloatField(default=0.0, blank=True, null=True)
    iep = models.FloatField(default=0.0, blank=True, null=True)
    shift_work_allowance = models.FloatField(default=0.0, blank=True, null=True)
    ifsp = models.FloatField(default=0.0, blank=True, null=True)
    disruption_allowance = models.FloatField(default=0.0, blank=True, null=True)
    night_work_allowance = models.FloatField(default=0.0, blank=True, null=True)
    interim_allowance = models.FloatField(default=0.0, blank=True, null=True)
    standby_bonus = models.FloatField(default=0.0, blank=True, null=True)
    on_call_allowance = models.FloatField(default=0.0, blank=True, null=True)
    overtime = models.FloatField(default=0.0, blank=True, null=True)
    annual_leave_allowance = models.FloatField(default=0.0, blank=True, null=True)
    inventory_bonus = models.FloatField(default=0.0, blank=True, null=True)
    end_of_year_bonus = models.FloatField(default=0.0, blank=True, null=True)
    pri = models.FloatField(default=0.0, blank=True, null=True)
    prc = models.FloatField(default=0.0, blank=True, null=True)
    annual_encouragement_bonus = models.FloatField(default=0.0, blank=True, null=True)
    annual_profit_bonus = models.FloatField(default=0.0, blank=True, null=True)
    innovation_bonus = models.FloatField(default=0.0, blank=True, null=True)
    meal_allowance = models.FloatField(default=0.0, blank=True, null=True)
    transport = models.FloatField(default=0.0, blank=True, null=True)
    phone = models.FloatField(default=0.0, blank=True, null=True)
    iuvp = models.FloatField(default=0.0, blank=True, null=True)
    exceptional_bonus = models.FloatField(default=0.0, blank=True, null=True)
    career_retirement_end_allowance = models.FloatField(default=0.0, blank=True, null=True)
    death_allowance = models.FloatField(default=0.0, blank=True, null=True)
    family_allowances = models.FloatField(default=0.0, blank=True, null=True)
    school_bonus = models.FloatField(default=0.0, blank=True, null=True)
    unique_salary = models.FloatField(default=0.0, blank=True, null=True)
    mission_expenses = models.FloatField(default=0.0, blank=True, null=True)
    zone_bonus = models.FloatField(default=0.0, blank=True, null=True)
    dismissal_allowance = models.FloatField(default=0.0, blank=True, null=True)
    children_of_martyrs_bonus = models.FloatField(default=0.0, blank=True, null=True)

    def str(self):
        return f"FeatureModel with ID: {self.id}"

class Contract(models.Model):
    company = models.CharField(max_length=128)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    role = models.CharField(max_length=128) 
    base_salary = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    file = models.FileField(upload_to='contracts',null=True,blank=True)