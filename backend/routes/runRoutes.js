const { Router } = require("express");
const router = Router();
const axios = require('axios');
const fs = require('fs').promises;
const userMiddleware = require('../middlewares/userMiddleware');
const CODE_EVALUATION_URL = 'https://api.hackerearth.com/v4/partner/code-evaluation/submissions/';
const CLIENT_SECRET = 'af80563cb4061002f36405234004586a1c28be80';

const handleRun = async (req, res) => {
    const { code, input } = req.body;
    
    
    // correct inputs

    const data = {
        source: code,
        lang: "CPP14",
        input,
    };

    const headers = { 'client-secret': CLIENT_SECRET };

    try {
        const response = await axios.post(CODE_EVALUATION_URL, data, { headers });
        const result = await response.data.status_update_url;

        setTimeout(async () => {
            const final = await axios.get(result, { headers });
            const finald = final.data;
            res.json(finald);
        }, 3000); 
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

router.route('/').post(userMiddleware, handleRun);

module.exports = router;