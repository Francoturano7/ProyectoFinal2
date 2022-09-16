let carrito = JSON.parse(localStorage.getItem("carrito"))||[];
let herramientasJSON = [];
let dolarReferencia;
let cartas

//Evento-Cuando la ventana está cargada
window.onload=()=>{
    cartas=document.getElementById("cartas");
    document.getElementById("navDolar").style.color="white";
    obtenerValorDolar();
    //selector y evento change
    document.getElementById("filtro").setAttribute("option", "pordefecto");
    document.getElementById("filtro").onchange=()=>ordenar();
};

function renderizarProductos() {
    let cartas=document.getElementById("cartas");
     let div1=document.createElement("div");
     div1.className="container text-center tama";
     cartas.append(div1);
     let div2=document.createElement("div");
     div2.className="row align-items-center";
     div1.append(div2);
             for(const herramienta of herramientasJSON){
                 let carta=document.createElement("div");
                 carta.className="card align-items-center m-3 pt-5 pb-5 ps-4 pe-4 ";
                 carta.style="width: 18rem;";
                 carta.innerHTML=`
        <img src="${herramienta.foto}" class="card-img-top " alt="...">
                     <div class="card-body letraNegra ">
                       <h5 class="card-title">${herramienta.nombre.toUpperCase()}</h5>
                       <p class="card-text">MARCA: ${herramienta.marca.toUpperCase()}</p>
                       <p class="card-text">${herramienta.descripcion}</p>
                       <p class="card-text">CODIGO: ${herramienta.codigo}</p>
                       <p class="card-text">PRECIO: $${(herramienta.precio*dolarReferencia).toFixed(2)}</p>
                       <button class='btn btn-danger' id='btn${herramienta.codigo}'>Agregar al Carrito</button>
                     </div>
       `;div2.append(carta);
    }
    //EVENTOS
    herramientasJSON.forEach(herramienta=> {
         //Evento para cada boton
         document.getElementById(`btn${herramienta.codigo}`).onclick= function() {
            agregarACarrito(herramienta);
        };
    });
}

