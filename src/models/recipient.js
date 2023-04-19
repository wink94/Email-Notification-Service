export default function (sequelize, DataTypes) {
  return sequelize.define(
    'recipient',
    {
      recipientId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'recipient_id',
      },
      recipientName: {
        type: DataTypes.STRING(60),
        allowNull: false,
        field: 'recipient_name',
      },
      emailAddresses: {
        type: DataTypes.JSON,
        allowNull: false,
        field: 'email_addresses',
      },
      active: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
        field: 'active',
      },
    },
    {
      tableName: 'recipient',
      timestamps: true,
      underscored: true,
      createdAt: 'createdDate',
      updatedAt: 'modifiedDate',
    },
  );
}
