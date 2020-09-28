const users = [];

const addUser = ({ name }) => {
  if (name === 'system') {
    return { error: 'The username "system" is reserved' };
  }

  const existingUser = users.find(user => user.name === name);

  if (existingUser) {
    return { error: 'The username is taken' };
  }

  const user = { name };
  users.push(user);
  return { user };
}

const removeUser = name => {
  const index = users.findIndex(user => user.name === name);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

const getUser = name => {
  return users.find(user => user.name === name);
}

const getUsers = () => {
  return users;
}

module.exports = { addUser, removeUser, getUser, getUsers };