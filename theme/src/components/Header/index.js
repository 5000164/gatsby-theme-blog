import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { theme } from "../../../theme"

const Header = () => (
  <StyledHeader>
    <Link to={"/"}>
      <HomeIcon>
        <path
          fill={theme.backgroundColor}
          stroke={theme.color}
          stroke-width="2px"
          d="
            M 2,14
            C 2,2 2,2 14,2
            S 26,2 26,14
              26,26 14,26
              2,26 2,14
          "
        />
      </HomeIcon>
    </Link>
  </StyledHeader>
)

const StyledHeader = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  width: min(600px, calc(100% - 32px));
  margin: 16px auto 0;
`

const HomeIcon = styled.svg`
  width: 28px;
  height: 28px;
`

export default Header
