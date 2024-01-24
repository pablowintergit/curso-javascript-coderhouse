import {Producto,Carrito,ItemCompra} from "./modules/clases.js" 
import { showNotificacion } from "./modules/functions.js";

//Base de datos
const productosToPersist=[]

productosToPersist.push(new Producto({codigo:100,nombre:"Cama Moderna Palermo",imagen:"assets/beds/images/bed-1.jpeg",precioOnline:191287,desc1:"Precio online $191.287",desc2:"20% OFF en Efectivo $153.030"}));
productosToPersist.push(new Producto({codigo:101,nombre:"Cama Paradise Moderna",imagen:"assets/beds/images/bed-2.jpeg",precioOnline:300417,desc1:"Precio online $300.417",desc2:"20% OFF en Efectivo $240.334"}));
productosToPersist.push(new Producto({codigo:200,nombre:"Cama Palermo Antiqua",imagen:"assets/beds/images/bed-11.jpg",precioOnline:283591,desc1:"Precio online $283.591",desc2:"20% OFF en Efectivo $226.873"}));
productosToPersist.push(new Producto({codigo:205,nombre:"Cama Fragancia de Nogal",imagen:"assets/beds/images/bed-5.jpg",precioOnline:157127,desc1:"Precio online $157.127",desc2:"20% OFF en Efectivo $125.702"}));
productosToPersist.push(new Producto({codigo:210,nombre:"Cama Nogal con cabezales hasta el piso",imagen:"assets/beds/images/bed-6.jpg",precioOnline:299657,desc1:"Precio online $299.657",desc2:"20% OFF en Efectivo $239.726"}));
productosToPersist.push(new Producto({codigo:215,nombre:"Cama Dual La Cardeuse",imagen:"assets/beds/images/bed-7.jpg",precioOnline:731547,desc1:"Precio online $731.547",desc2:"20% OFF en Efectivo $585.238"}));

productosToPersist.push(new Producto({codigo:230,nombre:"Cama Pekin con repaldo tapizado",imagen:"assets/beds/images/bed-8.jpg",precioOnline:201678,desc1:"Precio online $201.678",desc2:"20% OFF en Efectivo $161.342"}));

productosToPersist.push(new Producto({codigo:250,nombre:"Cama Nogal para somnier",imagen:"assets/beds/images/bed-9.jpg",precioOnline:526910,desc1:"Precio online $526.910",desc2:"20% OFF en Efectivo $421.528"}));

productosToPersist.push(new Producto({codigo:320,nombre:"Cama Retro con patas - Vitale",imagen:"assets/beds/images/bed-10.jpg",precioOnline:191287,desc1:"Precio online $191.287",desc2:"20% OFF en Efectivo $153.030"}));

productosToPersist.push(new Producto({codigo:350,nombre:"Cama Minimalist de 2 plazas",imagen:"assets/beds/images/bed-1.jpeg",precioOnline:283591,desc1:"Precio online $283.591",desc2:"20% OFF en Efectivo $226.873"}));

productosToPersist.push(new Producto({codigo:370,nombre:"Cama Fragancia de 2 plazas",imagen:"assets/beds/images/bed-5.jpg",precioOnline:157127,desc1:"Precio online $157.127",desc2:"20% OFF en Efectivo $125.702"}));

productosToPersist.push(new Producto({codigo:357,nombre:"Cama Royale de Roble",imagen:"assets/beds/images/bed-7.jpg",precioOnline:200127,desc1:"Precio online $200.127",desc2:"20% OFF en Efectivo $125.702"}));

//Variables locales
let carrito=null;
//funciones locales
function productRender({codigo,nombre,imagen,desc1,desc2},container) {
    let div=document.createElement("div");
    div.classList.add("col-12", "col-sm-6","col-md-4","col-lg-3");
    div.setAttribute("id",`product-card-${codigo}`);
    div.setAttribute("data-product-id",codigo);
    div.innerHTML=`
    <div class="card-product-list" >
       
            <figure class="product-thumbnail">
                <img src="./${imagen}" alt="${nombre}">
            </figure>
            <div>                                               
                <span>${nombre}</span>
                <h3>${desc1}</h3>
                <p>${desc2}</p>
                <button id="btnAddToCart-${codigo}" data-product-id=${codigo} class="btn btn-primary btn-add-to-cart" type="button">Añadir al carrito</button>
            </div>
       
    </div>
    `;

    container.append(div);

    
    document.getElementById(`btnAddToCart-${codigo}`).addEventListener("click",(ev)=>{
        let carritoJson=sessionStorage.getItem("carrito");
        
        let codigo=ev.target.getAttribute("data-product-id");

        let producto=productos.find(p=> p.codigo==codigo);
        
        if (carritoJson!=null){
            carrito=Carrito.fromJson(carritoJson);
        }else{
            carrito=new Carrito();
        }

        carrito.addProduct(producto,1);
        
        alert(`Producto : ${producto.nombre} agregado al carrito`);

        showNotificacion(carrito);

        sessionStorage.setItem("carrito",JSON.stringify(carrito));
    });
    
}

function productsRender(productos){
    const container=document.getElementById("products-container-id");
    productos.forEach(producto => {
        productRender(producto,container);
    });
}

//Lo pongo en localstorage para simular una base de datos
localStorage.setItem("productos",JSON.stringify(productosToPersist));

//Renderizar productos
let json=localStorage.getItem("productos");
const productosObject=JSON.parse(json);

const productos=productosObject.map(p=> Producto.fromObject(p));

productsRender(productos);

let carritoJson=sessionStorage.getItem("carrito");
if (carritoJson!=null){
    carrito=Carrito.fromJson(carritoJson);
    showNotificacion(carrito);
}
