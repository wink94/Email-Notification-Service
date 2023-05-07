// Core modules
import { Router } from 'express';
import NotificationApi from './notificationApi';
import TemplateApi from './templateApi';
import RecipientsApi from './recipientsApi';

const notificationApi = new NotificationApi();
const templateApi = new TemplateApi();
const recipientApi = new RecipientsApi();
const router = Router();
router.use('/email/push-notification/', notificationApi.router);
router.use('/email/template/', templateApi.router);
router.use('/email/recipient/', recipientApi.router);
export default router;
