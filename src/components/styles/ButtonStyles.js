import styled from "styled-components"

export const StyledButton = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  margin-top: 40px;
  width: 15rem;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
  :hover {
    filter: hue-rotate(10deg) brightness(150%) saturate(120%);
  }
`
