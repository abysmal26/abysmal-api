import { Router } from 'express';
const router = Router();

let response;
let blob;

router.get('/nsfw', (req, res) => res.redirect('/'));

router.get('/nsfw/:category', async (req, res) => {
    const { category } = req.params;

    if (!['waifu', 'neko', 'trap', 'blowjob'].includes(category.toLowerCase())) {
        return res.redirect('/');
    }

    try {
        response = await (await fetch(`https://api.waifu.pics/nsfw/${category.toLowerCase()}`)).json();
        blob = await (await fetch(response.url)).blob();
    } catch {
        return res.status(500).json({ message: 'Fail fetching image' });
    }

    res.type(blob.type);
    blob.arrayBuffer().then(buf => res.send(Buffer.from(buf)));
});

export = router;