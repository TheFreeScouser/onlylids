"use client";

import { useMemo, useState } from "react";

type Episode = {
  id: number;
  title: string;
  episode: string;
  guest: string;
  duration: string;
  published: string;
  youtubeUrl: string;
  youtubeViews: number;
  youtubeLikes: number;
  youtubeComments: number;
  moodTags: string[];
  summary: string;
  themes: string[];
};

const episodes: Episode[] = [
  {
    id: 381,
    title: "Julian Deane | Have A Word Podcast #381",
    episode: "#381",
    guest: "Julian Deane",
    duration: "2h 14m",
    published: "2026-05-16",
    youtubeUrl: "https://www.youtube.com/watch?v=yDqyN6s1ego",
    youtubeViews: 43173,
    youtubeLikes: 751,
    youtubeComments: 121,
    moodTags: ["Guest Episode", "Easy Listen", "New Starter"],
    summary:
      "A recent guest episode with Julian Deane. A good current entry point for fans who want guest energy without going deep into the archive.",
    themes: ["recent", "guest", "starter"],
  },
  {
    id: 380,
    title: "Mike Bubbins | Have A Word Podcast #380",
    episode: "#380",
    guest: "Mike Bubbins",
    duration: "2h 31m",
    published: "2026-05-09",
    youtubeUrl: "https://www.youtube.com/watch?v=-elisiT7Urg",
    youtubeViews: 59085,
    youtubeLikes: 950,
    youtubeComments: 167,
    moodTags: ["Guest Episode", "Easy Listen", "Long Drive"],
    summary:
      "A longer guest episode with Mike Bubbins. Useful for listeners who want a recent guest-led episode with a steady full-length listen.",
    themes: ["recent", "guest", "long listen"],
  },
  {
    id: 379,
    title: "Rick Edwards | Have A Word Podcast #379",
    episode: "#379",
    guest: "Rick Edwards",
    duration: "2h 17m",
    published: "2026-05-02",
    youtubeUrl: "https://www.youtube.com/watch?v=jQ-j2YyphhY",
    youtubeViews: 56297,
    youtubeLikes: 868,
    youtubeComments: 79,
    moodTags: ["Guest Episode", "Easy Listen", "New Starter"],
    summary:
      "A recent guest episode with Rick Edwards. Good for newer listeners who want a recognisable guest and a clean entry point.",
    themes: ["recent", "guest", "accessible"],
  },
  {
    id: 378,
    title: "Taylor Ryan | Have A Word Podcast #378",
    episode: "#378",
    guest: "Taylor Ryan",
    duration: "2h 27m",
    published: "2026-04-25",
    youtubeUrl: "https://www.youtube.com/watch?v=VsLfwRKxTxQ",
    youtubeViews: 64044,
    youtubeLikes: 928,
    youtubeComments: 140,
    moodTags: ["Guest Episode", "Chaos", "Long Drive"],
    summary:
      "A lively recent guest episode with Taylor Ryan. Better for listeners who want more energy and a longer watch.",
    themes: ["recent", "guest", "energy"],
  },
  {
    id: 376,
    title: "Edd Hedges | Have A Word Podcast #376",
    episode: "#376",
    guest: "Edd Hedges",
    duration: "2h 13m",
    published: "2026-04-11",
    youtubeUrl: "https://www.youtube.com/watch?v=GMtBoRhvwqk",
    youtubeViews: 58745,
    youtubeLikes: 1020,
    youtubeComments: 163,
    moodTags: ["Guest Episode", "Easy Listen", "New Starter"],
    summary:
      "A balanced recent guest episode with Edd Hedges. A safe pick for people who want something current and accessible.",
    themes: ["recent", "guest", "balanced"],
  },
  {
    id: 374,
    title: "Joel Dommett | Have A Word Podcast #374",
    episode: "#374",
    guest: "Joel Dommett",
    duration: "2h 15m",
    published: "2026-03-28",
    youtubeUrl: "https://www.youtube.com/watch?v=6iuJuCJxX0g",
    youtubeViews: 66838,
    youtubeLikes: 1400,
    youtubeComments: 302,
    moodTags: ["Guest Episode", "New Starter", "Easy Listen"],
    summary:
      "A strong guest episode with Joel Dommett. One of the better starter picks in this set because it has strong public engagement and an accessible guest.",
    themes: ["guest", "starter", "high engagement"],
  },
  {
    id: 367,
    title: "Tom Davis | Have A Word Podcast #367",
    episode: "#367",
    guest: "Tom Davis",
    duration: "2h 9m",
    published: "2026-02-09",
    youtubeUrl: "https://www.youtube.com/watch?v=K925NCampgI",
    youtubeViews: 69323,
    youtubeLikes: 1069,
    youtubeComments: 131,
    moodTags: ["Guest Episode", "Easy Listen", "New Starter"],
    summary:
      "A guest episode with Tom Davis. A useful pick for people who want a recognisable guest and strong public interest.",
    themes: ["guest", "popular", "starter"],
  },
  {
    id: 370,
    title: "Fin Taylor | Have A Word Podcast #370",
    episode: "#370",
    guest: "Fin Taylor",
    duration: "2h 32m",
    published: "2026-03-02",
    youtubeUrl: "https://www.youtube.com/watch?v=eSV9Ysexhgw",
    youtubeViews: 96227,
    youtubeLikes: 1356,
    youtubeComments: 173,
    moodTags: ["Guest Episode", "Chaos", "Long Drive"],
    summary:
      "A high-engagement guest episode with Fin Taylor. Strong for listeners who want a longer, more lively guest pick.",
    themes: ["guest", "popular", "long listen"],
  },
  {
    id: 373,
    title: "Paddy McDonnell | Have A Word Podcast #373",
    episode: "#373",
    guest: "Paddy McDonnell",
    duration: "2h 18m",
    published: "2026-03-23",
    youtubeUrl: "https://www.youtube.com/watch?v=iwnKJoNJcIs",
    youtubeViews: 59811,
    youtubeLikes: 823,
    youtubeComments: 67,
    moodTags: ["Guest Episode", "Chaos", "Classic Lads"],
    summary:
      "A Paddy McDonnell guest episode. Better for listeners who want a livelier pick rather than a calm starter episode.",
    themes: ["guest", "chaos", "energy"],
  },
  {
    id: 371,
    title: "The Boys | Have A Word Podcast #371",
    episode: "#371",
    guest: "No guest",
    duration: "2h 9m",
    published: "2026-03-09",
    youtubeUrl: "https://www.youtube.com/watch?v=ius4M8p2Kvc",
    youtubeViews: 69794,
    youtubeLikes: 930,
    youtubeComments: 120,
    moodTags: ["Classic Lads", "Easy Listen", "Long Drive"],
    summary:
      "A no-guest episode with the lads. Best for fans who want the core show dynamic rather than a guest-led episode.",
    themes: ["lads", "classic", "no guest"],
  },
];

