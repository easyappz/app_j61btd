from rest_framework.authentication import TokenAuthentication as BaseTokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework import exceptions
from .models import Member


class TokenAuthentication(BaseTokenAuthentication):
    """
    Custom token authentication that works with Member model.
    """
    keyword = 'Token'

    def authenticate_credentials(self, key):
        """
        Authenticate the token and return the user (Member).
        """
        try:
            token = Token.objects.select_related('user').get(key=key)
        except Token.DoesNotExist:
            raise exceptions.AuthenticationFailed('Недействительный токен')

        try:
            member = Member.objects.get(id=token.user_id)
        except Member.DoesNotExist:
            raise exceptions.AuthenticationFailed('Пользователь не найден')

        return (member, token)
