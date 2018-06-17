const Clarifai = require('clarifai');
const clarifai = new Clarifai.App({
 apiKey: 'e1424d3a9deb43588f7ddfcacddb7e6f'
});

const handleApiCall = (req, res) => {
  clarifai.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('API fail'))
}

const handleImage = (req, res, db) => {
  const {id} = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
}
