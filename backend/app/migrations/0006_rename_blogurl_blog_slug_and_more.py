# Generated by Django 4.1.1 on 2022-11-26 21:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0005_rename_category safe url_blog_blogurl"),
    ]

    operations = [
        migrations.RenameField(
            model_name="blog",
            old_name="blogurl",
            new_name="slug",
        ),
        migrations.RenameField(
            model_name="course",
            old_name="courseurl",
            new_name="slug",
        ),
    ]
