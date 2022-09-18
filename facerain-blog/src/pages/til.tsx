import React, { FunctionComponent, useMemo } from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import GlobalStyle from "components/Common/GlobalStyle"
import PostList from "components/Main/PostList"
import CategoryList from "components/Main/CategoryList"
import { graphql } from "gatsby"
import Template from "components/Common/Template"
import queryString, { ParsedQuery } from "query-string"
import Heatmap from "components/Main/Heatmap"


interface TilPageProps {
  location: {
    search: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
    allMarkdownRemark: {
      edges: PostType[]
    }
    file: {
      publicURL: string
      childImageSharp: {
        fluid: ProfileImageProps["profileImage"]
      }
    }
  }
}

const TilPageWrapper = styled.div`
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100vw;
`

const HeaderText = styled.div`
  margin-top: 30px;
  font-size: 50px;
  text-align: center;
`

const TilPage: FunctionComponent<TilPageProps> = function ({
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
  const parsed: ParsedQuery<string> = queryString.parse(search)
  const selectedCategory: string =
    typeof parsed.category !== "string" || !parsed.category
      ? "ALL"
      : parsed.category


  const dateList = useMemo(
    () => {
      let itemList = []
      for (let [_, item] of Object.entries(edges)) {
        let dateItem = item.node.frontmatter.date
        itemList.push({ date: dateItem, count: 1 })
      }
      return itemList
    },
    []
  )
  const categoryList = useMemo(
    () =>
      edges.reduce(
        (
          list: CategoryListProps["categoryList"],
          {
            node: {
              frontmatter: { categories },
            },
          }: PostType
        ) => {
          categories.forEach(category => {
            if (list[category] === undefined) list[category] = 1
            else list[category]++
          })

          list["All"]++

          return list
        },
        { All: 0 }
      ),
    []
  )
  return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}
    >
      <TilPageWrapper>
        <HeaderText>TIL :)</HeaderText>
        <Heatmap startDate={new Date('2022-09-18')} endDate={new Date('2023-09-19')} values={dateList} />
        <CategoryList
          categoryList={categoryList}
          selectedCategory={selectedCategory}
          isTil={true}
        />
        <PostList selectedCategory={selectedCategory} posts={edges} />
      </TilPageWrapper>
    </Template>
  )
}

export default TilPage

export const queryTilPage = graphql`
  query queryTilPage {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark (
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }, filter: {frontmatter: {isTIL: {eq: true}}}
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
            isTIL
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
`
