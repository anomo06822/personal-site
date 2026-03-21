import stats from "../../content/generated/public-profile-stats.json";
import type { PublicProfileStats } from "./types";

export function getPublicProfileStats() {
  return stats as PublicProfileStats;
}
