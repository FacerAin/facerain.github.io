import React, { FunctionComponent, ReactNode } from "react"
import styled from "@emotion/styled"
import GlobalStyle from "components/Common/GlobalStyle"
import Footer from "components/Common/Footer"
import Header from "components/Common/Header"
import { Helmet } from "react-helmet"

interface TemplateProps {
  title: string
  description: string
  url: string
  image: string
  children: ReactNode
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;
  overflow-x: hidden;
`

const Template: FunctionComponent<TemplateProps> = function ({
  title,
  description,
  url,
  image,
  children,
}) {
  return (
    <Container>
      <Helmet>
        <title>{title}</title>

        <meta
          name="google-site-verification"
          content="U5sap4VsSQ8k1jxwnJhhuw49vXMSKUooDWhMWXAFRUY"
        />
        <meta
          name="naver-site-verification"
          content="291793568c5c106a55dcc6e1d7407c86cfaf7783"
        />
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={title} />

        <html lang="ko" />
      </Helmet>

      <GlobalStyle />
      <Header />
      {children}
      <Footer />
    </Container>
  )
}

export default Template
