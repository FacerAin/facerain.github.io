---
date: "2021-09-29"
title: "[알고리즘 문제 풀이] 프로그래머스 도둑질"
categories: ["Algorithm"]
summary: "프로그래머스 도둑질 풀이"
thumbnail: "./algorithm-solve-dp-1/th.jpg"
---

[프로그래머스 도둑질 문제](https://programmers.co.kr/learn/courses/30/lessons/42897#)를 풀어봅니다.

## 문제 살펴보기

도둑이 훔칠 수 있는 **돈의 최댓값** 을 구하는 문제로, **DP** 를 사용하여야 함을 쉽게 알 수 있습니다.

도둑이 선택할 수 있는 행동은 2가지입니다.

- 현재 집을 **털거나.**
- 현재 집을 **털지 않거나.**

위 내용을 점화식으로 표현하면 아래와 같습니다.  
DP[i] = (i번째 집까지 왔을 때 도둑이 훔칠 수 있는 돈의 최댓값) = max(DP[i-1], money[i] + DP[i-2])

하지만 문제가 한 가지 있습니다. 바로 집들이 **원형으로 이어져 있습니다.** 즉, 첫번째 집을 털면 마지막 집을 털 수 없습니다.  
이를 해결하기 위한 간단한 방법이 있습니다. 바로 **DP를 2번 계산**하면 됩니다.

- 첫번째 집을 털었을 때 DP
- 마지막 집을 털었을 때 DP (첫번째 집은 털지 않는다.)

## 문제 풀이

```cpp
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

const int MAX = 1000005;

int dp[MAX];

int solution(vector<int> money) {
    int answer = 0;
    int cnt = money.size();

    //첫번째 집에서 훔쳤을 때
    //마지막 집에서 훔치지 못한다.
    dp[0] = money[0];
    dp[1] = max(dp[0], money[1]);
    for(int i = 2; i < cnt-1; i++){
    dp[i] = max(money[i]+dp[i-2], dp[i-1]);
    }
    int ans1 = dp[cnt-2];

    //첫번째 집에서 훔치치 않았을 때
    //마지막 집에서 훔칠 수 있다
    dp[0] = 0;
    dp[1] = money[1];
    for(int i = 2; i < cnt; i++){
    dp[i] = max(money[i]+dp[i-2], dp[i-1]);
    }
    int ans2 = dp[cnt-1];

    answer = max(ans1, ans2);
    return answer;
}
```

## 알고리즘 검증

DP 계산을 위해 N번 순회를 2번 수행하므로 시간 복잡도는 O(2N)입니다.  
N의 크기는 백만이므로 충분히 문제를 해결할 수 있습니다.