// const shortid = require("shortid");
// const Url = require("url");

// async function handleGenerateNewShortUrl(req, res) {
//     const body = req.body;
    
//     if (!body.url) return res.status(400).json({ error: 'url is required' }); 
    
//     const shortId = shortid();
//     await Url.create({ 
//         shortId: shortId,
//         redirectURL:body.url,
//         visitedHistory: [],
//     });
//     return res.json({ id: shortId});

// }

// module.exports = handleGenerateNewShortUrl;
const shortid = require("shortid");
const URL = require("../models/url"); 

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    

    if (!body.url) return res.status(400).json({ error: 'url is required' }); 
    

    const shortId = shortid.generate(); 
    
    
    try {
        await URL.create({ 
            shortId: shortId,
            redirectURL: body.url,
            visitHistory: [],
        });
        return res.json({ id: shortId });
    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }


}
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    
    const result = await URL.findOne({ shortId });

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = handleGenerateNewShortUrl;

