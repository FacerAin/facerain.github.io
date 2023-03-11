import React, { FunctionComponent } from "react"
import { graphql } from "gatsby"
import Template from "components/Common/Template"
import PostHead from "components/Post/PostHead"
import PostContent from "components/Post/PostContent"
import { FluidObject } from "gatsby-image"
import DisqusContent from "components/Post/DisqusContent"
import Table from "components/Post/Table"
import styled from "@emotion/styled"
interface PostTemplateProps {
  data: {
    site: {
      siteMetadata: {
        siteUrl: string
      }
    }
    allMarkdownRemark: {
      edges: [
        {
          node: {
            id: string
            html: string
            tableOfContents: any
            frontmatter: {
              title: string
              summary: string
              date: string
              categories: string[]
              thumbnail: {
                childImageSharp: {
                  fluid: FluidObject
                }
                publicURL: string
              }
            }
          }
        }
      ]
    }
  }
  location: {
    href: string
  }
}

const PostContainer = styled.div`
  margin: 0 auto;
  position: relative;
`

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
      tableOfContents,
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
  } = edges[0]

  return (
    <Template title={title} description={summary} url={href} image={publicURL}>
      <PostHead
        title={title}
        date={date}
        categories={categories}
        thumbnail={fluid}
      />
      <PostContainer>
        <PostContent html={html} />
        <Table tableOfContents={tableOfContents} />
      </PostContainer>

      <DisqusContent siteUrl={siteUrl} pathname={href} id={id} title={title} />
    </Template>
  )
}

export default PostTemplate

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
          tableOfContents
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
`
