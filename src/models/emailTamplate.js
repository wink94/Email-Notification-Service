export default function (sequelize, DataTypes) {
  return sequelize.define(
    'emailTemplate',
    {
      Tem_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'template_id',
      },
      Tem_Name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'template_name',
      },
      Template: {
        type: DataTypes.JSON,
        allowNull: false,
        field: 'template_body',
      },
      Active: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        defaultValue: true,
        field: 'active',
      },

      Tem_Subject: {
        type: DataTypes.JSON,
        allowNull: false,
        field: 'template_subject',
      },
    },
    {
      tableName: 'template',
      timestamps: true,
      underscored: true,
      createdAt: 'createdDate',
      updatedAt: 'modifiedDate',
    },
  );
}
