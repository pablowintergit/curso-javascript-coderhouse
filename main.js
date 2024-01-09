//Clases
class Usuario{
    constructor(nombre,password){
        this.nombre=nombre;
        this.password=password;
    }

    equals (usuario){
        if (!usuario instanceof Usuario){
            return false;
        }
        for (const key in this) {
            if (Object.hasOwnProperty.call(this, key)) {
                if (this[key]!=usuario[key]){
                    return false;
                }
            }
        }
        return true;
    }
}

class Cliente{
    constructor(id,nombre,usuario){
        this.id=id;
        this.nombre=nombre;
        this.usuario=usuario;
    }
}
class Producto{
    constructor(codigo,nombre,precio,destacado=false){
        this.codigo=codigo;
        this.nombre=nombre;
        this.precio=precio;
        this.destacado=destacado;
    }

    show (){
        return `${this.nombre} - $ ${this.precio}`
    }
}

class FormaPago{
    constructor(codigo,nombre){
        this.codigo=codigo;
        this.nombre=nombre;
    }
}
class Interes{
    constructor(cantCuotas,interes){
        this.cantCuotas=cantCuotas;
        this.interes=interes;
    }
}

class Carrito{
    constructor(){
        this.items=[];
    }

    existeProducto(producto){
        return this.items.find(p=> p.codigo===producto.codigo)!=null;
    }

    addProduct(producto,cantidad){
        let item=this.items.find(i=> i.codigo===producto.codigo);
        if (item==null){
            item=new ItemCompra(producto,cantidad);
            this.items.push(item);
        }else{
            item.cantidad+=cantidad;
        }
    }

    removeProduct(producto,cantidad){
        let item=this.items.find(i=> i.codigo===producto.codigo);
        if (item==null){
            return null;
        }else{
            let index=this.items.indexOf(item);
            this.items.splice(index,1);
            return item;
        }
    }

    get roundedTotal(){
        let total=0;
        this.items.forEach(item=> total+=item.Importe);
        round(this.total,2);
    }

}

class ItemCompra {
    constructor(producto,cantidad){
        this.producto=producto;
        this.cantidad=cantidad;
    }

    get Importe(){
        return round(this.producto.precio * this.cantidad,2);
    }

    show(){
        return `${this.producto.show()} - Cant. ${this.cantidad} - Importe $ ${this.Importe}`
    }
}

//Base de Datos
//Clientes
const clientes=[
    new Cliente(10,"Juan Rodriguez",new Usuario("juanro","abcd")),
    new Cliente(20,"Carlos Acuña",new Usuario("carlitos20","1234")),
    new Cliente(30,"Maria Garcia",new Usuario("maru","4578")),
    new Cliente(40,"Alejandra Rodriguez",new Usuario("ale","laprida"))
]


//Productos
const productos=[
    new Producto(100,"Cama Beta Line 1 plaza",10),
    new Producto(200,"Mesa de Luz de nogal",10,true),
    new Producto(300,"Cama de 1 plaza de nogal Sweet Dreams 2 plazas",10),
    new Producto(400,"Cama Confort Line 1 plaza",10,true),
    new Producto(500,"Modular de Algarrobo con 3 puertas",10),
    new Producto(600,"Cómoda Génova de 3 - 6 - 9 cajones",10,true),
]
//Formas de Pago
const formasPago=[
    new FormaPago(1,"CONTADO"),
    new FormaPago(2,"CUOTAS")
]
//Intereses
const intereses=[
    new Interes(1,0.02),
    new Interes(3,0.08),
    new Interes(6,0.1),
    new Interes(12,0.15)
]



//Funciones de uso comun
const sortAsc=(a,b)=>{
    if (a>b){
        return 1;
    }else if (a<b){
        return -1;
    }else{
        return 0;
    }
}

const sortDesc=(a,b)=>{
    if (a>b){
        return -1;
    }else if (a<b){
        return 1;
    }else{
        return 0;
    }
}

