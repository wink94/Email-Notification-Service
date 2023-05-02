export default function (sequelize, DataTypes) {
  return sequelize.define(
    'emailNotificationAudit',
    {
      emailNotificationAuditPrimaryId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'email_notification_audit_id',
      },
      emailSubject: {
        type: DataTypes.STRING(60),
        allowNull: false,
        field: 'email_subject',
      },
      recipientId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        field: 'recipient_id',
      },
      templateId: {
        type: DataTypes.JSON,
        allowNull: false,
        field: 'template_id',
      },
      sesRequestId: {
        type: DataTypes.STRING(150),
        allowNull: true,
        field: 'request_id',
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
