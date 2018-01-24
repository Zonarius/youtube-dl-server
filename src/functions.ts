import * as cp from 'child_process';
import { Readable } from 'stream';
import { YoutubeID } from './types/model';
import { VideoInfo } from './types/youtube-dl';

export function downloadVideo(id: YoutubeID): Readable {
    return cp.spawn('youtube-dl', ['-o', '-', createYoutubeUrl(id)]).stdout;
}

export function convertToMp3(input: Readable): Readable {
    const process = cp.spawn('ffmpeg', ['-i', 'pipe:0', '-f', 'mp3', 'pipe:1']);
    input.pipe(process.stdin);
    return process.stdout;
}

export function getVideoInfo(id: YoutubeID): Promise<VideoInfo> {
    return new Promise((res, rej) => {
        cp.execFile('youtube-dl', ['--dump-json', createYoutubeUrl(id)], (error, stdout, stderr) => {
            if (error) {
                rej({...error, stderr, stdout});
            } else {
                res(JSON.parse(stdout));
            }
        })
    })
}

function createYoutubeUrl(id: YoutubeID): string {
    return `https://www.youtube.com/watch?v=${id}`;
}

export function toFilename(info: VideoInfo): string {
    return `${info.title}.mp3`;
}