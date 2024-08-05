from fastapi import APIRouter, HTTPException, Depends
import httpx
from models.schemas import Preference
from config import API_URL, API_KEY
from pydantic import BaseModel
from dependencies import verify_token

router = APIRouter()

class PreferenceCreate(BaseModel):
    name: str
    description: str

class PreferenceUpdate(BaseModel):
    description: str

async def get_client():
    async with httpx.AsyncClient() as client:
        yield client

@router.get("/", response_model=list[Preference])
async def get_preferences(client: httpx.AsyncClient = Depends(get_client), token: str = Depends(verify_token)):
    headers = {
        "apikey": token,
        "Authorization": f"Bearer {token}"
    }
    response = await client.get(f"{API_URL}/preferences?select=*", headers=headers)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@router.post("/", response_model=None)
async def create_preference(preference: PreferenceCreate, client: httpx.AsyncClient = Depends(get_client), token: str = Depends(verify_token)):
    headers = {
        "apikey": token,
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }
    response = await client.post(
        f"{API_URL}/preferences",
        headers=headers,
        json=preference.dict()
    )
    if response.status_code != 201:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    
@router.delete("/{id_column_value}", response_model=None)
async def delete_preference(id_column_value: int, client: httpx.AsyncClient = Depends(get_client), token: str = Depends(verify_token)):
    headers = {
        "apikey": token,
        "Authorization": f"Bearer {token}"
    }
    response = await client.delete(
        f"{API_URL}/preferences?id=eq.{id_column_value}",
        headers=headers
    )
    if response.status_code != 204:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    
@router.patch("/{id_column_value}", response_model=None)
async def update_preference(id_column_value: int, preference: PreferenceUpdate, client: httpx.AsyncClient = Depends(get_client), token: str = Depends(verify_token)):
    headers = {
        "apikey": token,
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }
    response = await client.patch(
        f"{API_URL}/preferences?id=eq.{id_column_value}",
        headers=headers,
        json=preference.dict()
    )
    if response.status_code != 204:
        raise HTTPException(status_code=response.status_code, detail=response.text)