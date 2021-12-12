---
date: '2021-12-12'
title: '[Leetcode] Increasing Triplet Subsequence'
categories: ['Algorithm']
summary: 'LeetCode Increasing Triplet Subsequence 문제를 풀어봅니다.'
thumbnail: './leetcode-1/th.jpg'
---
[Increasing Triplet Subsequence](https://leetcode.com/problems/increasing-triplet-subsequence/) 문제를 풀어봅니다.  


## 문제 살펴보기  
정수 배열 nums가 주어졌을 때 세 인덱스 (i, j ,k)에 대해 i < j < k를 만족하고 nums[i] < nums[j] < nums[k]를 만족하는 부분 수열이 있는지 검사하여야 합니다.  


## 첫번째 접근
**가능한 부분 수열을 모두 만들어보고**, nums[i] < nums[j] < nums[k] 조건을 만족하는지 검사하는 방법입니다.  
처음에 간단하게 떠올릴 수 있는 **브루트포스 기법**입니다.  
하지만 시간복잡도가 **O(N^3)**으로 주어진 시간 이내에 **문제를 해결할 수 없습니다.** (1 <= nums.length <= 5 * 10^5)  


## 두번째 접근  
특정 숫자를 기준으로 **양쪽으로 조건을 만족하는 숫자들이 있는지 검사**합니다.  
시간복잡도는 **O(N^2)**으로 개선되었지만, 여전히 주어진 시간 이내에 **문제를 해결할 수 없습니다.**  (1 <= nums.length <= 5 * 10^5)  


```cpp
class Solution {
public:
    bool increasingTriplet(vector<int>& nums) {
        int size = nums.size();
        for(int i = 0; i < size; i++){
            bool isLeft = false;
            bool isRight = false;
            for(int left = i; left >= 0; left--){
                if(nums[left] < nums[i]){
                    isLeft = true;
                    break;
                }
            }
            
            for(int right = i; right < size; right++){
                if(nums[i] < nums[right]){
                    isRight = true;
                    break;
                }
            }
            
            if(isLeft && isRight){ //양쪽에 조건을 만족하는 숫자가 있다면
                return true;
            }
        }
        return false;
    }
};
```
## 세번째 접근
문제 해결을 위해 **두 개의 변수를 이용**합니다.  
triplet의 첫번째 요소를 first, 두번째 요소를 second라고 합시다.
이제 아래 규칙에 따라 **nums 배열을 순회**하면서 **조건을 만족하는 triplet이 있는지 검사**합니다.   

1. num이 first보다 작을 때  (num <= first)  
first 변수의 값을 num 값으로 갱신 (triplet의 첫번째 요소를 갱신)  

2. num이 first보다 크고 second보다 작을 때 (first <= num <= second)  
second 변수의 값을 num 값으로 갱신 (triplet의 두번째 요소를 갱신)  

3. num이 first와 second보다 클 때 (first <= second <= num)  
조건을 만족하는 triplet을 만들 수 있다!  (triplet의 세번째 요소까지 완성)  


시간복잡도는 **O(N)**으로 문제를 **주어진 시간 이내에 해결할 수 있습니다.**  



```cpp
class Solution {
public:
    bool increasingTriplet(vector<int>& nums) {
        int first = INT_MAX;
        int second = INT_MAX;
        for(int i = 0; i < nums.size(); i++){
            int num = nums[i];
            if(num <= first){
                first = num;
            }else if(num <= second){
                second = num;
            }else{
                return true;
            }
        }
        return false;
    }
};
```