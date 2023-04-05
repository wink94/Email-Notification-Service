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

CREATE DATABASE emailRecipeints;
USE emailRecipeints;
CREATE TABLE emailRecipeints (
  Res_ID INT NOT NULL AUTO_INCREMENT,
  Res_name VARCHAR(255) NOT NULL,
  To_list JSON NOT NULL,
  Cc_list JSON DEFAULT NULL,
  Bc_list JSON DEFAULT NULL,
  Active BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (Res_ID)
);

CREATE DATABASE emailTemplate;
USE emailTemplate;
CREATE TABLE emailTemplate (
  Tem_ID INT NOT NULL AUTO_INCREMENT,
  Tem_Name VARCHAR(255) NOT NULL,
  Template JSON NOT NULL,
  Active BOOLEAN NOT NULL DEFAULT TRUE,
  create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Tem_Subject JSON NOT NULL,
  Tem_Body JSON NOT NULL,
  PRIMARY KEY (Tem_ID)
);

