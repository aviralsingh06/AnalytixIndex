from pydantic import BaseModel, EmailStr
from typing import Optional, List


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    target_role: Optional[str] = "Data Scientist"
    experience_level: Optional[str] = "Entry-Level"


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserDetailResponse"


class PasswordReset(BaseModel):
    email: EmailStr
    new_password: str


class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    phone: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    target_role: Optional[str] = None
    preferred_location: Optional[str] = None
    target_salary_min: Optional[int] = None
    target_salary_max: Optional[int] = None
    highest_degree: Optional[str] = None


class UserDetailResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    target_role: str
    experience_level: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    phone: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    target_salary_min: Optional[int] = 80000
    target_salary_max: Optional[int] = 140000

    class Config:
        from_attributes = True
