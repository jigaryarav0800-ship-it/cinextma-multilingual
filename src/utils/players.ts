/**
 * Legal playback policy for CINEXTMA.
 *
 * The application does not generate or embed unofficial movie/TV stream URLs.
 * Use the TMDB watch-provider endpoint and official provider links instead.
 * This file remains as a compatibility boundary for older imports.
 */

export type OfficialPlaybackLink = {
  title: string;
  source: `https://${string}`;
  provider?: string;
};

export const getMoviePlayers = (): OfficialPlaybackLink[] => [];

export const getTvShowPlayers = (): OfficialPlaybackLink[] => [];
