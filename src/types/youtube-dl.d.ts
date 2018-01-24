export interface VideoInfo {
  id: string;
  uploader: string;
  uploader_id: string;
  uploader_url: string;
  upload_date: string;
  license: string;
  creator: any;
  title: string;
  alt_title: any;
  thumbnail: string;
  description: string;
  categories: string[];
  tags: string[];
  subtitles: Subtitles;
  automatic_captions: Automatic_captions;
  duration: number;
  age_limit: number;
  annotations: any;
  chapters: any;
  webpage_url: string;
  view_count: number;
  like_count: number;
  dislike_count: number;
  average_rating: number;
  formats: Format[];
  is_live: any;
  start_time: any;
  end_time: any;
  series: any;
  season_number: any;
  episode_number: any;
  extractor: string;
  webpage_url_basename: string;
  extractor_key: string;
  playlist: any;
  playlist_index: any;
  thumbnails: Thumbnail[];
  display_id: string;
  requested_subtitles: any;
  requested_formats: Requested_format[];
  format: string;
  format_id: string;
  width: number;
  height: number;
  resolution: any;
  fps: number;
  vcodec: string;
  vbr: any;
  stretched_ratio: any;
  acodec: string;
  abr: number;
  ext: string;
  fulltitle: string;
  _filename: string;
}

export interface Subtitles {
}

export interface Automatic_captions {
}

export interface Format {
  format_id: string;
  url: string;
  player_url: string;
  ext: string;
  format_note: string;
  acodec: string;
  abr: number;
  filesize: number;
  tbr: number;
  vcodec: string;
  format: string;
  protocol: string;
  http_headers: Http_headers;
  container: string;
  height: number;
  width: number;
  fps: number;
  resolution: string;
}

export interface Http_headers {
  'User-Agent': string;
  'Accept-Charset': string;
  Accept: string;
  'Accept-Encoding': string;
  'Accept-Language': string;
}

export interface Thumbnail {
  url: string;
  id: string;
}

export interface Requested_format {
  format_id: string;
  url: string;
  player_url: string;
  ext: string;
  height: number;
  format_note: string;
  vcodec: string;
  filesize: number;
  tbr: number;
  width: number;
  fps: number;
  acodec: string;
  format: string;
  protocol: string;
  http_headers: Http_headers;
  abr: number;
}
