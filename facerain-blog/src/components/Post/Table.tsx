import React, { FC } from "react"
import styled from "@emotion/styled"
interface TableProps {
  tableOfContents: any
}
const TableBox = styled.div`
  display: none;
  @media screen and (min-width: 1200px) {
    position: sticky;
    display: block;
    fontsize: 14px;
  }
`

const Table: FC<TableProps> = function ({ tableOfContents }) {
  return (
    <TableBox>
      <div dangerouslySetInnerHTML={{ __html: tableOfContents }} />
    </TableBox>
  )
}

export default Table
