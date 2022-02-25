import React, { FunctionComponent, useMemo } from "react"
import styled from "@emotion/styled"
import PostItem from "components/Main/PostItem"
import { FluidObject } from "gatsby-image"
export type PostType = {
  node: {
    id: string
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      summary: string
      date: string
      categories: string[]
      thumbnail: {
        childImageSharp: {
          fluid: FluidObject
        }
      }
    }
  }
}

interface PostListProps {
  selectedCategory: string
  posts: PostType[]
}

const PostListWrapper = styled.div`
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
`

const PostList: FunctionComponent<PostListProps> = function ({
  selectedCategory,
  posts,
}) {
  const postListByCategory = useMemo<PostType[]>(
    () =>
      posts.filter(
        ({
          node: {
            frontmatter: { categories },
          },
        }: PostType) =>
          selectedCategory !== "All"
            ? categories.includes(selectedCategory)
            : true
      ),
    [selectedCategory]
  )

  return (
    <PostListWrapper>
      {postListByCategory.map(
        ({
          node: {
            id,
            fields: { slug },
            frontmatter,
          },
        }: PostType) => (
          <PostItem {...frontmatter} link={slug} key={id} />
        )
      )}
    </PostListWrapper>
  )
}

export default PostList
