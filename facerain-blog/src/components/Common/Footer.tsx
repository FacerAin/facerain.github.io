import React, { FunctionComponent } from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
const FooterWrapper = styled.footer`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`
const LinkText = styled(Link)`
  text-decoration: underline;
  display: inline;
`

const Footer: FunctionComponent = function () {
  return (
    <FooterWrapper>
      <div>
        <br />© 2021 Designed By <LinkText to="about">Yongwoo Song</LinkText>,
        Powered By Gatsby.
      </div>
    </FooterWrapper>
  )
}

export default Footer
