const app = require("./app/app")
const sequelize = require("./db/db")

sequelize.authenticate()
.then(()=>{
    console.log("Base de datos iniciada exitosamente!")
}).catch((err)=>{
    console.log("Error", err)
})


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})