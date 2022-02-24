# vuengo-todo-list

Vue / Django Todo List app, design by Frontend Mentor

# Process

## Django Setup

1. `virtualenv backend-django` to create the environment we'll be creating the app in
2. Activate the virtual environment, install django, djangorestframework, django-cors-headers.
3. Create the project inside of the virtual environment `django-admin startproject todo_list`.
4. Add `rest_framework` and `corsheaders` to the `INSTALLED_APPS` constant in settings.py, `CORS_ORIGIN_ALLOW_ALL = True`, add local ip address to `ALLOWED_HOSTS`, and `"corsheaders.middleware.CorsMiddleware"` to `MIDDLEWARE` constant.
5. Run `makemigrations`, `migrate`, and `runserver` on the `manage.py` file from commandline.
6. Create superuser `python manage.py createsuperuser`.
7. Create project's first app (for the tasks) `python manage.py startapp task`.
8. Create data model in the app's models.py file, and then add model name to `INSTALLED_APPS`.
9. Set up the serializers - these are processes which allow complex data conversion to native Python data types, to be more easily renderd in JSON or XML. Create a serializers.py file inside the app folder.
10. Set up views.py folder.

## Data

1. Go into `python manage.py shell` and add dummy data:

```
from task.models import Task

task1 = Task.objects.create(description='Task 1')
task2 = Task.objects.create(description='Task 2')
task3 = Task.objects.create(description='Task 3', status=Task.DONE)
tasks = Task.objects.all()
```

This should show you all the relevant tasks.

2. Go to the `urls.py` file in the Project directory, and register the router with your viewset you made in views.py. Make sure `include()` is imported from `django.urls`.
3. By this point you should be able to make dummy api calls from Postman etc to get your tasks object - if this works, set up in Vue frontend!

# Todo

- [ ] Beef up security by replacing `CORS_ORIGIN_ALLOW_ALL` with a whitelisted domain.
- [ ] Go through `task/views.py` line by line and work out what's going on with the different classes I've set and what the "view" does.
- [ ] Move keys etc out of .py files into somewhere more secure. Fine on test projects, but disasterous irl!! Use GitGuardian to find all these occurances.
- [ ] Test `prefers-color-scheme` media query.
