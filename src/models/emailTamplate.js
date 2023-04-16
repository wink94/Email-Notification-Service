export default function (sequelize, DataTypes) {
  return sequelize.define(
    'emailTemplate',
    {
      Tem_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Tem_Name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'template_name',
      },
      Template: {
        type: DataTypes.JSON,
        allowNull: false,
        field: 'template',
      },
      Active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'active',
      },
      'create date': {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'create_date',
      },
      'modified Date': {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'modified_date',
      },
      Tem_Subject: {
        type: DataTypes.JSON,
        allowNull: false,
        field: 'template_subject',
      },
      Tem_Body: {
        type: DataTypes.JSON,
        allowNull: false,
        field: 'template_body',
      },
    },
    {
      tableName: 'emailTemplate',
      timestamps: false,
      underscored: true,
    },
  );
}
