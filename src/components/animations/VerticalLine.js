import React from "react"
import styled from "styled-components"
import classnames from "classnames"
import { Controller, Scene } from "react-scrollmagic"
import { Tween } from "react-gsap"

const VerticalLineStyle = styled.div`
  .vertical-line {
    width: 2px;
    height: 150px;
    transform: scaleY(0);
    margin: 0 auto;
    transform-origin: top;
    margin-top: 30px;
  }
`

const VerticalLine = props => (
  <VerticalLineStyle>
    <Controller>
      <Scene triggerElement={"#" + props.lineTrigger} duration={300}>
        {progress => (
          <Tween
            to={{
              transform: "scaleY(1)",
            }}
            ease="Strong.easeOut"
            totalProgress={progress}
            paused
          >
            <div
              className={classnames("vertical-line", props.marginBottom, {
                "purple-line": props.purpleLine,
                "green-line": props.greenLine,
              })}
            />
          </Tween>
        )}
      </Scene>
    </Controller>
  </VerticalLineStyle>
)

export default VerticalLine
