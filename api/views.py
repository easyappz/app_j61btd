from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.utils import timezone
from drf_spectacular.utils import extend_schema

from .models import Member
from .serializers import (
    MessageSerializer,
    RegisterSerializer,
    LoginSerializer,
    MemberSerializer
)
from .authentication import TokenAuthentication


class HelloView(APIView):
    """
    A simple API endpoint that returns a greeting message.
    """

    @extend_schema(
        responses={200: MessageSerializer}, description="Get a hello world message"
    )
    def get(self, request):
        data = {"message": "Hello!", "timestamp": timezone.now()}
        serializer = MessageSerializer(data)
        return Response(serializer.data)


class RegisterView(APIView):
    """
    API endpoint for user registration.
    """

    @extend_schema(
        request=RegisterSerializer,
        responses={
            201: MemberSerializer,
            400: None
        },
        description="Register a new user"
    )
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        
        if serializer.is_valid():
            member = serializer.save()
            member_serializer = MemberSerializer(member)
            
            return Response(
                {
                    "message": "Пользователь успешно зарегистрирован",
                    "user": member_serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """
    API endpoint for user login.
    """

    @extend_schema(
        request=LoginSerializer,
        responses={
            200: None,
            400: None,
            401: None
        },
        description="Login user and return authentication token"
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        
        try:
            member = Member.objects.get(email=email)
        except Member.DoesNotExist:
            return Response(
                {"message": "Неверный email или пароль"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        if not member.check_password(password):
            return Response(
                {"message": "Неверный email или пароль"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Get or create token
        token, created = Token.objects.get_or_create(user_id=member.id)
        
        member_serializer = MemberSerializer(member)
        
        return Response(
            {
                "message": "Успешная авторизация",
                "token": token.key,
                "user": member_serializer.data
            },
            status=status.HTTP_200_OK
        )


class ProfileView(APIView):
    """
    API endpoint for getting user profile.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses={
            200: MemberSerializer,
            401: None
        },
        description="Get current user profile"
    )
    def get(self, request):
        serializer = MemberSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
