const { Router } = require('express');
const contRoller = require('./controller');

const router = Router();

router.route('/').get(contRoller.getStudents);
router.route('/:id').get(contRoller.getStudentsByID);
router.route('/').post(contRoller.addStudent);
router.route('/:id').delete(contRoller.deleteStudent);
router.route('/:id').put(contRoller.updateStudent);

module.exports = router;