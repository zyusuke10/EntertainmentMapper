# Generated by Django 3.1.3 on 2022-08-25 19:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_auto_20220825_1906'),
    ]

    operations = [
        migrations.RenameField(
            model_name='favoritespot',
            old_name='spot_id',
            new_name='spot',
        ),
        migrations.RenameField(
            model_name='favoritespot',
            old_name='user_id',
            new_name='user',
        ),
    ]