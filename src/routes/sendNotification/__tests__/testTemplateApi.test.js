import HttpStatus from 'http-status-codes';
import request from 'supertest';
import { app } from '../../../app';
import notificationService from '../../../services/notification/notificationService';
jest.mock('../../../services/notification/notificationService');



describe('routes: POST v1/notification/email/test-template', () => {

    test('push notification API should respond with bad request status', async () => {
        notificationService.testTemplate = () => ({
            isSuccess: false,
            payLoad: {
                "requestId": "1aaee205-fbbf-436f-881d-c98325c33806"
            },
        })
        const response = await request(app)
            .post('/v1/notification/email/test-template')
            .set('Accept', 'application/json')
            .send({});
        expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(response.body).toBeDefined();
    });

    test('push notification API should respond with success status', async () => {
        const jsonBody = {
            "template": "crms_scheduled_rebate_report",
            "templateData": {
                "subject": "CRMS Rebate Reports",
                "agreementId": "100000065",
                "agreementDescription": "cakeadmin2 sd",
                "reportToDate": "3/31/2021",
                "reportFromDate": "3/1/2021",
                "reportUrl": "http://REBATE_REPORT/SCHEDULED/202109/ReportSchedulerTestCommon100000065WEEKLYCUSTOMER01012018to07012018_0000000003.xlsx"
            }
        }

        notificationService.testTemplate = () => ({
            isSuccess: true,
            payLoad: {
                "requestId": "1aaee205-fbbf-436f-881d-c98325c33806"
            },
        })
        const response = await request(app)
            .post('/v1/notification/email/test-template')
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
            "template": "test",
            "templateData": {
                "subject": "CRMS Rebate Reports",
                "agreementId": "100000065",
                "agreementDescription": "cakeadmin2 sd",
                "reportToDate": "3/31/2021",
                "reportFromDate": "3/1/2021",
                "reportUrl": "http://REBATE_REPORT/SCHEDULED/202109/ReportSchedulerTestCommon100000065WEEKLYCUSTOMER01012018to07012018_0000000003.xlsx"
            }
        }

        notificationService.testTemplate = () => {
            throw new InvalidRequestException('Invalid template');
        }
        const response = await request(app)
           
            .post('/v1/notification/email/test-template')
            .set('Accept', 'application/json').send(jsonBody);
        expect(response.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    });
});