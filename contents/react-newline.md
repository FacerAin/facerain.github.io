---
isTIL: false
date: "2021-08-29"
title: "[TIP] React에서 텍스트 줄바꿈하는 간단한 방법"
categories: ["Tip", "Web"]
summary: "React에서 텍스트 줄바꿈하는 방법을 알아봅시다."
thumbnail: "./react-newline/th.jpg"
---

React에서 텍스트 줄바꿈하는 방법을 알아봅시다.

## React에서 텍스트 줄바꿈?

```javascript
const text = "동해물과 백두산이\n 마르고 닳도록"
```

위 문장을 React에서 출력하려면 어떻게 해야할까요?  
일반적으로 JSX에서는 **개행 문자('\n')가 동작하지 않아** 아래와 같이 출력이 됩니다.

```
동해물과 백두산이 마르고 닳도록
```

그러면 아래와 같이 줄바꿈 태그인 \<br/>을 사용하면 어떨까요?

```javascript
const text = "동해물과 백두산이<br/> 마르고 닳도록"
```

**\<br/>이 문자 그대로 출력**됩니다.

```
동해물과 백두산이<br/> 마르고 닳도록
```

## 아니 그러면 어떻게 해결하나요?

CSS 상에서 **white-space:pre-wrap을 설정**해주시면 됩니다.

```css
white-space: pre-wrap;
```

개행 문자('\n')을 잘 인식하여 줄바꿈한 결과를 출력하게 됩니다.

```
동해물과 백두산이
마르고 닳도록
```

### 2021.09.19 추가

줄바꿈만 하고 싶다면 **white-space: pre-line**이 더욱 좋은 방법일 수 있습니다.  
아래는 [공식 도큐먼트](https://developer.mozilla.org/ko/docs/Web/CSS/white-space) 설명입니다.

**pre-wrap**: **연속 공백 유지**. 줄 바꿈은 개행 문자와 <br> 요소에서 일어나며, 한 줄이 너무 길어서 넘칠 경우 자동으로 줄을 바꿉니다.  
**pre-line**: **연속 공백을 하나로 합침**. 줄바꿈은 개행 문자와 <br> 요소에서 일어나며, 한 줄이 너무 길어서 넘칠 경우 자동으로 줄을 바꿉니다.
