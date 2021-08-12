import React, { useContext } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { Caption2, SmallText } from "../styles/TextStyles"
import { UserLoginContext } from "../../context/UserLoginContext"

export default function LoginButton(props) {
  const { title, subtitle } = props
  const { isLogin } = useContext(UserLoginContext)
  var dirPage = ""
  if (isLogin[0] !== "false") {
    dirPage = "/dashboard"
  } else {
    dirPage = "/signin"
  }
  return (
    <Link to={dirPage}>
      <Wrapper>
        <IconWrapper>
          {/* <Ring src="/images/icons/icon-ring.svg" /> */}
          <Icon src="/images/icons/account.svg" />
        </IconWrapper>
        <TextWrapper>
          <Title>{title || "User Login"}</Title>
          <Subtitle>{subtitle || "Robolution Users"}</Subtitle>
        </TextWrapper>
      </Wrapper>
    </Link>
  )
}

const Wrapper = styled.div`
  max-width: 280px;
  height: 77px;
  padding: 12px;
  background: linear-gradient(180deg, #ffffff 0%, #d9dfff 100%);
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 20px 40px rgba(23, 0, 102, 0.2),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  display: grid;
  grid-template-columns: 53px auto;
  align-items: center;
  gap: 20px;
  *,
  & {
    transition: 0.3s ease-in-out;
  }
  :hover {
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 30px 60px rgba(23, 0, 102, 0.5),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
    transform: translateY(-3px) scale(1.1);
  }
`

const Title = styled(Caption2)`
  color: black;
`
const Subtitle = styled(SmallText)`
  color: black;
  opacity: 0.7;
`
const TextWrapper = styled.div`
  display: grid;
  gap: 4px;
`

const IconWrapper = styled.div`
  width: 45px;
  height: 45px;
  background: linear-gradient(200.44deg, #4316db 13.57%, #9076e7 98.38%);
  border-radius: 50%;
  display: grid;
  justify-content: center;
  align-content: center;
  justify-self: center;
  position: relative;

  ${Wrapper}:hover & {
    filter: hue-rotate(10deg) brightness(150%) saturate(120%);
  }
`
const Icon = styled.img`
  width: 29px;
  height: 29px;
`

// const Ring = styled.img`
//   position: absolute;
//   top: 0px;
//   left: 2px;
//   scale: 5;
//   ${Wrapper}:hover & {
//     transform: rotate(30deg) scale(1.2) translate(1px, 1px);
//   }
// `
