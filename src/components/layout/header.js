import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

// const menuData = ["Home", "User Login", "About Us"]
const menuData = [
  { title: "Home", icon: "/images/icons/home.svg", link: "/" },
  {
    title: "User Login",
    icon: "/images/icons/account.svg",
    link: "/signin",
  },
  { title: "About Us", icon: "/images/icons/team.svg", link: "/aboutus" },
]

export default function Header() {
  return (
    <Wrapper>
      <Link to="/">
        <img
          src="/images/logos/logo.png"
          alt="company-logo"
          width="60"
          height="60"
        />
      </Link>
      <MenuWrapper count={menuData.length}>
        {menuData.map((item, index) => (
          <Link to={item.link} key={index}>
            <MenuItem>
              <img src={item.icon} alt={item.title} />
              {item.title}
            </MenuItem>
          </Link>
        ))}
      </MenuWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  display: grid;
  grid-template-columns: 44px auto;
  width: 100%;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;

  @media (max-width: 768px) {
    top: 30px;
  }
  @media (max-width: 450px) {
    top: 20px;
    padding: 0 20px;
  }
`

const MenuWrapper = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(${props => props.count}, auto);

  @media (max-width: 768px) {
    > a {
      display: none;
    }
    grid-template-columns: auto;
  }
`

const MenuItem = styled.div`
  color: rgba(255, 255, 255, 0.7);
  display: grid;
  grid-template-columns: 24px auto;
  gap: 10px;
  align-items: center;
  padding: 10px;
  transition: 0.5s ease-out;
  border-radius: 10px;

  :hover {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  }
`
