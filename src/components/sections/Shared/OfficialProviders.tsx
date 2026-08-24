"use client";

import { getLanguageLabel } from "@/config/languages";
import { tmdb } from "@/api/tmdb";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, CardBody, Chip, Image, Select, SelectItem, Spinner } from "@heroui/react";
import { useMemo, useState } from "react";
import { FiExternalLink, FiFileText, FiGlobe, FiHeadphones, FiInfo } from "react-icons/fi";

type Provider = {
  provider_id: number;
  provider_name: string;
  logo_path: string;
};

type ProviderRegion = {
  link?: string;
  flatrate?: Provider[];
  rent?: Provider[];
  buy?: Provider[];
};

type OfficialProvidersProps = {
  id: number;
  title: string;
  type: "movie" | "tv";
  spokenLanguages?: Array<{ iso_639_1: string; english_name: string; name: string }>;
};

const regions = [
  { code: "IN", label: "India" },
  { code: "US", label: "United States" },
  { code: "GB", label: "United Kingdom" },
  { code: "CA", label: "Canada" },
  { code: "AU", label: "Australia" },
  { code: "DE", label: "Germany" },
  { code: "FR", label: "France" },
  { code: "JP", label: "Japan" },
];

const posterUrl = (path: string) => `https://image.tmdb.org/t/p/w92${path}`;

const OfficialProviders = ({ id, title, type, spokenLanguages = [] }: OfficialProvidersProps) => {
  const [region, setRegion] = useState("IN");
  const { data, isPending, isError } = useQuery({
    queryKey: ["official-watch-providers", type, id],
    queryFn: () => (type === "movie" ? tmdb.movies.watchProviders(id) : tmdb.tvShows.watchProviders(id)),
    staleTime: 1000 * 60 * 30,
  });

  const currentRegion = useMemo(
    () => (data?.results as Record<string, ProviderRegion | undefined> | undefined)?.[region],
    [data, region],
  );

  const providers = useMemo(() => {
    const groups = [
      ...(currentRegion?.flatrate ?? []).map((provider) => ({ ...provider, category: "Subscription" })),
      ...(currentRegion?.rent ?? []).map((provider) => ({ ...provider, category: "Rent" })),
      ...(currentRegion?.buy ?? []).map((provider) => ({ ...provider, category: "Buy" })),
    ];
    return groups.filter(
      (provider, index, list) =>
        list.findIndex(
          (candidate) => candidate.provider_id === provider.provider_id && candidate.category === provider.category,
        ) === index,
    );
  }, [currentRegion]);

  return (
    <Card className="mt-6 overflow-hidden border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20">
      <CardBody className="gap-5 p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-rose-300">
              <FiGlobe aria-hidden="true" />
              Official viewing options
            </div>
            <h2 className="text-xl font-bold text-white md:text-2xl">Where to watch {title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
              Availability changes by country. Choose a region to see legal subscription, rental and purchase options.
            </p>
          </div>
          <Select
            aria-label="Choose country or region"
            selectedKeys={[region]}
            onChange={(event) => setRegion(event.target.value || "IN")}
            className="w-full md:max-w-48"
            size="sm"
            startContent={<FiGlobe aria-hidden="true" />}
          >
            {regions.map((item) => (
              <SelectItem key={item.code} textValue={item.label}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="rounded-xl border border-amber-300/15 bg-amber-300/[0.06] p-4 text-sm leading-6 text-amber-100/80">
          <div className="flex items-start gap-3">
            <FiInfo className="mt-1 shrink-0" aria-hidden="true" />
            <span>
              Provider information is supplied by TMDB through its JustWatch partnership. This panel links to official
              availability information; it does not bypass subscriptions or host copyrighted video.
            </span>
          </div>
        </div>

        {isPending && (
          <div className="flex min-h-24 items-center justify-center">
            <Spinner color="danger" label="Checking official providers" />
          </div>
        )}

        {!isPending && (isError || !currentRegion || providers.length === 0) && (
          <div className="rounded-xl border border-dashed border-white/15 p-5 text-sm text-white/60">
            No provider availability was returned for this region. Try another country or open the TMDB availability page.
          </div>
        )}

        {!isPending && providers.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => (
              <div
                key={`${provider.provider_id}-${provider.category}`}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3 transition-colors duration-200 hover:border-rose-300/40 hover:bg-white/[0.08]"
              >
                <Image
                  src={posterUrl(provider.logo_path)}
                  alt=""
                  width={42}
                  height={42}
                  className="size-10 shrink-0 rounded-xl object-cover"
                  removeWrapper
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-white">{provider.provider_name}</p>
                  <p className="text-xs text-white/50">{provider.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" aria-label="Audio languages listed by TMDB">
            <Chip size="sm" variant="flat" startContent={<FiHeadphones aria-hidden="true" />}>
              Audio metadata
            </Chip>
            {spokenLanguages.length > 0 ? (
              spokenLanguages.map((language) => (
                <Chip key={language.iso_639_1} size="sm" variant="flat" color="secondary">
                  {language.name || language.english_name || getLanguageLabel(language.iso_639_1)}
                </Chip>
              ))
            ) : (
              <span className="text-xs text-white/50">No audio-language metadata available</span>
            )}
            <Chip size="sm" variant="flat" startContent={<FiFileText aria-hidden="true" />}>
              Subtitles depend on provider
            </Chip>
          </div>
          {currentRegion?.link && (
            <Button
              as="a"
              href={currentRegion.link}
              target="_blank"
              rel="noreferrer"
              color="danger"
              variant="flat"
              size="sm"
              endContent={<FiExternalLink aria-hidden="true" />}
            >
              Open official availability
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default OfficialProviders;
