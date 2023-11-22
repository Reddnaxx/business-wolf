from rest_framework import permissions
from course.models import UserCourse, Modules, Courses, Lessons


class CoursePermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        return (request.method in permissions.SAFE_METHODS and
                obj.id in UserCourse.objects.filter(user_id=request.user.id).values_list("course_id", flat=True))


class UserCoursePermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        return request.method in permissions.SAFE_METHODS and request.user.id == obj.user_id


class ModulesPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        return (request.method in permissions.SAFE_METHODS and obj.id in
                Modules.objects.filter(course_id__in=Courses.objects.filter(
                    course_id__in=UserCourse.objects.filter(user_id=request.user.id).values_list("course_id", flat=True))))


class LessonsPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        return (request.method in permissions.SAFE_METHODS
                and obj.module_id in Modules.objects.filter(
                        course_id__in=Courses.objects.filter(
                            course_id__in=UserCourse.objects.filter(user_id=request.user.id)
                            .values_list("course_id", flat=True))).values_list("id", flat=True))


class CompletedTestsPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        return (request.method in permissions.SAFE_METHODS
                and obj.user_id == request.user.id)

