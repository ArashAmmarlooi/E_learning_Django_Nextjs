# Generated by Django 4.1.1 on 2022-10-12 08:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="course",
            name="price",
        ),
    ]
