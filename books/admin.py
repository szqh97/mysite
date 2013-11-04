from django.contrib import admin
from books.models import *
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'publisher', 'publication_date')
    list_filter = ('publication_date',)
    date_hierarchy = 'publication_date'
    ordering = ('-publication_date',)

admin.site.register(Publisher)
admin.site.register(Book, BookAdmin)
admin.site.register(Author)
