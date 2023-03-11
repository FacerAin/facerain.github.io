---
isTIL: false
date: "2021-09-28"
title: "[알고리즘 문제 풀이] 백준 14888번 연산자 끼워넣기"
categories: ["Algorithm"]
summary: "백준 14888번 연산자 끼워넣기 풀이"
thumbnail: "./algorithm-solve-1/th.jpg"
---

백준 14888번 [연산자 끼워넣기](https://www.acmicpc.net/problem/14888)를 풀어봅니다.

## 문제 살펴보기

N개의 수와 N-1개의 연산자가 주어졌을 때, **만들 수 있는 식의 결과가 최대인 것과 최소인 것을 구하는** 프로그램을 작성하시오.  
문제 이해는 크게 어렵지 않습니다. 만들 수 있는 **모든 식의 결과값**을 구해야하므로 **완전 탐색**으로 접근할 수 있습니다.

위 문제를 완전 탐색으로 구현하기 위해서 **백트래킹** 기법을 활용합니다.

## 문제 풀이

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

int A[105];
int OPER[4];
int N;
int MAX = -2000000000;
int MIN = 2000000000;
void search (int num, int depth)
{
  if (depth == N)
    {
      MAX = max (MAX, num);
      MIN = min (MIN, num);
    }
  else
    {
      for (int i = 0; i < 4; i++)
	{
	  if (OPER[i] > 0)
	    {
	      OPER[i]--;
	      if (i == 0)
		{
		  search (num + A[depth], depth + 1);
		}
	      if (i == 1)
		{
		  search (num - A[depth], depth + 1);
		}
	      if (i == 2)
		{
		  search (num * A[depth], depth + 1);
		}
	      if (i == 3)
		{
		  search (num / A[depth], depth + 1);
		}
	      OPER[i]++;
	    }
	}
    }
}

int main ()
{

  cin >> N;
  for (int i = 0; i < N; i++)
    {
      cin >> A[i];
    }
  cin >> OPER[0] >> OPER[1] >> OPER[2] >> OPER[3];
  search(A[0], 1);

  cout << MAX << endl << MIN;

  return 0;
}

```

## 알고리즘 검증

한번 분기마다 4가지 연산자의 경우의 수가 있습니다. 따라서 시간 복잡도는 **O(4^N)** 입니다.
문제에서 주어진 N의 크기는 11이므로 충분히 **2초 내에 문제를 해결할 수 있습니다.**
