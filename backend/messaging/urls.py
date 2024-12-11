from django.urls import path
from .views import AbsenceView, ApproveView, MakeHR, FireUser, MakeRole, MyLeaveView, WorkerView, SetMinWorkerView, ListOthersLeave, CreatePayslipView, ChatBotView, CheckAbsance, ViewAbsance, GetPayslipView, CreateCompanyView, AcceptQRCode, MyPayslipsView, LeaveTheJobPrediction


urlpatterns = [
        path('absence/',AbsenceView.as_view(),name='absence'),
        path('make_hr/',MakeHR.as_view(),name='make_hr'),
        path('make_role/',MakeRole.as_view(),name='make_role'),
        path('fire_user/',FireUser.as_view(),name='fire_user'),
        path('worker/', WorkerView.as_view(), name='worker'),
        path('set_min/', SetMinWorkerView.as_view(), name='set_min'),
        path('list_others_leave/', ListOthersLeave.as_view(), name='list_others_leave'),
        path('create_payslip/', CreatePayslipView.as_view(), name='upload_image'),
        path('get_payslip/<id>/', GetPayslipView.as_view(), name='get_image'),
        path('chatbot/', ChatBotView.as_view(), name='get_image'),
        path('view_absance/', ViewAbsance.as_view(), name='check_absance'),
        path('check_absance/', CheckAbsance.as_view(), name='view_absance'),
        path('create_company/', CreateCompanyView.as_view(), name='create_company'),
        path('accept_qr/', AcceptQRCode.as_view(), name='accept_qr'),
        path('my_leave/', MyLeaveView.as_view(), name='my_leave'),
        path('list_my_payslips/', MyPayslipsView.as_view(), name='my_leave'),
        path('create_contracts/', CreatePayslipView.as_view(), name='upload_image'),
        path('get_contract/<id>/', GetPayslipView.as_view(), name='get_image'),
        path('approve/', ApproveView.as_view(), name='approve'),
        path('predict_left/', LeaveTheJobPrediction.as_view(), name='predict_left')


]
