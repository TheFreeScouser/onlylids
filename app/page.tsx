"use client";

import { useMemo, useState } from "react";

type Episode = {
  id: number;
  title: string;
  episode: string;
  guest: string;
  duration: string;
  platform: string;
  moodTags: string[];
  summary: string;
  newListenerScore: number;
  chaosScore: number;
  guestScore: number;
  classicScore: number;
  themes: string[];
};

const episodes: Episode[] = [
  {
    id: 1,
    title: "Starter Episode: The Lads at Their Best",
    episode: "Public Episode",
    guest: "No guest",
    duration: "1h 45m",
    platform: "YouTube / Podcast apps",
    moodTags: ["Easy Listen", "Classic Lads", "New Starter"],
    summary:
      "A strong starting point for new listeners who want the feel of the show without needing deep fan context.",
    newListenerScore: 95,
    chaosScore: 55,
    guestScore: 30,
    classicScore: 85,
    themes: ["starter", "lads", "banter"],
  },
  {
    id: 2,
    title: "Chaos Energy Episode",
    episode: "Public Episode",
    guest: "No guest",
    duration: "2h 05m",
    platform: "YouTube / Podcast apps",
    moodTags: ["Chaos", "Classic Lads", "Liverpool Energy"],
    summary:
      "A louder, more chaotic pick for listeners who want the full Have A Word energy.",
    newListenerScore: 70,
    chaosScore: 98,
    guestScore: 20,
    classicScore: 90,
    themes: ["chaos", "liverpool", "lads"],
  },
  {
    id: 3,
    title: "Guest Episode: Easy Entry Point",
    episode: "Public Episode",
    guest: "Guest appearance",
    duration: "1h 50m",
    platform: "YouTube / Podcast apps",
    moodTags: ["Guest Episode", "Easy Listen", "New Starter"],
    summary:
      "A guest-led episode that still feels accessible for people who are new to the show.",
    newListenerScore: 90,
    chaosScore: 45,
    guestScore: 95,
    classicScore: 65,
    themes: ["guest", "starter", "easy"],
  },
  {
    id: 4,
    title: "Deep Cut for the Lid Army",
    episode: "Public Episode",
    guest: "No guest",
    duration: "2h 20m",
    platform: "YouTube / Podcast apps",
    moodTags: ["Classic Lads", "Chaos", "Hardcore Lid"],
    summary:
      "A better pick for returning fans who already understand the show’s rhythm and references.",
    newListenerScore: 45,
    chaosScore: 85,
    guestScore: 20,
    classicScore: 96,
    themes: ["deep cut", "references", "classic"],
  },
  {
    id: 5,
    title: "Commute-Friendly Listen",
    episode: "Public Episode",
    guest: "No guest",
    duration: "58m",
    platform: "Podcast apps",
    moodTags: ["Easy Listen", "New Starter"],
    summary:
      "A lighter pick for someone who wants a shorter listen without committing to a full long episode.",
    newListenerScore: 88,
    chaosScore: 35,
    guestScore: 25,
    classicScore: 60,
    themes: ["short", "commute", "easy"],
  },
  {
    id: 6,
    title: "Liverpool Energy Pick",
    episode: "Public Episode",
    guest: "No guest",
    duration: "1h 40m",
    platform: "YouTube / Podcast apps",
    moodTags: ["Liverpool Energy", "Classic Lads"],
    summary:
      "A strong pick for fans who want the local humour, rhythm and warmth of the show.",
    newListenerScore: 75,
    chaosScore: 70,
    guestScore: 20,
    classicScore: 82,
    themes: ["liverpool", "local", "lads"],
  },
  {
    id: 7,
    title: "Guest Chemistry Pick",
    episode: "Public Episode",
    guest: "Guest appearance",
    duration: "2h 00m",
    platform: "YouTube / Podcast apps",
    moodTags: ["Guest Episode", "Chaos"],
    summary:
      "A guest episode where the chemistry is the main reason to watch.",
    newListenerScore: 72,
    chaosScore: 78,
    guestScore: 96,
    classicScore: 70,
    themes: ["guest", "chemistry", "chaos"],
  },
  {
    id: 8,
    title: "Classic New Fan Guide Pick",
    episode: "Public Episode",
    guest: "No guest",
    duration: "1h 30m",
    platform: "YouTube / Podcast apps",
    moodTags: ["New Starter", "Easy Listen", "Classic Lads"],
    summary:
      "A safe first recommendation for someone who wants to understand why fans love the show.",
    newListenerScore: 98,
    chaosScore: 50,
    guestScore: 25,
    classicScore: 88,
    themes: ["starter", "classic", "guide"],
  },
];

const moods = [
  "Chaos",
  "Guest Episode",
  "Easy Listen",
  "Classic Lads",
  "Liverpool Energy",
  "New Starter",
];

export default function OnlyLidsPage() {
  const [familiarity, setFamiliarity] = useState("New");
  const [mood, setMood] = useState("Chaos");
  const [time, setTime] = useState("1 hour");
  const [guestPreference, setGuestPreference] = useState("Open to guests");
  const [avoid, setAvoid] = useState("None");
  const [generated, setGenerated] = useState(false);

  const recommendations = useMemo(() => {
    return [...episodes]
      .map((episode) => {
        let score = 0;
        const reasons: string[] = [];

        if (episode.moodTags.includes(mood)) {
          score += 35;
          reasons.push(`fits the ${mood.toLowerCase()} mood`);
        }

        if (familiarity === "New" && episode.newListenerScore > 80) {
          score += 25;
          reasons.push("good for new listeners");
        }

        if (familiarity === "Hardcore Lid" && episode.classicScore > 80) {
          score += 25;
          reasons.push("proper Lid Army energy");
        }

        if (guestPreference === "Guest episodes preferred" && episode.guestScore > 80) {
          score += 20;
          reasons.push("strong guest chemistry");
        }

        if (guestPreference === "No guest episodes" && episode.guest === "No guest") {
          score += 20;
          reasons.push("keeps it with the lads");
        }

        if (time === "30 mins" && episode.duration.includes("58m")) {
          score += 15;
          reasons.push("better fit for a shorter listen");
        }

        if (time === "Long drive" && !episode.duration.includes("58m")) {
          score += 10;
          reasons.push("good for a longer listen");
        }

        if (avoid === "No heavy chaos" && episode.chaosScore > 85) {
          score -= 30;
        }

        return {
          ...episode,
          score,
          reason:
            reasons.length > 0
              ? `Picked because it ${reasons.join(", ")}.`
              : "Picked as a balanced recommendation from the curated starter set.",
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
                        {episode.platform}
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

                    <button className="mt-4 w-full border-4 border-[#ff4a1c] px-5 py-3 font-black uppercase text-[#ff4a1c] transition hover:bg-[#ff4a1c] hover:text-white">
                      Watch / listen link to add later
                    </button>
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