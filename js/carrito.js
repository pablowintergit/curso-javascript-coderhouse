import {Producto,Carrito,ItemCompra} from "./modules/clases.js";
import { showNotificacion } from "./modules/functions.js";

let json=localStorage.getItem("productos");
const productosObject=JSON.parse(json);

const productos=productosObject.map(p=> Producto.fromObject(p));


function itemRender(item,container) {
    const {
        producto:{codigo,imagen,nombre,desc1,desc2},
        cantidad,
        Importe
    }=item;

    let div=document.createElement("div");
    div.className="carrito-item";
    div.setAttribute("id",`item-${codigo}`);
    div.setAttribute("data-product-id",codigo);
    div.innerHTML=`
        <figure class="carrito-thumnbail">
            <img src="./${imagen}">
        </figure>
        <div>
            <h2>${nombre}</h2>
            <p>${desc1}</p>
            <p>${desc2}</p>
            <p>Cantidad : ${cantidad} Importe: $ ${Importe}</p>
            <div class="carrito-actions">
                <button id="btnEliminar-${codigo}" type="button" data-product-id=${codigo} class="btn btn-danger btn-eliminar-custom">Eliminar del Carrito</button>
            </div>
        </div>
    `;

    container.append(div);

    document.getElementById(`btnEliminar-${codigo}`).addEventListener("click",(ev)=>{
        console.log(ev.target);
        
        let carritoJson=sessionStorage.getItem("carrito");
        let carrito=Carrito.fromJson(carritoJson);

        let codigo=ev.target.getAttribute("data-product-id");

        Swal.fire({
            title: "Está seguro de eliminar el producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                let parent=document.getElementById(`item-${codigo}`)

                parent.remove();

                carrito.removeProduct(codigo);
        
                mostrarTotal(carrito);
        
                showNotificacion(carrito);

                sessionStorage.setItem("carrito",JSON.stringify(carrito));

                Swal.fire({
                    title: "Eliminar producto",
                    icon: "success",
                    text: "Producto eliminado del carrito",
                });
            }
        });       
    });
}

function mostrarTotal(carrito){
    let section=document.getElementById("section-container");
    let div=document.getElementById("div-total");

    if (div==null){
        div=document.createElement("div");
        div.setAttribute("id","div-total")
        section.append(div);
    }
    
    if (carrito.roundedTotal>0){
        div.innerHTML=`<h2>El total de su compra es $ ${carrito.roundedTotal}</h2>`;
    }else{
        div.remove();
    }
}


function carritoRender(carrito){
    const container=document.getElementById("contenedor");
    carrito.items.forEach(item => {
        itemRender(item,container);
    });
    mostrarTotal(carrito);
}

let carritoJson=sessionStorage.getItem("carrito");

if (carritoJson!=null){
    let carrito=Carrito.fromJson(carritoJson);
    carritoRender(carrito);
    showNotificacion(carrito);
}
