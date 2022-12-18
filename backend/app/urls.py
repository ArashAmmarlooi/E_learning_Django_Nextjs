from django.urls import path, re_path
from . import views

app_name = "app"

urlpatterns = [
    path("api/v1/category", views.CategoryList.as_view()),
    path("api/v1/courses", views.CourseList.as_view()),
    re_path(r'api/v1/course/(?P<name>[-\w]+)/', views.CourseDetail.as_view()),
    path("api/v1/blogs", views.BlogList.as_view()),
    path("api/v1/blog/<str:name>", views.BlogDetail.as_view()),
    
]
