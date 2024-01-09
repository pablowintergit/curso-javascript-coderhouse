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
}
class FormaPago{
    constructor(codigo,nombre){
        this.codigo=codigo;
        this.nombre=nombre;
    }
}
class Intereres{
    constructor(cantCuotas,interes){
        this.cantCuotas=cantCuotas;
        this.interes=interes;
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
    new Producto(100,"Cama Beta Line 1 plaza",3500),
    new Producto(200,"Mesa de Luz de nogal",2300.40,true),
    new Producto(300,"Cama de 1 plaza de nogal Sweet Dreams 2 plazas",1000),
    new Producto(400,"Cama Confort Line 1 plaza",2300,true),
    new Producto(500,"Modular de Algarrobo con 3 puertas",3000.50),
    new Producto(600,"Cómoda Génova de 3 - 6 - 9 cajones",2700,true),
]
//Formas de Pago
const formasPago=[
    new FormaPago(1,"CONTADO"),
    new FormaPago(2,"CUOTAS")
]
//Intereses
const intereses=[
    new Intereres(1,0.02),
    new Intereres(3,0.08),
    new Intereres(6,0.1),
    new Intereres(12,0.15)
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


function productSearch(mensaje){    
    switch (codigoProducto){
        case codigoProducto1:
            return nombreProducto1;
        case codigoProducto2:
            return nombreProducto2;
        case codigoProducto3:
            return nombreProducto3;
        case codigoProducto4:
            return nombreProducto4;
        default:
            alert("Producto Inexistente");
            return null;
    }
}



//Esta funcion es a modo ilustrativo de implementacion del ciclo for
//En realida bastaria multiplicar el valor de la cuota * el numero de cuotas
function calcularMontoTotalEnCuotas(cuotas, valorCuota){
    let total=0;
    for(let i=1; i<=cuotas;i++){
        total+=valorCuota;
    }

    total=Math.round(total*100)/100;
    return total;
}



//Constantes
const opcionesCuotas="1-2% Mensual.\n3-8% Mensual\n6-10% Mensual\n12-15% Mensual"
//Codigo de fin de programa
const exitCode="cancel";

//Configuracion inicial
const productosDestacados=productos.filter(p=> p.destacado).sort((a,b)=>sortAsc(a.nombre,b.nombre));
let productosDestacadosString=productosDestacados.reduce((a,b)=>a+=`${b.codigo}-${b.nombre}  $ ${b.precio}\n`,"Productos Destacados\n") 


alert("Bienvenido a Pablo Winter Muebles");
let input=0;
while ((input=login())!=exitCode){
    let cliente=input;
    alert(`Bienvenido ${cliente.nombre}`);
    let total=0;
    let totalParcial="";
    let menuProductos="";
    let canceloCargaPedidos=false;
    alert(productosDestacadosString);
    while ((input=productSearch("Seleccione el codigo de producto, cancelar para salir\n" + menuProductos + totalParcial))!=exitCode){
        let producto=input;
        //---
        let codigoProducto=input;
        alert(`Ud Selecciono el producto ${producto}`);
        while ((input=numberInput("Ingrese la cantidad,cancelar para salir"))!=exitCode){
            let cantidad=input;
            if (cantidad>0){
                let precio=buscarPrecio(codigoProducto);
                total+=cantidad * precio;
                break;
            }else{
                alert("La cantidad debe ser mayor a 0.");
            }
        }
        totalParcial=`Total Parcial : $ ${total}`;
    }
    if (total===0){
        alert("No se cargo ningun producto, volvera al menu inicial");
        continue;
    }
    let formaPago="";
    let salir=false;
    while (!salir){
        formaPago=prompt("Ingrese la forma de pago: CONTADO, CUOTAS,cancelar para salir"); 
        if (formaPago===exitCode){
            salir=true;
        }else{
            formaPago=formaPago.toUpperCase();
            if (formaPago===pagoContado || formaPago===pagoCuotas){
                salir=true;
            }
        }
    }
    if (formaPago===exitCode){
        continue;
    }
    if (formaPago===pagoContado){
        total=Math.round(total*100)/100;
        alert(`El total de su compra es $ ${total}`);
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
        let valorCuota=0;
        const calculoCuota=(monto,cuotas,interes)=> (monto/cuotas) * (1 + interes);
        if (cuotas===1){
            valorCuota=calculoCuota(total,1,interes1Cuotas);
        }else if(cuotas===3){
            valorCuota=calculoCuota(total,3,interes3Cuotas);
        }else if(cuotas===6){
            valorCuota=calculoCuota(total,6,interes6Cuotas);
        }else if (cuotas===12){
            valorCuota=calculoCuota(total);
        }
        valorCuota=Math.round(valorCuota*100)/100;
        total=calcularMontoTotalEnCuotas(cuotas,valorCuota);
        alert(`El total de su compra en ${cuotas} cuotas de $ ${valorCuota} es $ ${total}`);
    }
}



