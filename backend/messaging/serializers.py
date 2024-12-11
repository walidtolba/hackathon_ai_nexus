from rest_framework import serializers
# from .models import Session, Message, RecordMessage
from users.serializers import UserSerializer

# class SessionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Session
#         fields = '__all__'

# class MessageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Message
#         fields = '__all__'

# class RecordMessageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RecordMessage
#         fields = '__all__'

from rest_framework import serializers
from users.models import leave, Absence, Payslip, Policy, Contract

class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = leave
        fields = '__all__'

from rest_framework import serializers
from users.models import Absence

class AbsenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Absence
        fields = '__all__'

class PolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = Policy
        fields = '__all__'

class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = '__all__'

class PlayslipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payslip
        fields = '__all__'


class PolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = Policy
        fields = '__all__'

class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = '__all__'