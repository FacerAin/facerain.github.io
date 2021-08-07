import React, { FunctionComponent, useMemo } from 'react';
import styled from '@emotion/styled';
import Template from 'components/Common/Template';
import CategoryList from 'components/Main/CategoryList';
import Introduction from 'components/Main/Introduction';
import PostList, { PostType } from 'components/Main/PostList';
import { ProfileImageProps } from 'components/Main/ProfileImage';
import Landing from 'components/Main/Landing';
import RecentPostList from 'components/Main/RecentPostList';
import { graphql } from 'gatsby';
import queryString, { ParsedQuery } from 'query-string';

interface IndexPageProps {
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

const IndexPage: FunctionComponent<IndexPageProps> = function ({
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
			<Landing />
			{/*<Introduction profileImage={fluid}>*/}
			<RecentPostList selectedCategory={selectedCategory} posts={edges} />
		</Template>
	);
};

export default IndexPage;

export const queryPostList = graphql`
  query queryPostList {
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