import app from "./app";

function Main(){
    app.listen(app.get("port"), ()=>{
        console.log("servidor a la escucha en el puerto ", app.get("port"))
    })
}
Main();