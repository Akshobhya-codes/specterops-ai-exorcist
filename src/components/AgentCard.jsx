import React from 'react'

export default function AgentCard({ name, status }) {
  return (
    <div className="p-3 border rounded-lg shadow bg-black text-white">
      <h2>{name}</h2>
      <p>{status}</p>
    </div>
  )
}
