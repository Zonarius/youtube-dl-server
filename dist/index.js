"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fst = require("express");
const functions_1 = require("./functions");
const app = fst();
app.get('*', async (req, res) => {
    const handleError = (err) => {
        console.error(err);
        res.sendStatus(500);
    };
    const id = req.query.v;
    if (!id) {
        res.status(400);
        return res.end('Provide youtube ID as query parameter "v"');
    }
    console.log(`Trying to download ${id}`);
    let info;
    try {
        info = await functions_1.getVideoInfo(id);
    }
    catch (e) {
        return handleError(e);
    }
    console.log(`Downloading ${id}: ${info.title}`);
    const filename = functions_1.toFilename(info);
    res.header('Content-Type', 'audio/mpeg');
    res.header('Content-Disposition', `attachment; filename="${filename}"`);
    const dlVid = functions_1.downloadVideo(id);
    const convert = functions_1.convertToMp3(dlVid);
    [dlVid, convert].forEach(p => p.on('error', handleError));
    convert.on('close', () => console.log(`Done downloading ${id}`));
    convert.pipe(res);
});
const server = app.listen(8080, () => console.log(`Listening on 8080`));
const stop = () => server.close();
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
