---
date: '2021-09-11'
title: '[Tip] Ubuntu 20.04 Swap 메모리 설정하기'
categories: ['Tip', 'Development']
summary: 'Ubuntu 20.04에서 Swap 메모리를 설정하는 방법을 알아봅시다.'
thumbnail: './swap-memory/th.jpg'
---

이번 시간에는 Ubuntu 20.04에서 Swap 메모리를 설정하는 방법을 알아봅시다.


## Swap Memory가 뭐죠?
**Swap Memory**란 하드디스크의 일부 용량을 RAM처럼 사용할 수 있게 하는 방법입니다.
즉, 시스템에 **RAM 용량이 부족해도 하드디스크를 활용하여 프로그램을 계속 실행**시킬 수 있습니다.  

예를 들어 A라는 컴퓨터에 설치된 **RAM 용량이 2GB**라고 가정해봅시다.
A 컴퓨터에는 **서버 프로그램을 구동하고자 하는데 필요한 RAM 용량이 3GB**입니다. 서버를 구동하기 위해서 **1GB의 RAM이 부족한 상황입니다.**

이때 A에 2GB의 Swap Memory를 설정하면, 하드 디스크에서 2GB를 Swap Memory로 할당하고 A는 **총 4GB(실제 RAM 2GB + Swap Memory 2GB)의 메모리로 무난하게 서버 프로그램을 구동**시킬 수 있는 것이죠. (와!)

> Q. 엇 그럼 RAM을 추가로 살 필요 없이 Swap Memory만 무한히 늘려주면 되겠네요?  
> A. Swap Memory에는 크게 두 가지 단점이 존재합니다. 첫 번째로 하드디스크는 RAM에 비해 읽기/쓰기 속도가 현저히 느립니다. 따라서 Swap Memory를 과도하게 사용하면 **컴퓨터가 현저히 느려질 수 있습니다.** 두 번째로 Swap Memory는 읽기/쓰기 작업이 많이 발생하는데, 이는 **하드디스크의 수명을 크게 줄일 수 있습니다.** 따라서 메모리가 부족할 일이 크게 없다면 Swap Memory를 사용하지 않는 것이 바람직합니다.  

## 그렇다면 Swap Memory를 언제 사용하면 좋을까요?
당연하게도 **RAM이 부족할 때 Swap Memory를 적절하게 사용**하면 됩니다!  
특히 요즘 토이 프로젝트로 가상 인스턴스(AWS EC2, Vultr 등)로 웹 서버를 구동합니다.
여기서 저렴한 플랜의 경우 RAM이 부족할 때가 있는데, **인스턴스 사양을 올리자니 가격이 부담**되는 경우가 많이 있습니다.  
필자가 사용하고 있는 Vultr의 경우에도 월 5달러 플랜에 1GB의 RAM을 지원하지만, 2GB의 RAM을 사용하려면 두 배의 가격인 월 10달러 플랜을 사용하여야 합니다.  
서버 구동 중 **RAM이 부족하다면 중간에 프로세스가 강제로 종료되거나 처리가 굉장히 느려질 수 있는데,** 이런 경우에 **Swap Memory를 활용하면** RAM이 부족한 상황을 **큰 비용을 들이지 않고 대처할 수 있습니다.**

## Swap Memory를 사용해봅시다!  

본격적으로 **Ubuntu 20.04 기준으로 Swap Memory를 사용하는 방법**에 대해 알아봅시다.  
진행하기 전에 **하드디스크에 Swap 메모리를 설정할 수 있는 충분한 용량이 있는지 확인**하여야 합니다.  
**하드디스크 용량을 확인하는 명령어**는 아래와 같습니다.  
```shell
df -h
```  

**free 명령어로 현재 사용하고 있는 메모리와 Swap 메모리를 확인**할 수 있습니다.  
만약 Swap 영역이 보이지 않거나 0이라면 Swap 메모리가 설정되지 않은 상태입니다.  
```shell
free
```

Ubuntu에서는 **Swapfile을 이용하여 Swap 메모리를 설정**할 수 있습니다.  
**Swapfile을 생성하는 방법**은 아래와 같습니다.  
아래 명령어는 swapfile이라는 이름으로 2GB의 Swapfile을 생성합니다.  

```
sudo fallocate -l 2G /swapfile
```

> Q. Swap 메모리는 어느 정도로 설정하는 것이 좋나요?  
> A. 통상 **RAM 크기의 2배로 설정하는 것**을 추천합니다. 예를 들어 RAM 용량이 1GB라면 Swap 메모리는 2GB로 설정하면 됩니다! 


다음으로 생성한 **Swapfile의 권한을 수정**해줍니다. 600은 root 계정만 읽기/쓰기가 가능하다는 의미입니다.
```shell
chmod 600 /swapfile
```

이제 생성한 Swapfile로 **Swap Memory를 활성화**해봅시다.
```shell
sudo mkswap /swapfile
sudo swapon /swapfile
```

마지막으로 **시스템을 재부팅해도 Swap이 적용되도록** 합니다.
아래 파일을 텍스트 에디터로 열어주세요.
```shell
sudo nano /etc/fstab
```
그리고 아래 내용을 추가해주세요.
```shell
/swapfile swap swap defaults 0 0
```

**free 명령어**로 Swap Memory가 잘 할당되었는지 확인해봅시다.
```shell
free
```  

Swap에 값이 잘 할당되어 있다면 성공입니다!

## 맺으며
이번 시간에는 Ubuntu 20.04에서 Swap 메모리를 설정하는 방법에 대해 알아보았습니다.  
가상 인스턴스에서 서버를 구동할 때 유용한 기능으로, Ubuntu 뿐만 아니라 Debian, CentOS 등 리눅스 계열을 비롯한 Windows에서도 Swap Memory를 설정할 수 있습니다. 적절하게 Swap Memory를 사용한다면 효율적으로 시스템을 구축할 수 있으니 알아두시면 도움이 됩니다! 감사합니다 😊 




## Reference
-[https://aroundck.tistory.com/2659](https://aroundck.tistory.com/2659)  
-[https://sergeswin.com/1034/](https://sergeswin.com/1034/)

