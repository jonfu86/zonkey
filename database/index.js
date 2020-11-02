const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/zonkey', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Mongoose is connected to server!');
});

const animalSchema = mongoose.Schema(
  {
    id: Number,
    name: String,
    description: String,
    image: String,
    real: Boolean,
  },
);


const Animal = mongoose.model('Animal', animalSchema);

const addAnimal = (animal) => {
  const filter = { id: animal.id };
  return Animal.findOneAndUpdate(filter, animal, {
    new: true,
    upsert: true,
  })
    .catch((err) => {
      console.error(err);
    });
};

const getAnimal = (id) => Animal.findOne({ id });

module.exports = {
  addAnimal,
  getAnimal,
  db,
};
