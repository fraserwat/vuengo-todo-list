from django.db import models


class Task(models.Model):
    TODO = "todo"
    DONE = "done"

    STATUS_CHOCIES = ((TODO, "Todo"), (DONE, "Done"))

    description = models.CharField(max_length=255)
    status = models.CharField(max_length=10, choices=STATUS_CHOCIES, default=TODO)
