const { Router } = require("express");
const router = Router();
const {
  signUpUser,
  signInUser,
  getUser,
} = require('../controllers/userControllers');
const userMiddleware  = require('../middlewares/userMiddleware');

router.post('/signup', signUpUser);
router.post('/signin', signInUser);
router.route('/me').get(userMiddleware, getUser);

module.exports = router;
