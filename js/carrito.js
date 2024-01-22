let json=sessionStorage.getItem("producto");

let p=JSON.parse(json);

let div=document.getElementById("myDiv");
div.innerHTML =`<p>${p.nombre}</p>`;


