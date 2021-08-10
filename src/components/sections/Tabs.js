import React from "react"
import styled from "styled-components"

const TabButtonWrapper = styled.div`
  margin-bottom: 50px;
`
const Button = styled.button`
  margin-right: 15px;
  font-size: 20px;
  background: transparent;
  border: none;
  outline: none;
  padding: 10px 20px;
  cursor: pointer;
  color: ${props => (props.active ? "black" : "rgba(0, 0, 0, 0.4)")};
  transition: all ease-in-out 0.2s;
  border-bottom: 2px solid
    ${props => (props.active ? "#42b3f4" : "transparent")};
`

class Tabs extends React.Component {
  state = {
    activeTab: this.props.children[0].props.label,
  }
  changeTab = tab => {
    this.setState({ activeTab: tab })
  }
  render() {
    let content
    let buttons = []
    return (
      <div>
        {React.Children.map(this.props.children, child => {
          buttons.push(child.props.label)
          if (child.props.label === this.state.activeTab)
            content = child.props.children
        })}

        <TabButtons
          activeTab={this.state.activeTab}
          buttons={buttons}
          changeTab={this.changeTab}
        />
        <div className="tab-content">{content}</div>
      </div>
    )
  }
}

const TabButtons = ({ buttons, changeTab, activeTab }) => {
  return (
    <TabButtonWrapper>
      {buttons.map(button => {
        return (
          <Button active={activeTab} onClick={() => changeTab(button)}>
            {button}
          </Button>
        )
      })}
    </TabButtonWrapper>
  )
}

export default Tabs
