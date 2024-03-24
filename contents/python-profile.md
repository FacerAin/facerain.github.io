---
isTIL: false
date: "2024-03-24"
title: "Python에서 프로파일링 하는 법"
categories: ["Tip", "Development"]
summary: "Python에서 프로파일링을 수행하는 방법에 대해 알아봅시다."
thumbnail: "./python-profile/th.jpg"
---

## 들어가며, 
이번 시간에는 **파이썬에서 프로파일링을 수행하는 방법**에 대해서 간단하게 알아봅니다.

> **"최적화하기 전에 프로파일링을 하라."** - Effective Python 2nd 중

SW 개발에 있어 기능 개발만큼이나 최적화와 유지보수는 좋은 SW를 만들기 위해 매우 중요한 요소입니다. 이때 최적화를 할 때 현재 시스템에서 연산 및 메모리 사용량 등을 확인하고 분석할 필요가 있는데, 이 과정을 프로파일링이라고 합니다.


## 파이썬에서 프로파일링 수행하기
파이썬에서는 기본 라이브러리로 `profile`과 `cProfile`을 지원합니다. 
두 라이브러리의 자세한 차이점은 [링크](https://www.w3resource.com/python-interview/what-is-the-difference-between-the-cprofile-and-profile-modules-in-python.php)를 참고해보세요!

아래 코드는 피보나치를 구하는 두 가지 버전과 프로파일링하는 코드 예제입니다. 

```python
from cProfile import Profile
from pstats import Stats


def fibonacci_dp(n):
    dp = [0, 1]
    for i in range(2, n + 1):
        dp.append(dp[i - 1] + dp[i - 2])
    return dp[n]


def fibonacci_recursion(n):
    if n <= 1:
        return n
    else:
        return fibonacci_recursion(n - 1) + fibonacci_recursion(n - 2)


def test():
    num = 35
    fibonacci_dp(num)
    fibonacci_recursion(num)


profiler = Profile()
profiler.runcall(test)

stats = Stats(profiler)
stats.strip_dirs()
stats.sort_stats("cumulative")
stats.print_stats()
```



