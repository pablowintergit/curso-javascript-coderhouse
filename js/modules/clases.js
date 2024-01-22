import { round } from "./functions.js";

class Producto{
    constructor(params){
        this.codigo=params.codigo;
        this.nombre=params.nombre;
        this.imagen=params.imagen;
        this.desc1=params.desc1;
        this.desc2=params.desc2;
        this.precioOnline=params.precioOnline;
        this.precioEfectivo=params.precioEfectivo;
    }

    static fromJson(json){
        return Producto.fromObject(JSON.parse(json));
    }

    static fromObject(object){
        return new Producto(object);
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
            total=this.items.reduce((a,b)=> a + b.Importe,0);
        }
        return round(total,2);
    }

    static fromJson(json){
        return Carrito.fromObject(JSON.parse(json));
    }

    static fromObject(object){
        let carrito=Object.assign(new Carrito,object);
        carrito.items=carrito.items.map(item=> ItemCompra.fromObject(item));
        return carrito;
    }
}

class ItemCompra {
    constructor(producto,cantidad){
        this.producto=producto;
        this.cantidad=cantidad;
    }

    get Importe(){
        return round(this.producto.precioOnline * this.cantidad,2);
    }

    static fromObject(object){
        let itemCompra=Object.assign(new ItemCompra,object);
        this.producto=new Producto(object);

        return itemCompra;
    }


}


export{
    Producto,
    Carrito,
    ItemCompra
}