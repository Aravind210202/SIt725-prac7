const express = require('express');
const { postCard, getAllCards } = require('../controller/cardController');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

router.get('/api/cards', getAllCards);
router.post('/api/cards', postCard);

module.exports = router;