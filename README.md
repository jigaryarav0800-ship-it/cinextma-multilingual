# CINEXTMA Multilingual

CINEXTMA is a movie and TV discovery application with a cinematic, mobile-first interface. It uses TMDB for catalog metadata and helps users find official availability by country. The project does not host or distribute copyrighted media.

## What is included

The redesigned interface includes a polished dark cinema visual system, responsive movie cards, accessible focus states, light/dark theme support, an interface-language switcher, movie and TV browsing, search, personal library flows, and a country-aware “Where to watch” panel.

The language experience panel lets a viewer choose a preferred target language and clearly distinguishes three cases: original audio, an official human-dubbed track offered by the provider, and a future live-translation mode that is available only when an authorized source permits audio processing. TMDB spoken-language metadata is not treated as proof that a human-dubbed audio track exists.

The provider panel uses TMDB’s watch-provider data, powered by its JustWatch partnership, to show subscription, rental and purchase availability by region. The application links users to official availability pages; it does not bypass subscriptions, scrape paid streams, or embed unauthorized sources.

## Technology

The web app uses Next.js, React, TypeScript, Tailwind CSS, HeroUI, TanStack Query, TMDB and Supabase. Capacitor is included to package the same web experience as an Android application. The Android project is generated under `android/` and uses the app id `com.cinextma.multilingual`.

## Local development

Clone the public repository and install dependencies:

```bash
git clone https://github.com/jigaryarav0800-ship-it/cinextma-multilingual.git
cd cinextma-multilingual
npm install
cp .env.local.example .env.local
npm run dev
```

Open `http://localhost:3000`. Add real TMDB and Supabase values to `.env.local` for live catalog, account and provider functionality. The build can compile without these values, but API-backed features need valid runtime configuration.

## Android build

The project contains a Capacitor Android wrapper using the same web UI:

```bash
npm run build:static
npx cap sync android
cd android
./gradlew assembleDebug
```

The debug APK is generated at `android/app/build/outputs/apk/debug/app-debug.apk`. The Android wrapper can load the deployed GitHub Pages URL through `CAP_SERVER_URL`; this keeps the web and Android presentation aligned while official provider playback remains controlled by the provider.

## Automatic GitHub workflow

`.github/workflows/release.yml` is configured to run on pushes to `main` or manually. It calculates the next semantic patch tag, deploys the static web build to GitHub Pages, builds an Android debug APK, uploads the APK as a workflow artifact, and attaches it to a GitHub Release.

Before the workflow can access live TMDB and Supabase data, add the following GitHub Actions secrets: `NEXT_PUBLIC_TMDB_ACCESS_TOKEN`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_CAPTCHA_SITE_KEY`, and `NEXT_PUBLIC_AVATAR_PROVIDER_URL`. Never commit `.env.local` or service-role credentials.

## Static hosting limitation

GitHub Pages serves static files only. Account actions, server actions, Supabase auth callbacks and other server-dependent flows require a compatible server deployment. The Pages workflow therefore targets the static web surface, while a full production deployment should run the Next.js server on a server-capable host. The Android wrapper can point at that full deployment by setting `CAP_SERVER_URL`.

## Audio and language policy

The app supports choosing an audio language only when the licensed playback source exposes that official human-recorded track. A movie cannot be converted to a new audio language merely by changing a UI preference. No AI-generated voice or unauthorized stream interception is used. A future licensed media adapter may provide verified audio-track IDs and connect them to the audio selector.

## License

This project is distributed under the MIT License. See [LICENSE](LICENSE). TMDB and JustWatch attribution and their respective terms apply to provider data.
