import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { BsChevronDown } from 'react-icons/bs';

const LandingWrapper = styled.div`
width: 100vw;
height: 100vh;
background-color: black;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

const MainTextArea = styled.div`
font-size: 70px;
color: white;
margin-top: 40vh;
width: 40vw;
display: inline;
`

const MainText1 = styled.div`
background-color: green;
padding-left: 10px;
margin-bottom: 30px;
`

const MainText2 = styled.div`
padding-left: 10px;
background-color: red;
`


const ScrollDownButton = styled.div`
margin-top: auto;
color: white;
margin-bottom: 30px;
`

const Landing: FunctionComponent = function () {
	const handleScrollDown = function(){
		window.scrollTo({
			top: document.documentElement.clientHeight,
			behavior: "smooth"
		});
	}
	return(
	<LandingWrapper>
			<MainTextArea>
				<MainText1>
					THINK
				</MainText1>
				<MainText2>
				CREATIVE.
				</MainText2>
			
			</MainTextArea>
			<ScrollDownButton onClick = {handleScrollDown}>
			<BsChevronDown size="30"/>
			</ScrollDownButton>
	</LandingWrapper>
	);
};

export default Landing;