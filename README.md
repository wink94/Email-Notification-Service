# PWP SPRING 2023
# Email Notification Service 

## [Wiki Document](https://github.com/wink94/email-notification-service/wiki)

## How to start the application

### Installation
* Install NodeJS 16.xx
* Install Mysql 8
* Install AWS CLI (optional)

### Start API
* cd email-notification-service/
* npm install
* npm start
### Run Tests
* npm test

### Run Lint Fixing
* npm run eslint-fix
### Start Web App
* cd email-notification-client/
* npm install
* npm start

### Add template to aws
aws create-template --template <value>
### authenticate user manual template to aws
aws cognito-idp admin-set-user-password --user-pool-id YOUR_USER_POOL_ID --username test@gmail.com --password "test-123" --permanent

### Setup DB
* Install Mysql 8
* execute `schema.sql`



# Group information
* Student 1. Windula Kularatne - Windula.Kularatne@student.oulu.fi
* Student 2. Achira Hendalage - Achira.Hendalage@student.oulu.fi
* Student 3. Sameera Gamage - Sameera.Gamage@student.oulu.fi
* Student 4. Kavindu Magalage - Kavindu.Magalage@student.oulu.fi

__Remember to include all required documentation and HOWTOs, including how to create and populate the database, how to run and test the API, the url to the entrypoint and instructions on how to setup and run the client__


