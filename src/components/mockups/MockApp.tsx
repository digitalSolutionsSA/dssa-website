import { Bell, CalendarDays, Check, Home, Scissors, User } from "lucide-react";

const Bar = ({ w, h = "1.1cqw", className = "" }: { w: string; h?: string; className?: string }) => (
  <span className={`block rounded-full bg-white/15 ${className}`} style={{ width: w, height: h }} />
);

const BOOKINGS = [
  { t: "Haircut", time: "10:00", tone: "bg-pink" },
  { t: "Consultation", time: "11:30", tone: "bg-cyan" },
  { t: "Colour", time: "14:00", tone: "bg-white" },
];

/** A phone frame: the screen inside is wireframe or live */
function Phone({ live, children, className = "" }: { live: boolean; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`absolute aspect-[9/19] overflow-hidden rounded-[5cqw] border-[0.8cqw] ${
        live ? "border-[#1c1c22] bg-[#07070a] shadow-[0_4cqw_8cqw_-2cqw_rgb(255_102_196/0.25)]" : "border-white/15 bg-ink-3"
      } ${className}`}
    >
      <span className={`absolute left-1/2 top-[1.6cqw] h-[2.2cqw] w-[11cqw] -translate-x-1/2 rounded-full ${live ? "bg-black" : "border border-white/15"}`} />
      <div className="flex h-full flex-col px-[3cqw] pb-[3cqw] pt-[6.5cqw]">{children}</div>
    </div>
  );
}

/**
 * Two phones — a booking app's home screen and its confirmation screen.
 * `live` = the shipped app; otherwise grey wireframes with identical geometry.
 */
export default function MockApp({ live = false }: { live?: boolean }) {
  return (
    <div className="relative h-full w-full [container-type:inline-size]">
      {/* Back phone: confirmation */}
      <Phone live={live} className="right-[6%] top-[9%] h-[82%] rotate-[7deg]">
        <div className="flex flex-1 flex-col items-center justify-center gap-[3cqw] text-center">
          {live ? (
            <>
              <span className="grid h-[14cqw] w-[14cqw] place-items-center rounded-full bg-cyan text-black shadow-[0_0_6cqw_rgb(1_255_255/0.45)]">
                <Check className="h-[7cqw] w-[7cqw]" strokeWidth={3} />
              </span>
              <span className="display text-[4.2cqw] text-white">You're booked!</span>
              <span className="text-[2.3cqw] text-white/50">We'll remind you the day before.</span>
            </>
          ) : (
            <>
              <span className="h-[14cqw] w-[14cqw] rounded-full border border-dashed border-white/25" />
              <Bar w="60%" h="2.6cqw" />
              <Bar w="75%" />
            </>
          )}
        </div>
        <span
          className={`flex h-[7cqw] items-center justify-center rounded-full text-[2.4cqw] font-bold ${
            live ? "bg-pink text-black" : "border border-white/20"
          }`}
        >
          {live ? "Add to calendar" : ""}
        </span>
      </Phone>

      {/* Front phone: home */}
      <Phone live={live} className="left-[8%] top-[4%] h-[92%] -rotate-[4deg]">
        <div className="flex items-center justify-between">
          {live ? (
            <>
              <div>
                <span className="block text-[2.2cqw] text-white/50">Good morning</span>
                <span className="display text-[3.8cqw] text-white">Your day</span>
              </div>
              <span className="grid h-[6.5cqw] w-[6.5cqw] place-items-center rounded-full bg-white/10 text-white">
                <Bell className="h-[3cqw] w-[3cqw]" />
              </span>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-[1.2cqw]">
                <Bar w="14cqw" />
                <Bar w="20cqw" h="2.6cqw" />
              </div>
              <span className="h-[6.5cqw] w-[6.5cqw] rounded-full border border-white/20" />
            </>
          )}
        </div>

        {/* Summary card with a little bar chart */}
        <div
          className={`mt-[4cqw] h-[24cqw] rounded-[3cqw] p-[3cqw] ${
            live ? "bg-[linear-gradient(135deg,#ff66c4,#b78cff_55%,#01ffff)] text-black" : "border border-dashed border-white/20"
          }`}
        >
          {live ? (
            <>
              <span className="text-[2.2cqw] font-semibold opacity-70">This week</span>
              <div className="mt-[2cqw] flex h-[12cqw] items-end gap-[1.6cqw]">
                {[45, 70, 55, 90, 65, 100, 80].map((h, i) => (
                  <span key={i} className="flex-1 rounded-[0.8cqw] bg-black/80" style={{ height: `${h}%` }} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex h-full items-end gap-[1.6cqw]">
              {[45, 70, 55, 90, 65, 100, 80].map((h, i) => (
                <span key={i} className="flex-1 rounded-[0.8cqw] border border-white/15" style={{ height: `${h * 0.7}%` }} />
              ))}
            </div>
          )}
        </div>

        {/* Upcoming list */}
        <div className="mt-[4cqw] flex flex-1 flex-col gap-[2.4cqw]">
          {BOOKINGS.map(({ t, time, tone }) => (
            <div key={t} className={`flex items-center gap-[2.4cqw] rounded-[2.4cqw] p-[2cqw] ${live ? "bg-white/[0.05]" : "border border-white/10"}`}>
              {live ? (
                <>
                  <span className={`grid h-[6cqw] w-[6cqw] place-items-center rounded-[1.6cqw] text-black ${tone}`}>
                    <Scissors className="h-[3cqw] w-[3cqw]" />
                  </span>
                  <span className="flex-1 text-[2.5cqw] font-medium text-white">{t}</span>
                  <span className="font-mono text-[2.2cqw] text-white/50">{time}</span>
                </>
              ) : (
                <>
                  <span className="h-[6cqw] w-[6cqw] rounded-[1.6cqw] border border-white/20" />
                  <Bar w="40%" />
                  <Bar w="12%" className="ml-auto" />
                </>
              )}
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div className="mt-[3cqw] flex items-center justify-around border-t border-white/10 pt-[2.4cqw]">
          {[Home, CalendarDays, User].map((Icon, i) =>
            live ? (
              <Icon key={i} className={`h-[4cqw] w-[4cqw] ${i === 0 ? "text-pink" : "text-white/40"}`} />
            ) : (
              <span key={i} className="h-[4cqw] w-[4cqw] rounded-full border border-white/20" />
            ),
          )}
        </div>
      </Phone>
    </div>
  );
}
