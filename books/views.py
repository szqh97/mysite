from django.shortcuts import render_to_response, render
from django.http import HttpResponse, HttpResponseRedirect
from django.core.mail import send_mail
from models import *
from django.views.decorators.csrf import csrf_protect
from django.core.context_processors import csrf
from django.template import RequestContext

def search_form(request):
    return render_to_response('search_form.html')

def display_meta(request):
    values = request.META.items()
    values.sort()
    html = []
    for k,v in values:
        html.append('<tr><td>%s</td><td>%s</td></tr>' % (k, v))
    return HttpResponse('<table> %s </table>' %'\n'.join(html))

def search(request):
    error = False
    if 'q' in request.GET:
        query = request.GET['q']
        if not query:
            error = True
        elif len(query) > 20:
            error = True
        else:
            books = Book.objects.filter(title__icontains = query)
            return render_to_response('search_results.html', locals())
    return render_to_response('search_form.html', locals())

#@csrf_protect
def contact(request):
    errors = []
    if request.method == 'POST':
        if not request.POST.get('subject', ''):
            errors.append('Enter a subject.')
        if not request.POST.get('message', ''):
            errors.append('Enter a message.')
        if request.POST.get('e-mail') and '@' not in request.POST['e-mail']:
            errors.append('Enter a valid e-mail address.')
        if not errors:
            send_mail(
                request.POST['subject'],
                request.POST['message'],
                request.POST.get('e-mail', 'li_yun@163.com'),
                ['szqh97@163.com'],
            )
            return HttpResponseRedirect('/hello/')
            #return HttpResponseRedirect('/hello/')
    return render_to_response('contact_form.html',{'errors': errors})
    #return render(request, 'contact_form.html',{'errors': errors})

