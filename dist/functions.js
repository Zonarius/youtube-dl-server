"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cp = require("child_process");
function downloadVideo(id) {
    return cp.spawn('youtube-dl', ['-o', '-', createYoutubeUrl(id)]).stdout;
}
exports.downloadVideo = downloadVideo;
function convertToMp3(input) {
    const process = cp.spawn('ffmpeg', ['-i', 'pipe:0', '-f', 'mp3', 'pipe:1']);
    input.pipe(process.stdin);
    return process.stdout;
}
exports.convertToMp3 = convertToMp3;
function getVideoInfo(id) {
    return new Promise((res, rej) => {
        cp.execFile('youtube-dl', ['--dump-json', createYoutubeUrl(id)], (error, stdout, stderr) => {
            if (error) {
                rej(Object.assign({}, error, { stderr, stdout }));
            }
            else {
                res(JSON.parse(stdout));
            }
        });
    });
}
exports.getVideoInfo = getVideoInfo;
function createYoutubeUrl(id) {
    return `https://www.youtube.com/watch?v=${id}`;
}
function toFilename(info) {
    return `${info.title}.mp3`;
}
exports.toFilename = toFilename;
