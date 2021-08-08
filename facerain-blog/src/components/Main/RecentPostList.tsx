import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import PostItem from 'components/Main/PostItem';
import { Link } from 'gatsby';
import { FluidObject } from 'gatsby-image';

type PostType = {
	node: {
		id: string;
		fields: {
			slug: string;
		};
		frontmatter: {
			title: string;
			summary: string;
			date: string;
			categories: string[];
			thumbnail: {
				childImageSharp: {
					fluid: FluidObject;
				};
			};
		};
	};
};

interface PostListProps {
	selectedCategory: string;
	posts: PostType[];
}

const HeaderText = styled.div`
font-size: 40px;
`;

const MoreButton = styled(Link)`
border: 1px solid black;
width: 70px;
height: 40px;
line-height: 40px;
text-align: center;
&:hover{
background-color: black;
color: white;
}
`

const PostListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 768px;
  margin: 0 auto;
  padding: 50px 0 100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 50px 20px;
  }
`;

const RecentPostListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 768px;
	margin: 0 auto;
	padding: 50px 0 100px;

	@media (max-width: 768px) {
		width: 100%;
		padding: 50px 20px;
	}
`;

const RecentPostList: FunctionComponent<PostListProps> = function ({ selectedCategory, posts }) {
	const RecentPosts = posts.slice(0, 4);
	return (
		<RecentPostListWrapper>
			<HeaderText>
			Recent Posts
			</HeaderText>
			<PostListContainer>
						{RecentPosts.map(({ node: { id, fields: { slug }, frontmatter } }: PostType) => (
				<PostItem {...frontmatter} link={slug} key={id} />
			))}
			</PostListContainer>
			
			<MoreButton to='/posts/?category=All'>
			더보기
			</MoreButton>

		</RecentPostListWrapper>
	);
};

export default RecentPostList;