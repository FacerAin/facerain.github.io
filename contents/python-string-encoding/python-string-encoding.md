---
isTIL: false
date: "2023-05-07"
title: "파이썬 문자열 인코딩 파헤치기"
categories: ["Tip", "Development"]
summary: "파이썬 문자열 인코딩 방식을 파헤쳐봅니다."
thumbnail: "th.jpg"
---

### 들어가며,
어느날 우연히 파이썬의 문자열 인코딩 방식에 호기심이 생겨 간단한 실험을 해보았습니다.  
아래와 같이 한글과 영어가 혼합된 문자열이 있을 때 파이썬은 문자열 크기는 어떻게 될까요?

```python
import sys

eng = "abcdefg"
kor = "가나다라마바사"
mix = "abcd마바사"


print(sys.getsizeof(eng))  # 56 byte
print(sys.getsizeof(kor))  # 88 byte
print(sys.getsizeof(mix))  # ?
```

영어는 1바이트, 한글은 2바이트 정도로 계산을 하므로, **영어와 한글이 혼합된 문자열의 크기는 56바이트와 88바이트 사이 어딘가일 것**이라 예상했습니다.  
하지만 **정답은 88byte**가 나왔습니다.

### 왜 이런 일이 발생했을까요?
결론적으로 파이썬은 **고정 인코딩 방식**을 사용하기 때문입니다.  
파이썬은 고정 인코딩 방식을 아래와 같이 활용합니다.
- 만약 문자열이 ASCII 범위 내에 있다면 Latin-1 인코딩 (고정 **1바이트** 인코딩)
- 이외 대부분의 문자열 (한글, 한자 포함)은 UCS-2 인코딩 (고정 **2바이트** 인코딩)
- 이외 이모티콘, 희귀 문자 포함은 USC-4 인코딩 (고정 **4바이트** 인코딩)  

따라서 `abcd마바사`라는 문자열은 한글이 포함되어 있어 고정 2바이트로 인코딩 된 것이죠.

### 문자열 인코딩 들여다보기
개발을 하다보면 문자열 관련하여 문자열 인코딩, UTF-8, 유니코드 등의 용어를 많이 들을 수 있습니다.  
하지만 가끔 파일을 열 때 문자열이 깨진다면 `encoding="utf-8"`을 단순히 적용하고 넘어가는 등 크게 관심을 안가지는 경우가 많습니다.  
따라서 **이번 기회에 문자열 인코딩과 관련된 이야기를 정리**해보고자 합니다.  
시작하기에 앞서 [문자열 인코딩 완벽 정복하기 (for 개발자)](https://redisle.tistory.com/14)에도 문자열 인코딩에 대한 이야기가 아주 잘 정리되어 있으니 한번 참고해보시는 것을 추천드립니다!

### 문자열 인코딩을 왜 써야할까?
**컴퓨터는 기본적으로 숫자만을 이해**할 수 있습니다. 따라서 우리가 사용하는 문자를 컴퓨터에서 사용하려면 적절한 숫자로 변환을 할 수 있어야하죠. 이 과정을 우리는 **문자열 인코딩**이라고 부릅니다.  

가장 대표적인 예시로 **ASCII(American Standard Code for Information Interchange) 코드**가 있습니다. 7비트를 사용하여 A는 65, a는 97 등으로 128가지의 숫자로 문자를 표현하는 방식이죠.  

(여담으로 기존 7비트에서 **8비트로 표현을 확장한 인코딩 방식이 ANSI** 코드 입니다.)

![아스키 코드 표](1.jpg "아스키 코드 표 출처: https://www.alpharithms.com/ascii-table-512119/")

하지만 ASCII 코드 방식에는 **치명적인 단점**이 있습니다.  
바로 7비트라는 한정된 공간에 문자를 표현해야하다보니 **기본적인 기호와 알파뱃 이외의 한글이나 한자, 이모티콘 등은 표현을 할 수 없는 것**이죠.  

### 유니코드의 등장
위와 같은 문제를 해결하고자 **2~4바이트의 공간에 여유 있게 다국어 문자를 표현할 수 있는 유니코드**가 등장하게 됩니다.  
실제로 유니코드는 약 백만자가 넘는 문자를 충분히 표현할 수 있다고 합니다.

하지만 유니코드 방식에도 **한 가지 문제점**이 있습니다.  
바로 알파뱃과 같이 기존 1바이트로 표현가능한 문자들도 **고정적으로 2바이트 이상을 써야**해서 **메모리를 비효율적**으로 사용한다는 단점이 있습니다.

### 가변 문자열 인코딩의 등장
앞서 유니코드는 알파뱃과 같은 1바이트로 표현 가능한 문자들도 고정적으로 2~4바이트로 표현해야한다는 문제가 있었습니다.  
이를 해결하고자 **가변 문자열 인코딩 방식**이 등장합니다.  
예를 들어 알파뱃은 1바이트, 한글, 한자는 2바이트로 표현하는 방식이죠.  
그리고 가변 문자열 인코딩 방식의 가장 대표적인 예가 바로 자주 들어보셨을 **UTF-8**입니다.  
이를 통해 컴퓨터는 메모리를 절약함과 동시에 다양한 문자를 표현할 수 있는 것이죠.

### 파이썬으로 돌아와서
그렇다고 파이썬에서 내부적으로 UTF-8을 사용하는 것은 아닙니다. (...?)  
왜냐하면 UTF-8과 같은 **가변 문자열 인코딩 방식은 인덱싱을 통한 개별 문자 접근이 어렵기 때문**입니다.  
따라서 파이썬에서는 가변 문자열 인코딩 방식이 아닌 위에서 소개한 **고정 인코딩 방식**을 사용하는 것이죠.
- 만약 문자열이 ASCII 범위 내에 있다면 Latin-1 인코딩 (고정 **1바이트** 인코딩)
- 이외 대부분의 문자열 (한글, 한자 포함)은 UCS-2 인코딩 (고정 **2바이트** 인코딩)
- 이외 이모티콘, 희귀 문자 포함은 USC-4 인코딩 (고정 **4바이트** 인코딩)  

이와 같은 이유로  **`abcd마바사`라는 문자열은 고정 2바이트 모든 문자가 2바이트로 인코딩되어**

`가나라다마바사`라는 문자열의 크기와 같아지게 되는 것이죠!


### 마무리하며
파이썬이 고정 인코딩을 활용한다는 점에서 한가지 주목해볼 것이 있습니다.  
```
print(sys.getsizeof("동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세!")) #146 byte
print(sys.getsizeof("동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세! 🚀")) #220 byte
```
위 코드는 같은 문장에 이모티콘 하나만 덧붙여 메모리 사용량을 비교한 예시입니다.  
이모티콘을 하나 붙였을 뿐인데 **메모리 사용량이 약 2배**나 차이를 보이고 있습니다. (만약 엄청 큰 텍스트 파일에 이모티콘 하나가 들어있다면...?)  
다시 말하면 이러한 부분만 신경 써도 메모리 사용량을 절약할 수 있다는 것이죠. 

따라서 텍스트 데이터를 주로 다루는 NLP나 데이터 엔지니어링에서는 **이러한 문자열 인코딩 방식에 관심을 가져보는 것을 한번 추천**드려요!  
생각지도 못한 곳에서 메모리를 절약할 수도 있답니다 :)  

감사합니다 👍
