require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 8888
const ShortUrl = require('./models/shortUrl')
var cors = require('cors')
const app = express()
const path = require('path')

// Serve all static files first
app.use(express.static(path.resolve('client/build')))

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

mongoose.connect(process.env.MONGODB_URL).then(() => console.log("Successfully Connected to the DB")).catch((err) => console.log(err))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

/**
 * This route is used to shorten the inputted URL
 * Requires the Full URL and the short URL w/c is created by either a custom inputted short URL or nanoid() generated.
 * Process goes like this:
 * Get the inputted long URL and check if it already exists in the DB. 
 * If it does, return its data including its shortURL
 * If it doesn't, save it to the DB.
 * @params {String}
 * @returns {promise}
 */
app.post('/shorten', async (req, res) => {
    const urlData = new ShortUrl(req.body)
    const longUrl = urlData.fullUrl;
    const createdShortUrl = urlData.shortUrl;

    try {
        ShortUrl.findOne({ fullUrl: longUrl }, async (err, data) => {
            if (data) {
                // If the inputted URL already exists in the DB, return its data
                console.log(data)
                res.status(200).json(data);
            } else {
                // else create a new short URL for it
                try {
                    ShortUrl.findOne({ shortUrl: createdShortUrl }, async (err, data) => {
                        if (data) {
                            // If the inputted short or custom URL already exists in the DB, return message
                            res.status(200).json(data);
                        } else {
                            // else create a new short URL for it
                            await urlData.save()
                            res.status(200).json(urlData);
                        }
                        // await urlData.save();
                        // res.status(200).json(urlData);
                    })

                } catch (err) {
                    res.status(500).json(err)
                    console.log(err)
                }
            }
        })
    } catch (err) {
        console.log(err)
    }
})

/**
 * This route is used to redirect the user using the created shortURL
 * Requires the shortURL as params
 * Process goes like this:
 * Check if the shortURL exists in the DB.
 * If it doesn't, return a 404 error and redirect the user in the homepage.
 * If it does, redirect the user using the fullURL of the shortURL params.
 * @params {shortUrl}
 * @returns {void}
 */
app.get('/redirect/:shortUrl', async (req, res) => {
    const shortUrl = req.params.shortUrl
    try {
        ShortUrl.findOne({ shortUrl }, (err, data) => {
            if (!data) return res.status(404).json("Your provided short url may have expired. Try shortening it again.");
            res.status(200).json(data.fullUrl)
        })
    } catch (err) {
        res.status(500).json({ message: err })
        console.log(err)
    }
})

// Catch all remaining req that are not recognized and returns it to the React App, so it can handle routing
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})