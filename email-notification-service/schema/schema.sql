CREATE DATABASE email_notification_db;

CREATE TABLE `recipient` (
  `recipient_id` int NOT NULL AUTO_INCREMENT,
  `recipient_name` varchar(255) NOT NULL DEFAULT '',
  `email_addresses` json NOT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  `created_date` timestamp NOT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`recipient_id`)
);


CREATE TABLE email_notification_audit (
  email_notification_audit_id int NOT NULL AUTO_INCREMENT,
  email_subject varchar(255) NOT NULL DEFAULT '',
  request_id varchar(150) DEFAULT NULL,
  created_date timestamp NOT NULL,
  modified_date timestamp NULL DEFAULT NULL,
  recipient_id int,
  template_id int,
PRIMARY KEY (email_notification_audit_id)
);

ALTER TABLE email_notification_audit
ADD FOREIGN KEY (recipient_id) REFERENCES recipient(recipient_id);

CREATE TABLE `template` (
  `template_id` int NOT NULL AUTO_INCREMENT,
  `template_name` varchar(255) NOT NULL DEFAULT '',
  `template_body` json DEFAULT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  `created_date` timestamp NOT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  `template_subject` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`template_id`)
)