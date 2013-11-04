import datetime
from django.template import Context
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template.loader import get_template

def hello(request):
    #return HttpResponse("path: %s, host: %s, full_path: %s, is_secure: %s" %  (request.path, request.get_host(), request.get_full_path(), request.is_secure()) )
    t = display_meta(request)
    return t

def current_datetime(request):
    now = datetime.datetime.now()
    title = "KKK"
    return render_to_response('mypage.html', locals())

def display_meta(request):
    values = request.META.items()
    values.sort()
    html = []
    for k,v in values:
        html.append('<tr><td>%s</td><td>%s</td></tr>' % (k, v))
    return HttpResponse('<table> %s </table>' %'\n'.join(html))

def search(request):
    if 'q' in request.GET:
        message = 'You searched for: %r' % request.GET['q']
    else:
        message = 'You submitted an empty form.'
    return HttpResponse(message)
