const fs = require("fs");

const API_KEY = process.env.YOUTUBE_API_KEY;

if (!API_KEY) {
  console.error("Missing YOUTUBE_API_KEY environment variable.");
  process.exit(1);
}

function extractVideoId(url) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "");
    }

    if (parsed.searchParams.get("v")) {
      return parsed.searchParams.get("v");
    }

    const shortsMatch = parsed.pathname.match(/\/shorts\/([^/?]+)/);
    if (shortsMatch) return shortsMatch[1];

    return null;
  } catch {
    return null;
  }
}

async function fetchStats(videoIds) {
  const url =
    "https://www.googleapis.com/youtube/v3/videos" +
    `?part=snippet,contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`YouTube API error: ${res.status} ${text}`);
  }

  return res.json();
}

async function main() {
  const links = fs
    .readFileSync("video-links.txt", "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const videoIds = links.map(extractVideoId).filter(Boolean);

  if (videoIds.length === 0) {
    console.error("No valid video IDs found.");
    process.exit(1);
  }

  const batches = [];
  for (let i = 0; i < videoIds.length; i += 50) {
    batches.push(videoIds.slice(i, i + 50));
  }

  const allItems = [];

  for (const batch of batches) {
    const data = await fetchStats(batch);
    allItems.push(...data.items);
  }

  const episodes = allItems.map((item, index) => ({
    id: index + 1,
    title: item.snippet.title,
    episode: item.snippet.title.match(/#\d+/)?.[0] || "Public Episode",
    guest: "To tag manually",
    duration: item.contentDetails.duration,
    published: item.snippet.publishedAt,
    youtubeUrl: `https://www.youtube.com/watch?v=${item.id}`,
    appleUrl: "",
    youtubeViews: Number(item.statistics.viewCount || 0),
    youtubeLikes: Number(item.statistics.likeCount || 0),
    youtubeComments: Number(item.statistics.commentCount || 0),
    moodTags: ["Guest Episode"],
    summary: "Original short summary to add manually.",
    themes: ["public", "youtube"],
  }));

  fs.writeFileSync(
    "youtube-episodes.json",
    JSON.stringify(episodes, null, 2)
  );

  console.log(`Saved ${episodes.length} episodes to youtube-episodes.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});