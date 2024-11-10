from fastapi import APIRouter, Depends, status
from .schemas import UserCreateModel, UserModel, UserLoginModel
from .service import UserService
from src.db.main import get_session
from  sqlmodel.ext.asyncio.session import AsyncSession
from fastapi.exceptions import HTTPException
from .utils import verify_passwd, create_access_token, decode_token
from datetime import timedelta
from fastapi.responses import JSONResponse
from .dependencies import AccessTokenBearer

REFRESH_TOKEN_EXPIRY = 2
auth_router = APIRouter()
user_service = UserService()

@auth_router.post('/signup', response_model=UserModel, status_code=status.HTTP_201_CREATED)
async def create_user_acc(
    user_data: UserCreateModel, 
    session: AsyncSession = Depends(get_session)
    ):

    email = user_data.email
    user_exists = await user_service.user_exist(email, session)

    if user_exists:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User with email already exists")
    
    new_user = await user_service.create_user(user_data, session)

    return new_user

@auth_router.post('/login')
async def login_users(
    login_data: UserLoginModel,
    session: AsyncSession = Depends(get_session)
):
    email = login_data.email
    password = login_data.password

    # Fetch user by email from the database
    user = await user_service.get_user_by_email(email, session)

    # Check if user exists
    if user is not None:
        # Verify if the password is correct
        password_valid = verify_passwd(password, user.password_hash)

        if password_valid:
            # Generate access token and refresh token
            access_token = create_access_token(
                user_data={"email": user.email, "user_uid": str(user.uid)}
            )

            refresh_token = create_access_token(
                user_data={"email": user.email, "user_uid": str(user.uid)},
                refresh=True,
                expiry=timedelta(days=REFRESH_TOKEN_EXPIRY)
            )

            # Prepare response with user data
            response = JSONResponse(
                content={
                    "message": "Login successful",
                    "user": {
                        "email": user.email,
                        "user_uid": str(user.uid),
                        "first_name": user.first_name,  # Add any other fields
                        "last_name": user.last_name,    # Add any other fields
                    }
                }
            )

            # Set tokens in cookies
            response.set_cookie(key="access_token", value=access_token)
            response.set_cookie(key="refresh_token", value=refresh_token)

            return response
        
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Email or Password"
        )

    # If the user doesn't exist
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Email or Password"
    )
