# Generated by Django 5.1.3 on 2024-11-26 00:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='backendlanguagemodel',
            name='language',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='frameworkmodel',
            name='framework',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='frontendlanguagemodel',
            name='language',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='librariesmodel',
            name='library',
            field=models.CharField(default=3, max_length=50),
            preserve_default=False,
        ),
    ]
