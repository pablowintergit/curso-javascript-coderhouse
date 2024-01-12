class Usuario{
    constructor(nombre,password){
        this.nombre=nombre;
        this.password=password;
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

let usuario2=Usuario.fromJson(JSON.parse(usuarioJSON));

usuario2.sayHi();


