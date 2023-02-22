/* eslint-disable func-names */
/* eslint-disable no-magic-numbers */
export default function (sequelize, DataTypes) {
  return sequelize.define(
    'emailNotificationAudit',
    {
      emailNotificationAuditPrimaryId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'email_notification_audit_primary_id',
      },
      emailSubject: {
        type: DataTypes.STRING(60),
        allowNull: false,
        field: 'email_subject',
      },
      receivers: {
        type: DataTypes.JSON,
        allowNull: false,
        field: 'receivers',
      },
      sesRequestId: {
        type: DataTypes.STRING(150),
        allowNull: true,
        field: 'ses_request_id',
      },
    },
    {
      tableName: 'email_notification_audit',
      timestamps: true,
      underscored: true,
      createdAt: 'createdDate',
      updatedAt: 'modifiedDate',
    },
  );
}
