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
        return `${this.codigo} - ${this.nombre} - $ ${this.precio}`
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
        return this.items.find(i=> i.producto.codigo===producto.codigo)!=null;
    }

    addProduct(producto,cantidad){
        let item=this.items.find(i=> i.producto.codigo===producto.codigo);
        if (item==null){
            item=new ItemCompra(producto,cantidad);
            this.items.push(item);
        }else{
            if (cantidad>0){
                item.cantidad+=cantidad;
            }else{
                let tmpCantidad=item.cantidad+cantidad;
                if (tmpCantidad<=0){
                    alert("La cantidad del producto debe ser mayor a cero");
                }else{
                    item.cantidad+=cantidad;
                }
            }
        }
    }

    removeProduct(producto,cantidad){
        let item=this.items.find(i=> i.producto.codigo===producto.codigo);
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
        if (this.items.length>0){
            total=this.items.reduce((a,b)=>a+=b.Importe,0);
        }
        //this.items.forEach(item=> total+=item.Importe);
        return round(total,2);
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
    new Producto(200,"Mesa de Luz de nogal",15,true),
    new Producto(300,"Cama de 1 plaza de nogal Sweet Dreams 2 plazas",20),
    new Producto(400,"Cama Confort Line 1 plaza",30,true),
    new Producto(500,"Modular de Algarrobo con 3 puertas",40),
    new Producto(600,"Cómoda Génova de 3 - 6 - 9 cajones",50,true),
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
    }else{
        return input;
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

const formaBusqueda="Buscar por :\n1-Nombre\n2-Precio\n3-Todos";

function findProductByCodigo(codigo){
    if (productos.length===0){
        return null;
    }else{
        return productos.find(p=> p.codigo===codigo);
    }
}


function productSearch(mensaje){    
    let input=numberInput(mensaje+formaBusqueda);
    if (input===exitCode) return exitCode;
    let productosFiltrados=[];
    if (input===1){;
        while ((input=stringInput("Ingrese el nombre o parte del nombre a buscar"))!=exitCode){
            if (input.trim().length<3){
                alert("Debe ingresar al menos 3 caracteres");
            }else{
                break;
            }
        }
        if (input===exitCode) return exitCode;
        productosFiltrados=productos.filter(p=> p.nombre.toLowerCase().includes(input));
    }else if (input===2){
        let precioDesde=numberInput("Ingrese el precio desde");
        if (precioDesde===exitCode) return exitCode;
        let precioHasta=numberInput("Ingrese el precio hasta");
        if (precioHasta===exitCode) return exitCode;
        productosFiltrados=productos.filter(p=> p.precio>=precioDesde && p.precio<=precioHasta);
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
productosDestacadosString=productosDestacados.productosShow(this,"Estos son los productos destacados de la semana:\n");

alert("Bienvenido a Pablo Winter Muebles");
let input=0;
while ((input=login())!=exitCode){
    let cliente=input;
    alert(`Bienvenido ${cliente.nombre}\n` + productosDestacadosString);
    let total=0;
    let exit=false;
    while (exit===false){
        input=productSearch("Busqueda de Productos\n");
        if (input===exitCode){
            exit=true;
            continue;
        }
        let productosEncontrados=input;
        if (productosEncontrados.length>0){
            productosEncontrados.show=arrayShow;
            alert(productosEncontrados.show(this,"Se encontraron los siguientes productos:\n"));
        }
        let carrito=new Carrito();
        carrito.items.show=arrayShow;
        let productosSelec="";
        let totalSelecc="";
        while ((input=numberInput("Ingrese el codigo del Producto\n" + productosSelec + "\n" + totalSelecc))!=exitCode){
            let producto=productos.find(p=> p.codigo===input);
            let operador=1;
            if (producto!=null){
                alert(`Ud Selecciono el producto ${producto.show()}`);
                if (carrito.existeProducto(producto)){
                    let mensaje="El producto ya esta en el carrito de compras\n";
                    mensaje+="1-Agregar mas unidades\n2-Restar Unidades\n3-Eliminar el producto del carrito";
                    input=numberInput(mensaje);

                    if (input===exitCode){
                        continue;
                    }else if (input===2){
                        operador=-1;
                    }else if (input===3){
                        carrito.removeProduct(producto);
                        productosSelec=carrito.items.show(this,"Productos Seleccionados\n");
                        totalSelecc=`Total Parcial : $ ${carrito.roundedTotal}`;
                        continue;
                    }
                }

                while ((input=numberInput("Ingrese la cantidad,cancelar para salir"))!=exitCode){
                    let cantidad=input;
                    if (cantidad>0){
                        cantidad=cantidad*operador;
                        carrito.addProduct(producto,cantidad);
                        productosSelec=carrito.items.show(this,"Productos Seleccionados\n");
                        totalSelecc=`Total Parcial : $ ${carrito.roundedTotal}`;
                        break;
                    }else{
                        alert("La cantidad debe ser mayor a 0.");
                    }
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
            alert(`El total de su compra es $ ${carrito.roundedTotal}`);
        }else{
            //"1-2% Mensual.\n3-8% Mensual\n6-10% Mensual\n12-15% Mensual"
            let cuotas=0;
            while (true){
                input=numberInput("Ingrese la cantidad de cuotas.\n" + opcionesCuotas);
                if (input===exitCode){
                    alert("Debe ingresar la cantidad de cuotas");
                    continue;
                }
                
                cuotas=input;
                let interes=intereses.find(i=> i.cantCuotas===cuotas);

                if (interes==null){
                    alert("Numero de cuotas invalido");
                }else{
                    break;
                }

            }
            
            let interes=intereses.find(i=>i.cantCuotas===cuotas).interes;
            const calculoCuota=(monto,cuotas)=> (monto/cuotas) * (1 + interes);
            let resultado=calcularMontoTotalEnCuotas(carrito.roundedTotal,cuotas,calculoCuota);
            alert(`El total de su compra en ${cuotas} cuotas de $ ${resultado.valorCuota} es $ ${resultado.total}`);
        }

        if (!confirm("¿Desea realizar otra compra?")){
            exit=true;
        }
    }
    
}



