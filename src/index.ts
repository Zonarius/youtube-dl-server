import * as fst from 'express';
import { MainRequest } from './types/model';
import { downloadVideo, convertToMp3, getVideoInfo, toFilename } from './functions';

const app = fst();

app.get('*', async (req: MainRequest, res) => {
    const id = req.query.v;
    if (!id) {
        res.status(400);
        return res.end('Provide youtube ID as query parameter "v"');
    }
    console.log(`Trying to download ${id}`);
    const info = await getVideoInfo(id);
    console.log(`Downloading ${id}: ${info.title}`);
    const filename = toFilename(info);

    res.header('Content-Type', 'audio/mpeg');
    res.header('Content-Disposition', `attachment; filename="${filename}"`);

    const process = convertToMp3(downloadVideo(id))
    process.pipe(res);
    process.on('close', () => console.log(`Done downloading ${id}`))
});

const server = app.listen(8080, () => console.log(`Listening on 8080`));

const stop = () => server.close();

process.on('SIGINT', stop);
process.on('SIGTERM', stop);
