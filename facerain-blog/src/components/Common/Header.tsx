import React, { FunctionComponent, useState } from 'react';
import SideMenu from 'components/Common/SideMenu';
import styled from '@emotion/styled';
import { BsList, BsX } from 'react-icons/bs';

const SideMenuButton = styled.div`
	z-index: 100;
	place-items: center;
	display: grid;
`;

const HeaderWrapper = styled.div`
	z-index: 9;
	display: flex;
	width: 100%;
	height: 50px;
	background-color: black;
	position: fixed;
	align-items: center;
`;

const TitleItem = styled.div`
	z-index: 50;
	width: 70px;
	height: 35px;
	margin-left: 30px;
	color: white;
font-size: 30px;
`;

const Header: FunctionComponent = function () {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSideMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			
			<HeaderWrapper>
				<SideMenuButton onClick={toggleSideMenu}>
					{
						isOpen ? <BsX size={50} color="black" /> :  <BsList size={50} color="white" />
					}
					
				</SideMenuButton>
					<SideMenu active={isOpen}/>
			<TitleItem>
			FacerAin
			</TitleItem>
			</HeaderWrapper>

		</>
	);
};

export default Header;