const shortid = require('shortid');
const URL = require("../models/url");

async function generateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required!!" });
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id
  });

  return res.render("generated-url", { id: shortID });
};

async function redirectToURL(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now()
        }
      }
    }
  );

  return res.redirect(entry.redirectURL);
};

async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.render("analytics", {
    shortId,
    totalClicks: result.visitHistory.length,
    visitHistory: result.visitHistory,
  });
};

module.exports = {
  generateNewShortURL,
  redirectToURL,
  getAnalytics
}