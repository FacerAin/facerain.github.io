import React, { useState, FunctionComponent } from 'react';
import { BsList } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

type SideMenuWrapperProps = {
	active: boolean;
};

const SideMenuButton = styled.div`
	z-index: 10;
	top: 30px;
	left: 30px;
	width: 30px;
	height: 30px;
	position: fixed;
	place-items: center;
	display: grid;
	color: #000000;
	font-size: 22px;
`;

const SideMenuWrapper = styled.div<SideMenuWrapperProps>`
	z-index: 9;
	display: flex;
	flex-direction: column;
	position: fixed;
	height: 100%;
	width: 400px;
	top: 0;
	left: ${({ active }) => (!active ? '-400px' : '0px')};
	transition: 1s;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
	background-color: white;
`;

const SideMenuList = styled.div`
	margin-top: 150px;
	margin-right: 30px;
`;

const SideMenuItem = styled(Link)`
	display: block;
	border-bottom: 1px solid black;
	padding: 10px;
	margin-bottom: 5px;
	&: {
		color: red;
	}
`;

const SideMenu: FunctionComponent = function () {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSideMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<SideMenuButton onClick={toggleSideMenu}>
				<BsList size={50} />
			</SideMenuButton>
			<SideMenuWrapper active={isOpen}>
				<SideMenuList>
					<SideMenuItem to="/">Home</SideMenuItem>
					<SideMenuItem to="about">About</SideMenuItem>
					<SideMenuItem to="posts">Posts</SideMenuItem>
					<SideMenuItem to="projects">Projects</SideMenuItem>
				</SideMenuList>
			</SideMenuWrapper>
		</>
	);
};

export default SideMenu;