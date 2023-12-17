class Producto{
    constructor(id,nombre){
        this._id=id;
        this._nombre=nombre;
        this._precio=0.0;
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
    new Producto(1,"Arroz"),
    new Producto(1,"Yerba"),
    new Producto(1,"Cafe"),
    new Producto(1,"Fideos"),
    new Producto(1,"Salsa de Tomate"),
    new Producto(1,"Dulce de Leche"),
    new Producto(1,"Azucar")
]

console.log(productos);
console.clear();





