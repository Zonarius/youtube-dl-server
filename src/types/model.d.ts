import { Request } from 'express';

export type YoutubeID = string;

export interface MainRequest extends Request {
    "query": {
        v: YoutubeID;
    }
}

export interface VideoInfo {
    
}