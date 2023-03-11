import React, { FC, useEffect } from "react"
import styled from "@emotion/styled"
interface TableProps {
  tableOfContents: any
}

const HEADER_OFFSET_Y = 100
let currentHeaderUrl: any

const TableWrapper = styled.div`
  position: absolute;
  top: 100px;
  height: 100%;
  left: 800px;
  width: 200px;
`
const TableContainer = styled.div`
  display: none;
  @media screen and (min-width: 1200px) {
    position: sticky;
    display: inline-block;
    font-size: 14px;
    margin-top: 2rem;
    top: 100px;
    max-height: calc(100vh - 200px);
  }
`
const text = "#reference"
const TableBox = styled.div`
  /*
  a [href=${"#" + currentHeaderUrl}] {
    font-size: 15px;
    color: black;
    font-weight: 600;
  }
  */
  li {  
    padding: 3px;
    color: gray;
  }

  * [href*=${text}] {
    font-size: 15px;
    color: red;
    font-weight: 600;
  }

  ul {
    margin-left: 10px;
    list-style: none;
  }
  a:hover {
    color: black;
  }
`

const Table: FC<TableProps> = function ({ tableOfContents }) {
  useEffect(() => {
    const handleScroll = () => {
      let aboveHeaderUrl
      console.log("#" + currentHeaderUrl)
      const currentOffsetY = window.pageYOffset
      const headerElements: any = document.querySelectorAll(".anchor-header")
      for (const elem of headerElements) {
        const { top } = elem.getBoundingClientRect()

        const elemTop = top + currentOffsetY
        const isLast = elem === headerElements[headerElements.length - 1]
        if (currentOffsetY < elemTop - HEADER_OFFSET_Y) {
          aboveHeaderUrl && (currentHeaderUrl = aboveHeaderUrl.split("#")[1])
          !aboveHeaderUrl && (currentHeaderUrl = undefined)
          break
        } else {
          isLast && (currentHeaderUrl = elem.href.split("#")[1])
          !isLast && (aboveHeaderUrl = elem.href)
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [currentHeaderUrl])
  return (
    <TableWrapper>
      <TableContainer>
        <TableBox dangerouslySetInnerHTML={{ __html: tableOfContents }} />
      </TableContainer>
    </TableWrapper>
  )
}

export default Table
