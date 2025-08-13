const SKILLS_KEY = "skills";
const SKILLS_TIMESTAMP_KEY = "skills_timestamp";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 שעות

export async function getSkills() {
  const cached = localStorage.getItem(SKILLS_KEY);
  const timestamp = localStorage.getItem(SKILLS_TIMESTAMP_KEY);

  const isValidCache = cached && timestamp && (Date.now() - Number(timestamp) < CACHE_TTL_MS);
  if (isValidCache) {
    console.log("Loaded skills from localStorage");
    return JSON.parse(cached);
  }

  const res = await fetch(`${CONFIG.API_BASE_URL}/jobs/skills`,
 {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch skills");
  }

  const data = await res.json();

  if (!data.skills)
    {
        throw new Error("Response missing 'skills' field");
    }

  const skills = data.skills;

  // שמירה ב־localStorage
  localStorage.setItem(SKILLS_KEY, JSON.stringify(skills));
  localStorage.setItem(SKILLS_TIMESTAMP_KEY, Date.now());

  console.log("Fetched and cached skills");
  return skills;
}
