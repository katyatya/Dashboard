import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../db.js'
export const Department = sequelize.define(
	'departments',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(125),
		},
		email: {
			type: DataTypes.STRING(50),
		},
		budget: {
			type: DataTypes.DECIMAL(10, 2),
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
)

export const Employee = sequelize.define(
	'employees',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
		post: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		full_name: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
		surname: {
			type: DataTypes.STRING(30),
		},
		sex: {
			type: DataTypes.ENUM('Мужской', 'Женский'),
			allowNull: false,
		},
		hired: {
			type: DataTypes.DATEONLY,
			defaultValue: Sequelize.fn('NOW'),
			allowNull: false,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
)

Employee.belongsTo(Department, {
	foreignKey: 'id_department',
	as: 'department',
})
