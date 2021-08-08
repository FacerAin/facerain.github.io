import React, { FunctionComponent, useState } from 'react';
import SideMenu from 'components/Common/SideMenu';
import styled from '@emotion/styled';
import { BsList, BsX } from 'react-icons/bs';
import { Link } from 'gatsby';

const SideMenuButton = styled.div`
	z-index: 100;
	place-items: center;
	display: grid;
	&:hover {
		cursor: pointer;
	}
`;

const HeaderWrapper = styled.div`
	z-index: 9;
	display: flex;
	width: 100%;
	height: 50px;
	background-color: black;
	position: fixed;
	justify-content: space-between;
	align-items: center;
`;

const TitleItem = styled(Link)`
	z-index: 50;
	width: 70px;
	height: 35px;
	color: white;
	font-size: 30px;
	&:hover {
		color: white;
	}
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
					{isOpen ? <BsX size={50} color="black" /> : <BsList size={50} color="white" />}
				</SideMenuButton>
				<SideMenu active={isOpen} />
				<TitleItem to="/">_FacerAin</TitleItem>
				<TitleItem></TitleItem>
			</HeaderWrapper>
		</>
	);
};

export default Header;