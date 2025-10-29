import React, { useState } from "react";
import confetti from "canvas-confetti";
import "../spooky.css";

export default function Dashboard() {
  const [log, setLog] = useState("💀 Welcome to SpecterOps – the AI Agent Exorcist");
  const [phase, setPhase] = useState("idle");

  async function callAgent(name) {
    try {
      setPhase(name);

      // Narrative text for each agent
      if (name === "deployAgent")
        setLog("🧪 DeployAgent: Summoning a new canary spirit from the codebase...");
      if (name === "monitorAgent")
        setLog("👁️ MonitorAgent: Observing the ghost’s vitality and collecting metrics...");
      if (name === "governorAgent")
        setLog("⚖️ Exorcist: Consulting the AI to decide this spirit’s fate...");

      const res = await fetch(`/.netlify/functions/${name}`);
      const data = await res.json();
      const pretty = JSON.stringify(data, null, 2);

      // Handle results for each agent
      if (name === "deployAgent") {
        setLog(
          `🧪 DeployAgent: ${data.message}\n\n👻 The ghost is alive. Next, let the Monitor check its pulse.\n\n${pretty}`
        );
      } else if (name === "monitorAgent") {
        setLog(
          `👁️ MonitorAgent: Metrics gathered.\n\n🧠 The ghost whispers its strength:\nProd latency ${data.prodLatency}ms vs Canary ${data.canaryLatency}ms.\n\nAsk the Exorcist to judge its fate.\n\n${pretty}`
        );
      } else if (name === "governorAgent") {
        const decision = data.decision || "idle";

        // 🎉 Trigger confetti only when promoted
        // 🎉 or 💀 visual feedback
if (decision === "promote") {
  // celebration confetti
  confetti({
    particleCount: 200,
    spread: 80,
    origin: { y: 0.6 },
    colors: ["#facc15", "#f87171", "#a855f7", "#22d3ee"],
  });
} else if (decision === "rollback") {
  // falling ash / ghost-disintegration effect
  const end = Date.now() + 800; // duration of the fall
  (function frame() {
    confetti({
      particleCount: 5,
      startVelocity: 20,
      ticks: 60,
      gravity: 1.5,
      origin: { x: Math.random(), y: 0 },
      colors: ["#444", "#555", "#666"],
      shapes: ["circle"],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}


        const verdict =
          decision === "promote"
            ? "🌕 Verdict: The ghost is strong — it joins the living system!"
            : decision === "rollback"
            ? "🌑 Verdict: The ghost is weak — it’s banished to the void!"
            : "🌫️ Verdict: The AI remains uncertain...";

        setLog(`⚖️ Exorcist Decision\n\n${verdict}\n\n📜 Metrics Considered:\n${pretty}`);
      }
    } catch (e) {
      console.error(e);
      setLog(`❌ Error calling ${name}: ${e.message}`);
    } finally {
      setPhase("idle");
    }
  }

  return (
    <div className="card">
      <h1 style={{ fontSize: "1.8rem", textAlign: "center", marginBottom: "0.2rem" }}>
        👻 SpecterOps – DevOps Control Center
      </h1>
      <h3
        style={{
          textAlign: "center",
          marginTop: 0,
          marginBottom: "1.5rem",
          color: "#a1a1aa",
          fontWeight: "normal",
        }}
      >
        – an AI Agent Exorcist –
      </h3>

      {/* Control buttons */}
      <div
        style={{
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => callAgent("deployAgent")}
          disabled={phase !== "idle"}
          style={{
            padding: "0.8rem 1.5rem",
            border: "none",
            borderRadius: "8px",
            background: phase === "deployAgent" ? "#666" : "#3b82f6",
            color: "white",
            cursor: "pointer",
          }}
        >
          🚀 Deploy Canary
        </button>

        <button
          onClick={() => callAgent("monitorAgent")}
          disabled={phase !== "idle"}
          style={{
            padding: "0.8rem 1.5rem",
            border: "none",
            borderRadius: "8px",
            background: phase === "monitorAgent" ? "#666" : "#f59e0b",
            color: "white",
            cursor: "pointer",
          }}
        >
          📈 Monitor
        </button>

        <button
          onClick={() => callAgent("governorAgent")}
          disabled={phase !== "idle"}
          style={{
            padding: "0.8rem 1.5rem",
            border: "none",
            borderRadius: "8px",
            background: phase === "governorAgent" ? "#666" : "#10b981",
            color: "white",
            cursor: "pointer",
          }}
        >
          ⚖️ Exorcise / Judge
        </button>
      </div>

      {/* Dynamic log area */}
      <pre
        style={{
          background: "rgba(0,0,0,0.55)",
          padding: "1rem",
          borderRadius: "10px",
          color:
            log.includes("strong") || log.includes("promote")
              ? "#4ade80"
              : log.includes("weak") || log.includes("rollback")
              ? "#f87171"
              : "white",
          whiteSpace: "pre-wrap",
          lineHeight: 1.5,
          fontSize: "0.95rem",
          transition: "color 0.3s ease",
        }}
      >
        {log}
      </pre>

      {/* Explanation for judges */}
      <section
        style={{
          marginTop: "2rem",
          background: "rgba(17,17,17,0.6)",
          borderRadius: "12px",
          padding: "1.5rem",
          lineHeight: 1.6,
          backdropFilter: "blur(4px)",
        }}
      >
        <h2 style={{ color: "#facc15", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
          🧩 What is SpecterOps?
        </h2>
        <p>
          <strong>SpecterOps</strong> is an <strong>AI-powered Exorcist for DevOps</strong>.  
          It raises new <em>ghost deployments</em> (canaries), monitors their performance,  
          and uses AI judgment to decide whether those ghosts deserve to live in production  
          or be banished back to the void.
        </p>

        <ul style={{ marginTop: "1rem", color: "#d4d4d8", lineHeight: 1.8 }}>
          <li>
            🚀 <strong>Deploy Canary</strong> – Summons a new ghost (test deployment).
          </li>
          <li>
            📈 <strong>Monitor</strong> – Observes the ghost’s performance and gathers metrics.
          </li>
          <li>
            ⚖️ <strong>Exorcise / Judge</strong> – The AI Exorcist decides:  
            if the ghost is strong → it’s promoted to production (celebrated with confetti 🎉);  
            if weak → it’s exorcised.
          </li>
        </ul>

        <p style={{ marginTop: "1rem", color: "#9ca3af" }}>
          This is a self-running, story-driven CI/CD system — an autonomous haunted pipeline  
          where code truly comes to life.
        </p>
      </section>
    </div>
  );
}
