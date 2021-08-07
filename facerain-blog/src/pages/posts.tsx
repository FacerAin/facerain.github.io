import React, { FunctionComponent, useMemo } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import GlobalStyle from 'components/Common/GlobalStyle';
import PostList from 'components/Main/PostList';
import CategoryList from 'components/Main/CategoryList';
import { graphql } from 'gatsby';
import Template from 'components/Common/Template';
import useInfiniteScroll, {useInfiniteScrollType} from 'hooks/useInfiniteScroll';
import queryString, { ParsedQuery } from 'query-string';

interface PostsPageProps {
	location: {
		search: string;
	};
	data: {
		site: {
			siteMetadata: {
				title: string;
				description: string;
				siteUrl: string;
			};
		};
		allMarkdownRemark: {
			edges: PostType[];
		};
		file: {
			publicURL: string;
			childImageSharp: {
				fluid: ProfileImageProps['profileImage'];
			};
		};
	};
}


const PostsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const PostsPage: FunctionComponent<PostsPageProps> = function ({
	location: { search },
	data: {
		site: {
			siteMetadata: { title, description, siteUrl },
		},
		allMarkdownRemark: { edges },
		file: {
			publicURL,
			childImageSharp: { fluid },
		},
	},
}) {
	const parsed: ParsedQuery<string> = queryString.parse(search);
	const selectedCategory: string =
		typeof parsed.category !== 'string' || !parsed.category ? 'ALL' : parsed.category;
	const categoryList = useMemo(
		() =>
			edges.reduce(
				(
					list: CategoryListProps['categoryList'],
					{
						node: {
							frontmatter: { categories },
						},
					}: PostType
				) => {
					categories.forEach((category) => {
						if (list[category] === undefined) list[category] = 1;
						else list[category]++;
					});

					list['All']++;

					return list;
				},
				{ All: 0 }
			),
		[]
	);
	return (
		<Template title={title} description={description} url={siteUrl} image={publicURL}>
			{/*<Introduction profileImage={fluid}>*/}
			<CategoryList categoryList={categoryList} selectedCategory={selectedCategory}/>
			<PostList  selectedCategory={selectedCategory} posts={edges} />
		</Template>
	);
};

export default PostsPage;



export const queryPostsPage = graphql`
  query queryPostsPage {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                fluid(
                  maxWidth: 768
                  maxHeight: 200
                  fit: INSIDE
                  quality: 100
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 120, maxHeight: 120, fit: INSIDE, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;