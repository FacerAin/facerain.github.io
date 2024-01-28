---
isTIL: false
date: "2024-01-28"
title: "Spring에서 In-Memory H2 데이터베이스 사용하기"
categories: ["Tip", "Development", "Spring"]
summary: "Spring에서 In-Memory H2 데이터베이스를 사용하는 방법을 알아봅니다."
thumbnail: "./spring-in-memory-h2/th.jpg"
---

이번 시간에는 Spring boot 프로젝트에서 In-memory h2 database를 사용하는 방법에 대해 알아보겠습니다.  

## In-memory DB가 왜 필요할까요?
Spring 프로젝트를 진행하다보면 **데이터베이스와 연동**하여 서비스를 개발하고 테스트하는 일이 잦습니다. 하지만 프로젝트와 연동하는 데이터베이스를 구축하고 연동하는게 사실 그리 만만한 작업이 아닙니다.  

특히 Github Action 등을 활용하여 원격 worker에서 빌드 및 테스트를 실행하는 경우, 데이터베이스를 연결하는 작업이 까다롭습니다.

이러한 경우에 **In-Memory h2 Database**를 유용하게 활용할 수 있습니다.  
이를 사용하면 다음과 같은 장점이 있습니다.

1. **매우 간편한 setup**
   - 별도의 db 설치 및 설정 없이 의존성을 추가해주는 것만으로 사용이 가능합니다.
2. **실제 서비스 영향 X**
   - 실제 서비스에 사용되는 DB에 연결하는 것이 아닌 메모리 상에 임시로 DB를 사용하므로 실제 서비스에 영향이 가지 않습니다.
3. **가볍고 빠른 성능**
   -  안그래도 가벼운 h2 데이터베이스를 in-memory 상에 올려 구동하므로 기존 db보다 훨씬 빠르게 데이터를 처리할 수 있습니다.


## 설정하는 방법
설정하는 방법은 매우 간단합니다.  
우선 h2 의존성을 추가해줍니다. (gradle 기준 `build.gradle`)
```
 testImplementation 'org.springframework.boot:spring-boot-starter-test'
 testRuntimeOnly 'com.h2database:h2'
```

그리고 `application-test.yml`을 작성하여, h2 db 환경을 설정합니다. `jdbc:h2:mem:test`에서 mem을 통해 in-memory 사용을 설정할 수 있습니다.
```
spring:
  datasource :
    url: jdbc:h2:mem:test
    driverClassName: org.h2.Driver
    username: sa
    password:

  jpa:
    hibernate:
      ddl-auto: create-drop
    database-platform: org.hibernate.dialect.H2Dialect
```

이제 자동으로 test profile을 실행할 때 자동으로 in-memory h2 db를 사용할 수 있습니다!  

만약 테스트를 수행할 때 test profile을 사용하고 싶다면 `@TestPropertySource`을 이용할 수 있습니다.

```
@TestPropertySource(locations = "classpath:application-test.yml")
public class ApplicationTest {
    ...
```

## 유의 사항
h2 database는 mysql과 달리 `user`가 예약어로 지정되어 있습니다. 따라서 프로젝트 내에 `user`라는 이름의 테이블을 사용하고 있다면 에러가 발생합니다.  

이를 해결하기 위한 방법이 2가지 존재합니다.

1. table 이름에 user를 사용하지 말기
```
@Table(name= "member") 
//before: @Table(name= "user") 
...
```

2. user 예약어 회피 설정  
앞서 application-test.yml에 `;NON_KEYWORDS=USER` 구문을 추가합니다.
```
spring:
  datasource:
    url: jdbc:h2:mem:test;NON_KEYWORDS=USER
...
```

## Reference
[H2 Database를 활용해 In-memory Database 사용하기](https://kkkdh.tistory.com/entry/H2-in-memory-DB%EB%A1%9C-h2-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95  )

[[Test Code] 테스트 DB의 In-Memory H2와 로컬 MySQL 속도 차이 비교하기](https://velog.io/@da_na/Test-Code-%ED%85%8C%EC%8A%A4%ED%8A%B8-DB%EC%9D%98-In-Memory-H2%EC%99%80-%EB%A1%9C%EC%BB%AC-MySQL-%EC%86%8D%EB%8F%84-%EC%B0%A8%EC%9D%B4-%EB%B9%84%EA%B5%90%ED%95%98%EA%B8%B0-vfzyjhy5#%EC%86%8D%EB%8F%84-%EC%B0%A8%EC%9D%B4%EA%B0%80-%EB%82%98%EB%8A%94-%EC%9D%B4%EC%9C%A0--)
