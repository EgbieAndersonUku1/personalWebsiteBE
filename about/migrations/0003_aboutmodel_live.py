# Generated by Django 5.1.3 on 2024-11-29 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('about', '0002_alter_aboutmodel_about'),
    ]

    operations = [
        migrations.AddField(
            model_name='aboutmodel',
            name='live',
            field=models.BooleanField(default=False),
        ),
    ]
