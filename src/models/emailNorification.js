export default function (sequelize, DataTypes) {
    return sequelize.define(
      'emailNotification',
      {
        Not_ID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        'Email subject': {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'email_subject',
        },
        res_ID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Res',
            key: 'res_ID',
          },
          field: 'resource_id',
        },
        'request id': {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: 'request_id',
        },
        'created date': {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: 'created_date',
        },
        'modified date': {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: 'modified_date',
        },
        Temp_ID: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'Template',
            key: 'Temp_ID',
          },
          field: 'template_id',
        },
      },
      {
        tableName: 'emailNotification',
        timestamps: false,
        underscored: true,
      }
    );
  }
  