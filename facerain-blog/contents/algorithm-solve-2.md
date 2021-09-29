---
date: "2021-09-28"
title: "[알고리즘 문제 풀이] 프로그래머스 징검다리 건너기"
categories: ["Algorithm"]
summary: "프로그래머스 징검다리 건너기 풀이"
thumbnail: "./algorithm-solve-2/th.jpg"
---

[프로그래머스 징검다리 건너기](https://programmers.co.kr/learn/courses/30/lessons/64062)를 풀어봅니다.

## 문제 살펴보기

한 명씩 징검다리를 건널 때 **최대 몇 명** 까지 징검다리를 건널 수 있는지 구해야 합니다.  
가장 먼저 떠오르는 방법은 한 명씩 징검다리 건너는 것을 **시뮬레이션** 해보는 것입니다.
하지만 stones 배열 각 원소들의 값이 **최대 20억** 입니다. 따라서 최악의 경우 20억\*20만번 순회를 하여야 하므로 **문제를 해결할 수 없습니다.**

좀 더 효율적인 방법이 없을까요?
**슬라이딩 윈도우(투 포인터) 기법**을 활용해봅시다. 슬라이딩 윈도우 간격을 **K**(한번에 건너뛸 수 있는 디딤돌의 최대 칸수)만큼 잡고 해당 슬라이딩 윈도우 구간의 **최대값**(Stones의 값을 모두 0으로 만들 수 있는 값)들을 구하면 됩니다. 그리고 **구한 최대값들 중의 최소값** 이 니니즈 친구들이 건널 수 있는 **최대 인원수** 가 됩니다.

여기서 한가지 더 고민해볼 것이 있습니다. **슬라이딩 윈도우 내의 최대값은 어떻게 구할** 수 있을까요?  
간단한 방법은 **슬라이딩 윈도우 내부를 일일히 순회하여 최대값을 구하는 방법** 입니다. 하지만 이 방법은 **O(N^2)**이므로 문제를 해결할 수 없습니다.

다른 방법으로는 **이진탐색트리**를 사용하면 됩니다. 이진탐색트리의 검색, 삽입, 삭제의 시간 복잡도는 O(LogN)입니다. 따라서 **O(NlgN)**으로 문제를 해결할 수 있습니다.  
C++에서는 이진탐색트리를 **Map** 이라는 STL을 사용하여 간편하게 구현할 수 있습니다.  
Map의 **key 값을 stones 원소 값**, **value를 stones index 값**으로 구성하여 슬라이딩 윈도우 내의 최대 값을 구할 수 있습니다.  
그리고 추가로 Map에서는 **중복된 Key 값을 사용할 수 없습니다.** 하지만 Key 값(stones 원소 값)이 같을 수도 있으므로 **Multimap**을 이용하여 **중복된 Key 값을 허용하여 저장** 하도록 합니다.

## 문제 풀이

```cpp
#include <string>
#include <vector>
#include <map>
#include <algorithm>

const int MAX = 999999999;

using namespace std;

int solution(vector<int> stones, int k) {
    multimap<int, int> m;
    int answer = MAX;


    for(int i = 0; i < k; i++){
        m.insert({stones[i], -i});//value 값에 음수를 취해주면 key 값이 같을 때 value(index)가 작은 값부터 뽑을 수 있다.
    }


    //multimap<int, int>::iterator m_iter = m.end();
    auto max_iter = m.end();
    int max_elem = (*--max_iter).first;
    answer = min(answer, max_elem);

    for(int i = k; i < stones.size(); i++){ //슬라이딩 윈도우 이동
        auto begin_iter = m.find(stones[i-k]);
        m.erase(begin_iter);
        m.insert({stones[i], -i});

        max_iter = m.end();
        max_elem = (*--max_iter).first;
        answer = min(answer, max_elem);

    }
    return answer;
}

```

## 알고리즘 검증

슬라이딩 윈도우가 배열을 순회하는데 O(N), 슬라이딩 윈도우 내부에서 최대값을 찾는데 O(lgN)이므로 본 알고리즘의 시간 복잡도는 O(NlgN)입니다.
N의 크기는 20만이므로 충분히 제한 시간 내에 문제를 해결할 수 있습니다.

## Reference

- [https://sina-sina.tistory.com/39](https://sina-sina.tistory.com/39)
