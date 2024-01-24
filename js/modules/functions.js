export function round(numero, digits){
    let factor=Math.pow(10,digits);
    return Math.round(numero*factor)/factor;
 }

 export const showNotificacion=function(carrito){
    let carritoInfo=document.getElementById("carritoInfo");
    if (carrito.items.length>0){
        carritoInfo.innerHTML=`${carrito.cantidadTotal}`;
        carritoInfo.className="carrito-info-show";
    }else{
        carritoInfo.className="carrito-info-hide";
    }
}