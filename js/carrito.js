import {Producto,Carrito,ItemCompra} from "./modules/clases.js";

let carritoJson=null;

let json=localStorage.getItem("productos");
const productosObject=JSON.parse(json);

const productos=productosObject.map(p=> Producto.fromObject(p));


function itemRender(item,container) {
    let div=document.createElement("div");
    div.className="carrito-item";
    div.setAttribute("id",`item-${codigo}`);
    div.setAttribute("data-product-id",codigo);
    div.innerHTML=`
        <figure class="carrito-thumnbail">
            <img src="./${item.producto.imagen}">
        </figure>
        <div>
            <h2>${item.producto.nombre}</h2>
            <p>${item.producto.desc1}</p>
            <p>${item.producto.desc2}</p>
            <p>Cantidad : ${item.cantidad} Importe: $ ${item.Importe}</p>
            <div class="carrito-actions">
                <button id="btnEliminar-${item.producto.codigo}" type="button" data-product-id=${item.producto.codigo} class="btn btn-danger btn-eliminar-custom">Eliminar del Carrito</button>
            </div>
        </div>
    `;

    container.append(div);

    ////TODO:SEGUIR ACA CON EL DESCUENTO DE LOS PRODUCTOS
    document.getElementById(`btnEliminar-${codigo}`).addEventListener("click",(ev)=>{
        console.log(ev.target);
        
        /* carritoJson=sessionStorage.getItem("carrito");
        let carrito=Carrito.fromJson(carritoJson);

        let codigo=ev.target.getAttribute("data-product-id");

        let producto=productos.find(p=> p.codigo==codigo);
        
        carrito.addProduct(producto,1);
        
        sessionStorage.setItem("carrito",JSON.stringify(carrito));
        console.log(sessionStorage.getItem("carrito")); */
    });
    
}

function itemsRender(items){
    const container=document.getElementById("contenedor");
    items.forEach(item => {
        itemRender(item,container);
    });
}

carritoJson=sessionStorage.getItem("carrito");

if (carritoJson=!null){
    let carrito=Carrito.fromJson(carritoJson);
    itemsRender(carrito);
}
