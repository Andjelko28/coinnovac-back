import express from 'express';
import actionlogController from '../controller/actionlog-controller';

const router = express.Router();

router.route('/')
    .get(actionlogController.getActionLog)
    .post(actionlogController.insertNewLog)

router.route('/:id')
    .get(actionlogController.getLogByID)
    .put(actionlogController.updateLog)

export default router;