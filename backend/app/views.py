from django.http import HttpResponse, Http404
from rest_framework.authentication import TokenAuthentication
from .models import Category, Course, CourseChapter, Blog
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.contrib.auth.models import User
from .serializers import (
    CategorySerializers,
    CourseSerializers,
    CourseChapterSerializers,
    BlogSerializer,
)
from rest_framework import permissions, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response


class CategoryList(APIView):
    permission_classes = (permissions.AllowAny,)
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [TokenAuthentication]
    def get(self, request, format=None):
        category = Category.objects.all()
        serializer = CategorySerializers(category, many=True)
        return Response(serializer.data)


class CourseList(APIView):
    permission_classes = (permissions.AllowAny,)
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        course = Course.objects.all()
        serializer = CourseSerializers(course, many=True, context={"request": request})
        return Response(serializer.data)


class CourseDetail(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    permission_classes = (permissions.AllowAny,)
    def get_object(self, name):
        try:
            return Course.objects.filter(slug=name)
        except Course.DoesNotExist:
            raise Http404

    def get(self, request,name, format=None):
        course = self.get_object(name)
        serializer = CourseSerializers(course, many=True, context={"request": request})
        return Response(serializer.data)


class BlogList(APIView):
    permission_classes = (permissions.AllowAny,)
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        course = Blog.objects.all()
        # context for get image url
        serializer = BlogSerializer(course, many=True, context={"request": request})
        return Response(serializer.data)


class BlogDetail(APIView):
    # permission_classes = [IsAuthenticated]
    permission_classes = (permissions.AllowAny,)
    def get_object(self, name):
        try:
            return Blog.objects.filter(slug=name)
        except Course.DoesNotExist:
            raise Http404

    def get(self, request,name, format=None):
        course = self.get_object(name)
        serializer = BlogSerializer(course, many=True, context={"request": request})
        return Response(serializer.data)

# class ListUsers(APIView):
#     # authentication_classes = [authentication.TokenAuthentication]
#     permission_classes = [IsAuthenticated]

#     def get(self, request, format=None):

#         usernames = [user.username for user in User.objects.all()]
#         return Response(usernames)
