import datetime
from django.template import Context
from django.http import HttpResponse
from django.template.loader import get_template

def hello(request):
    return "hello"

def current_datetime(request):
    now = datetime.datetime.now()
    t = get_template('current_datetime.html')
    html = t.render(Context({'now': now}))
    return HttpResponse(html)
