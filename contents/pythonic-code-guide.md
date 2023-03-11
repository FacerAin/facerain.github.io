---
isTIL: false
date: "2022-11-13"
title: "파이써닉(Pythonic) 코드를 위한 TOP 10 가이드"
categories: ["Tip", "Development"]
summary: "좋은 파이썬 코드를 작성하는 방법에 대해 알아봅시다."
thumbnail: "./pythonic-code-guide/th.jpg"
---

이번 시간에는 좋은 파이썬 코드를 위한 **파이써닉한 코드를 위해 꼭 알아야 할 TOP 10**에 대해 살펴봅니다.  

## 1. PEP8 스타일 가이드 따르기
파이썬은 PEP8 (Python Enhancement Proposal)이라는 [코드 스타일 가이드](https://peps.python.org/pep-0008/)가 있습니다.  
공백, 들여쓰기, 문법 등을 어떻게 하면 좋을지 상세하게 작성되어 있습니다.

**그렇다고 이 모든 규칙들을 외울 필요는 없습니다.**

바로 Black, Autopep, isort와 같은 **Python linter들이 자동으로 스타일을 잡아주기 때문**입니다.

따라서 팀에서 이들 Linter와 규칙을 통일하여 코드 스타일을 유지하는 것이 중요합니다.  

## 2. 변수, 클래스 네이밍
변수와 클래스 이름은 코드 내 가독성에 있어 매우 중요합니다.

**파이썬 스타일 네이밍**을 꼭 숙지하시기 바랍니다.

1. **함수, 변수, 애트리뷰트는 snake_case**를 사용합니다.
    1. ex) `total_num`, `text_cleaning()`, `get_tokenizer()`
2. **클래스는 PascalCase**를 사용합니다.
    1. ex) `BertModel()`, `DataLoader()`
3. **모듈 수준의 상수**는 모든 글자를 **대문자**로 하여 snake_case를 사용합니다.
    1. ex) `SYS_LIMIT`, `ROOT_DIR`

- **보호해야 하는 인스턴스 애트리뷰트**는 밑줄 한개(_)로 시작합니다.
- **private 인스턴스 애트리뷰트**는 밑줄 두개 (__)로 시작합니다.

- 여담으로, **좋은 변수 네이밍은 어떻게** 할 수 있을까요?
    
    클린코드를 참고하였습니다.
    
    1. **의도를 분명히 밝히기**
        1. 최근에는 코드 편집기가 자동 완성을 잘 지원해서, 긴 변수 네이밍이 문제가 되지 않습니다. 
        2. 네이밍을 짧게 하려보다는 **길더라도 변수의 의미를 충분히 담을 수 있도록** 하세요!
        3. `int d` vs `int elapsed_time_in_days`
        4. `int i` vs `int batch_idx`
    2. **맥락을 고려하기**
        1. 아래 예시에서 애트리뷰트 이름에서 굳이 user의 이름과 나이임이 맥락상 자명하므로 **한번 더 명시할 필요가 없습니다.**
        
        ```python
        class User():
        	user_name = "FacerAin"
        	user_age = 23
        ```
        
        ```python
        class User():
        	name = "FacerAin"
        	age = 23
        ```
        
    3. **이미 있는 예약어, 내장 함수들의 이름 사용을 삼가하기**
        1. 파이썬에서는 타 언어 (c++, java)와 다르게
        예약어와 내장 함수들로 변수 이름을 지어도 **오류가 발생하지 않습니다.**
        1. `map = []`, `zip = …` `sort = …` `len = 5`
        2. 하지만 나중에 ~~대참사~~ 문제가 날 수 있으니 되도록 신경써서 피하도록 네이밍을 주의해주세요!

## 3. import 구성하기
파이썬에서는 통상 다양한 라이브러리를 import하여 사용합니다.

따라서 import 구문을 잘 작성하여야 코드를 이해하기 쉬워집니다.

1. **`import`는 반드시 파일의 상단에 위치시키기**
2. **한 라인에 하나의 `import`만 하기**

    ```python
    import math, sys, os (X)

    import math (O)
    import sys
    import os
    ```

3. **`import` 순서를 지키기**
    1. **표준 라이브러리, 3rd-party, 직접 만든 모듈 순서**로 섹션을 나누어야 합니다.
    2. 또한 세션 내에서도 비슷한 부류의 모듈끼리는 묶어서 작성해주세요.
    
    ```python
    #주석은 이해를 위함입니다. 굳이 실제 코드에서도 섹션별 주석을 쓸 필요는 없습니다
    #표준 라이브러리
    import math
    import sys
    import os
    
    #3rd-party
    import numpy as np
    import torch
    from transformers import AutoTokenizer, AutoModelForCausalLM
    
    #직접 만든 모듈
    from dataset import Dataset
    from dataloader import DataLoader
    ```
    
4. **`import`는 되도록 절대 경로를 사용하기**
    1. 만약 절대 경로가 너무 복잡하여 사용이 힘들 경우에는, **명시적 상대 경로**를 사용하기

    ```python
    import mymodule (X, 상대경로 사용)

    from mypackage import mymodule (O)
    from mypackage.subpackage import mysubmodule (O)
    from . import mymodules (O, 명시적 상대경로 사용)
    from .submodule import mymodules (O, 명시적 상대경로 사용)
    ```


## 4. f-string 사용하기
파이썬 코드 상에서 문자열을 출력할 일이 많이 있습니다.

이때 유용한 문자열 포맷팅 기법인 f-string을 알아봅시다.

