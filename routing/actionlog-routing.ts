import express from 'express';
import actionlogController from '../controller/actionlog-controller';

const router = express.Router();

router.route('/')
    .get(actionlogController.getActionLog)
    .post(actionlogController.insertNewLog)

router.route('/:user_mail')
    .get(actionlogController.getLogByID)

export default router;