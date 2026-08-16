from fastapi import HTTPException
from sqlalchemy.orm import Session

from repositories.user_repository import UserRepository
from schemas.user import UserCreate


class UserService:

    @staticmethod
    def create_user(db: Session, user: UserCreate):

        existing_user = UserRepository.get_by_email(
            db,
            user.email
        )

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already registered."
            )

        return UserRepository.create(
            db,
            user
        )

    @staticmethod
    def get_all_users(db: Session):

        return UserRepository.get_all(db)