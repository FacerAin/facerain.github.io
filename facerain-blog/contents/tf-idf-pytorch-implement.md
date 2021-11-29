---
date: '2021-11-25'
title: '[5분 NLP] TF-IDF 구현하기 with Sklearn'
categories: ['NLP', 'Tip']
summary: 'Scikit Learn으로 TF-IDF를 구현하는 방법을 알아봅시다.'
thumbnail: './tf-idf-pytorch-implement/th.jpg'
---
이번 시간에는  Scikit Learn을 이용하여 **TF-IDF를 간편하게 구현** 하는 방법을 알아봅니다.  

## 사이킷런 이용하기
```python
from sklearn.feature_extraction.text import TfidfVectorizer
docs = ['i like this movie', 'i like this pasta', 'i love sam']
tfidf_vectorizer = TfidfVectorizer()
tfidf_vectorizer.fit(docs)

```


## Reference
- [https://towardsdatascience.com/natural-language-processing-feature-engineering-using-tf-idf-e8b9d00e7e76](https://towardsdatascience.com/natural-language-processing-feature-engineering-using-tf-idf-e8b9d00e7e76)