function agregarACarrito(herramientaNueva) {
    let encontrado = carrito.find(h => h.codigo == herramientaNueva.codigo);
    console.log(encontrado);
    if (encontrado == undefined) {
        let herramientaACarrito = {
            ...herramientaNueva,
            cantidad:1
        };
        carrito.push(herramientaACarrito);
        console.log(carrito);
        Swal.fire({
                     title: (herramientaNueva.nombre).toUpperCase(),
                     text: 'Agregado al carrito!',
                     imageUrl:"./imagenes/carrito.png" ,
                     imageWidth: 100,
                     imageHeight: 100,
                     imageAlt: '',
                     confirmButtonColor: 'rgb(211, 5, 5)',
                   });
        //agregamos una nueva fila a la tabla de carrito
        document.getElementById("tablabody").innerHTML+=(`
            <tr id='fila${herramientaACarrito.codigo}'class=" text-center">
            <td> ${herramientaACarrito.codigo} </td>
            <td> ${herramientaACarrito.nombre}</td>
            <td id='${herramientaACarrito.codigo}'> ${herramientaACarrito.cantidad}</td>
            <td> ${(herramientaACarrito.precio*dolarReferencia).toFixed(2)}</td>
            <td> <button class='btn btn-danger text-center" style="background-color: rgb(211, 5, 5);color: white;border: 1px solid black;"' onclick='eliminar(${herramientaACarrito.codigo})'>Eliminar Producto</button>`);
    } else {
        let posicion = carrito.findIndex(p => p.codigo == herramientaNueva.codigo);
        console.log(posicion);
        carrito[posicion].cantidad += 1;
        document.getElementById(herramientaNueva.codigo).innerHTML=carrito[posicion].cantidad;
    }
    document.getElementById("totalCompra").innerText=(`Total: $ ${calcularTotal().toFixed(2)}`);
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

function calcularTotal() {
    let suma = 0;
    for (const elemento of carrito) {
        suma = suma + (((elemento.precio*dolarReferencia).toFixed(2)) * elemento.cantidad);
    }
    return suma;
}


function eliminar(codigo){
    let indice=carrito.findIndex(herramienta => herramienta.codigo==codigo);
    carrito.splice(indice,1);//eliminando del carro
    Swal.fire({
                 text: 'Producto eliminado del carrito!',
                 imageUrl:"./imagenes/deletecarrito.png" ,
                 imageWidth: 100,
                 imageHeight: 100,
                 imageAlt: '',
                 confirmButtonColor: 'rgb(211, 5, 5)',
               })
    localStorage.setItem("carrito",JSON.stringify(carrito));
    document.getElementById("totalCompra").innerText=(`Total: $ ${calcularTotal().toFixed(2)}`);
    let fila=document.getElementById(`fila${codigo}`);
    document.getElementById("tablabody").removeChild(fila);//eliminando de la tabla
    document.getElementById("gastoTotal").innerText=(`Total: $ ${calcularTotal()}`);
    localStorage.removeItem("carrito", JSON.stringify(carrito));
}

function ordenar() {
    let filtro = document.getElementById("filtro").value;
    console.log(filtro)
    if (filtro == "menor") {
        herramientasJSON.sort(function(a, b) {
            return a.precio - b.precio
        });
    } else if (filtro == "mayor") {
        herramientasJSON.sort(function(a, b) {
            return b.precio - a.precio
        });
    } else if (filtro == "alfabetico") {
        herramientasJSON.sort(function(a, b) {
            return a.nombre.localeCompare(b.nombre);
        });
    }
    cartas.innerHTML="";
    renderizarProductos();
}

//GETJSON de herramientas.json
async function obtenerJSON() {
    const URLJSON="herramientas.json"
    const resp=await fetch(URLJSON)
    const data= await resp.json()
    herramientasJSON = data;
    renderizarProductos();
}


//obtengo el valor del dolar blue 
async function obtenerValorDolar() {
    const URLDOLAR = "https://api-dolar-argentina.herokuapp.com/api/dolarblue";
    const resp=await fetch(URLDOLAR)
    const data=await resp.json()
    document.getElementById("navDolar").innerHTML+=(`<p align="center">Dolar compra: $ ${data.compra} - Dolar venta: $ ${data.venta}</p>`);
    dolarReferencia = data.venta;
    obtenerJSON();
}




  let finalizarCompra = document.getElementById("finalizar"); 
  finalizarCompra.onclick = borrarTodo; 

    
  function borrarTodo(evento) {
    document.getElementById("tablabody").innerHTML="";
    localStorage.removeItem("carrito", JSON.stringify(carrito));
    document.getElementById("totalCompra").innerText=(`Total: $ 0,00`);
    localStorage.removeItem("carrito", JSON.stringify(carrito));
    document.getElementById("todo").innerHTML=`
    <div class="bg-dark" >
    <h1 class="btn-danger text-center m-3 pt-5 pb-5 ps-4 pe-4" style="background-color: rgb(211, 5, 5);color: white;">
    Gracias por su compra
    </h1>
    <img src="imagenes/logoR.png" class="rounded mx-auto d-block" alt="...">
    <h2 class="btn-danger text-center m-3 pt-5 pb-5 ps-4 pe-4" style="background-color: rgb(211, 5, 5);color: white;">
    Ferreteria Roca
    </h2>
    </div>
`;
document.getElementById("todo").className="bg-dark";
    

    
    Swal.fire({
        title: 'Pedido Finalizado!',
        text: 'Estamos preparando tu pedido..',
        imageUrl: '/imagenes/finalizado.png',
        imageWidth: 200,
        imageHeight: 100,
        imageAlt: 'Completado',
        confirmButtonColor: 'rgb(211, 5, 5)',
      }).showToast();
      
      

  }