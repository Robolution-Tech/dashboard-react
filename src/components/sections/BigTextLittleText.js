import React from "react"
import classnames from "classnames"
import Fade from "react-reveal/Fade"
// import { Parallax } from "react-scroll-parallax"
import BigTextMobile from "./BigTextMobile"
import VerticalLine from "../animations/VerticalLine"
import "../styles/BigTextLittleText.css"

const BigTextLittleText = props => (
  <div
    className={classnames(
      "w-full overflow-hidden relative",
      props.containerSize
    )}
  >
    <div
      id={props.bigTextTrigger}
      className={classnames("bigText-mobile-trigger")}
    />
    <div
      className={classnames(
        "leading-none absolute left-0 right-0 pb-32 hidden sm:block"
      )}
      y={[-20, 20]}
      //   tagOuter="figure"
    >
      <div
        className={classnames(
          "background-big-text relative text-center font-bold mx-auto my-0 opacity-5",
          props.bigTextDesktopSize
        )}
      >
        {props.bigTextCopy}
      </div>
    </div>
    {/* Mobile scrolling Big Text */}
    <BigTextMobile
      bigTextMobile={classnames("block sm:hidden", props.bigTextMobileSize)}
      bigTextCopy={props.bigTextCopy}
      bigTextTrigger={props.bigTextTrigger}
    />

    {/* Small text */}
    <Fade bottom>
      <div
        className={classnames(
          "foreground-little-text relative left-0 right-0 text-3xl sm:text-4xl text-center font-bold mx-auto my-0 p-2 top-0",
          props.hiwLittleText
        )}
      >
        {props.littleText}
        <div id={props.lineTrigger} />
        <VerticalLine
          purpleLine={props.purpleLine}
          lineTrigger={props.lineTrigger}
          marginBottom={props.marginBottom}
        />
      </div>
    </Fade>
  </div>
)

export default BigTextLittleText
