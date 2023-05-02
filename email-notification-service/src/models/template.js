export default function (sequelize, DataTypes) {
  return sequelize.define(
    'template',
    {
      templateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'template_id',
      },
      templateName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'template_name',
      },
      templateBody: {
        type: DataTypes.JSON,
        allowNull: false,
        field: 'template_body',
      },
      active: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        defaultValue: true,
        field: 'active',
      },
      templateSubject: {
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