function stringInput(mensaje){
    let input=prompt(mensaje);

    if (input===null){
        return exitCode;
    }else if (input.trim()===""){
        alert("Debe Ingresar algun valor")
        return stringInput(mensaje);
    }
}

function numberInput(mensaje){
    let input=prompt(mensaje);

    if (input===null){
        return exitCode;
    }else if (input.trim()==="" || isNaN(Number(input))){
        alert("Error!\nIngrese un numero");
        return numberInput(mensaje);
    }else{
        return Number(input);
    }
}

function findClienteByUsuario(usuario){
    return clientes.find(c=> c.usuario.equals(usuario));
}

function login(intentos=1){
    let input=stringInput("Ingrese su nombre de usuario");
    if (input==exitCode) return exitCode;
    let username=input;
    input=stringInput("Ingrese su contraseña");
    if (input==exitCode) return exitCode;
    let pass=input;
    let cliente=findClienteByUsuario(new Usuario(username,pass));
    if (cliente!=null){
        return cliente;
    }else{
        alert("Usuario no existe");
        if (intentos<5){
            login(intentos+1);
        }else{
            alert("Demasiados intentos , usuario bloqueado");
            return exitCode;
        }
    }
}

function round(numero, digits){
    let factor=Math.pow(10,digits);
    return Math.round(numero*factor)/factor;
 
 }

const arrayShow = function(callback,valorInicial="") {
    let cadena="";

    cadena=this.reduce((a,b)=>a+=b.show() + "\n" ,valorInicial);
    return cadena;

}

const formaBusqueda="Buscar por :\n1-Codigo\n2-Nombre\n3-Precio\n4-Todos";

function findProductByCodigo(codigo,productos){
    if (productos.length===0){
        return null;
    }else{
        return productos.find(p=> p.codigo===codigo);
    }
}


function productSearch(mensaje){    
    mensaje+=formaBusqueda;
    let input=numberInput(mensaje);
    if (input===exitCode) return [];
    let productosFiltrados=[];
    if (input===1){
        input=numberInput("Ingrese el codigo a buscar");
        if (input===exitCode) return [];
        let producto=findProductByCodigo(input);
        if (producto!=null){
            productosFiltrados.push(producto);
        }
    }else if (input===2){;
        while ((input=stringInput("Ingrese el nombre o parte del nombre a buscar"))!=exitCode){
            if (input.trim().length<4){
                alert("Debe ingresar al menos 3 caracteres");
            }else{
                break;
            }
        }
        if (input===exitCode) return [];
        productosFiltrados=productos.filter(p=> p.nombre.toLowerCase.includes(input));
    }else if (input===3){
        let precioDesde=numberInput("Ingrese el precio desde");
        if (precioDesde===exitCode) return [];
        let precioHasta=numberInput("Ingrese el precio hasta");
        if (precioHasta===exitCode) return [];
        productosFiltrados.filter(p=> p.precio>=precioDesde && p.precio<=precioHasta);
    }else{
        productosFiltrados=productos.slice();
    }

    if (productosFiltrados.length>0){
        return productosFiltrados;
    }else{
        if (confirm("No se encontraron resultados\n¿Desea continuar")){
            return productSearch(mensaje);
        }else{
            return [];
        }
    }

}



//Esta funcion es a modo ilustrativo de implementacion del ciclo for
//En realida bastaria multiplicar el valor de la cuota * el numero de cuotas
function calcularMontoTotalEnCuotas(monto,cuotas, calculoCuotas){
    let total=0;
    let resultado={valorCuota:0.0,total:0.0};
    let valorCuota=0.0;
    for(let i=1; i<=cuotas;i++){
        valorCuota=calculoCuotas(monto,cuotas);
        total+=valorCuota;
        if (i===1){
            resultado.valorCuota=valorCuota;   
        }
    }

    total=round(total,2);
    resultado.total=total;
    return resultado;
}


//Constantes
const opcionesCuotas="1-2% Mensual.\n3-8% Mensual\n6-10% Mensual\n12-15% Mensual"
//Codigo de fin de programa
const exitCode="cancel";

