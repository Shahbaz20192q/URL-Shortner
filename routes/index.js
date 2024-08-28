var express = require('express');
var router = express.Router();
const shortid = require('shortid');

const urlDatabase = {};
const port = 3000

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

router.post('/shorten', (req, res) => {
  const { url } = req.body;
  const shortId = shortid.generate();
  urlDatabase[shortId] = url;
  res.render('shortened', { shortUrl: `http://localhost:${port}/${shortId}` });
});

router.get('/:shortId', (req, res) => {
  const { shortId } = req.params;
  const longUrl = urlDatabase[shortId];
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).render('error', { message: 'URL not found' });
  }
});

module.exports = router;