const moods = [
  "Chaos",
  "Guest Episode",
  "Easy Listen",
  "Classic Lads",
  "New Starter",
  "Long Drive",
];

export default function OnlyLidsPage() {
  const [familiarity, setFamiliarity] = useState("New");
  const [mood, setMood] = useState("Chaos");
  const [time, setTime] = useState("1 hour");
  const [guestPreference, setGuestPreference] = useState("Open to guests");
  const [avoid, setAvoid] = useState("None");
  const [generated, setGenerated] = useState(false);

  const recommendations = useMemo(() => {
  const maxViews = Math.max(...episodes.map((episode) => episode.youtubeViews));
  const maxLikes = Math.max(...episodes.map((episode) => episode.youtubeLikes));

  return [...episodes]
    .map((episode) => {
      let score = 0;
      const reasons: string[] = [];

      if (episode.moodTags.includes(mood)) {
        score += 35;
        reasons.push(`matches the ${mood.toLowerCase()} mood`);
      }

      if (familiarity === "New" && episode.moodTags.includes("New Starter")) {
        score += 20;
        reasons.push("works well as a starter pick");
      }

      if (familiarity === "Hardcore Lid" && episode.moodTags.includes("Classic Lads")) {
        score += 20;
        reasons.push("leans into the core lads format");
      }

      if (
        guestPreference === "Guest episodes preferred" &&
        episode.moodTags.includes("Guest Episode")
      ) {
        score += 20;
        reasons.push("matches your guest preference");
      }

      if (
        guestPreference === "No guest episodes" &&
        !episode.moodTags.includes("Guest Episode")
      ) {
        score += 20;
        reasons.push("keeps it with the lads");
      }

      if (time === "Long drive" && episode.moodTags.includes("Long Drive")) {
        score += 15;
        reasons.push("fits a longer listen");
      }

      if (time === "30 mins" && !episode.moodTags.includes("Long Drive")) {
        score += 8;
        reasons.push("is one of the lighter picks from this set");
      }

      const viewsScore = maxViews
        ? Math.round((episode.youtubeViews / maxViews) * 10)
        : 0;

      const likesScore = maxLikes
        ? Math.round((episode.youtubeLikes / maxLikes) * 5)
        : 0;

      score += viewsScore + likesScore;

      if (viewsScore + likesScore >= 12) {
        reasons.push("has strong public YouTube engagement");
      }

      const publishedDate = new Date(episode.published);
      const daysOld =
        (Date.now() - publishedDate.getTime()) / (1000 * 60 * 60 * 24);

      if (daysOld < 45) {
        score += 10;
        reasons.push("is a recent episode");
      } else if (daysOld < 90) {
        score += 6;
        reasons.push("is still fairly recent");
      }

      return {
        ...episode,
        score,
        reason:
          reasons.length > 0
            ? `Picked because it ${reasons.join(", ")}.`
            : "Picked as a balanced recommendation from the public episode set.",
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}, [familiarity, mood, time, guestPreference, avoid]);

  return (
    <main className="min-h-screen bg-[#090d2a] text-white">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b-4 border-[#ff4a1c] bg-[#090d2a]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#" className="group flex items-center gap-3">
            <div className="relative rotate-[-3deg] border-4 border-[#ff4a1c] px-3 py-2">
              <div className="text-xl font-black uppercase leading-none tracking-tight text-white">
                Only
                <br />
                Lids
              </div>
              <div className="absolute -bottom-4 right-3 h-4 w-4 border-b-4 border-r-4 border-[#ff4a1c] bg-[#090d2a]" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-black uppercase text-white">Fan companion</p>
              <p className="text-xs text-white/50">Unofficial · built for Lids</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-black uppercase tracking-tight md:flex">
            <a href="#lidlist" className="hover:text-[#ff4a1c]">
              LidList
            </a>
            <a href="#guide" className="hover:text-[#ff4a1c]">
              New Lids
            </a>
            <a href="#guests" className="hover:text-[#ff4a1c]">
              Guests
            </a>
            <a href="#episodes" className="hover:text-[#ff4a1c]">
              Episodes
            </a>
          </nav>

          <a
            href="#lidlist"
            className="border-4 border-[#ff4a1c] bg-[#ff4a1c] px-5 py-2.5 text-sm font-black uppercase text-white shadow-[5px_5px_0_#ffffff] transition hover:-translate-y-1"
          >
            Build It
          </a>
        </div>
      </header>

      {/* DISCLAIMER */}
      <div className="border-b border-white/10 bg-[#06091d] px-6 py-3 text-center text-xs font-bold uppercase tracking-wide text-white/55">
        Unofficial fan-built concept. Not affiliated with Have A Word, its hosts, or production team.
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden border-b-4 border-[#ff4a1c]">
        <div className="absolute inset-0 opacity-[0.12]">
          <div className="h-full w-full bg-[linear-gradient(135deg,#ff4a1c_10%,transparent_10%,transparent_50%,#ff4a1c_50%,#ff4a1c_60%,transparent_60%,transparent)] bg-[length:48px_48px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-28">
          <div>
            <div className="mb-8 inline-flex rotate-[-1deg] border-4 border-[#ff4a1c] bg-[#ff4a1c] px-4 py-2 text-sm font-black uppercase tracking-wide shadow-[6px_6px_0_#ffffff]">
              Built for the Lid Army
            </div>

            <h1 className="max-w-4xl text-6xl font-black uppercase leading-[0.92] tracking-[-0.06em] md:text-8xl">
              Stop scrolling.
              <br />
              Find a{" "}
              <span className="text-[#ff4a1c] drop-shadow-[4px_4px_0_#ffffff]">
                belter.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg font-bold leading-8 text-white/75 md:text-xl">
              OnlyLids helps fans discover episodes, guests, running jokes and playlists based on mood,
              time available and how deep you are in the Lid Army.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#lidlist"
                className="border-4 border-[#ff4a1c] bg-[#ff4a1c] px-7 py-4 text-center text-base font-black uppercase text-white shadow-[8px_8px_0_#ffffff] transition hover:-translate-y-1"
              >
                Build My LidList
              </a>
              <a
                href="#guide"
                className="border-4 border-white bg-transparent px-7 py-4 text-center text-base font-black uppercase text-white shadow-[8px_8px_0_#ff4a1c] transition hover:-translate-y-1"
              >
                I’m new here
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rotate-2 border-4 border-[#ff4a1c] bg-[#121844] p-5 shadow-[14px_14px_0_#ff4a1c]">
              <div className="grid gap-4">
                {[
                  ["Chaos", "For when you want it fully off the rails."],
                  ["Guest Episode", "Find a guest with proper chemistry."],
                  ["Classic Lads", "No guest. Just the rhythm of the show."],
                ].map(([title, text]) => (
                  <div key={title} className="border-2 border-white/20 bg-[#090d2a] p-5">
                    <p className="text-2xl font-black uppercase text-[#ff4a1c]">{title}</p>
                    <p className="mt-2 text-sm font-bold text-white/65">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section id="episodes" className="relative px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            ["Patreon-style picks", "Find the mood without scrolling forever."],
            ["LidList", "A generated playlist based on your answers."],
            ["Episodes", "Guest, mood and starter picks in one place."],
          ].map(([title, text]) => (
            <div
              key={title}
              className="min-h-[220px] border-4 border-[#ff4a1c] bg-[#121844] p-7 shadow-[10px_10px_0_#ff4a1c]"
            >
              <p className="text-4xl font-black uppercase tracking-[-0.04em] text-white">
                {title}
              </p>
              <p className="mt-4 text-base font-bold leading-7 text-white/65">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LIDLIST BUILDER */}
      <section id="lidlist" className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-4 border-[#ff4a1c] bg-[#121844] p-7 shadow-[12px_12px_0_#ff4a1c]">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#ff4a1c]">
              Build My LidList
            </p>
            <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] tracking-[-0.05em]">
              Tell us the vibe.
              <br />
              We’ll pick the episode.
            </h2>
            <p className="mt-5 text-base font-bold leading-7 text-white/65">
              No endless scrolling. Answer a few quick questions and get a curated playlist of 3–5 public episodes.
            </p>

            <div className="mt-8 grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-black uppercase text-white/80">How familiar are you?</span>
                <select
                  value={familiarity}
                  onChange={(e) => setFamiliarity(e.target.value)}
                  className="border-4 border-white/20 bg-[#090d2a] p-4 font-bold text-white outline-none focus:border-[#ff4a1c]"
                >
                  <option>New</option>
                  <option>Casual</option>
                  <option>Hardcore Lid</option>
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-black uppercase text-white/80">Mood</span>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="border-4 border-white/20 bg-[#090d2a] p-4 font-bold text-white outline-none focus:border-[#ff4a1c]"
                >
                  {moods.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-black uppercase text-white/80">Time available</span>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="border-4 border-white/20 bg-[#090d2a] p-4 font-bold text-white outline-none focus:border-[#ff4a1c]"
                >
                  <option>30 mins</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>Long drive</option>
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-black uppercase text-white/80">Guest preference</span>
                <select
                  value={guestPreference}
                  onChange={(e) => setGuestPreference(e.target.value)}
                  className="border-4 border-white/20 bg-[#090d2a] p-4 font-bold text-white outline-none focus:border-[#ff4a1c]"
                >
                  <option>Open to guests</option>
                  <option>Guest episodes preferred</option>
                  <option>No guest episodes</option>
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-black uppercase text-white/80">Anything to avoid?</span>
                <select
                  value={avoid}
                  onChange={(e) => setAvoid(e.target.value)}
                  className="border-4 border-white/20 bg-[#090d2a] p-4 font-bold text-white outline-none focus:border-[#ff4a1c]"
                >
                  <option>None</option>
                  <option>No heavy chaos</option>
                </select>
              </label>

              <button
                onClick={() => setGenerated(true)}
                className="border-4 border-[#ff4a1c] bg-[#ff4a1c] px-6 py-4 font-black uppercase text-white shadow-[8px_8px_0_#ffffff] transition hover:-translate-y-1"
              >
                Generate My LidList
              </button>
            </div>
          </div>

          <div className="border-4 border-white/15 bg-[#0d1237] p-7 shadow-[12px_12px_0_#ffffff]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#ff4a1c]">
                  Your LidList
                </p>
                <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.05em]">
                  {generated ? "Recommended picks" : "Waiting for your mood"}
                </h2>

               <p className="mt-2 text-sm font-bold text-white/50">
                  LidScore is based on your choices, recency and public YouTube engagement.
                </p> 
              </div>
              <span className="border-2 border-[#ff4a1c] bg-[#ff4a1c] px-3 py-1 text-sm font-black uppercase text-white">
                {generated ? `${recommendations.length} picks` : "MVP"}
              </span>
            </div>

            {!generated && (
              <div className="border-4 border-white/10 bg-[#090d2a] p-8 font-bold leading-7 text-white/60">
                Choose your mood and generate a LidList. The first version uses a curated starter dataset and simple recommendation logic.
              </div>
            )}

            {generated && (
              <div className="space-y-5">
                {recommendations.map((episode, index) => (
                  <article
                    key={episode.id}
                    className="border-4 border-white/10 bg-[#090d2a] p-5 transition hover:border-[#ff4a1c]"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="text-sm font-black uppercase text-[#ff4a1c]">
                          Pick #{index + 1} · {episode.score} LidScore
                        </p>
                        <h3 className="mt-2 text-2xl font-black uppercase tracking-[-0.04em]">
                          {episode.title}
                        </h3>
                        <p className="mt-2 text-sm font-bold text-white/50">
                          {episode.episode} · {episode.guest} · {episode.duration}
                        </p>
                      </div>
                      <div className="hidden border-2 border-white/20 px-3 py-1 text-xs font-black uppercase text-white/60 sm:block">
                        YouTube
                      </div>
                    </div>

                    <p className="mt-4 font-bold leading-7 text-white/70">{episode.summary}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {episode.moodTags.map((tag) => (
                        <span
                          key={tag}
                          className="border-2 border-[#ff4a1c] px-3 py-1 text-xs font-black uppercase text-[#ff4a1c]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 border-l-4 border-[#ff4a1c] bg-white/[0.04] p-4 text-sm font-bold leading-6 text-white/65">
                      <span className="text-[#ff4a1c]">Why this pick: </span>
                      {episode.reason}
                    </p>

                    <a
                      href={episode.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 block w-full border-4 border-[#ff4a1c] px-5 py-3 text-center font-black uppercase text-[#ff4a1c] transition hover:bg-[#ff4a1c] hover:text-white"
                    >
                      Watch on YouTube
                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* NEW LID GUIDE */}
      <section id="guide" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#ff4a1c]">
              New Lid Guide
            </p>
            <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] tracking-[-0.05em]">
              New to the show?
              <br />
              Start here.
            </h2>
            <p className="mt-5 text-base font-bold leading-7 text-white/65">
              OnlyLids helps new listeners find accessible episodes before diving into the deeper cuts.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["Start easy", "Pick an episode with a high new-listener score."],
              ["Learn the rhythm", "Get used to the format, guests, and running jokes."],
              ["Go deeper", "Move into classic Lid picks once you know the vibe."],
            ].map(([title, text]) => (
              <div key={title} className="border-4 border-[#ff4a1c] bg-[#121844] p-6">
                <h3 className="text-3xl font-black uppercase tracking-[-0.04em]">{title}</h3>
                <p className="mt-3 font-bold leading-7 text-white/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUEST FINDER */}
      <section id="guests" className="px-6 py-20">
        <div className="mx-auto max-w-6xl border-4 border-white/15 bg-[#121844] p-8 shadow-[12px_12px_0_#ff4a1c]">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#ff4a1c]">
            Guest Finder
          </p>
          <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] tracking-[-0.05em]">
            Guest discovery is next.
          </h2>
          <p className="mt-5 max-w-2xl font-bold leading-7 text-white/65">
            The MVP starts with basic guest-aware recommendations. The next version can add guest profiles,
            appearance history, and “why fans like this guest” summaries.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-4 border-[#ff4a1c] bg-[#06091d] px-6 py-10 text-center text-xs font-bold uppercase tracking-wide text-white/45">
        OnlyLids is an unofficial fan-built project and is not affiliated with, endorsed by, or connected to Have A Word, its hosts, or production team.
      </footer>
    </main>
  );
}