const Clarifai = require("clarifai");

const app = new Clarifai.App({
    apiKey: '876e86f7b1324d5eaccb942eee4b268c'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    }).catch(err => res.status(400).json('unable to work with API'));
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries').then(entries => {
            res.json(entries[0].entries)
        }).catch(() => res.status(400).json('no Match'))
}

module.exports = {
    handleImage,
    handleApiCall
}; 