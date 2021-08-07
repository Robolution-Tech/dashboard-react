import React from "react"
import styled from "styled-components"
import { Controller, Scene } from "react-scrollmagic"
import { Tween } from "react-gsap"
import OnVisible from "react-on-visible"
import "../layout/ExpandBillboard.css"
import { AnchorLink } from "gatsby-plugin-anchor-links"

const TweenStyled = styled.div`
  .section-border-right {
    transform: scale(1, 1);
    transform-origin: right center;
  }
  .section-border-left {
    transform: scale(1, 1);
    transform-origin: left center;
  }
  .section-border-top {
    transform: scale(1, 1);
    transform-origin: center top;
  }
  .section-border-bottom {
    transform: scale(1, 1);
    transform-origin: center bottom;
  }
`

function BillboardExpand({ img_url, title, subtitle, description }) {
  return (
    <div className="billboard__container relative">
      <div className="billboard__boarders absolute left-0 right-0 top-0 bottom-0 z-10">
        <TweenStyled>
          <div id="trigger" />
          <Controller>
            <Scene
              triggerElement="#trigger"
              triggerHook={"onLeave"}
              duration={400}
            >
              {progress => (
                <Tween
                  to={{
                    scaleX: "0",
                    ease: "Power4.easeOut",
                  }}
                  ease="Power4.easeOut"
                  totalProgress={progress}
                  paused
                >
                  <div className="section-border section-border-right h-full w-5 lg:w-20 absolute right-0 bottom-0" />
                </Tween>
              )}
            </Scene>
          </Controller>
        </TweenStyled>
        <TweenStyled>
          <Controller>
            <Scene
              triggerElement="#trigger"
              triggerHook={"onLeave"}
              duration={400}
            >
              {progress => (
                <Tween
                  to={{
                    scaleX: "0",
                    ease: "Power4.easeOut",
                  }}
                  ease="Power4.easeOut"
                  totalProgress={progress}
                  paused
                >
                  <div className="section-border section-border-left h-full w-5 lg:w-20 bg-white absolute left-0 bottom-0" />
                </Tween>
              )}
            </Scene>
          </Controller>
        </TweenStyled>
        <TweenStyled>
          <Controller>
            <Scene
              triggerElement="#trigger"
              triggerHook={"onLeave"}
              duration={400}
            >
              {progress => (
                <Tween
                  to={{
                    scaleY: "0",
                    ease: "Power4.easeOut",
                  }}
                  ease="Power4.easeOut"
                  totalProgress={progress}
                  paused
                >
                  <div className="section-border section-border-top w-full h-5 lg:h-20 bg-white absolute left-0 top-0" />
                </Tween>
              )}
            </Scene>
          </Controller>
        </TweenStyled>
        <TweenStyled>
          <Controller>
            <Scene
              triggerElement="#trigger"
              triggerHook={"onEnter"}
              duration={400}
            >
              {progress => (
                <Tween
                  to={{
                    scaleY: "0",
                    ease: "Power4.easeOut",
                  }}
                  ease="Power4.easeOut"
                  totalProgress={progress}
                  paused
                >
                  <div className="section-border section-border-bottom w-full h-5 lg:h-20 bg-white absolute right-0 bottom-0" />
                </Tween>
              )}
            </Scene>
          </Controller>
        </TweenStyled>
      </div>
      <TweenStyled>
        <Controller>
          <Scene
            pin={".billboard__image"}
            triggerElement="#trigger"
            triggerHook={"onLeave"}
            duration={400}
          >
            <div
              className="billboard__image"
              style={{
                backgroundImage: `url(` + img_url + `)`,
              }}
            />
          </Scene>
        </Controller>
      </TweenStyled>

      <div className="billboard absolute z-20">
        <div className="lg:p-12 text-left step">
          <OnVisible className="in-view">
            <p className="title mb-10 text-white uppercase">{title}</p>
            <h5 className="h5 text-left text-white pb-6">{subtitle}</h5>
            <p className="description focus-within:text-left text-white pb-6">
              {description}
            </p>
            {/* <button className="button text-xs text-left font-bold py-2 px-4 rounded-full"> */}
            <AnchorLink
              className="button text-xs text-left font-bold py-2 px-4 rounded-full"
              to="/#video"
            >
              Learn more
            </AnchorLink>
            {/* </button> */}
          </OnVisible>
        </div>
      </div>
    </div>
  )
}

export default BillboardExpand
