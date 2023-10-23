const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/db")

class User extends Model{}

User.init(
    {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    },
    {
    sequelize,
    modelName: 'User'
    }
);

module.exports = User;


// async function testConnection(){

//     try{
//         await sequelize.authenticate();
//         console.log("Conexión exitosa!")
//     }catch(err){
//         console.error("La conexión falló", err)
//     }
// }

// testConnection();

