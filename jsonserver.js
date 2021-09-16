const faker = require("faker");

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = () => {
  const data = { tasks: [] };
  for (let i = 0; i < 3000; i++) {
    data.tasks.push({
      id: i,
      title: faker.lorem.words(getRandomIntInclusive(1, 10)),
      done: Math.random() < 0.5,
    });
  }

  return data;
};
