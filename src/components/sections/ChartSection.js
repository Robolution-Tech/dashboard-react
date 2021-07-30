import React from "react"
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
} from "recharts"
import { format, parseISO, subDays } from "date-fns"
import styled from "styled-components"
import ThreeDotsWave from "../animations/LoadingAnimation"

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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function Chart({ content }) {
  var isDisplay = false
  if (content.length !== 0) {
    // Preparing for creating pie chart:
    const pieData = []
    let numSafety = content.reduce(function (n, event) {
      return n + (event.event_name === "safety event")
    }, 0)
    let numSecurity = content.reduce(function (n, event) {
      return n + (event.event_name === "security event")
    }, 0)
    let numOther = content.reduce(function (n, event) {
      return n + (event.event_name === "other event")
    }, 0)
    pieData.push({ name: "Safety event", value: numSafety })
    pieData.push({ name: "Security event", value: numSecurity })
    pieData.push({ name: "Other event", value: numOther })
    // Preparing for creating line chart:
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
    isDisplay = true
    var finalData = [...jsonData]
    var finalPieData = [...pieData]
  }
  return (
    <MainContainer>
      {isDisplay ? (
        <Grid>
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
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={finalPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {finalPieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      ) : (
        <BlockedContent>
          <ThreeDotsWave />
        </BlockedContent>
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
  width: 500px; 
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  padding: 20px;
   letter-spacing: 0.4rem; */
`

const StyledTooltip = styled.div`
  border-radius: 0.25rem;
  background: #26313c;
  color: #fff;
  padding: 1rem;
  box-shadow: 15px 30px 40px 5px rgba(0, 0, 0, 0.5);
  text-align: center;
`

const BlockedContent = styled.div`
  transform: translateY(25px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.6);
  border: 0.5px solid rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
  box-shadow: 0px 50px 100px rgba(34, 79, 169, 0.3);
  backdrop-filter: blur(40px);
  border-radius: 20px;
`

const Grid = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 8px;
  width: 100%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.6);
  border: 0.5px solid rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
  box-shadow: 0px 50px 100px rgba(34, 79, 169, 0.3);
  backdrop-filter: blur(40px);
  border-radius: 20px;
`
