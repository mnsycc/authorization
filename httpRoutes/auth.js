const express = require('express');

const router = express.Router();
const multer = require('multer');

const upload = multer();

const authCtrl = require('controllers/auth');
// загрузка шаблона
router.get('/login', (req, res, next) => {
  res.render('auth');
});

// проверка состояния кукисов и юзера
router.get('/check', (req, res, next) => {
  const { uid, isGuest } = req.session;
  if (!uid) {
    res.send('guest');
    return;
  }
  if (uid && isGuest === false) {
    res.send(`logged in id: ${uid}`);
  } else {
    res.send(`not logged in but we know about your id: ${uid}`);
  }
});
// роутер аутентификации
router.post('/login', upload.none(), async (req, res, next) => {
  // получение формы
  const { login, pwd } = req.body;
  // обращение в контроллер
  const { login: loginUser } = authCtrl;
  const result = await loginUser(login, pwd);
  // результат проверки
  console.log(result);

  // запись сессии, если статус проверки - ок
  if (result.status === 'ok') {
    req.session.uid = result.uid;
    req.session.isGuest = false;
  }
  // ответ на фронт
  res.json(result);
});

// роутер логаута
router.get('/logout', upload.none(), async (req, res, next) => {
  // req.session.uid = null;
  // ставит статус сессии - гость и логаутит(но айди сессии остается в бд!)
  req.session.isGuest = true;

  res.send('LoggedOut');
});

module.exports = router;
