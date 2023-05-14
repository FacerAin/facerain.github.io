---
isTIL: false
date: "2023-05-14"
title: "파이썬 List Comprehension"
categories: ["Tip", "Development"]
summary: "파이썬 List Comprehension을 살펴봅니다."
thumbnail: "th.jpg"
---

### 들어가며,
어느날 우연히 파이썬 리스트 관련하여 간단한 실험을 수행하였습니다.

리스트에 0부터 1억까지의 숫자를 추가해야할 때,

append 연산과 list comprehension의 실행 시간을 비교하였는데요,

빠른 순서대로 3.68초, 8.02초가 나왔습니다. (실행 시간은 환경마다 차이가 있을 수 있습니다.)

그렇다면 각 기법을 빠른 순서대로 올바르게 나열한 것은 무엇일까요?

```python
import time

start_a_time = time.time()
a = []
b = []

MAX = 100000000  # 1억

# (a) append
for i in range(MAX):
    a.append(i)

print(time.time() - start_a_time)

start_b_time = time.time()
# (b) list comprehension
b = [i for i in range(MAX)]

print(time.time() - start_b_time)
```

### Python List Comprehension

위 코드는 **list-comprehension, append  순서로 빠르게 동작**합니다.  
그런데 왜 이런 차이가 발생하는 것일까요?  

[파이썬에서 List Comprehension이 더 빠른 이유](https://whatisand.github.io/why-fast-list-comprehension-python/)에 그 이유가 자세히 설명되어 있습니다.  

요약하자면, **두 메서드의 구현 방식에 차이**가 있기 때문입니다.   

append의 경우 list comprenesion과 다르게 **내부적으로 CALL_METHOD를 수행**하는데, 여기서 **오버헤드가 발생**해서 느려진 것이라 합니다.

참고로 두 코드의 바이너리 단은  아래와 같습니다.  코드는 위 블로그 포스트를 참고하였습니다.
```python
#append 연산
import dis


def use_append():
    result = []
    for i in range(10000):
        result.append(i)
    return result


dis.dis(use_append)


# 출력결과
  5           0 BUILD_LIST               0
              2 STORE_FAST               0 (result)

  6           4 LOAD_GLOBAL              0 (range)
              6 LOAD_CONST               1 (10000)
              8 CALL_FUNCTION            1
             10 GET_ITER
        >>   12 FOR_ITER                14 (to 28)
             14 STORE_FAST               1 (i)

  7          16 LOAD_FAST                0 (result)
             18 LOAD_METHOD              1 (append)
             20 LOAD_FAST                1 (i)
             22 CALL_METHOD              1
             24 POP_TOP
             26 JUMP_ABSOLUTE           12

  8     >>   28 LOAD_FAST                0 (result)
             30 RETURN_VALUE
```

```python
#list comprehension 연산
def use_comprehension():
    return [i for i in range(10000)]


dis.dis(use_comprehension)

# 출력결과
 12           0 LOAD_CONST               1 (<code object <listcomp> at 0x7fdf372a1ea0, file "test.py", line 12>)
              2 LOAD_CONST               2 ('use_comprehension.<locals>.<listcomp>')
              4 MAKE_FUNCTION            0
              6 LOAD_GLOBAL              0 (range)
              8 LOAD_CONST               3 (10000)
             10 CALL_FUNCTION            1
             12 GET_ITER
             14 CALL_FUNCTION            1
             16 RETURN_VALUE

Disassembly of <code object <listcomp> at 0x7fdf372a1ea0, file "test.py", line 12>:
 12           0 BUILD_LIST               0
              2 LOAD_FAST                0 (.0)
        >>    4 FOR_ITER                 8 (to 14)
              6 STORE_FAST               1 (i)
              8 LOAD_FAST                1 (i)
             10 LIST_APPEND              2
             12 JUMP_ABSOLUTE            4
        >>   14 RETURN_VALUE
```

개발을 하다보면 같은 기능을 수행하지만, 성능에는 차이가 나는 경우가 많이 있습니다!  
이러한 것들에 한번 관심을 가져보시는 것도 추천드립니다 👍
