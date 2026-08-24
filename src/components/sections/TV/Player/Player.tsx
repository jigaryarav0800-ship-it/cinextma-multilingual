"use client";

import OfficialProviders from "@/components/sections/Shared/OfficialProviders";
import LanguageExperience from "@/components/sections/Shared/LanguageExperience";
import { siteConfig } from "@/config/site";
import { getImageUrl } from "@/utils/movies";
import { Card, CardBody, Chip, Image } from "@heroui/react";
import { useDocumentTitle } from "@mantine/hooks";
import Link from "next/link";
import { memo } from "react";
import { FiArrowLeft, FiCalendar, FiFilm, FiHeadphones, FiPlay, FiStar } from "react-icons/fi";
import { Episode, TvShowDetails } from "tmdb-ts";

export interface TvShowPlayerProps {
  tv: TvShowDetails;
  id: number;
  seriesName: string;
  seasonName: string;
  episode: Episode;
  episodes: Episode[];
  nextEpisodeNumber: number | null;
  prevEpisodeNumber: number | null;
  startAt?: number;
}

const TvShowPlayer: React.FC<TvShowPlayerProps> = ({ tv, id, seriesName, seasonName, episode }) => {
  useDocumentTitle(`Where to watch ${seriesName} - ${seasonName} - ${episode.name} | ${siteConfig.name}`);

  return (
    <section className="mx-auto min-h-[calc(100dvh-4rem)] w-full max-w-6xl px-4 pb-16 pt-6 md:px-8 md:pt-10">
      <Link
        href={`/tv/${id}`}
        className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-white/65 transition-colors duration-200 hover:bg-white/10 hover:text-white"
      >
        <FiArrowLeft aria-hidden="true" />
        Back to series
      </Link>

      <Card className="overflow-hidden border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/30">
        <CardBody className="p-0">
          <div className="grid gap-0 md:grid-cols-[220px_1fr]">
            <div className="relative aspect-[2/3] overflow-hidden bg-black/40 md:aspect-auto">
              <Image
                removeWrapper
                src={getImageUrl(tv.poster_path, "poster")}
                alt={`${seriesName} poster`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            </div>
            <div className="flex flex-col justify-center gap-5 p-6 md:p-10">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
                <FiFilm aria-hidden="true" />
                Official episode guide
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">{seriesName}</h1>
                <p className="mt-3 text-base text-white/60">{seasonName} · Episode {episode.episode_number}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Chip size="sm" variant="flat" startContent={<FiPlay aria-hidden="true" />}>
                  {episode.name}
                </Chip>
                {episode.air_date && (
                  <Chip size="sm" variant="flat" startContent={<FiCalendar aria-hidden="true" />}>
                    {episode.air_date}
                  </Chip>
                )}
                <Chip size="sm" color="warning" variant="flat" startContent={<FiStar aria-hidden="true" />}>
                  {episode.vote_average.toFixed(1)}
                </Chip>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-white/65 md:text-base">
                Find the series on an official provider for your region. Audio tracks and subtitles are controlled by
                the provider, so only tracks offered by that service can be selected during playback.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      <OfficialProviders
        id={id}
        title={`${seriesName} · ${seasonName}`}
        type="tv"
        spokenLanguages={tv.spoken_languages}
      />
      <LanguageExperience
        availableAudioLanguages={[]}
      />

      <div className="mt-4 flex items-center gap-2 text-xs text-white/45">
        <FiHeadphones aria-hidden="true" />
        Audio-language information is metadata; actual audio selection is provided by the official streaming service.
      </div>
    </section>
  );
};

export default memo(TvShowPlayer);
