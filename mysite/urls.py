from django.conf.urls import patterns, include, url
from mysite.views import *
from django.contrib import admin
from books import views

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    (r'^hello/$', hello),
    (r'^meta/$', views.display_meta),
    (r'^time/$', current_datetime), 
    (r'^search-form/$', views.search_form),
    (r'^search/$', views.search),
    (r'^contact/$', views.contact),
    # Examples:
    # url(r'^$', 'mysite.views.home', name='home'),
    # url(r'^mysite/', include('mysite.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
