from fastapi import APIRouter, HTTPException, Depends
import httpx
from models.schemas import User
from config import API_URL, API_KEY
from dependencies import verify_token


router = APIRouter()

async def get_client():
    async with httpx.AsyncClient() as client:
        yield client

@router.get("/", response_model=list[User])
async def get_users(client: httpx.AsyncClient = Depends(get_client), token: str = Depends(verify_token)):
    headers = {
        "apikey": token,
        "Authorization": f"Bearer {token}"
    }
    response = await client.get(f"{API_URL}/users?select=*", headers=headers)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()