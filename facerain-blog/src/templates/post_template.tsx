import React, { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import Template from 'components/Common/Template';
import PostHead, { PostHeadProps } from 'components/Post/PostHead';
import PostContent from 'components/Post/PostContent';

interface PostTemplateProps {
	data: {
		allMarkdownRemark: {
			edges: [
				{
					node: {
						html: string;
						frontmatter: PostHeadProps & { summary: string };
					};
				}
			];
		};
	};
}

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
	data: {
		allMarkdownRemark: { edges },
	},
}) {
	const {
		node: { html, frontmatter },
	} = edges[0];

	return (
		<Template>
			<PostHead {...frontmatter} />
			<PostContent html={html} />
		</Template>
	);
};

export default PostTemplate;

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
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
            }
          }
        }
      }
    }
  }
`;