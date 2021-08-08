import React, { useState, FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

type SideMenuWrapperProps = {
	active: boolean;
};

const SideMenuWrapper = styled.div<SideMenuWrapperProps>`
	z-index: 50;
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
	&:hover {
		background-color: black;
		color: white;
	}
`;

const SideMenu: FunctionComponent<SideMenuWrapperProps> = function ({active}) {

	return (
		<>

			<SideMenuWrapper active={active}>
				<SideMenuList>
					<SideMenuItem to="/">Home</SideMenuItem>
					<SideMenuItem to="/about/">About</SideMenuItem>
					<SideMenuItem to="/posts/?category=All">Posts</SideMenuItem>
					<SideMenuItem to="/projects/">Projects</SideMenuItem>
				</SideMenuList>
			</SideMenuWrapper>
		</>
	);
};

export default SideMenu;