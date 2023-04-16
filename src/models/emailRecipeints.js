export default function (sequelize, DataTypes) {
  return sequelize.define(
    'emailRecipeints',
    {
      res_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Res_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      To: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      Cc: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      Bc: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      Active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: 'emailRecipeints',
      timestamps: false,
      underscored: true,
    },
  );
}
