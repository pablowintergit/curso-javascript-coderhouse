 class Persona{
    constructor(nombre){
        this.nombre=nombre;
    }

    sayHi(){
        console.log(nombre);
    }

 }
 
 
 class Usuario{
    constructor(nombre,password){
        this.nombre=nombre;
        this.password=password;
        this.fecha=new Date().getTime();
        this.persona=new Persona("Pedro");
    }
    
    sayHi(){
        console.log(this.nombre);
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

Usuario.fromJson=(json)=>{
    return new Usuario(json.nombre,json.password);
}


let usuario=new Usuario("juan","123");
let usuarioJSON=JSON.stringify(usuario);

let obj=JSON.parse(usuarioJSON);

//console.log(obj);
//let us2=Object.assign(new Usuario(),obj);



console.log(us2);


