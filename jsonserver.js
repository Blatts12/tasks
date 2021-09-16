const faker = require("faker");

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateTask = (index) => {
  return {
    id: index,
    title: faker.lorem.words(getRandomIntInclusive(2, 10)),
    done: Math.random() < 0.5,
  };
};

module.exports = () => {
  const data = { tasks: [] };
  for (let i = 0; i < 3125; i++) {
    data.tasks.push(generateTask(i));
  }

  return data;
};
