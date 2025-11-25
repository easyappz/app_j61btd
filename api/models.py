from django.db import models
from django.contrib.auth.hashers import make_password, check_password


class Member(models.Model):
    """
    Custom user model for application users.
    """
    email = models.EmailField(unique=True, max_length=255)
    password = models.CharField(max_length=128)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'members'
        verbose_name = 'Member'
        verbose_name_plural = 'Members'

    def __str__(self):
        return self.email

    def set_password(self, raw_password):
        """Hash and set the password."""
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        """Check if the provided password matches the stored hash."""
        return check_password(raw_password, self.password)

    # Required properties for DRF authentication
    @property
    def is_authenticated(self):
        """Always return True for authenticated users."""
        return True

    @property
    def is_anonymous(self):
        """Always return False for authenticated users."""
        return False

    def has_perm(self, perm, obj=None):
        """Check if user has a specific permission."""
        return True

    def has_module_perms(self, app_label):
        """Check if user has permissions to view the app."""
        return True
