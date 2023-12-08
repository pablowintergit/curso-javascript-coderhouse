//Datos
//Clientes
const numeroCliente1=10;
const nombreCliente1="Juan Rodrigues";
const numeroCliente2=20;
const nombreCliente2="Carlos Acuña";
const numeroCliente3=30;
const nombreCliente3="Maria Garcia"
const numeroCliente4=40;
const nombreCliente4="Alejandra Gomrez";

//Productos
const codigoProducto1=100;
const nombreProducto1="Cama Beta Line 1 plaza";
const precioProducto1=1500.30;
const codigoProducto2=200;
const nombreProducto2="Mesa de Luz de nogal";
const precioProducto2=2300.40;
const codigoProducto3=300;
const nombreProducto3="Cama de 1 plaza de nogal Sweet Dreams 2 plazas";
const precioProducto3=1000;
const codigoProducto4=400;
const nombreProducto4="Modular de Algarrobo con 3 puertas";
const precioProducto4=3000.50;

//Formas de Pago
const pagoContado="CONTADO";
const pagoCuotas="CUOTAS";

//Cuotas
const minimoCuota=1500;
const interes3Cuotas=0.3;
const interes6Cuotas=0.5;
const interes12Cuotas=0.8;


//Codigo de fin de programa
const exitCode=0;

let menuProductos=`${codigoProducto1}-${nombreProducto1}  $ ${precioProducto1}\n`;
menuProductos+=`${codigoProducto2}-${nombreProducto2}  $ ${precioProducto2}\n`;
menuProductos+=`${codigoProducto3}-${nombreProducto3} $ ${precioProducto3}\n`;
menuProductos+=`${codigoProducto4}-${nombreProducto4} $ ${precioProducto4}`;

alert("Bienvenido a Pablo Winter Muebles");
let input=0;
while ((input=numberInput("Ingrese su numero de cliente, '0' para salir"))!=exitCode){
    let nombreCliente=buscarCliente(input);
    if (nombreCliente===null){
        continue;
    }
    alert(`Bienvenido ${nombreCliente}`);
    let total=0;
    while ((input=numberInput("Seleccione el codigo de producto, '0' para salir\n" + menuProductos))!=exitCode){
        let producto=buscarProducto(input);
        if (producto===null){
            continue;
        }
        alert(`Ud Selecciono el producto ${producto}`);
        let cantidad=numberInput("Ingrese la cantidad, '0' para salir");
        if (cantidad>0){
            let precio=buscarPrecio(input);
            total+=cantidad * precio;
        }
    }
    if (total>0){
        let formaPago="";
        let salir=false;
        while (!salir){
           formaPago=prompt("Ingrese la forma de pago: CONTADO, CUOTAS"); 
           if (formaPago.toUpperCase()===pagoContado || formaPago===pagoCuotas){
                salir=true;
           }
        }
        if (formaPago===pagoContado){
            alert(`El total de su pago es $ ${total}`);
        }else{

        }
        

    }
}






function numberInput(mensaje){
    let input=Number(prompt(mensaje));
    
    if (!isNaN(input)){
        return input;
    }else{
        alert("Error!\nIngrese un numero");
        return numberInput(mensaje);
    }
}

function buscarCliente(numeroCliente){
    switch (numeroCliente){
        case numeroCliente1:
            return nombreCliente1;
        case numeroCliente2:
            return nombreCliente2;
        case numeroCliente3:
            return nombreCliente3;
        case numeroCliente4:
            return nombreCliente4;
        default:
            alert("Cliente Inexistente");
            return null;
    }
}

function buscarProducto(codigoProducto){    
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

function buscarPrecio(codigoProducto){
    switch (codigoProducto){
        case codigoProducto1:
            return precioProducto1;
        case codigoProducto2:
            return precioProducto2;
        case codigoProducto3:
            return precioProducto3;
        case codigoProducto4:
            return precioProducto4;
        default:
            return 0;
    }
}