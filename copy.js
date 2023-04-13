const fs = require("fs-extra")

const thedit = "./src/public"
const todir = "./dist/public"

fs.copySync(thedit,todir,);