import { existsSync, renameSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const routeDirs = [
  resolve("src/app/api"),
  resolve("src/app/auth"),
  resolve("src/app/library"),
  resolve("src/app/movie"),
  resolve("src/app/tv"),
];
const pageFile = resolve("src/app/page.tsx");
const pageBackup = resolve(".pages-build-page-backup.tsx");
const staticPage = resolve("scripts/pages-home.tsx");
const layoutFile = resolve("src/app/layout.tsx");
const layoutBackup = resolve(".pages-build-layout-backup.tsx");
const staticLayout = resolve("scripts/pages-layout.tsx");
const backups = routeDirs.map((routeDir) => ({
  routeDir,
  backupDir: resolve(`.pages-build-${routeDir.split("/").pop()}-backup`),
}));

for (const { routeDir, backupDir } of backups) {
  if (existsSync(backupDir)) renameSync(backupDir, routeDir);
  if (existsSync(routeDir)) renameSync(routeDir, backupDir);
}
if (existsSync(pageBackup)) renameSync(pageBackup, pageFile);
if (existsSync(pageFile)) renameSync(pageFile, pageBackup);
if (existsSync(staticPage)) renameSync(staticPage, pageFile);
if (existsSync(layoutBackup)) renameSync(layoutBackup, layoutFile);
if (existsSync(layoutFile)) renameSync(layoutFile, layoutBackup);
if (existsSync(staticLayout)) renameSync(staticLayout, layoutFile);

try {
  const result = spawnSync("npx", ["next", "build"], {
    stdio: "inherit",
    env: { ...process.env, GITHUB_PAGES: "true" },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exitCode = result.status ?? 1;
} finally {
  if (existsSync(pageFile)) renameSync(pageFile, staticPage);
  if (existsSync(pageBackup)) renameSync(pageBackup, pageFile);
  if (existsSync(layoutFile)) renameSync(layoutFile, staticLayout);
  if (existsSync(layoutBackup)) renameSync(layoutBackup, layoutFile);
  for (const { routeDir, backupDir } of backups) {
    if (existsSync(routeDir)) renameSync(routeDir, backupDir);
    if (existsSync(backupDir)) renameSync(backupDir, routeDir);
  }
}
