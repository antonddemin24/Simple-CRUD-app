from fastapi import Header, HTTPException
from config import API_URL, API_KEY


def verify_token(authorization: str = Header(...)):
    if authorization != f"Bearer {API_KEY}":
        raise HTTPException(status_code=403, detail="Invalid token")

    return API_KEY