from sqlalchemy.orm import Session

from models.user import User
from schemas.user import UserCreate


class UserRepository:

    @staticmethod
    def create(db: Session, user: UserCreate):

        db_user = User(
            full_name=user.full_name,
            email=user.email,
            password=user.password
        )

        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        return db_user

    @staticmethod
    def get_by_email(db: Session, email: str):

        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def get_all(db: Session):

        return db.query(User).all()