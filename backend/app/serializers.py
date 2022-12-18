from rest_framework import serializers
from .models import Category, Course, CourseChapter, Comment, Reply, Blog


class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "title", "desc"]


class CourseSerializers(serializers.ModelSerializer):
    category = serializers.CharField(read_only=True)
    image = serializers.ImageField(
        required=False, max_length=None, allow_empty_file=True, use_url=True
    )

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "desc",
            "image",
            "score",
            "review",
            "prerequisite",
            "coursetime",
            "courselentgh",
            "price",
            "slug",
            "discount",
            "coursedownload",
            "is_active",
            "category",
            "created_at",
            "updated_at",
        ]


class CourseChapterSerializers(serializers.ModelSerializer):
    class Meta:
        model = CourseChapter
        fields = ["id", "title", "video", "videotime", "is_active", "Course"]
        # def to_representation(self, instance):
        #     data = super(CourseSpecificationSerializers, self).to_representation(instance)
        #     course = data.pop("course")
        #     for key, val in course.items():
        #         data.update({key: val})
        #     return data


class BlogSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(
        required=False, max_length=None, allow_empty_file=True, use_url=True
    )
    
    class Meta:
        model = Blog
        fields = ["id", "title", "desc", "image", "review", "score", "slug", "created_at"]


class CommentSerializers(serializers.ModelSerializer):
    class Meta:
        model = CourseChapter
        fields = ["id", "text", "email", "user", "course", "blog"]


class ReplySerializers(serializers.ModelSerializer):
    class Meta:
        model = CourseChapter
        fields = ["id", "text", "blog", "course", "user"]
