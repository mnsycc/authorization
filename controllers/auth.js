const config = require('config');
const bcrypt = require('bcrypt');

const userModel = require('models/user');
const authModel = require('models/auth');

// // создание юзера
// userModel.create({
//   name: 'IVAN',
// });

// // хэширование
// const hashPwd = async (pwd) => {
//   const saltRounds = config.get('auth:strategies:local:saltRounds');
//   const salt = await bcrypt.genSalt(saltRounds);
//   return bcrypt.hash(pwd, salt);
// };


// // запись хэшированного пароля и модели аутентификации
// const run = async () => {
//   const password = await hashPwd('123');
//   console.log('password: ', password);

//   authModel.create({
//     strategy: 'local',
//     data: {
//       login: 'eldi007',
//       password,
//     },
//     user: '5ec7bdf0c9401b2da4475455',
//   });
// };
// run();


// проверка наличия юзера и валидация(пароль и логин)
const login = async (login, pwd) => {
  const query = {
    strategy: 'local',
    'data.login': login,
  };

  const userAuth = await authModel.findOne(query);
  if (!userAuth) {
    return { status: 'no_user' };
  }

  const { password: hashedPwd } = userAuth.data;
  const match = await bcrypt.compare(pwd, hashedPwd);

  if (!match) {
    return { status: 'invalid_password' };
  }
  const uid = userAuth.id;
  return { status: 'ok', uid };
};

module.exports = {
  login,
};