//Configuracion inicial
const productosDestacados=productos.filter(p=> p.destacado).sort((a,b)=>sortAsc(a.nombre,b.nombre));
let productosDestacadosString=productosDestacados.productosShow=arrayShow; 
productosDestacados="Estos son los productos destacados de la semana\n" + productosDestacados.productosShow(this,"Productos Destacados\n");

alert("Bienvenido a Pablo Winter Muebles");
let input=0;
while ((input=login())!=exitCode){
    let cliente=input;
    alert(`Bienvenido ${cliente.nombre}\n` + productosDestacados);
    let total=0;
    let totalParcial="";
    let carrito=new Carrito();
    carrito.items.show=arrayShow;
    let canceloCargaPedidos=false;
    let exit=false;
    while (exit===false){
        let productosEncontrados=productSearch("Busqueda de Productos");
        let productosSelec="";
        let totalSelecc="";
        if (carrito.items.length>0){
            productosSelec=carrito.items.show(this,"Productos Seleccionados");
            totalSelecc=`${carrito.roundedTotal()}`;
        }
        while ((input=numberInput("Ingrese el codigo del Producto" + productosSelec + "\n" + totalSelecc))!=exitCode){
            let tmpProd;
            if (productosEncontrados!=exitCode){
                tmpProd=productosEncontrados;
            }else{
                tmpProd=productos;
            }
            //todo ver si se duplica
            let producto=tmpProd.find(p=> p.codigo===input);

            if (producto!=null){
                alert(`Ud Selecciono el producto ${producto.show()}`);
                
                if (carrito.existeProducto(producto)){
                    if (!confirm("El producto ya esta en el carrito de compras\n¿Desea agregar mas unidades?")){
                        if (confirm("¿Desea eleminarlo del carrito?")){
                            carrito.items.removeProduct(producto);
                        }
                        continue;
                    }
                }

                while ((input=numberInput("Ingrese la cantidad,cancelar para salir"))!=exitCode){
                    let cantidad=input;
                    if (cantidad>0){
                        if (carrito==null){
                           
                        }
                        carrito.addProduct(producto,cantidad);
                        break;
                    }else{
                        alert("La cantidad debe ser mayor a 0.");
                    }
                }
                totalParcial=`Total Parcial : $ ${carrito.roundedTotal()}`;
            }

        }
    }
    if (carrito.items.length===0){
        alert("No se cargo ningun producto, volvera al menu inicial");
        continue;
    }else if (confirm("¿Confirma la compra?")===false){
        continue;
    }
    let formaPago=null;
    let salir=false;
    while (!salir){
        input=numberInput("Ingrese la forma de pago:1-CONTADO, 2-CUOTAS,cancelar para salir"); 
        if (input===exitCode){
            salir=true;
        }else{
            if ((formaPago=formasPago.find(f=> f.codigo===input))!=null){
                salir=true;
            }
        }
    }
    if (formaPago===exitCode){
        continue;
    }
    if (formaPago.codigo===1){
        alert(`El total de su compra es $ ${carrito.roundedTotal()}`);
    }else{
        //"1-2% Mensual.\n3-8% Mensual\n6-10% Mensual\n12-15% Mensual"
        let cuotas=0;
        while (true){
            cuotas=numberInput("Ingrese la cantidad de cuotas.\n" + opcionesCuotas);
            if (cuotas!=1 && cuotas!=3 && cuotas!=6 && cuotas!=12){
                alert("Numero de cuotas invalido");
            }else{
                break;
            }
        }
        let interes=intereses.find(i=>i.cantCuotas===cuotas).map(i=> i.interes);
        
        const calculoCuota=(monto,cuotas)=> (monto/cuotas) * (1 + interes);
        let resultado=calcularMontoTotalEnCuotas(carrito.roundedTotal,cuotas,calculoCuota);
        alert(`El total de su compra en ${cuotas} cuotas de $ ${resultado.valorCuota} es $ ${resultado.total}`);
    }
}



