from django.contrib import admin

from .models import (
    Category,
    Course,
    CourseChapter,
    Blog,
    Comment,
    Reply,
)

# Register your models here.

admin.site.register(Category)
admin.site.register(Course)
admin.site.register(CourseChapter)
admin.site.register(Blog)
admin.site.register(Comment)
admin.site.register(Reply)
