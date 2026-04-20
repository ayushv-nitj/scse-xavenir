"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import "./leaderboard.css";

interface TeamMember {
  userID: string;
  fullName: string;
  collegeName: string;
}

interface Winner {
  teamName: string;
  position: number;
  members: TeamMember[];
}

interface EventWinners {
  eventName: string;
  winners: Winner[];
}

export default function LeaderboardPage() {
  const [events, setEvents] = useState<EventWinners[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((data) => {
        // Add hardcoded special winners - combined into one event
        const specialEvents: EventWinners[] = [
          {
            eventName: "Mr. & Miss Xavenir",
            winners: [
              {
                teamName: "Deeptanshu Singh Negi",
                position: 1,
                members: [
                  {
                    userID: "2025UGCS017",
                    fullName: "Deeptanshu Singh Negi",
                    collegeName: "NIT Jamshedpur"
                  }
                ]
              },
              {
                teamName: "Lovely Kumari",
                position: 2,
                members: [
                  {
                    userID: "2025UGCS072",
                    fullName: "Lovely Kumari",
                    collegeName: "NIT Jamshedpur"
                  }
                ]
              }
            ]
          }
        ];
        
        // Combine special events with fetched events
        const allEvents = [...specialEvents, ...(data.events || [])];
        setEvents(allEvents);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const selectedEventData = events.find((e) => e.eventName === selectedEvent);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="leaderboard-page">
      {/* Background elements */}
      <div className="lb-grid-bg" />
      <div className="lb-scanlines" />
      <div className="lb-noise-overlay" />
      <div className="lb-corner-glow" />
      <div className="lb-blob lb-blob-1" />
      <div className="lb-blob lb-blob-2" />
      
      <div className="leaderboard-hero">
        <div className="lb-hero-content">
          <h1 className="lb-title">
            <span className="lb-glitch" data-text="HALL OF FAME">HALL OF FAME</span>
          </h1>
        </div>
      </div>

      <div className="leaderboard-container">
        {/* Event Selection */}
        <div className="event-selector">
          <div className="es-label">SELECT EVENT</div>
          <div className="event-grid">
            {events.map((event) => (
              <button
                key={event.eventName}
                className={`event-card ${selectedEvent === event.eventName ? "event-card-active" : ""}`}
                onClick={() => setSelectedEvent(event.eventName)}
              >
                <span className="ec-name">{event.eventName}</span>
                <span className="ec-count">{event.winners.length} Winner{event.winners.length !== 1 ? "s" : ""}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Winners Display */}
        {selectedEventData && (
          <div className="winners-section">
            <div className="ws-header">
              <h2 className="ws-title">{selectedEventData.eventName}</h2>
            </div>

            <div className="podium-container">
              {selectedEventData.winners.length === 1 && (
                <div className="podium-single">
                  <WinnerCard winner={selectedEventData.winners[0]} />
                </div>
              )}

              {selectedEventData.winners.length === 2 && (
                <div className="podium-double">
                  <WinnerCard winner={selectedEventData.winners[0]} />
                  <WinnerCard winner={selectedEventData.winners[1]} />
                </div>
              )}

              {selectedEventData.winners.length >= 3 && (
                <div className="podium-triple">
                  {/* Second Place - Left */}
                  {selectedEventData.winners[1] && (
                    <div className="podium-item podium-second">
                      <WinnerCard winner={selectedEventData.winners[1]} />
                    </div>
                  )}

                  {/* First Place - Center (Larger) */}
                  {selectedEventData.winners[0] && (
                    <div className="podium-item podium-first">
                      <WinnerCard winner={selectedEventData.winners[0]} isFirst />
                    </div>
                  )}

                  {/* Third Place - Right */}
                  {selectedEventData.winners[2] && (
                    <div className="podium-item podium-third">
                      <WinnerCard winner={selectedEventData.winners[2]} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WinnerCard({ winner, isFirst = false }: { winner: Winner; isFirst?: boolean }) {
  // Check if this is a special Xavenir winner
  const isMrXavenir = winner.teamName.includes("Deeptanshu");
  const isMissXavenir = winner.teamName.includes("Lovely");
  const isXavenirWinner = isMrXavenir || isMissXavenir;
  
  // Color schemes
  const positionColors = {
    1: { bg: "rgba(255, 215, 0, 0.08)", border: "#ffd700", glow: "rgba(255, 215, 0, 0.3)" },
    2: { bg: "rgba(192, 192, 192, 0.08)", border: "#c0c0c0", glow: "rgba(192, 192, 192, 0.3)" },
    3: { bg: "rgba(205, 127, 50, 0.08)", border: "#cd7f32", glow: "rgba(205, 127, 50, 0.3)" },
  };
  
  // Special colors for Xavenir winners
  const mrXavenirColors = { bg: "rgba(255, 215, 0, 0.12)", border: "#ffd700", glow: "rgba(255, 215, 0, 0.4)" };
  const missXavenirColors = { bg: "rgba(255, 20, 147, 0.12)", border: "#ff1493", glow: "rgba(255, 20, 147, 0.4)" };
  
  const colors = isMrXavenir ? mrXavenirColors : 
                 isMissXavenir ? missXavenirColors : 
                 positionColors[winner.position as 1 | 2 | 3] || positionColors[3];
  
  const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };
  const medal = medals[winner.position as 1 | 2 | 3] || "🏆";
  
  const xavenirTitle = isMrXavenir ? "MR. XAVENIR" : isMissXavenir ? "MISS XAVENIR" : "";

  return (
    <div
      className={`winner-card ${isFirst ? "winner-card-first" : ""} ${isMrXavenir ? "winner-card-mr-xavenir" : ""} ${isMissXavenir ? "winner-card-miss-xavenir" : ""}`}
      style={{
        background: colors.bg,
        borderColor: colors.border,
        boxShadow: `0 0 20px ${colors.glow}, inset 0 0 40px ${colors.glow}`,
      }}
    >
      {/* Position badge */}
      {!isXavenirWinner && (
        <div className="wc-position-badge" style={{ background: colors.border }}>
          <span className="wc-badge-number">{winner.position}</span>
        </div>
      )}
      
      <div className="wc-position" style={{ color: colors.border }}>
        <span className="wc-medal">{isXavenirWinner ? "👑" : medal}</span>
        <span className="wc-rank">
          {isXavenirWinner ? xavenirTitle : winner.position === 1 ? "CHAMPION" : winner.position === 2 ? "RUNNER UP" : `${winner.position}${getOrdinalSuffix(winner.position)} PLACE`}
        </span>
      </div>

      <div className="wc-team-name" style={{ color: colors.border }}>
        {winner.teamName}
      </div>

      <div className="wc-divider" style={{ background: colors.border }} />

      <div className="wc-members">
        <div className="wc-members-label">// {isXavenirWinner ? "WINNER" : "TEAM MEMBERS"}</div>
        {winner.members.map((member, idx) => (
          <div key={idx} className="wc-member">
            <div className="wc-member-icon" style={{ borderColor: colors.border, color: colors.border }}>
              {isXavenirWinner ? "👑" : idx + 1}
            </div>
            <div className="wc-member-info">
              <div className="wc-member-name">{member.fullName}</div>
              <div className="wc-member-id">{member.userID}</div>
              <div className="wc-member-college">{member.collegeName}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getOrdinalSuffix(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