파이썬에서 문자열을 다양한 방법으로 포맷팅할 수 있습니다.

1. C style formatting (%)
2. str.format()
3. **f-string**

최근에는 3번째 방법인 **f-string 기법을 많이 사용합니다.**

```python
# C style formatting
print('%d월 %d일' % (month, day))

# str.format()
print('{}월 {}일'.format(month, day))

#f-string
print(f'{month}월 {day}일')

#f-string 활용
key = 'var'
value = 1.234

print(f'{key!r:<10} = {value:.2f}')
#'var' = 1.23
```

## 5. List Comprehension

파이썬에서 다른 시퀀스나 이터러블에서 새 리스트를 만들어야 하는 경우가 많이 있습니다.

이때 `List Comprehension`을 사용하면 **속도**와 **간결함** 모두 잡을 수 있습니다.  

```python
#모든 원소에 제곱한 리스트를 얻고 싶다
a = [1,2,3,4,5,6,7,8,9]

#기존 방식
squares = []
for x in a:
	squares.append(x*x)

#List Comprehension
squares = [x*x for x in a]

#List Comprehension with if statement
squares = [x*x for x in a if x % 2 == 0]

#단 반복문이 복잡할 때 List Comprehension의 사용을 너무 고집할 필요는 없습니다.
square_matrix = [[x*x for x in row if x % 2 == 0] for row in matrix if len(row) % 2 == 0] 
#너무 중첩해서 쓰는 것은 오히려 독
```

## 6. enumerate

`enumerate`를 사용하면 시퀀스, 이터레이터등에서 인덱스 정보와 원소를 손쉽게 순회할 수 있습니다.

특히 **pytorch의 dataloader와 같은 반복자 객체를 순회할 때 유용**합니다!  

```python
a = [1,2,3,4,5]

#기존 방식
for i in range(len(a)):
	print(i, a[i])

#Enumerate
for i, num in enumerate(a):
	print(i, num)

#Pytorch dataset example
for idx, batch in enumerate(train_dataloader):
	...
```

## 7. zip
두 리스트를 동시에 순회해야 할 때 `zip` 이 유용합니다.

```python
names = ['face', 'rain', 'yong', 'woo']
scores = [100, 94, 85, 85]

#기존 방식
for i in range(len(names)):
	print(names[i], scores[i])

#Zip 활용
for name, score in zip(names, scores):
	print(name, score)
```

주의할 점은, **두 리스트의 길이가 같지 않다면** **짧은 리스트의 원소만큼만 순회**합니다.

enumerate와 마찬가지로 iterator 객체를 순회하는데 유리합니다.

## 8. packing, unpacking

가변 개수의 함수 인자를 사용 때 유용합니다.

코드에서 ***이 의미하는 것**이 `packing`인지 `unpacking`인지 헷갈리는 경우가 많은데,

이때는 **함수를 정의하는지, 호출하는지 살펴보면 쉽게 구분**할 수 있습니다.

- (*) **별 한개: list, tuple**의 인자
- (**) **별 두개: dictionary**의 인자  (키워드 인자)
- packing
    - **함수를 정의**할 때 주로 사용

```python
#사실 가변 매개변수의 이름은 자유롭게 지을 수 있지만, 관용적으로 args와 kargs를 사용합니다.
def example(*args, **kwargs):
	print(args)
	# (1,2)
	print(kargs)
	# {'a' : 10, 'b': 20}
```

- unpacking
    - **함수를 호출**할 때 주로 사용

```python
def add(a,b):
	return a+b

add(1,2)
add([1,2]) #Error!
add(*[1,2])
add(**{'a': 1, 'b': 2})
```

## 9. 예외 처리

강건한 시스템을 위해서 **예외 처리는 매우 중요**합니다.

파이썬에서 예외처리를 어떻게 하는지 꼭 숙지하시기 바랍니다.

파이썬에서는 예외처리를 위해 **`try`/`except`/`else`/`finally**` 블록을 활용합니다.

**`else`와 `finally`는** 주로 **필요한 경우에만** 사용을 합니다.

- `else`
    - `try` 블록에서 에러가 발생하지 않으면 해당 분기를 수행합니다.
    - 에러가 발생할 여지가 있는 코드와 그렇지 않은 코드를 분리할 수 있으므로 **가독성**이 좋아집니다.
- `finally`
    - 에러 발생 여부에 상관 없이 해당 분기를 수행합니다
    - 스트림이나 리소스를 **반환 혹은 종료**해야 할 때 유용합니다. ex) file.close()

```python
def example():
	try: 
		f = open('test.txt')
		...
	except FileNotFoundError as e: #FileNotFoundError가 발생하면 해당 분기로
		...
	except ZeroDivisionError as e:
		...
	else: #try 블록에서 에러가 발생하지 않으면 해당 분기로
		...
	finally: #에러가 발생 여부에 상관 없이 마지막에는 해당 분기로
		f.close()

```

## 10. Generator

**C언어의 꽃이 포인터라면, 파이썬의 꽃은 제너레이터라고 생각합니다.**  
**제너레이터**를 사용하면 **성능 향상**, **메모리 사용 줄이기**, **가독성** 향상의 효과가 있습니다.

이는 특히 대용량 데이터를 처리할 때 엄청난 효율을 가져옵니다.

자세한 설명은 지면 상 한계가 있어, 관련 [링크](https://wikidocs.net/16069)로 대체하겠습니다 🔥


## Reference
- 파이썬 코딩의 기술, 브렛 슬라킨
- 클린 코드, 로버트 C. 마틴