import datetime
from django.template import Context
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template.loader import get_template

def hello(request):
    return "hello"

def current_datetime(request):
    now = datetime.datetime.now()
    title = "KKK"
    return render_to_response('mypage.html', locals())
