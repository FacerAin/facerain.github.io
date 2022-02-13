---
date: "2022-02-13"
title: "[알고리즘 정리] 크루스칼(Kruskal) 알고리즘"
categories: ["Algorithm"]
summary: "크루스칼 알고리즘을 정리합니다."
thumbnail: "./algorithm-kruskal/th.jpg"
---

MST(Minimum Spanning Tree, 최소 스패닝 트리) 문제를 푸는 방법 중 하나인 크루스칼(Kruskal) 알고리즘을 정리합니다.

## 최소 스패닝 트리(MST) 문제
스패닝 트리란 **어떤 그래프의 정점 전부와 간선의 일부를 트리 형태로 연결한 부분 그래프** 입니다. 트리 형태로 연결했다는 의미는 곧 **간선들간의 사이클이 없는 그래프** 라는 뜻입니다.
![Spanning Tree]("출처 https://www.tutorialspoint.com/data_structures_algorithms/spanning_tree.htm")

여기서 **최소 스패닝 트리**란 어떤 가중치 그래프의 스패닝 트리 중 가중치의 합이 가장 작은 스패닝 트리입니다.

최소 스패닝 트리 문제를 해결하는 방법에는 크게 두 가지가 있습니다.
1. 크루스칼 알고리즘
2. 프림 알고리즘
 
이번 시간에는 크루스칼 알고리즘에 대해서 살펴봅니다.

## 크루스칼 알고리즘 구현하기  

크루스칼 알고리즘은 아래와 같습니다.  

1. 그래프의 모든 간선을 가중치의 오름차순으로 정렬
2. 낮은 가중치의 간선부터 스패닝 트리에 추가 (이때 해당 간선이 사이클을 이룬다면 제외)
3. 모든 간선에 대해 검사를 완료하면 최소 스패닝 트리 완성

**해당 간선이 사이클을 이루는지는 유니온-파인드 자료구조를 활용하여 검사** 합니다.
유니온 파인드에 대한 자세한 설명은 [[Algorithm] 유니온 파인드(Union - Find)](https://ssungkang.tistory.com/198)을 참고해주세요!  


아래 코드는 백준 [1197 최소 스패닝 트리](https://www.acmicpc.net/problem/1197) 문제를 크루스칼 알고리즘을 이용하여 풀이한 것입니다. 구현 코드는 프로그래밍 대회에서 배우는 알고리즘 문제해결전략(구종만)을 참고하였습니다.
```cpp
#include <iostream>
#include <vector>
#include <utility>
#include <algorithm>
using namespace std;

int V, E;
vector<pair<int,pair<int,int>>> edges; 
struct DisjointSet; //유니온-파인드 자료구조 (자세한 구현은 생략합니다)

int main(){
    cin >> V >> E;
    for(int i = 0; i < E; i++){ //그래프 입력받기
        int a, b, v;
        cin >> a >> b >> v;
        edges.push_back({v, {a,b}});
    }

    vector<pair<int,int>> selected;
    
    sort(edges.begin(), edges.end()); //(1) 그래프의 모든 간선을 가중치의 오름차순으로 정렬
    DisjointSet sets(V);
    int ans = 0;
    for(int i = 0; i < edges.size(); i++){ // (2) 낮은 가중치의 간선부터 스패닝 트리에 추가 (이때 해당 간선이 사이클을 이룬다면 제외)
        int cost = edges[i].first;
        int u = edges[i].second.first;
        int v = edges[i].second.second;
        
        if(sets.find(u) == sets.find(v)){ // 해당 간선이 사이클을 이루는지 검사 (유니온-파인드 활용)
            continue;
        }
        sets.merge(u,v);
        //selected.push_back({u,v}); 사이클을 이루지 않는다면 최소 스패닝트리에 추가 (해당 문제에서는 최소 스패닝 트리 결과를 출력할 필요 없으므로 생략)
        ans += cost;
    }
    
    cout << ans;
    
    return 0;
}
```

## 크루스칼 알고리즘 시간 복잡도
**크루스칼 알고리즘의 시간 복잡도는 O(|E|lg|E|)입니다.**  

차근차근 살펴보면, 정렬된 모든 간선을 탐색하는데 걸리는 시간은, O(|E|)입니다. (유니온 파인드에서 find와 merge하는 시간은 통상 O(1)로 계산합니다.)
그리고 간선을 오름차순으로 정렬하는데 걸리는 시간은 O(|E|lg|E|)입니다. 이때 간선을 정렬하는데 걸리는 시간이 **지배적**이기 때문에, 시간 복잡도는 O(|E|lg|E|)가 됩니다.

## Reference
- 프로그래밍 대회에서 배우는 알고리즘 문제해결전략 (구종만)
