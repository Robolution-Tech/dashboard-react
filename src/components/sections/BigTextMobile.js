import React from "react"
import styled from "styled-components"
import { Controller, Scene } from "react-scrollmagic"
import { Tween } from "react-gsap"
import classnames from "classnames"

const BigTextStyle = styled.div`
  .big-text-mobile {
    position: absolute;
    left: 100%;
    font-weight: bold;
    color: #e2e2e2;
    margin: 0 auto;
    max-width: 600px;
  }
`

const BigTextMobile = props => (
  <BigTextStyle>
    <Controller>
      <Scene triggerElement={"#" + props.bigTextTrigger} duration={1000}>
        {progress => (
          <Tween
            to={{
              left: "-300%",
            }}
            ease="easeInOu"
            totalProgress={progress}
            paused
          >
            <div
              className={classnames(
                "big-text-mobile opacity-5",
                props.bigTextMobile
              )}
            >
              {props.bigTextCopy}
            </div>
          </Tween>
        )}
      </Scene>
    </Controller>
  </BigTextStyle>
)

export default BigTextMobile
