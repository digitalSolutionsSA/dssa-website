import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";

const Bar = ({ w, h = "0.9cqw", className = "" }: { w: string; h?: string; className?: string }) => (
  <span className={`block rounded-full bg-white/15 ${className}`} style={{ width: w, height: h }} />
);

// Smooth rising curve shared by both variants so the line sits in the same place
const CURVE = "M0,90 C12,86 18,80 28,74 S44,70 52,58 S66,40 74,34 S90,14 100,8";

/**
 * A campaign: a social post, a search ad and a reach chart.
 * `live` = the finished campaign; otherwise wireframes with identical geometry.
 */
export default function MockMarketing({ live = false }: { live?: boolean }) {
  const card = live ? "border border-white/10 bg-[#07070a]" : "border border-white/15 bg-ink-3";

  return (
    <div className="grid h-full w-full grid-cols-[1.05fr_1fr] gap-[3cqw] [container-type:inline-size]">
      {/* Social post */}
      <div className={`flex flex-col overflow-hidden rounded-[2.4cqw] ${card}`}>
        <div className="flex items-center gap-[1.6cqw] p-[2cqw]">
          {live ? (
            <span className="h-[5cqw] w-[5cqw] rounded-full bg-signal p-[0.4cqw]">
              <span className="block h-full w-full rounded-full border-[0.4cqw] border-black bg-white" />
            </span>
          ) : (
            <span className="h-[5cqw] w-[5cqw] rounded-full border border-white/25" />
          )}
          {live ? (
            <div className="leading-tight">
              <span className="block text-[1.9cqw] font-semibold text-white">yourbrand</span>
              <span className="text-[1.5cqw] text-white/45">Sponsored</span>
            </div>
          ) : (
            <div className="flex flex-col gap-[0.8cqw]">
              <Bar w="14cqw" />
              <Bar w="9cqw" h="0.7cqw" />
            </div>
          )}
        </div>

        {/* Creative */}
        {live ? (
          <div className="relative flex-1 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#ff66c4,transparent_60%),radial-gradient(circle_at_85%_85%,#01ffff,transparent_55%)] bg-black">
            <div className="absolute inset-0 bg-dots opacity-50" />
            <div className="absolute inset-0 flex flex-col justify-end p-[3cqw]">
              <span className="font-mono text-[1.5cqw] uppercase tracking-widest text-black/70">Limited spots</span>
              <span className="display text-[7.5cqw] leading-[0.85] text-black">
                NEW
                <br />
                SEASON
              </span>
            </div>
          </div>
        ) : (
          <div className="relative flex-1 border-y border-dashed border-white/20">
            <svg className="absolute inset-0 h-full w-full text-white/15" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden>
              <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" vectorEffect="non-scaling-stroke" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="absolute bottom-[1.4cqw] left-[1.8cqw] font-mono text-[1.4cqw] text-white/35">creative 1080×1350</span>
          </div>
        )}

        <div
          className={`flex h-[6cqw] items-center justify-between px-[2cqw] text-[1.8cqw] font-semibold ${
            live ? "bg-pink text-black" : "border-b border-white/10 font-mono text-white/30"
          }`}
        >
          {live ? "Book now" : "cta"}
          <span>→</span>
        </div>

        <div className="flex items-center gap-[2cqw] p-[2cqw]">
          {[Heart, MessageCircle, Send].map((Icon, i) =>
            live ? (
              <Icon key={i} className={`h-[3cqw] w-[3cqw] ${i === 0 ? "fill-pink text-pink" : "text-white"}`} />
            ) : (
              <span key={i} className="h-[3cqw] w-[3cqw] rounded-full border border-white/25" />
            ),
          )}
          {live ? (
            <Bookmark className="ml-auto h-[3cqw] w-[3cqw] text-white" />
          ) : (
            <span className="ml-auto h-[3cqw] w-[3cqw] rounded-[0.4cqw] border border-white/25" />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-[3cqw]">
        {/* Search ad */}
        <div className={`rounded-[2.4cqw] p-[2.6cqw] ${card}`}>
          {live ? (
            <>
              <span className="font-mono text-[1.5cqw] text-white/50">
                <span className="font-bold text-white">Ad</span> · yourbrand.co.za
              </span>
              <span className="mt-[1cqw] block text-[2.5cqw] font-semibold leading-tight text-cyan">
                Book Online Today — Vereeniging's Favourite
              </span>
              <span className="mt-[1cqw] block text-[1.7cqw] leading-snug text-white/55">
                Open 7 days. Easy online booking. See why locals keep coming back.
              </span>
            </>
          ) : (
            <div className="flex flex-col gap-[1.2cqw]">
              <Bar w="40%" h="0.8cqw" />
              <Bar w="95%" h="1.8cqw" />
              <Bar w="80%" />
              <Bar w="65%" />
            </div>
          )}
        </div>

        {/* Reach chart */}
        <div className={`relative flex flex-1 flex-col rounded-[2.4cqw] p-[2.6cqw] ${card}`}>
          <div className="flex items-center justify-between">
            {live ? (
              <>
                <span className="text-[1.9cqw] font-semibold text-white">Reach</span>
                <span className="rounded-full bg-cyan/15 px-[1.4cqw] py-[0.4cqw] font-mono text-[1.4cqw] text-cyan">▲ trending</span>
              </>
            ) : (
              <>
                <Bar w="20%" h="1.4cqw" />
                <Bar w="18%" h="1.6cqw" />
              </>
            )}
          </div>
          <svg className="mt-[2cqw] w-full flex-1" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="reach-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff66c4" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#ff66c4" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="reach-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff66c4" />
                <stop offset="100%" stopColor="#01ffff" />
              </linearGradient>
            </defs>
            {[25, 50, 75].map((y) => (
              <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgb(255 255 255 / 0.08)" vectorEffect="non-scaling-stroke" />
            ))}
            {live ? (
              <>
                <path d={`${CURVE} L100,100 L0,100 Z`} fill="url(#reach-fill)" />
                <path d={CURVE} fill="none" stroke="url(#reach-line)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
              </>
            ) : (
              <path d={CURVE} fill="none" stroke="rgb(255 255 255 / 0.25)" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
