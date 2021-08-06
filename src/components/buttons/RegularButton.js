import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { StyledButton } from "../styles/ButtonStyles"

export default function RegularButton({ title, dst }) {
  return (
    <Wrapper>
      <Link to={dst}>
        <StyledButton>{title}</StyledButton>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div``
