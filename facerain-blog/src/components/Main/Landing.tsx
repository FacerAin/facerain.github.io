import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { BsChevronDown } from 'react-icons/bs';
import Typewriter from 'typewriter-effect';

const LandingWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: black;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const MainTextArea = styled.div`
	font-size: 70px;
	color: white;
	margin-top: 40vh;
	width: 40vw;
	display: inline;
`;

const MainText1 = styled.div`
	font-size: 100px;
	padding-left: 10px;
	margin-bottom: 30px;
`;

const MainText2 = styled.div`
	padding-left: 10px;
`;

const ScrollDownButton = styled.div`
	margin-top: auto;
	color: white;
	margin-bottom: 30px;
	&: hover {
		margin-bottom: 25px;
	}
`;

const Landing: FunctionComponent = function () {
	const handleScrollDown = function () {
		window.scrollTo({
			top: document.documentElement.clientHeight,
			behavior: 'smooth',
		});
	};
	return (
		<LandingWrapper>
			<MainTextArea>
				<MainText2>
					<Typewriter
						onInit={(typewriter) => {
							typewriter
								.typeString('Learn')
								.pauseFor(2500)
								.deleteAll()
								.typeString('Grow')
								.pauseFor(2500)
								.deleteAll()
								.typeString('Make')
								.start();
						}}
					/>
				</MainText2>
				<MainText1>Together.</MainText1>
			</MainTextArea>
			<ScrollDownButton onClick={handleScrollDown}>
				<BsChevronDown size="30" />
			</ScrollDownButton>
		</LandingWrapper>
	);
};

export default Landing;