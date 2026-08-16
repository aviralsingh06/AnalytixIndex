from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db.dependencies import get_db
from schemas.user import UserCreate, UserResponse
from services.user_service import UserService

router = APIRouter()


@router.post(
    "/users",
    response_model=UserResponse,
    status_code=201,
)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    return UserService.create_user(db, user)


@router.get(
    "/users",
    response_model=list[UserResponse],
)
def get_users(
    db: Session = Depends(get_db),
):
    return UserService.get_all_users(db)