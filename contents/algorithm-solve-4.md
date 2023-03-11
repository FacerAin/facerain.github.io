---
isTIL: false
date: "2021-10-01"
title: "[알고리즘 문제 풀이] 프로그래머스 여행경로"
categories: ["Algorithm"]
summary: "프로그래머스 여행경로 풀이"
thumbnail: "./algorithm-solve-4/th.jpg"
---

[프로그래머스 여행경로](https://programmers.co.kr/learn/courses/30/lessons/43164) 문제를 풀어봅니다.

## 문제 살펴보기

**백트래킹** 을 이용하여 가능한 여행경로를 탐색하면 됩니다.  
만일 가능한 경로가 2개 이상일 경우 알파벳 순서가 앞서는 경로를 구해야 하므로 tickets 배열에서 **도착지들을 알파벳 순서로 정렬** 한 후 탐색을 진행합니다.

## 문제 풀이

```cpp
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

bool check[10005];

vector<string> answer;

bool compare(const vector<string>& a, const vector<string>& b){
    return a[1] < b[1];
}



bool search(string depature, const vector<vector<string>>& tickets){
    answer.push_back(depature);
    if(answer.size() == tickets.size() + 1){//여행 경로를 다 구했다면 탐색 종료
        return true;
    }
    for(int i = 0; i < tickets.size(); i++){

        if(!check[i] && tickets[i][0] == depature){

            check[i] = true;

            if(search(tickets[i][1], tickets)){
                return true;
            }

            //가능한 여행 경로가 아니라면 되돌아가기(Back Tracking)
            check[i] = false;
            answer.pop_back();
        }
    }

    return false;

}
vector<string> solution(vector<vector<string>> tickets) {
    sort(tickets.begin(), tickets.end(), compare);//티켓의 도착지들을 오름차순으로 정렬
    search("ICN", tickets);
    return answer;
}
```

## 알고리즘 검증

각 출발지에 대해 모든 티켓을 검사하여 탐색하므로 시간복잡도는 **O(N^2)** 입니다.
도시의 개수는 **최대 일만개이므로 충분히 문제를 해결**할 수 있습니다.  
다만 알고리즘에서 **비효율적인 부분** 이 있습니다.  
바로 **출발지가 일치하는 티켓을 찾기 위해 모든 티켓을 검사**하고 있다는 점입니다.

이를 개선하기 위해 티켓을 관리하는데 아래와 같이 **map과 priority queue를 활용** 하면 됩니다.  
이를 통해 **O(NlgN)** 로 시간복잡도를 개선할 수 있습니다.

```cpp
map<string, priority_queue <string, vector<string>, compare > > tickets;
```
