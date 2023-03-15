// Core modules
import { Router } from 'express';
import NotificationApi from './sendNotification/notificationApi';
import TemplateApi from './sendNotification/templateApi';

const notificationApi = new NotificationApi();
const templateApi = new TemplateApi();
const router = Router();
router.use('/email/push-notification/', notificationApi.router);
router.use('/email/test-template/', templateApi.router);
export default router;
