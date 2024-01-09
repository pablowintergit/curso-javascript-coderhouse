class Producto{
    constructor(id,nombre,precio){
        this._id=id;
        this._nombre=nombre;
        this.precio=precio;
    }

    get id(){
        return this._id;
    }

    get nombre(){
        return this._nombre;
    }

    set nombre(nombre){
        this._nombre=nombre;
    }

}

const productos=[
    new Producto(1,"Arroz",15),
    new Producto(2,"Yerba",100),
    new Producto(3,"Cafe",220),
    new Producto(4,"Fideos",300),
    new Producto(5,"Salsa de Tomate",250),
    new Producto(6,"Dulce de Leche",1000),
    new Producto(7,"Azucar",1500)
]

/* 
//SLICE
const prodFiltrados=productos.slice(2,5);
console.log("prodFiltrados")
console.log(prodFiltrados); */

//SPLICE
/* console.log("splice")
productos.splice(1,2);
console.log(productos); */

//INDEX OF
/* let index=productos.map(e => e.nombre).indexOf("Arroz");

console.log("Filtrar producto por IndexOf");
console.log(productos[index]); */

//INCLUDES
/* let include=productos.map(e=> e.nombre).includes("Arroz");
console.log("Filtrar producto por Includes");
console.log("Arroz " + include); */

//FIND
/* let find=productos.find(e=> e.id===3);
console.log(find); */

//FILTER
/* let productosFiltrados=productos.filter(p=> p.precio>200 && p.precio<1000);
console.log(productosFiltrados); */

//REDUCE
/* const precios=[10,20,30,40];

const suma=precios.reduce((a,b)=> a+=b,0);

console.log(suma); */

const nombres=["Juan","Pedro","Luis","Alejandra","Miguel"];
const premios=["Auto","Departamento","Lavarropas","Celular"]

const numerosAleatorios=(a)=>Math.floor(Math.random() * a);
/* 
for (let i=0;i<100;i++){
    mensaje=`${nombres[numerosAleatorios(nombres.length)]} recibo el premio ${premios[numerosAleatorios(premios.length)]}`
    console.log(mensaje);
}
 */

/* for (let i=0;i<100;i++){
    console.log(Math.round(Math.random() * 5));
}
 */
let s="123";
let s2=s.padStart(8,"0");
console.log(String(6).padStart(3,"0"));