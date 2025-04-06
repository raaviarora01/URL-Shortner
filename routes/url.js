const express = require("express");
const { generateNewShortURL, getAnalytics, redirectToURL } = require("../controllers/url");
const router = express.Router();

router.post('/', generateNewShortURL);

router.get('/:shortId', redirectToURL);

router.get('/analytics/:shortId', getAnalytics);

module.exports = router;