---
date: "2021-09-30"
title: "[알고리즘 문제 풀이] 프로그래머스 괄호 회전하기"
categories: ["Algorithm"]
summary: "프로그래머스 괄호 회전하기 풀이"
thumbnail: "./algorithm-solve-3/th.jpg"
---

[프로그래머스 괄호 회전하기](https://programmers.co.kr/learn/courses/30/lessons/76502)문제를 풀어봅니다.

## 문제 살펴보기

대표적인 **Stack**을 활용하는 문제인 **올바른 괄호 검사하기 문제** 에서 **괄호 문자열이 회전한다는 조건이 추가** 된 문제입니다.  
Stack 자료구조를 이용하여 올바른 괄호를 검사하는 방법을 알고 있으면 크게 어려울 것 없는 문제입니다.

## 문제 풀이

```cpp
#include <string>
#include <vector>
#include <string>
#include <iostream>
using namespace std;
bool isValidPair(string s){
    vector<char> pair_stack;
    //올바른 괄호 문자열이라면?
    //닫는 괄호가 여는 괄호보다 먼저 나오지 않으며
    //검사가 끝난 후 스택에 남는 괄호가 없어야한다
    for(int i = 0; i < s.length(); i++){
        char pair = s[i];
        if(pair == '[' || pair == '{' || pair == '('){
            pair_stack.push_back(pair);
        }else if(pair_stack.empty()){
            return false;
        }else if(pair == ']' && pair_stack.back() == '['){
            pair_stack.pop_back();
        }else if(pair == '}'&& pair_stack.back() == '{'){
            pair_stack.pop_back();
        }else if(pair == ')'&& pair_stack.back() == '('){
            pair_stack.pop_back();
        }else{
            return false;
        }

    }
    if(!pair_stack.empty()){
            return false;
        }
    return true;
}

int solution(string s) {
    int answer = 0;
    int s_len = s.length();
    string rotate_string = s;
    //회전 구현
    for(int i = 0; i < s_len; i++){
        if(isValidPair(rotate_string)){
            answer++;
        }
        rotate_string = rotate_string[s_len-1] + rotate_string.substr(0,s_len-1);
    }
    return answer;
}

```

## 알고리즘 검증

위 알고리즘은 **O(N^3)** 의 시간 복잡도를 가집니다.

- N개의 회전한 문자열을 검사합니다. O(N)
- 회전한 문자열을 만듭니다. O(N) (Substr함수는 O(N)의 시간복잡도를 가집니다.)
- 회전한 문자열이 올바른 괄호 문자열인지 검사합니다. O(N)

O(N^3)으로 상당히 시간복잡도가 큰 알고리즘입니다. 문자열의 크기가 1000이라 이번 문제는 해결 가능했지만,  
문자열의 크기가 10배인 일만만 되어도 주어진 시간 내에 문제를 해결할 수 없습니다.  
이를 해결하기 위해서 **회전한 문자열을 만드는** 부분을 개선할 필요가 있습니다.  
**회전한 문자열을 따로 만들어서** 검사하지 않는다면 시간복잡도를 O(N^2)으로 개선할 수 있습니다.

## 개선된 알고리즘

회전 문자열을 따로 만들지 않고, **인덱스를 이동하며 괄호 문자열을 확인**합니다.  
**O(N^2)** 의 시간복잡도를 가집니다. 아래에는 주요 코드만 수록하였습니다.

```cpp
int s_idx, e_idx;
void move_idx(int& idx){
	idx++;
	if(idx >= s.size()){
		idx = 0;
		return;
	}
	return;
}

bool check_pair(char s1, char s2){
	if(s1 == '(' && s2 == ')'){
		return true;
	}
	if(s1 == '{' && s2 == '}'){
		return true;
	}
	if(s1 == '[' && s2 == ']'){
		return true;
	}
	return false;
}
bool check(){
	vector<char> v;
	int cur_idx = s_idx;
	while(cur_idx != e_idx){
		if(s[cur_idx] == '{' || s[cur_idx] == '('|| s[cur_idx] == '['){//여는 괄호일 때
			v.push_back(s[cur_idx]);
		}
		else{//닫는 괄호일 때
			if(!v.empty() && check_pair(v.back(), s[cur_idx])){
				v.pop_back();
			}else{
				return false;
			}
		}
		move_idx(cur_idx);

	}

	//마지막 idx 처리
	if(!v.empty()){
		if(check_pair(v.back(), s[cur_idx])){
			v.pop_back();
		}
		if(!v.empty()){
			return false;
		}
		return true;

	}else{
		return false;
	}

}
```
