import HttpStatus from 'http-status-codes';
import request from 'supertest';
import { app } from '../../../app';
import * as sesServiceRequest from '../../../dto/sesService/sesServiceRequestDTO';
import notificationService from '../../../services/notification/notificationService';
jest.mock('../../../services/notification/notificationService');



describe('routes: POST v1/notification/email/push-notification', () => {

    test('push notification API should respond with bad request status', async () => {
        const response = await request(app)
            .post('/v1/notification/email/push-notification')
            .set('Accept', 'application/json')
            .send({});
        expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(response.body).toBeDefined();
    });

    test('push notification API should respond with success status', async () => {
        const jsonBody = {
            "applicationName": "report_scheduler",
            "emailCategory": "gl_report",
            "template": "crms_gl_posting",
            "templateData": {
                "subject": "CRMS GL Posting – Job Status",
                "dateTime": "06-02-2020 19:23:23",
                "userEmail": "test@user.com",
                "agreementReportStatus": "Completed",
                "obligationReportStatus": "Failed",
                "successOpcos": [{ "column_1": "006", "column_3": "003", "column_2": "008" }],
                "failedOpcos": [{ "column_1": "005", "column_2": "006", "column_3": "003" }],
                "failures": false,
                "agreementReportURL": "http://www.abc.com",
                "obligationReportURL": "http://www.abc.com"
            },
            "toAddresses": ["sachith.rangana@syscolabs.com"],
            "ccAddresses": [],
            "bccAddresses": []
        }

        notificationService.pushNotification = () => ({
            isSuccess: true,
            payLoad: {
                "requestId": "1aaee205-fbbf-436f-881d-c98325c33806"
            },
        })
        const response = await request(app)
            .post('/v1/notification/email/push-notification')
            .set('Accept', 'application/json').send(jsonBody);
        expect(response.status).toEqual(HttpStatus.ACCEPTED);
        expect(response.body).toStrictEqual({
            status: 'success',
            data: { requestId: '1aaee205-fbbf-436f-881d-c98325c33806' }
        }
        );
    });

    test('push notification API should respond with internal error status', async () => {

        const jsonBody = {
            "applicationName": "report_scheduler",
            "emailCategory": "gl_report",
            "template": "test_template_2",
            "templateData": {
                "subject": "CRMS GL Posting – Job Status",
                "dateTime": "06-02-2020 19:23:23",
                "userEmail": "test@user.com",
                "agreementReportStatus": "Completed ",
                "obligationReportStatus": "Failed",
                "successOpcos": [{ "column_1": "006", "column_3": "003", "column_2": "008" }],
                "failedOpcos": [{ "column_1": "005", "column_2": "006", "column_3": "003" }],
                "failures": false
            },
            "toAddresses": ["sachith.rangana@syscolabs.com"],
            "ccAddresses": [],
            "bccAddresses": []
        }
        sesServiceRequest.sesServiceRequestDTO = jest.fn().mockReturnValue(jsonBody);

        notificationService.pushNotification = () => ({
            isSuccess: false,
            payLoad: {
                "requestId": "1aaee205-fbbf-436f-881d-c98325c33806"
            },
        })
        const response = await request(app)
           
            .post('/v1/notification/email/push-notification')
            .set('Accept', 'application/json').send(jsonBody);
        expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(response.body).toStrictEqual({
            status: 'error',
            data: { message: { requestId: '1aaee205-fbbf-436f-881d-c98325c33806' } }
        });
    });
});