# Generated by Django 5.1.3 on 2024-11-29 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0007_alter_projectmodel_have_website_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectmodel',
            name='have_website',
            field=models.CharField(choices=[('y', 'Yes'), ('n', 'No'), ('b', 'Both')], default='n', max_length=4, verbose_name='Has Website'),
        ),
    ]
