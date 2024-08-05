from fastapi import FastAPI
from routers import preferences, subscriptions, users
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
    "http://localhost:3000/"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(preferences.router, prefix="/preferences", tags=["preferences"])
app.include_router(subscriptions.router, prefix="/subscriptions", tags=["subscriptions"])
app.include_router(users.router, prefix="/users", tags=["users"])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
