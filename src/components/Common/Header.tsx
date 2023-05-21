import React, { FunctionComponent } from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"

const HeaderWrapper = styled.div`
  z-index: 9;
  display: flex;
  width: 100vw;
  height: 8vh;
  background-color: black;
  position: fixed;
  justify-content: space-around;
  align-items: center;
`

const CategoryList = styled.div`
  z-index: 50;
  width: 30vw;
  height: 35px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const CategoryItem = styled(Link)`
  z-index: 50;
  color: white;
  &:hover {
    color: white;
  }

`

const TitleItem = styled(Link)`
  z-index: 50;
  width: 5vw;
  height: 35px;
  color: white;
  font-size: 30px;
  &:hover {
    color: white;
  }
`

const Header: FunctionComponent = function () {

  return (
    <>
      <HeaderWrapper>
        <TitleItem to="/">FacerAin</TitleItem>
        <CategoryList>
          <CategoryItem to="/posts/?category=All">Posts</CategoryItem>
          <CategoryItem to="/til/?category=All">TIL</CategoryItem>
          <CategoryItem to="https://facerain.notion.site/RESUME-2023-2-ff535d450a534d7d9f32412eb72b1e53">About</CategoryItem>
        </CategoryList>
      </HeaderWrapper>
    </>
  )
}

export default Header
