import { useLayoutEffect, useRef, useState } from "react";

const ROAD =
  "M 40 222 C 110 222, 120 150, 180 150 S 250 150, 250 96 S 300 60, 366 52";

/** A cute top-down map with a delivery truck crawling along the road. */
export default function DeliveryMap({ progress }: { progress: number }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pt, setPt] = useState({ x: 40, y: 222, angle: 0 });

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const p = path.getPointAtLength(len * progress);
    const ahead = path.getPointAtLength(Math.min(len, len * progress + 1));
    const angle = (Math.atan2(ahead.y - p.y, ahead.x - p.x) * 180) / Math.PI;
    setPt({ x: p.x, y: p.y, angle });
  }, [progress]);

  return (
    <div className="map">
      <svg viewBox="0 0 400 260" width="100%" role="img" aria-label="Delivery map">
        {/* ground */}
        <rect x="0" y="0" width="400" height="260" fill="#eafff6" />
        {/* decorative blocks / parks */}
        <g opacity="0.6">
          <rect x="40" y="30" width="70" height="48" rx="10" fill="#d7f5e6" />
          <rect x="150" y="40" width="54" height="40" rx="10" fill="#ffe9f2" />
          <rect x="290" y="150" width="80" height="60" rx="12" fill="#e7ecff" />
          <rect x="40" y="120" width="64" height="60" rx="12" fill="#fff3d6" />
          <circle cx="210" cy="210" r="26" fill="#d7f5e6" />
          <circle cx="330" cy="110" r="18" fill="#d7f5e6" />
        </g>

        {/* the road (dashed) */}
        <path
          d={ROAD}
          fill="none"
          stroke="#ffffff"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d={ROAD}
          fill="none"
          stroke="#cbb6ff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 12"
        />
        {/* path actually used for measuring (invisible) */}
        <path ref={pathRef} d={ROAD} fill="none" stroke="none" />

        {/* progress trail */}
        <path
          d={ROAD}
          fill="none"
          stroke="url(#grad)"
          strokeWidth="6"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - progress}
        />
        <defs>
          <linearGradient id="grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#ff5da2" />
            <stop offset="1" stopColor="#7c5cff" />
          </linearGradient>
        </defs>

        {/* warehouse start */}
        <g transform="translate(40 222)">
          <circle r="16" fill="#fff" stroke="#7c5cff" strokeWidth="3" />
          <text textAnchor="middle" dy="6" fontSize="16">
            🏭
          </text>
        </g>

        {/* home destination */}
        <g transform="translate(366 52)">
          <circle r="17" fill="#fff" stroke="#ff5da2" strokeWidth="3" />
          <text textAnchor="middle" dy="6" fontSize="17">
            🏠
          </text>
          {progress < 1 && (
            <circle r="17" fill="none" stroke="#ff5da2" strokeWidth="3" opacity="0.5">
              <animate
                attributeName="r"
                values="17;26;17"
                dur="1.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.5;0;0.5"
                dur="1.6s"
                repeatCount="indefinite"
              />
            </circle>
          )}
        </g>

        {/* the truck */}
        <g transform={`translate(${pt.x} ${pt.y})`}>
          <circle r="15" fill="#fff" stroke="#3dd6c4" strokeWidth="3" />
          <text
            textAnchor="middle"
            dy="6"
            fontSize="17"
            transform={pt.angle > 90 || pt.angle < -90 ? "scale(-1,1)" : undefined}
          >
            🚚
          </text>
        </g>
      </svg>
    </div>
  );
}
