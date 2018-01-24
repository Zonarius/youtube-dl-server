"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fst = require("express");
const functions_1 = require("./functions");
const app = fst();
app.get('*', async (req, res) => {
    const id = req.query.v;
    if (!id) {
        res.status(400);
        return res.end('Provide youtube ID as query parameter "v"');
    }
    console.log(`Trying to download ${id}`);
    const info = await functions_1.getVideoInfo(id);
    console.log(`Downloading ${id}: ${info.title}`);
    const filename = functions_1.toFilename(info);
    res.header('Content-Type', 'audio/mpeg');
    res.header('Content-Disposition', `attachment; filename="${filename}"`);
    const process = functions_1.convertToMp3(functions_1.downloadVideo(id));
    process.pipe(res);
    process.on('close', () => console.log(`Done downloading ${id}`));
});
const server = app.listen(8080, () => console.log(`Listening on 8080`));
const stop = () => server.close();
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
