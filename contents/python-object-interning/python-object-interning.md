---
isTIL: false
date: "2023-05-28"
title: "파이썬 Object Interning 파헤치기"
categories: ["Tip", "Development"]
summary: "파이썬 Object Interning 기법을 파헤쳐봅니다."
thumbnail: "th.jpg"
---

### 들어가며,
어느날 우연히 파이썬의 메모리 영역과 Garbage Collection에 관심이 생겨, 파이썬의 객체 메모리 주소 관련하여 재밌는 실험을 진행해보았습니다.

```python
a = ["i love python", "i love c", "i love java"]
b = a
b[0] = "i love java"

if id(a[0]) == id(a[2]):
    print("True")
else:
    print("False")
```

위 코드에서 올바른 출력은 무엇일까요?  (파이썬 버전에 따라 결과가 상이할 수 있습니다.)
1. True
2. False
3. Error 발생

### Mutable VS Immutable
정답은 1. **True**입니다.

위 문제에 답하기 위해서는 **두 가지 개념**을 알고 있어야합니다.

첫번째, 파이썬 **Mutable 객체와 Immutable 객체**의 차이를 알고 있어야 합니다.  

- **Mutable 객체**는 값 변경 시 **객체의 주소값이 변경되지 않습니다**. (List, Dict)
- 반면에 **Immutable 객체**는 값 변경 시 **새로운 객체가 생성**됩니다. (Int, Str, …)  

따라서 Mutable 객체인 List b의 값이 변경되면, a는 b와 같은 메모리 주소를 참조하고 있기 때문에 

**a 리스트에도 b 리스트의 변경사항 “i love java”가 적용되게 됩니다.**




### Object Interning
두번째로 Python **Object Interning**이라는 개념을 알고 있어야합니다.  

원래 a[0]의 “i love java”와 a[2]의 “i love java”는 엄연히 다른 주소값을 가지는 객체여야 맞습니다.  



하지만 파이썬은 메모리 최적화 기법으로 `Object Interning`을 지원합니다.

이는 **특정 조건의 Immutable 객체의 메모리를 재활용하는 것**입니다.

Interning이 동작하는 특정 조건은 파이썬 버전이나 환경에 따라 다릅니다.

예를 들어 a = “i love java”를 선언하고 바로 다음에 b = “i love java”를 선언하면,
**Object Interning**으로 인해 **a와 b는 같은 객체의 메모리 주소를 가리키게 되는 것이죠.**

이를 통해 파이썬은 사용자가 자주 사용하는 상수 값 등에 대해 **메모리 최적화를 수행**하게 됩니다.

이와 같은 이유 때문에 위 문제의 출력은 **True**가 되게 됩니다! 

### Object Interning 사용하는 법

앞서 Interning이 동작하는 조건이 있다고 했습니다.
[링크](https://medium.com/@bdov_/https-medium-com-bdov-python-objects-part-iii-string-interning-625d3c7319de) 에서는 해당 조건을 아래와 같이 설명하고 있습니다.
1. 문자열은 컴파일 단계에서 상수 값이어야 한다.
2. 문자열은 20자 초과이거나 constant folding이 아니어야 한다.
3. 문자열은 아스키 문자, 숫자, 밑줄로만 구성되어 있어야 한다.

위에서 constant folding이란 "John" + "Snow"와 같이 연산자로 이어진 문자열을 의미합니다.
여기서 파이썬은 꼭 문자열이 아닌 object에 대해서도 interning을 수행할 수 있다고 합니다. 사실 Object Interning 조건은 파이썬의 버전과 환경에 따라 자신의 환경에 맞게 찾아보시는 것을 추천드립니다!

또한 아래 코드처럼 개발자가 직접 interning할 object를 지정할 수도 있답니다.

```
from sys import intern
 
a = intern("John Snow")
b = "John Snow"
```

이번 시간에는 Object Interning에 대해서 알아보았습니다.
Object interning에 대해 좀 더 자세히 알아보고 싶으신 분들은 [링크](https://nephtyws.github.io/python/interning/)의 글도 추천드립니다! 구체적으로 interning이 어떻게 동작하는지 잘 설명되어 있습니다 :)  메모리 관리는 대용량 트래픽과 데이터 처리에서 중요한 주제인데요, 이번 기회에 각 언어별 Interning 기법에 관심을 가져보시는 것도 추천드립니다 👍👍

감사합니다 😊