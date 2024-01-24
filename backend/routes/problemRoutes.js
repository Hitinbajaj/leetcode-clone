const { Router } = require("express");
const router = Router();
const {getProblems, getProblemById} = require("../controllers/problemControllers");

router.get('/', getProblems);
router.get('/:id', getProblemById);

module.exports = router;