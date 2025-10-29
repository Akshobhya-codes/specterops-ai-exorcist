import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

export default function MetricsGraph({ data }) {
  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="prodLatency" stroke="#8884d8" />
      <Line type="monotone" dataKey="canaryLatency" stroke="#82ca9d" />
    </LineChart>
  )
}
