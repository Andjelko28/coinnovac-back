import express from 'express';
import actionlogController from '../controller/actionlog-controller';


const router = express.Router();

router.route('/api')
    .get(actionlogController.getActionLog)
    .post(actionlogController.insertNewLog)

router.route('/api/user/:user_mail')
    .get(actionlogController.getLogByID)

export default router;