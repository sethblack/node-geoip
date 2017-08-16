const express = require('express');
const maxmind = require('maxmind');
const router = express.Router();

const maxMindIPLookup = maxmind.openSync('./db/GeoLite2-City.mmdb', {
  cache: {
    max: 1000,
    maxAge: 1000 * 60 * 60,
  }
});

router.get('/', (req, res) => {
  if (!(req.query.addr)) {
    res.json({ success: false });
    return;
  }

  const maxMindRes = maxMindIPLookup.get(req.query.addr);

  res.json({ success: true, maxMindRes });
});

module.exports = router;