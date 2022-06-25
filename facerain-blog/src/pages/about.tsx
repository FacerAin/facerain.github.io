import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import GlobalStyle from 'components/Common/GlobalStyle';
import { AiOutlineMail, AiOutlineGithub, AiOutlineHome } from 'react-icons/ai';

const NotFoundPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;


const MainAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30vh;
  margin-bottom: 100px;
  margin-top: 50px;
`

const AbstarctAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30vh;
  margin-bottom: 100px;
`

const ProjectsAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30vh;
  margin-bottom: 100px;
`

const ContactAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30vh;
  margin-bottom: 100px;
`

const ContactAreaItemWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`

const ContactAreaItem = styled(Link)`
padding: 30px;
`
const ContactAreaMailItem = styled.a`
padding: 30px;
`
const MainHeaderText = styled.div`
  padding-left:40px;
  padding-right:40px;
  font-size: 64px;
  font-weight: 800;
  border-top: solid;
  border-top-width: thick;
  border-bottom: solid;
  margin-top: 30px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    font-size: 50px;
  }
`

const LinkText = styled(Link)`
text-decoration: underline;
`
const ImpactText = styled.div`
font-size: 20px;
margin-top: 20px;
margin-bottom: 30px;
font-weight: 800;
`
const DescriptionText = styled.div`
  font-size: 20px;
  text-align: center;
`

const UserNameText = styled.div`
  font-size: 45px;
  @media (max-width: 768px) {
    font-size: 35px;
  }
`

const MainLinkText = styled(Link)`
  font-size: 23px;
  padding: 5px;
  text-decoration: underline;
  @media (max-width: 768px) {
    font-size: 35px;
  }
`

const MailLinkText = styled.a`
font-size: 23px;
padding: 5px;
text-decoration: underline;
@media (max-width: 768px) {
  font-size: 35px;
}
`

const SubHeaderText = styled.div`
  font-size: 35px;
  @media (max-width: 768px) {
    font-size: 35px;
}
`

const NotFoundPage: FunctionComponent = function () {
  return (
    <NotFoundPageWrapper>
      <GlobalStyle />
      <MainAreaWrapper>
        <MainHeaderText>Growth Is All I need</MainHeaderText>
        <UserNameText>Yongwoo Song</UserNameText>
        <MailLinkText href='mailto:ywsong.dev@kakao.com'>ywsong.dev@kakao.com</MailLinkText>
        <MainLinkText to='http://facerain.club'>http://facerain.club</MainLinkText>
      </MainAreaWrapper>
      <AbstarctAreaWrapper>
        <SubHeaderText>Abstract</SubHeaderText>
        <ImpactText>"우리의 무한을 바다의 유한 위에 흔들면서"</ImpactText>
        <DescriptionText>시간이 흘러도 사람들에게 뜻 깊은 가치를 전달하는 <strong>NLP 엔지니어</strong>를 꿈꾸고 있습니다. <br/>
        최근에는 <strong>언어 모델</strong>과 <strong>오픈 도메인 챗봇</strong>에 관심이 많습니다.<br/>
        함께 배우고, 만들고, 성장하는 것을 추구합니다.<br/>
        관련하여 동아리에서 다양한 스터디와 프로젝트를 리드한 경험이 있습니다.<br/>
        배우고 느낀 것들을 <LinkText to='https://facerain.club'>기술 블로그</LinkText>에 차곡차곡 남기고 있습니다. <br/>

        </DescriptionText>
      </AbstarctAreaWrapper>

      <ProjectsAreaWrapper>
      <SubHeaderText>Projects</SubHeaderText>
      <DescriptionText>
        TBA
      </DescriptionText>
      </ProjectsAreaWrapper>

      <ContactAreaWrapper>
      <SubHeaderText>Contact</SubHeaderText>
      <ContactAreaItemWrapper>

<ContactAreaItem to='https://facerain.club'>        <AiOutlineHome size={'5em'}></AiOutlineHome></ContactAreaItem>
<ContactAreaItem to="https://github.com/FacerAin">        <AiOutlineGithub size={'5em'}></AiOutlineGithub></ContactAreaItem>
<ContactAreaMailItem href='mailto:ywsong.dev@kakao.com'>
        <AiOutlineMail size={'5em'}></AiOutlineMail>
        </ContactAreaMailItem>

      </ContactAreaItemWrapper>
 
      </ContactAreaWrapper>
    </NotFoundPageWrapper>
  );
};

export default NotFoundPage;