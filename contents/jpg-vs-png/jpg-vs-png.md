---
isTIL: false
date: "2023-05-21"
title: "JPG vs PNG"
categories: ["Tip", "Development"]
summary: "JPG와 PNG의 차이점을 알아봅니다."
thumbnail: "th.jpg"
---

### 들어가며,
어느날 우연히 이미지 저장 방식에 호기심이 생겨 간단한 실험을 해보았습니다.

```python
from PIL import Image

im = Image.open("img.jpg").convert("RGB")

im.save("img_jpg.jpg", "jpeg")
im.save("img_png.png", "png")
```

다음과 같이 이미지를 불러와서 각각 **jpg와 png 확장자로 저장**을 해보았습니다.

그랬더니, **원본 5,824kb**의 이미지 파일이 
하나는 **1,116kb** 나머지 하나는 **12,530kb**으로 저장이 되었습니다.

이 속에는 어떤 원리가 숨어 있을까요?

### 손실 압축 VS 비손실 압축
먼저 두 확장자의 특징에 대한 이해가 필요합니다!

**JPG(JPEG, Joint Photographic Experts Group)**

- **손실 압축** 파일 형식
- 최대 1,600만 개의 색상

> Q. 근데 왜 JPEG를 JPG라고 하죠?  
> A. 옛날에 MS-DOS에 확장자가 3글자만 지원되던 시절이 있었다고 합니다.

**PNG(Portable Network Graphics)**

- **비손실 압축** 파일 형식
- 투명한 배경 사용 가능 (RGB 이외 알파 채널도 지원)
- 최대 1,600만 개의 색상


두 확장자의 가장 큰 차이는 바로 **압축 방식**입니다.

여기서 **손실 압축**과 **비손실 압축**에 대해 조금 더 알아보겠습니다.

비손실 압축이란 압축된 상태에서 손실 없이 원래대로 되돌릴 수 있는 것을 의미합니다. 

이와 반대로 되돌릴 수 없다면 손실 압축입니다.

손실 압축은 원본 데이터에서 정보 손실이 있는 반면 압축률이 높다는 장점이 있습니다.

손실 압축 예시

- jpg, mp3, mp4, h-264, avi

비손실 압축 예시

- raw, bmp, png, wav, flac

**엔지니어링은 곧 비용과의 싸움**이라고 생각합니다. 따라서 우리 주변에 있는 다양한 압축 기법들에 대해서 고민해보셔도 좋을 것 같다고 생각합니다! 감사합니다. 👍