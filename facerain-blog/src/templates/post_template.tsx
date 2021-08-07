import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import Template from 'components/Common/Template';
import PostHead from 'components/Post/PostHead';
import PostContent from 'components/Post/PostContent';
import { FluidObject } from 'gatsby-image';
import DisqusContent from 'components/Post/DisqusContent';

interface PostTemplateProps {
	data: {
		site: {
			siteMetadata: {
				siteUrl: string;
			}
		};
		allMarkdownRemark: {
			edges: [
				{
					node: {
						id: string;
						html: string;
						frontmatter: {
							title: string;
							summary: string;
							date: string;
							categories: string[];
							thumbnail: {
								childImageSharp: {
									fluid: FluidObject;
								};
								publicURL: string;
							};
						};
					};
				}
			];
		};
	};
	location: {
		href: string;
	};
}

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
	data: {
		site: {
			siteMetadata: { siteUrl },
		},
		allMarkdownRemark: { edges },
	},
	location: { href },
}) {
	const {
		node: {
			html,
			id,
			frontmatter: {
				title,
				summary,
				date,
				categories,
				thumbnail: {
					childImageSharp: { fluid },
					publicURL,
				},
			},
		},
	} = edges[0];

	return (
		<Template title={title} description={summary} url={href} image={publicURL}>
			<PostHead title={title} date={date} categories={categories} thumbnail={fluid} />
			<PostContent html={html} />
			<DisqusContent siteUrl={siteUrl} pathname={href} id= {id} title = {title}/>
		</Template>
	);
};

export default PostTemplate;

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
	site {
    siteMetadata {
      siteUrl
    }
  }
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                fluid(fit: INSIDE, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
              publicURL
            }
          }
        }
      }
    }
  }
`;