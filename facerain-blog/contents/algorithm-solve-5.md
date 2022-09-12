---
isTIL: false
date: "2022-05-03"
title: "[알고리즘 문제 풀이] 백준 14889번 스타트와 링크"
categories: ["Algorithm"]
summary: "백준 14889번 스타트와 링크 풀이"
thumbnail: "./algorithm-solve-5/th.jpg"
---

[백준 14889번 스타트와 링크](https://www.acmicpc.net/problem/14889) 문제를 풀어봅니다.

## 문제 살펴보기

**백트래킹**을 활용하여 스타트팀과 링크팀을 나눕니다. 그리고 나눠진 두 팀의 점수 차를 구해, 최소인 점수 차를 구하면 되는 문제입니다.

## 문제 풀이

```cpp
#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;
int map[25][25];
bool check[25];
int N;
int ans = 999999999;
void solve(int member, int pos){
    if(member == N/2){
        int start = 0;
        int link = 0;
        for(int i = 0; i < N; i++){
            for(int j = 0; j < N; j++){
                if(!check[i] && !check[j]){
                    start += map[i][j];
                }
                if(check[i] && check[j]){
                    link += map[i][j];
                }
            }
        }
        ans = min(ans, abs(start - link));
        return;
    }

    for(int i = pos; i < N-1; i++){
        if(!check[i]){
            check[i] = true;
            solve(member+1, i+1);
            check[i]= false;
        }
    }

    return;
}

int main(){
    ios_base :: sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    cin >> N;
    for(int i = 0 ; i < N; i++){
        for(int j = 0; j < N; j++){
            cin >> map[i][j];
        }
    }
    solve(0,0);
    cout << ans;

}
```

## 알고리즘 검증

팀을 선정하는 시간복잡도는 O(${n \choose {n/2}}$)이고, 선정된 팀에서 점수를 구하는 시간 복잡도는 O(n^2)입니다.

따라서 알고리즘의 전체 시간복잡도는 **O(${n \choose {n/2}}$ \* n^2)** 입니다.
이때, 주어진 n의 최대값이 20이므로, 문제를 해결할 수 있습니다.
