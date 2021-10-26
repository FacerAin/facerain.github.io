---
date: "2021-10-26"
title: "[Tip] FastAPI 서버 CORS 문제 해결하기"
categories: ["Web", "Development", "Tip"]
summary: "FastAPI 서버에서 CORS 문제를 해결하는 알아봅시다."
thumbnail: "./fastapi-cors/th.jpg"
---

틈만 나면 웹 개발자를 괴롭히는 **CORS** 문제, FastAPI에서 간단하게 해결해 봅시다.

## CORS 문제 해결하기

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def main():
    return {"message": "Hello World"}
```

FastAPI에서 **CORS 문제를 해결하기 위한 미들웨어를 제공** 합니다.  
origins 리스트에 서버에 접근을 허용하고자 하는 **origin** 들을 추가하면  
**간편하게 CORS를 해결** 할 수 있습니다.

## Reference

- [https://www.stackhawk.com/blog/configuring-cors-in-fastapi/](https://www.stackhawk.com/blog/configuring-cors-in-fastapi/)
- [https://fastapi.tiangolo.com/tutorial/cors/](https://fastapi.tiangolo.com/tutorial/cors/)
