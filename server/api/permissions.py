from rest_framework import permissions

class CustomPermissions(permissions.BasePermission):        

    def has_permission(self, request, view):
        # Allow everything if user is superuser
        if request.user and request.user.is_authenticated:
            if request.user.is_superuser:
                return True

            if (request.method == 'POST' or 
                request.method == 'PUT' or 
                request.method == 'DELETE'
            ):
                return False
            return True
        return False