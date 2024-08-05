from pydantic import BaseModel

class Preference(BaseModel):
    id: int
    created_at: str
    name: str
    description: str

class Subscription(BaseModel):
    id: int
    created_at: str
    preference_id: int
    enabled: bool
    user_id: str

class User(BaseModel):
    id: str
    created_at: str
    name: str