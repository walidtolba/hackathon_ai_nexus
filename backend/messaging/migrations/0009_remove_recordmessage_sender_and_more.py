# Generated by Django 5.1.4 on 2024-12-10 07:32

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("messaging", "0008_session_title"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="recordmessage",
            name="sender",
        ),
        migrations.RemoveField(
            model_name="recordmessage",
            name="session",
        ),
        migrations.RemoveField(
            model_name="session",
            name="patient",
        ),
        migrations.DeleteModel(
            name="Message",
        ),
        migrations.DeleteModel(
            name="RecordMessage",
        ),
        migrations.DeleteModel(
            name="Session",
        ),
    ]
