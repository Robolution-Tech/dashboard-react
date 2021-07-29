import React from "react"
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { format, parseISO, subDays } from "date-fns"
import styled from "styled-components"
import { themes } from "../styles/ColorStyles"
import { H1 } from "../styles/TextStyles"

const SampleData = []
for (let num = 30; num >= 0; num--) {
  SampleData.push({
    date: subDays(new Date(), num).toISOString().substr(0, 10),
    value1: getRandomInt(10),
    value2: getRandomInt(5),
    value3: getRandomInt(6),
  })
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

export default function Chart({ content }) {
  //   console.log(content)
  var isDisplay = false
  if (content.length !== 0) {
    const jsonData = []
    const uniqueDate = new Set()
    for (let i = 0; i < content.length; i++) {
      uniqueDate.add(content[i].time.substr(0, 10))
    }
    for (let time of uniqueDate) {
      var numSafetyEvent = 0
      var numSecurityEvent = 0
      var numOtherEvent = 0
      for (let event of content) {
        if (event.time.substr(0, 10) === time) {
          switch (event.event_name) {
            case "safety event":
              numSafetyEvent++
              break
            case "security event":
              numSecurityEvent++
              break
            case "other event":
              numOtherEvent++
              break
            default:
              break
          }
        }
      }
      jsonData.push({
        date: time,
        value1: numSafetyEvent,
        value2: numSecurityEvent,
        value3: numOtherEvent,
      })
    }
    // console.log(jsonData)
    var finalData = jsonData
    isDisplay = true
  }
  return (
    <MainContainer>
      {isDisplay ? (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={finalData}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <Area dataKey="value1" stroke="#2451B7" fill="url(#color)" />
            <Area dataKey="value2" stroke="#b481B7" fill="url(#color)" />
            <Area dataKey="value3" stroke="#d481B7" fill="url(#color)" />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickFormatter={str => {
                const date = parseISO(str)
                //   if (date.getDate() % 7 === 0) {
                //     return format(date, "MMM, d")
                //   }
                //   return ""
                return format(date, "MMM, d")
              }}
            />

            <YAxis
              datakey="value1"
              axisLine={false}
              tickLine={false}
              tickCount={8}
              tickFormatter={number => `${number}`}
            />

            <Tooltip content={<CustomTooltip />} />

            <CartesianGrid opacity={0.1} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <BlockedContent>Now Loading User data...</BlockedContent>
      )}
    </MainContainer>
  )
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload !== null) {
    // console.log(payload[0].value)
    return (
      <StyledTooltip>
        <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
        <h2>Safety event triggered times: {payload[0].value}</h2>
        <h2>Security event triggered times: {payload[1].value}</h2>
        <h2>Other event triggered times: {payload[2].value}</h2>
      </StyledTooltip>
    )
  }
  return null
}

const MainContainer = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80vh;
  width: 500px; */
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  padding: 20px;
  /* letter-spacing: 0.4rem; */
`

const StyledTooltip = styled.div`
  border-radius: 0.25rem;
  background: #26313c;
  color: #fff;
  padding: 1rem;
  box-shadow: 15px 30px 40px 5px rgba(0, 0, 0, 0.5);
  text-align: center;
`

const BlockedContent = styled(H1)`
  color: ${themes.light.text1};
  margin-top: 30px;
`
