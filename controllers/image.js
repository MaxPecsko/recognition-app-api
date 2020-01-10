const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '0fd2c5196ec746c696d52ed7524229f3'
});

const handleApiCall = () => (req, res) => {
  app.models
    .predict('a403429f2ddf4b49b307e318f00e528b', req.body.input)
    .then(response => res.json(response))
    .catch(err => res.status(400).json(err));
};

const handleImage = db => (req, res) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("Looks like we've got an error."));
};

module.exports = {
  handleImage,
  handleApiCall
};
