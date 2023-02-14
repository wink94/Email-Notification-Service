CREATE DATABASE email_notification_db;
CREATE TABLE email_notification_audit (
  email_notification_audit_id int(11) NOT NULL AUTO_INCREMENT,
  email_subject varchar(255) NOT NULL DEFAULT '',
  recipients json NOT NULL,
  request_id varchar(150) DEFAULT NULL,
  created_date timestamp NOT NULL,
  modified_date timestamp NULL DEFAULT NULL,
  PRIMARY KEY (email_notification_audit_id)
);