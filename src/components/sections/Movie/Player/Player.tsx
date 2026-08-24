"use client";

import OfficialProviders from "@/components/sections/Shared/OfficialProviders";
import LanguageExperience from "@/components/sections/Shared/LanguageExperience";
import { siteConfig } from "@/config/site";
import { getImageUrl, mutateMovieTitle } from "@/utils/movies";
import { Card, CardBody, Chip, Image } from "@heroui/react";
import Link from "next/link";
import { useDocumentTitle } from "@mantine/hooks";
import { FiArrowLeft, FiCalendar, FiClock, FiFilm, FiStar } from "react-icons/fi";
import { MovieDetails } from "tmdb-ts/dist/types/movies";

type MoviePlayerProps = {
  movie: MovieDetails;
  startAt?: number;
};

const MoviePlayer: React.FC<MoviePlayerProps> = ({ movie }) => {
  const title = mutateMovieTitle(movie);
  useDocumentTitle(`Where to watch ${title} | ${siteConfig.name}`);

  return (
    <section className="mx-auto min-h-[calc(100dvh-4rem)] w-full max-w-6xl px-4 pb-16 pt-6 md:px-8 md:pt-10">
      <Link
        href={`/movie/${movie.id}`}
        className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-white/65 transition-colors duration-200 hover:bg-white/10 hover:text-white"
      >
        <FiArrowLeft aria-hidden="true" />
        Back to details
      </Link>

      <Card className="overflow-hidden border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/30">
        <CardBody className="p-0">
          <div className="grid gap-0 md:grid-cols-[220px_1fr]">
            <div className="relative aspect-[2/3] overflow-hidden bg-black/40 md:aspect-auto">
              <Image
                removeWrapper
                src={getImageUrl(movie.poster_path, "poster")}
                alt={`${title} poster`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            </div>
            <div className="flex flex-col justify-center gap-5 p-6 md:p-10">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-rose-300">
                <FiFilm aria-hidden="true" />
                Official viewing guide
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">{title}</h1>
                {movie.tagline && <p className="mt-3 text-base italic text-white/55">{movie.tagline}</p>}
              </div>
              <div className="flex flex-wrap gap-2">
                <Chip size="sm" variant="flat" startContent={<FiCalendar aria-hidden="true" />}>
                  {movie.release_date?.slice(0, 4) || "Release date unavailable"}
                </Chip>
                {movie.runtime > 0 && (
                  <Chip size="sm" variant="flat" startContent={<FiClock aria-hidden="true" />}>
                    {movie.runtime} min
                  </Chip>
                )}
                <Chip size="sm" color="warning" variant="flat" startContent={<FiStar aria-hidden="true" />}>
                  {movie.vote_average.toFixed(1)}
                </Chip>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-white/65 md:text-base">
                Select a country below to find official subscription, rental or purchase options. Audio tracks and
                subtitles are controlled by the provider and may differ by region.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      <OfficialProviders
        id={movie.id}
        title={title}
        type="movie"
        spokenLanguages={movie.spoken_languages}
      />
      <LanguageExperience
        availableAudioLanguages={[]}
      />
    </section>
  );
};

export default MoviePlayer;
