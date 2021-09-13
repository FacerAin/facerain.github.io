---
date: '2021-09-12'
title: 'Nginx로 FastAPI 배포하기 (Feat. Gunicorn)'
categories: ['Web', 'Development']
summary: 'Nginx와 Gunicorn을 이용하여 FastAPI 서버를 배포하는 방법을 알아봅시다.'
thumbnail: './fastapi-nginx/th.jpg'
---

이번 시간에는 **Nginx**와 **Gunicorn**을 이용하여 제작한 FastAPI 서버를 배포하는 방법을 알아봅시다.  
FastAPI가 처음이신 분들은 [Fast API 10분 튜토리얼 #1) Fast API 시작하기](https://facerain.club/fast-api-tutorial-1/)를 참고해주세요! 

## Nginx는 들어봤는데... Gunicorn은 뭐죠?
개발 환경에서 FastAPI를 구동할 때 주로 **Uvicorn**을 사용했습니다.  
하지만 **Uvicorn은 Single Process로만 동작**하기 때문에 수많은 Request가 발생하는 **Production 환경에서는 한계**가 있습니다.
따라서 **Multi Process를 사용하고 관리할 수 있는 WSGI 서버인 Gunicorn을 이용**하여 서버를 구동합니다.
> Q. 잠깐, Uvicorn은 ASGI 서버 아닌가요? WSGI 서버인 Gunicorn으로 Production하면 ASGI 서버를 쓴 이유가 없어지지 않나요?  
> A. Uvicorn에서 Gunicorn worker class를 제공합니다. 따라서 Gunicorn의 장점인 Multi Process 관리와 Uvicorn의 장점인 강력한 성능 이점을 모두 활용하여 ASGI 서버를 구동할 수 있습니다. 

## Gunicorn 시작하기
**Gunicorn을 설치**하는 명령어는 아래와 같습니다.
```shell
pip install gunicorn
```

설치가 완료되었으면, **Gunicorn(+uvicorn)으로 서버를 구동**해봅시다.  
아래 명령어를 fast api 프로젝트 폴더에서 실행해주세요.
```shell
gunicorn -k uvicorn.workers.UvicornWorker --access-logfile ./gunicorn-access.log main:app --bind 0.0.0.0:8000 --workers 2 --daemon
```
#### 옵션 설명
- -k uvicorn.workers.UvicornWorker: Uvicorn worker 클래스를 사용합니다.
- --access-logfile ./gunicorn-access.log: Gunicorn **로그 파일을 기록**합니다.
- main:app: main.py의 app을 실행합니다.
- -workers 2: worker process의 개수를 설정합니다. 통상 **CPU 코어 개수 * 2**로 설정합니다!
- --daemon: Gunicorn을 **백그라운드 데몬 상에서 구동**합니다.
- --bind 0.0.0.0:8000: **8000 포트에 서버를 연결**합니다. 예를 들어 8000포트로 bind 한다면  사용자는 <서버주소>:8000으로 서버에 접속이 가능합니다.

Gunicorn이 **정상적으로 실행되었는지 확인**해봅시다. 아래 명령어를 입력해주세요.
master process 한개와 worker process가 설정한 개수만큼 잘 나오시나요? 
```
ps -ef | grep gunicorn
```  

그리고 <서버주소>:8000/docs로 **fastapi 서버에 정상적으로 접속이 되는지 확인**해봅시다.


## Nginx 설정하기
이제 **Gunicorn 서버와 Nginx를 연동**하겠습니다.  
우선 **Nginx를 설치**해줍니다.
```shell
sudo apt-get install nginx
``` 
다음으로 **Nginx config 파일을 작성**합니다.  
**/etc/nginx/sites-available 경로에 fastapi.conf 파일을 생성**해주세요.
```shell
sudo nano /etc/nginx/sites-available/fastapi.conf
```
fastapi.conf에는 아래와 같은 내용을 입력해주세요.  
이때 server_name에는 자신의 **서버 주소 혹은 도메인 주소를 입력**해 주시면 됩니다. (Ex. facerain.club)
```shell
server{
       server_name yourdomain.com;
       location / {
           include proxy_params;
           proxy_pass http://127.0.0.1:8000;
       }
}
```

sites-available의 fastapi.conf 파일을 **sites-enable에 심볼릭 링크를 생성**해줍니다.
```shell
sudo ln -s /etc/nginx/sites-available/fastapi.conf /etc/nginx/sites-enable/fastapi.conf 
```

> Q. 왜 sites-available의 fastapi.conf를 sites-enable에 심볼릭 링크를 생성하나요?  
> A. Nginx에서 sites-available 내의 여러 설정 파일 중에서 실제로 서버로 구동하고 싶은 파일은 sites-enable로 옮겨주여야 합니다. 이때 심볼릭 링크를 사용하면 편하게 설정 파일을 복사해서 옮길 수 있습니다.

Nginx를 재시작하기 전에 설정 파일이 제대로 작성되었는지 확인하기 위해 **Nginx 테스트를 해줍니다.**
```shell
nginx -t
```
위 테스트를 성공하셨다면 변경 사항을 적용하기 위해 **Nginx를 재시작**합니다.  
만약 **테스트에 실패**하셨다면 아래 두가지 사항을 점검해주세요!
1. .conf 파일 내 오타 혹은 문법 오류
2. 심볼릭 파일 생성 오류 (vi나 nano를 이용하여 sites-enable 내 fastapi.conf 파일을 직접 열어보세요!)
```shell
sudo systemctl restart nginx
```

한번 yourdomain.com/docs으로 서버가 정상적으로 작동하는지 접속해보세요!  
접속이 잘 된다면 성공입니다!

## 맺으며
이번 시간에는 **Nginx**와 **Gunicorn**을 이용하여 제작한 **FastAPI 서버를 배포**하는 방법을 알아보았습니다. 이전에 Nginx로 React나 Django 서비스를 배포해보셨다면 과정이 비슷해서 크게 어려운 점이 없으셨을겁니다. **서버 개발만큼이나 중요한 것이 서버 배포와 관리입니다.** 이번 기회에 Nginx와 Gunicorn을 잘 다룰 수 있도록 익힌다면 서버 운용에 큰 도움이 되실겁니다! 잘 안되시거나 궁금한 점은 언제나 댓글 남겨주세요. 감사합니다 :)



## Reference
- [https://chacha95.github.io/2021-01-17-python6.5/](https://chacha95.github.io/2021-01-17-python6.5/)
- [https://roseline.oopy.io/dev/gunicorn-nginx-fastapi-deploy-on-lightsail](https://roseline.oopy.io/dev/gunicorn-nginx-fastapi-deploy-on-lightsail)
- [https://ossian.tistory.com/110](https://ossian.tistory.com/110)
- [http://hell0-world.com/architecture/2020/05/10/gunicorn.html](http://hell0-world.com/architecture/2020/05/10/gunicorn.html)
- [https://dingrr.com/blog/post/ubuntu%EB%A1%9C-django-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C-gunicorn-%EC%84%9C%EB%B9%84%EC%8A%A4-%EC%86%8C%EC%BC%93-%EC%83%9D%EC%84%B1](https://dingrr.com/blog/post/ubuntu%EB%A1%9C-django-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C-gunicorn-%EC%84%9C%EB%B9%84%EC%8A%A4-%EC%86%8C%EC%BC%93-%EC%83%9D%EC%84%B1)
- [https://martinnoh.tistory.com/entry/Gunicorn](https://martinnoh.tistory.com/entry/Gunicorn)