import app from "./app";
import * as dotenv from "dotenv"

dotenv.config();

function Main(){
    app.listen(app.get("port"), ()=>{
        console.log("servidor a la escucha en el puerto ", app.get("port"))
    })
}
Main();