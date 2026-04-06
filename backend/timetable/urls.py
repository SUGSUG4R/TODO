from django.urls import path
from . import views

urlpatterns = [
    path('', views.LessonListCreateView.as_view(), name='lesson-list-create'),
    path('<uuid:pk>/', views.LessonRetrieveUpdateDestroyView.as_view(), name='lesson-detail'),
]
