# Generated by Django 5.1.4 on 2024-12-10 07:15

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0004_user_phone_user_role"),
    ]

    operations = [
        migrations.AddField(
            model_name="leave",
            name="reason",
            field=models.TextField(default=""),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="user",
            name="companyName",
            field=models.CharField(blank=True, max_length=128),
        ),
        migrations.AddField(
            model_name="user",
            name="leave_days",
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name="absence",
            name="user_profile",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
            preserve_default=False,
        ),
    ]
