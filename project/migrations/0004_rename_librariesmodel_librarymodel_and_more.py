# Generated by Django 5.1.3 on 2024-11-26 01:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0003_rename_modified_at_projectmodel_modified_on_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='LibrariesModel',
            new_name='LibraryModel',
        ),
        migrations.AlterModelOptions(
            name='librarymodel',
            options={'verbose_name': 'LibraryModel', 'verbose_name_plural': 'LibrariesModel'},
        ),
    ]
