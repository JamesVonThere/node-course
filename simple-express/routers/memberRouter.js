const express = require('express')
const router = express.Router();

router.get('/info', (req, res, next) => {
    if (req.session.member) {
        return res.json(req.session.member);
    } else {
        
    }
})