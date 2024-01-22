import {Producto,Carrito,ItemCompra} from "./modules/clases.js" 

let p=new Producto({codigo:1,nombre:"Prueba",imagen:"mi imagen",precioOnline:100})


sessionStorage.setItem("producto",JSON.stringify(p));