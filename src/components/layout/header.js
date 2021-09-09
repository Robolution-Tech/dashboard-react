import React, { useContext } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { UserLoginContext } from "../../context/UserLoginContext"
import { UserTokenContext } from "../../context/UserTokenContext"

// const menuDataNoLogin = ["Home", "User Login", "About Us"]
const menuDataNoLogin = [
  { title: "Home", icon: "/images/icons/home.svg", link: "/" },
  {
    title: "User Login",
    icon: "/images/icons/account.svg",
    link: "/signin",
  },
  { title: "About Us", icon: "/images/icons/team.svg", link: "/aboutus" },
  {
    title: "Contact",
    icon: "/images/icons/chat.svg",
    link: "/contactus",
  },
]

const menuDataLogin = [
  { title: "Home", icon: "/images/icons/home.svg", link: "/" },
  {
    title: "Dashboard",
    icon: "/images/icons/courses.svg",
    link: "/dashboard",
  },
  {
    title: "Streaming",
    icon: "/images/icons/livestreams.svg",
    link: "/streaming",
  },
  {
    title: "Profile",
    icon: "/images/icons/certificates.svg",
    link: "/profile",
  },
  { title: "Sign Out", icon: "/images/icons/account.svg", link: "/" },
]

async function controlStream(
  command = "off",
  user,
  token,
  companyId,
  projectId,
  deviceId
) {
  const response = await fetch(
    `https://fastapi.robolution.ca/site_monitor/streaming/stream_` +
      command +
      `/?companyId=` +
      companyId +
      `&projectId=` +
      projectId +
      `&deviceId=` +
      deviceId +
      `&token=` +
      token +
      `&user=` +
      user,
    { method: "POST", headers: { accept: "application/json" } }
  )
  return response.json()
}

export default function Header() {
  const { isLogin, setLogin } = useContext(UserLoginContext)
  const { userToken } = useContext(UserTokenContext)
  var finalMenudata = menuDataNoLogin
  if (isLogin[0] !== "false") {
    finalMenudata = menuDataLogin
  }
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
      <MenuWrapper count={finalMenudata.length}>
        {finalMenudata.map((item, index) =>
          item.title === "Sign Out" ? (
            <Link
              to={item.link}
              key={index}
              onClick={() => {
                setLogin(["false", " "])
                controlStream(
                  "off",
                  isLogin[0],
                  userToken,
                  isLogin[1],
                  "all",
                  "all"
                )
              }}
            >
              <MenuItem>
                <img src={item.icon} alt={item.title} />
                {item.title}
              </MenuItem>
            </Link>
          ) : (
            <Link to={item.link} key={index}>
              <MenuItem>
                <img src={item.icon} alt={item.title} />
                {item.title}
              </MenuItem>
            </Link>
          )
        )}
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
