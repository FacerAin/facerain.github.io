---
isTIL: false
date: "2024-01-06"
title: "[논문 리뷰] Generative Agents: Interactive Simulacra of Human Behavior "
categories: ["NLP","Paper"]
summary: "Generative Agents 논문을 리뷰합니다."
thumbnail: "./generative-agent-paper/th.jpg"
---

## 들어가며

이번 시간에는 **Generative Agents: Interactive Simulacra of Human Behavior** 논문에 대해 함께 알아보도록 하겠습니다. [논문 링크](https://arxiv.org/abs/2304.03442)  

본 논문은 **인간의 행동을 모방할 수 있는 Agent**를 제안합니다. 많은 분들이 Sims나 동물의 숲과 같은 게임을 즐겨해보셨을 것인데요. 이러한 게임에서는 가상의 샌드박스 세계에서 자신의 캐릭터를 만들고, 다양한 NPC 들과 상호작용하며 게임을 즐길 수 있습니다. 본 논문에서 제안하는 Agent는 이러한 NPC와 비슷한 역할을 수행할 수 있습니다.  예를 들어 Agent들끼리 파티를 구성하고, 서로 대화를 나누는 등의 사회적 상호작용이 가능하죠.

논문에는 Agent 들이 실제로 서로 어떻게 상호작용하는지 흥미로운 사례도 많이 등장하고, 우리에게 친숙한 ChatGPT와 같은 LLM을 이용하여 이들을 어떻게 설계하고, 평가하는지에 대해서도 다루고 있습니다.  그럼 본 논문 리뷰를 시작해보겠습니다. 😄  

참고로 이들 Agent가 어떻게 동작하는지는 [웹 데모](https://reverie.herokuapp.com/arXiv_Demo/)에서 바로 확인해볼 수 있습니다. 한번 본 논문을 보기 전에 실제로 Agent들이 어떻게 생활하는지 확인해보세요!  

![1](generative-agent-paper/1.png "Generative Agent의 웹 데모")  

## Abstract
본 연구는 인간의 행동을 모방할 수 있는 Generative Agent를 제안합니다. 이를 위해 다음과 같은 동작을 설계했다고 합니다.
- 자연어를 활용하여 agent의 경험을 기록
- 이러한 기억들을 high-level의 회상 (reflection)으로 종합
- 다음 행동을 계획 (plan) 하기 위해 동적으로 기억들을 검색 (retreive)

이렇게 설계한 Agent를 활용하여 게임 Sims와 유사한 샌드박스 환경에서 25개의 agent의 상호작용을 시뮬레이션하였습니다. 그 결과 agent들은 믿을 수 있는 개별적이고 급격하게 나타나는 사회적 행동들 (believable individual and emergent social behaviors)을 보여주었다고 합니다.  

실제로 한 유저가 agent에게 발렌타인 데이 파티를 열고 싶다고 설정하면, agent가 알아서 파티를 준비하고, 다른 agent와 대화를 통해 날짜를 조율하고, 초대장을 나눠주는 등의 사회적인 행동을 보여준다고 합니다.

연구진은 아래 3가지 요소가 agent의 행동에 중요하게 기여한다는 사실을 보였습니다.
- observation (관찰)
- planning (계획)
- reflection (회상)

결론적으로 본 연구는 LLM과 computational interactive agent를 결합하여, 신뢰할 수 있는 인간 행동을 시뮬레이션 할 수 있는 아키텍처와 상호 작용 패턴에 대해 제시합니다.

## Introduction
본 연구의 주요 기여를 소개하면 아래와 같습니다.
- 변화하는 경험과 환경에도 동적으로 대응할 수 있는 **인간의 행동을 모방하는 Generative agents를 제시** 합니다.
- 이를 위해 다음 기능을 수행하는 **새로운 아키텍처를 제시** 합니다.
  - 다른 에이전트와 상호작용을 하고, 동적으로 변화하는 상황에서 **계획을 세우며 (plan), 기억을 회상 (reflect)하고 검색 (retreive)** 하는 것이 가능
  - Agent의 **장기적인 일관성 (longer-term cohernce)** 를 지원하고, 동적으로 변화하는 기억 (memory)를 관리하고, 재귀적으로 **high-level의 회고(reflection)를 생성**
- **controlled evaluation** 과 **end-to-end evaluation** 을 제안합니다.
- 본 연구를 통한 기회와 더불어 **윤리적, 사회적 위험에 대한 논의**를 제시합니다.

![2](generative-agent-paper/2.png)  

## Generative Agent Behavior and Interaction

### Agent Avatar and Communication
그럼 연구에서 각 agent avatar를 어떻게 설계하고, 이들이 다른 agent 또는 샌드박스 내 환경과 어떻게 상호작용하는지 알아보겠습니다.  

우선 agent avatar는 한 문단으로 된 자연어 설명을 통해 agent의 identity나 다른 agent와의 관계 등을 서술했다고 합니다. 예를 들어 John Lin이라는 agent avatar에 대한 설명은 다음과 같습니다.
```
John Lin은 Willow Market and Pharmacy에서 약사로 일하며 사람들을 돕는 것을 좋아합니다. 그는 항상 고객들이 약을 더 쉽게 받을 수 있도록 하는 방법을 찾고 있습니다. John Lin은 대학 교수인 아내 Mei Lin과 음악 이론을 공부하는 학생인 아들 Eddy Lin과 함께 살고 있습니다. John Lin은 가족을 매우 사랑합니다. John Lin은 몇 년 동안 옆집에 사는 노부부 Sam Moore와 Jennifer Moore를 알고 있습니다. John Lin은 Sam Moore가 친절하고 좋은 사람이라고 생각합니다. John Lin은 이웃인 Yuriko Yamamoto를 잘 알고 있습니다. John Lin은 이웃인 Tamara Taylor와 Carmen Ortiz를 알고 있지만, 아직 만나본 적은 없습니다. John Lin과 Tom Moreno는 The Willows Market and Pharmacy에서 동료입니다. John Lin과 Tom Moreno는 친구이며, 함께 지역 정치에 대해 토론하는 것을 좋아합니다. John Lin은 Moreno 가족을 어느 정도 알고 있습니다 - 남편 Tom Moreno와 아내 Jane Moreno.
```  

그리고 agent는 샌드박스 내 time-step마다 자신의 현재 action을 자연어로 출력합니다.
-  Isabella Rodriguez is writing in her journal.
-  Isabella Rodriguez is checking her emails.
-  Isabella Rodriguez is getting ready for bed.

더불어 agent들 간의 커뮤니케이션도 자연어로 이루어집니다. 예를 들어 아래와 같은 문장을 통해 agent들이 서로 대화를 나눌 수 있습니다.
```
이사벨라: 나는 아직 내 선택을 고민 중이지만, 샘 무어와 선거에 대해 이야기하고 있어. 그에 대한 너의 생각은 어떠니? 

톰: 솔직히 말해서, 나는 샘 무어를 좋아하지 않아. 나는 그가 커뮤니티와 동떨어져 있고, 우리의 최선의 이익을 가지고 있지 않다고 생각해.
```

더불어 샌드박스 밖의 유저도 agent들을 컨트롤 할 수 있습니다.
예를 들어 사용자를 뉴스 "reporter"로 하여 agent들에게 다음과 같은 질문을 할 수 있습니다.

```
reporter (사용자):  누가 선거에 출마하나요?
John: 나의 친구들 유리코, 톰 그리고 나는 다가오는 선거에 대해 이야기하고 있었어. 우리는 모두 샘 무어 후보를 좋아해서 그에게 투표하기로 결정했어.
```
또는 사용자는 에이전트의 **"내면의 목소리(inner voice)"** 를 통해 에이전트는 **사용자의 발언을 지시로 더 잘 받아들입니다.** 예를 들어, 사용자가 존의 내면의 목소리로 "너는 다가오는 선거에서 샘에게 도전하게 될 것이다"라고 말하면, 존은 선거에 출마하기로 결정하고 그의 후보자로서의 입장을 아내와 아들에게 공유한다고 합니다.

### Environmental Interaction
연구팀은 가상의 샌드박스 환경으로 **“Smallville”** 를 만들었습니다. 여기에는 카페, 바, 공원 등이 있으며 또한 주택 내부에도 화장실, 부엌 또는 침대, 책상 등 하위 영역과 객체들을 정의하였습니다.  

이를 통해 Agent 들은 Smallville를 돌아다니며 건물을 출입하고, 지도를 탐색하고, 다른 agent 들에게 접근할 수 있다고 합니다. 이때 에이전트의 움직임은 agent 아키텍처와 게임 엔진에 의해 결정되며, 모델이 agent가 이동할 위치를 지정하면, Smallville 환경 내에서 목적지까지의 이동 경로를 계산하여 agent가 이동할 수 있습니다.  

**심지어 샌드박스 외부의 사용자들도 Smallville 내에 agent로 자연스럽게 참여할 수 있다고 합니다.** 이미 샌드박스 내에 존재하는 agent를 제어할 수도 있고 또는 처음 등장하는 agent으로도 참여할 수 있습니다. 이때 Smallville의 주민들은 사용자가 제어하는 에이전트를 다른 에이전트와 다르게 대하지 않고 동일하게 그들을 기억하고, 상호작용을 시작하며, 의견을 형성할 수 있습니다.  

![3](generative-agent-paper/3.png)

**더불어 agent들은 이 샌드박스의 세계에 있는 객체의 상태에도 영향을 줄 수 있습니다.**

예를 들어, 어떤 에이전트가 잠을 자고 있을 때 침대는 점유 상태가 될 수 있고, 에이전트가 아침식사를 만들기 위해 재료를 모두 사용하면 냉장고는 비어있게 됩니다. 또한, 사용자는 에이전트 주변의 객체 상태를 자연어로 다시 작성함으로써 Smallville의 에이전트 환경을 재구성할 수도 있습니다. 예를 들어, 이사벨라가 아침식사를 준비하고 있을 때, 사용자는 시스템에 명령을 입력하여 객체를 선택하고 그 새로운 상태를 설명함으로써 부엌 스토브의 상태를 "켜짐"에서 "불타고 있음"으로 변경할 수 있습니다. 이렇게 하면 이사벨라는 다음 순간에 이를 알아차리고 스토브를 끄고 아침식사를 다시 만들게 됩니다. 마찬가지로, 사용자가 이사벨라가 욕실에 들어갔을 때 샤워기의 상태를 "물이 새고 있음"으로 설정하면, 그녀는 거실에서 도구를 가져와서 누수를 고치려고 할 것입니다.

![4](generative-agent-paper/4.png)

### Emergent Social Behavior
앞서 살펴본 agent 들은 사전-프로그래밍 없이도 자연스럽게 정보를 교환하고, 새로운 관계를 형성하고, 함께 활동을 조율할 수 있다고 합니다. 몇가지 사례를 살펴보겠습니다.

1. Information Diffussion  
agent간 대화를 통해 정보가 확산될 수 있습니다.  
아래 예시는 Sam과 Tom이 마트에서 만나서 Tom에게 이번 지방 선거에 출마한다는 사실을 말해주고 있습니다.  

```
Sam: 톰, 안녕 어떻게 지내?
Tom: 잘 지내. 무슨 일이야?
Sam: 사실, 나에게 얘기하고 싶은 게 있어. 나, 다가오는 지방 선거에서 시장으로 출마할 거야.
Tom: 정말? 대단한 소식이네! 왜 출마하려고 해?
Sam: 나는 수년 동안 지역 정치에 참여해 왔고, 우리 지역사회에 변화를 가져올 수 있다고 확신하고 있어. 더불어, 새로운 아이디어와 관점을 제시하고 싶어.
```  

이후 Tom은 John과 만나 전에 Tom에게 들었던 정보를 이용하여 대화를 하고 있습니다.

```
John: 나는 샘 무어가 지방 선거에서 시장으로 출마한다는 소식을 들었어. 너는 그가 이길 가능성이 크다고 생각하니?
Tom: 나는 그가 충분히 이길 수 있다고 생각해. 그는 지역사회에서 열심히 일하고 있고, 많은 지지를 받을 것 같아. 너는 어떻게 생각하니?
John: 그가 출마한다는 것이 좋다고 생각해. 선거 결과가 어떻게 될지 궁금하네.
```

2. Relationship memory
Agent 들은 시간이 지남에 따라 새로운 관계를 형성하고 다른 에이전트와의 상호작용을 기억할 수 있습니다.

```
처음에는 Sam이 Latoya Williams를 모릅니다. Sam이 Johnson Park에서 산책하다가 Latoya를 만나고, 그들은 서로 자기 소개를 합니다. Latoya는 그녀가 사진 프로젝트를 진행 중이라고 언급합니다: "나는 프로젝트를 위해 사진을 찍으러 왔어요." 나중의 상호작용에서, Sam의 Latoya와의 상호작용은 그 상호작용의 기억을 나타냅니다. 그는 "안녕, Latoya. 너의 프로젝트는 어떻게 진행되고 있니?"라고 묻고, 그녀는 "안녕, Sam. 잘 진행되고 있어!"라고 대답합니다.
```

3. Coordination  
Agent들은 서로 협력할 수 있습니다. 
```
Isabella Rodriguez는 Hobbs Cafe에서 2월 14일 오후 5시부터 7시까지 발렌타인 데이 파티를 계획하고자 합니다. 우선 에이전트는 Hobbs Cafe나 다른 곳에서 그녀를 만날 때 친구들과 고객들에게 초대를 합니다. 그런 다음 Isabella는 13일 오후에 카페를 장식하기 위해 시간을 보냅니다. Isabella의 친한 친구이자 자주 찾는 고객인 Maria가 카페에 도착합니다. Isabella는 Maria에게 파티 장식을 돕는 것을 요청하고, Maria는 동의합니다. Maria의 캐릭터 설명에는 그녀가 Klaus에게 반했다는 내용이 포함되어 있습니다. 그 날 밤, Maria는 그녀의 비밀스러운 짝 Klaus에게 파티에 참석하도록 초대합니다.
발렌타인 데이에는 Klaus와 Maria를 포함한 다섯 명의 에이전트들이 오후 5시에 Hobbs Cafe에 모여 축제를 즐깁니다. 이 시나리오에서, 최종 사용자는 Isabella의 초기 의도인 파티를 열고 Maria의 Klaus에 대한 짝사랑만 설정했습니다: 단어를 퍼뜨리기, 장식하기, 서로에게 물어보기, 파티에 도착하기, 그리고 파티에서 서로 상호작용하기 등의 사회적 행동들은 에이전트 아키텍처에 의해 시작되었습니다.
```
아래 그림은 실제 agent들이 발렌타인 데이 파티를 즐기는 모습입니다 😄  
![5](generative-agent-paper/5.png)  

## Generative Agent Architecture
그럼 위와 같은 agent들을 어떻게 설계하였는지 알아보겠습니다.
단순히 LLM만을 사용하게 되면, 프롬프트로 입력할 수 있는 context size에 제한이 있어 과거의 기억들을 효과적으로 활용할 수 없습니다. 

TBA