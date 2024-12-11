from rest_framework.views import Response, APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from users.custom_renderers import ImageRenderer
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import AbsenceSerializer
from users.models import Absence, Policy
from rest_framework.response import Response
from rest_framework import status
from users.models import User, Absence, Payslip, leave, Contract
from users.serializers import UserSerializer
from .serializers import LeaveSerializer, PlayslipSerializer, PolicySerializer, ContractSerializer
import random
import os
from django.core.files import File

from fpdf import FPDF
from .tools import model,create_pdf
from .tools import data as data_model
import pandas as pd

import datetime

from django.core.mail import send_mail
from backend1 import settings
from .tools import left_prediction



class AbsenceView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        company_users = request.user.companyName
        data = Absence.objects.filter(user__companyName = company_users).all()
        serializer = AbsenceSerializer(data,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)


    def post(self,request):
        companyUsers = User.objects.filter(companyName  = request.user.companyName).all()
        for user in companyUsers:
            Absence.objects.create(user=user)
        return Response(status=status.HTTP_201_CREATED)

class CheckAbsance(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        absances = Absence.objects.filter(user__companyName=request.user.companyName).all()
        serializer = AbsenceSerializer(absances, many=True)
        data = [User.objects.filter(id=x['user']).first().email for x in serializer.data]
        send_mail("You are absence", "You are late", settings.EMAIL_HOST_USER, data)
        return Response(data, status=200)

class ViewAbsance(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        absances = Absence.objects.filter(user__companyName=request.user.companyName).all()
        serializer = AbsenceSerializer(absances, many=True)
        data = [{'user' : f"{User.objects.filter(id=x['user']).first().first_name} {User.objects.filter(id=x['user']).first().last_name}", 'date': x['date']} for x in serializer.data]
        return Response(data, status=200)

class MakeHR(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        email = request.data['email']
        user = User.objects.filter(email=email).first()
        if user.role != 'hr'  or user.companyName != None:
            return Response({'error': 'User is already taken'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            user.role = 'hr'
        user.save()
        return Response(status=status.HTTP_200_OK)

class MakeRole(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        email = request.data['email']
        role = request.data['role']
        user = User.objects.filter(email=email).first()
        if request.uesr.companyName != user.companyName:
            return Response({'error': 'He is not from your country'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            user.role = role
        user.save()
        return Response(status=status.HTTP_200_OK)

class FireUser(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        id = request.data['id']
        user = User.objects.filter(id=id).first()
        if request.user.companyName != user.companyName:
            return Response({'error': 'He is not from your country'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            user.companyName = None
        user.save()
        return Response(status=status.HTTP_200_OK)
        serlializer.is_valid()

class WorkerView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        users = User.objects.filter(companyName=request.user.companyName).all()
        serlializer = UserSerializer(users, many=True)
        data = serlializer.data[:]
        for dic in data:
            dic['status'] = random.choice(['active', 'inactive'])
        return Response(data)
    

# class WorkerView(APIView):
#     permission_classes = [IsAuthenticated]
#     def get(self,request):
#         if request.user.companyName:
#             users = User.objects.filter(companyName=request.user.companyName).all()
#             serlializer = UserSerializer(users, many=True)
#             data = serlializer.data[:]
#             for dic in data:
#                 dic['status'] = random.choice(['active', 'inactive'])
#             return Response(data)
#         return Response([])


class SetMinWorkerView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        min = request.data['min']
        usersrHr = User.objects.filter(companyName=request.user.companyName, role='hr').all()
        usersCEO = User.objects.filter(companyName=request.user.companyName, role='CEO').all()
        for user in usersrHr:
            user.min_number_worker = int(min)
            user.save()
        for user in usersCEO:
            user.min_number_worker = int(min)
            user.save()
        return Response({'message':'yes'},status=status.HTTP_200_OK)

class ListOthersLeave(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        leaves = leave.objects.filter(user__companyName=request.user.companyName).all()
        serializer = LeaveSerializer(leaves, many=True)
        data = serializer.data.copy()
        for x in data:
            x['first_name'] = User.objects.filter(id=x['user']).first().first_name
            x['last_name'] = User.objects.filter(id=x['user']).first().last_name

        return Response(data)

class CreatePayslipView(APIView):
    permission_classes = [IsAuthenticated]
    # parser_classes = [FormParser, MultiPartParser]

    def post(self, request):

        id = request.data.get('id', None)
        if not id:
            user = request.user
        else:
            user = User.objects.filter(id=id).first()
        
        print(user.id)
        
        data = dict()
        data['user'] = user.id
        data['amount'] = 4
        ################################333
        # Étape 1: Préparer la liste des primes et des catégories
        policies = Policy.objects.filter(company=user.companyName).first()
        temp = PolicySerializer(policies).data
        


        all_primes = []
        categories = []

        # for category, primes in data_model.items():
        #     all_primes.extend(primes)
        #     categories.extend([category] * len(primes))  # Ajoute la catégorie correspondante
        temp = {
    "Salaire de base": 0,
    "Salaire partie fixe": temp["fixed_salary_part"],
    "Partie variable": temp["variable_part"],
    "I.E.P": temp["iep"],
    "Indemnité travail poste": temp["shift_work_allowance"],
    "I.F.S.P": temp["ifsp"],
    "Indemnité de nuisance": temp["disruption_allowance"],
    "Indemnité travail de nuit": temp["night_work_allowance"],
    "Indemnité d'intérim": temp["interim_allowance"],
    "Prime de permanence": temp["standby_bonus"],
    "Indemnité d'astreinte": temp["on_call_allowance"],
    "Heures supplémentaires": temp["overtime"],
    "Indemnité de congé annuel": temp["annual_leave_allowance"],
    "Prime d'inventaire": temp["inventory_bonus"],
    "Prime de bilan": temp["end_of_year_bonus"],
    "PRI": temp["pri"],
    "PRC": temp["prc"],
    "Prime encouragement annuelle": temp["annual_encouragement_bonus"],
    "Prime de bénéfice annuelle": temp["annual_profit_bonus"],
    "RETENUE SS": 0,
    "Prime d'innovation": temp["innovation_bonus"],
    "Panier": temp["meal_allowance"],
    "Transport": temp["transport"],
    "Téléphone": temp["phone"],
    "I.U.V.P": temp["iuvp"],
    "Prime exceptionnelle": temp["exceptional_bonus"],
    "Allocation fin carrière/retraite": temp["career_retirement_end_allowance"],
    "Allocation de décès": temp["death_allowance"],
    "Allocations familiales": temp["family_allowances"],
    "Prime de scolarité": temp["school_bonus"],
    "Salaire unique": temp["unique_salary"],
    "Frais de missions": temp["mission_expenses"],
    "Prime de zone": temp["zone_bonus"],
    "Indemnité de licenciement": temp["dismissal_allowance"],
    "Bonification enfants de chouhadas": temp["children_of_martyrs_bonus"],
    "RETENUE IRG": 0,
}
        print(temp)
        for key in temp:
            temp[key] = [temp[key]]
        t = pd.DataFrame(temp)
        print(temp)
        print(t)

        # new_row = {col: random.randint(0, 10) for col in t.columns}
        # t = pd.DataFrame([new_row]) 

        t.columns

        #######################################

        cities = ['Zouaghi', 'Smara', 'Khroub', 'Constantine']
        address = ['24, 34 logment', 'Salam city']

        # Generate PDF
        pdf = create_pdf(t, str(user.companyName), random.choice(address), random.choice(cities), str(request.user.phone), str(datetime.datetime.now()), str(user.social_security_number), f'{request.user.first_name} {request.user.last_name}', str(user.position), 'Single', 'Affectation', 'date_enter', str(user.social_security_number)[:2])
        
        # Save PDF to temporary location
        pdf_path = f"user{request.user.id}_date{str(datetime.datetime.now())}.pdf"
        pdf.output(pdf_path)

        # Attach generated file to the request data
        pdf_file = open(pdf_path, 'rb')
        data['file'] = File(pdf_file)
        

        # Serialize and save
        serializer = PlayslipSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            # Clean up temporary file
            return Response(data=serializer.data, status=200)

        # Handle errors
        return Response(data=serializer.errors, status=500)
    
class GetPayslipView(generics.RetrieveAPIView):
    renderers_classes = [ImageRenderer]
    def get(self, request, id):
        queryset = Payslip.objects.get(id=id).file
        data = queryset
        return HttpResponse(data, content_type='payslip/' + data.path.split(".")[-1])

class ChatBotView(APIView):
    def post(self, request):
        text = request.data['text']
        result = model.generate_content([text])
        return Response({'message':result.candidates[0].content.parts[0].text})


# need to be fixed
class CreateCompanyView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        company = request.data['company']
        serializer = PolicySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            request.user.companyName = company
            request.user.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors)


class AcceptQRCode(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        user = request.user
        Absence.objects.filter(user=user).delete()
        return Response({'message': 'Done'})

class MyLeaveView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        leaves = leave.objects.filter(user=request.user.id)
        data = LeaveSerializer(leaves, many=True).data
        return Response(data, status=200)
    
    def post(self, request):
        request.data['user'] = request.user.id
        serializer = LeaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


class MyPayslipsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        payslips = Payslip.objects.filter(user=request.user.id)
        data = PlayslipSerializer(payslips, many=True).data
        Response(data, status=200)



class CreateContractView(APIView):
    permission_classes = [IsAuthenticated]
    # parser_classes = [FormParser, MultiPartParser]

    def post(self, request):

        id = request.data.get('id', None)
        if not id:
            user = request.user
        else:
            user = User.objects.filter(id=id).first()
        
        print(user.id)
        
        data = dict()
        data['user'] = user.id
        data['amount'] = 4
        ################################333
        # Étape 1: Préparer la liste des primes et des catégories
        policies = Policy.objects.filter(company=user.companyName).first()
        temp = PolicySerializer(policies).data
        


        all_primes = []
        categories = []

        # for category, primes in data_model.items():
        #     all_primes.extend(primes)
        #     categories.extend([category] * len(primes))  # Ajoute la catégorie correspondante
        temp = {
    "Salaire de base": 0,
    "Salaire partie fixe": temp["fixed_salary_part"],
    "Partie variable": temp["variable_part"],
    "I.E.P": temp["iep"],
    "Indemnité travail poste": temp["shift_work_allowance"],
    "I.F.S.P": temp["ifsp"],
    "Indemnité de nuisance": temp["disruption_allowance"],
    "Indemnité travail de nuit": temp["night_work_allowance"],
    "Indemnité d'intérim": temp["interim_allowance"],
    "Prime de permanence": temp["standby_bonus"],
    "Indemnité d'astreinte": temp["on_call_allowance"],
    "Heures supplémentaires": temp["overtime"],
    "Indemnité de congé annuel": temp["annual_leave_allowance"],
    "Prime d'inventaire": temp["inventory_bonus"],
    "Prime de bilan": temp["end_of_year_bonus"],
    "PRI": temp["pri"],
    "PRC": temp["prc"],
    "Prime encouragement annuelle": temp["annual_encouragement_bonus"],
    "Prime de bénéfice annuelle": temp["annual_profit_bonus"],
    "RETENUE SS": 0,
    "Prime d'innovation": temp["innovation_bonus"],
    "Panier": temp["meal_allowance"],
    "Transport": temp["transport"],
    "Téléphone": temp["phone"],
    "I.U.V.P": temp["iuvp"],
    "Prime exceptionnelle": temp["exceptional_bonus"],
    "Allocation fin carrière/retraite": temp["career_retirement_end_allowance"],
    "Allocation de décès": temp["death_allowance"],
    "Allocations familiales": temp["family_allowances"],
    "Prime de scolarité": temp["school_bonus"],
    "Salaire unique": temp["unique_salary"],
    "Frais de missions": temp["mission_expenses"],
    "Prime de zone": temp["zone_bonus"],
    "Indemnité de licenciement": temp["dismissal_allowance"],
    "Bonification enfants de chouhadas": temp["children_of_martyrs_bonus"],
    "RETENUE IRG": 0,
}
        print(temp)
        for key in temp:
            temp[key] = [temp[key]]
        t = pd.DataFrame(temp)
        print(temp)
        print(t)

        # new_row = {col: random.randint(0, 10) for col in t.columns}
        # t = pd.DataFrame([new_row]) 

        t.columns

        #######################################

        cities = ['Zouaghi', 'Smara', 'Khroub', 'Constantine']
        address = ['24, 34 logment', 'Salam city']

        # Generate PDF
        pdf = create_pdf(t, str(user.companyName), random.choice(address), random.choice(cities), str(request.user.phone), str(datetime.datetime.now()), str(user.social_security_number), f'{request.user.first_name} {request.user.last_name}', str(user.position), 'Single', 'Affectation', 'date_enter', str(user.social_security_number)[:2])
        
        # Save PDF to temporary location
        pdf_path = f"user{request.user.id}_date{str(datetime.datetime.now())}.pdf"
        pdf.output(pdf_path)

        # Attach generated file to the request data
        pdf_file = open(pdf_path, 'rb')
        data['file'] = File(pdf_file)
        

        # Serialize and save
        serializer = PlayslipSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            # Clean up temporary file
            return Response(data=serializer.data, status=200)

        # Handle errors
        return Response(data=serializer.errors, status=500)
    
class GetContractView(generics.RetrieveAPIView):
    renderers_classes = [ImageRenderer]
    def get(self, request, id):
        queryset = Contract.objects.get(id=id).file
        data = queryset
        return HttpResponse(data, content_type='contracts/' + data.path.split(".")[-1])

class LeaveTheJobPrediction(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        users = User.objects.filter(companyName=request.user.companyName)
        data = UserSerializer(users, many=True).data
        a = []
        for i in data:
            a.append([i['first_name'], i['last_name'], left_prediction(random.randint(2017,2024),random.randint(1,2),random.randint(25,50),random.randint(0,1) ,random.randint(0,7))])
            b = [dict(first_name=x, last_name=y, prediction=z) for x, y, z in a]
        return Response(b, status=200)

class ApproveView(APIView):
    def put(self, request):
        id = request.data['id']
        leav = leave.objects.filter(id=id).first()
        leav.status = 'accepted'
        leav.save()
        return Response({'message': 'yes'}, status=200)
    
    def delete(self, request):
        id = request.data['id']
        leav = leave.objects.filter(id=id).first()
        leav.status = 'rejected'
        leav.save()
        return Response({'message': 'yes'}, status=200)

