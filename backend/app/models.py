from asyncio.windows_events import NULL
from django.conf import settings
from django.db import models
from django.urls import reverse
from django.utils import timezone
import datetime


class Category(models.Model):
    title = models.CharField(max_length=50, name="title")
    desc = models.TextField(max_length=700)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Category"

    def get_absolute_url(self):
        return reverse("store:Category_list", args=[self.slug])


class Course(models.Model):
    title = models.CharField(max_length=50, name="title", null=True, blank=True)
    desc = models.TextField(max_length=800, name="desc", null=True, blank=True)
    image = models.ImageField(upload_to="images/", null=True)
    slug = models.SlugField(
        name="slug",
        max_length=100,
        unique=True,
        null=True,
        allow_unicode=True,
    )
    score = models.CharField(max_length=50, name="score", null=True, blank=True)
    review = models.CharField(max_length=50, name="review", null=True, blank=True)
    prerequisite = models.CharField(max_length=50, name="prerequisite", blank=True)
    coursetime = models.CharField(
        max_length=50, name="coursetime", null=True, blank=True
    )
    courselentgh = models.CharField(
        max_length=50, name="courselentgh", null=True, blank=True
    )
    price = models.CharField(max_length=50, blank=True, null=True)
    coursedownload = models.CharField(
        max_length=50, name="coursedownload", null=True, blank=True
    )
    discount = models.CharField(
        max_length=50, name="discount", null=True, blank=True
    )
    is_active = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.RESTRICT, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Course"

    def get_absolute_url(self):
        return reverse("store:Course", args=[self.slug])


class CourseChapter(models.Model):
    title = models.CharField(max_length=50, name="title")
    video = models.FileField(upload_to="videos_uploaded", null=True)
    videotime = models.CharField(max_length=50, name="videotime")
    is_active = models.BooleanField(default=True)
    course = models.ForeignKey(Course, on_delete=models.RESTRICT, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "CourseChapter"


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.RESTRICT)
    course = models.ForeignKey(Course, on_delete=models.RESTRICT, null=True)
    date = models.DateTimeField()
    total = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


def __str__(self):
    return self.Course


class Meta:
    verbose_name_plural = "Order"


class Blog(models.Model):
    title = models.CharField(max_length=50, name="title")
    desc = models.TextField(max_length=700)
    image = models.ImageField(upload_to="images/", null=True, blank=True)
    review = models.CharField(max_length=50, name="review", null=True, blank=True)
    score = models.CharField(max_length=50, name="score", null=True, blank=True)
    slug = models.SlugField(
        name="slug",
        max_length=100,
        unique=True,
        null=True,
        allow_unicode=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Blog"

    def get_absolute_url(self):
        return reverse("store:blog_list", args=[self.slug])


class Comment(models.Model):
    text = models.TextField(max_length=700)
    email = models.CharField(max_length=50, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.RESTRICT)
    course = models.ForeignKey(Course, on_delete=models.RESTRICT, null=True)
    blog = models.ForeignKey(Blog, on_delete=models.RESTRICT, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.text

    class Meta:
        verbose_name_plural = "Comment"


class Reply(models.Model):
    text = models.TextField(max_length=200)
    course = models.ForeignKey(Course, on_delete=models.RESTRICT, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.RESTRICT)
    blog = models.ForeignKey(Blog, on_delete=models.RESTRICT, null=True)
    comment = models.ForeignKey(Comment, on_delete=models.RESTRICT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.text

    class Meta:
        verbose_name_plural = "Reply"
