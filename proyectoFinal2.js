
// modo oscuro o claro
let modo;
if(localStorage.getItem("modo")){
    modo=localStorage.getItem("modo");
}else{
    modo="claro";
}

//**** */
let principal=document.getElementById("principal");
let boton=document.getElementById("mode");
let tablabody=document.getElementById("tablabody");
let tablon=document.getElementById("tablon");
let botonEliminar=document.getElementById("eliminar");
document.body.className=modo;
principal.className=modo;
tablabody.className=modo+"-claro";
tablon.className=modo+"-claro";


if(modo=="claro"){
boton.innerText="Modo Oscuro";

}else{
    boton.innerText="Modo Claro";   
}
localStorage.setItem("modo",modo);

boton.onclick=()=>{
    if(modo=="claro"){
        document.body.className="oscuro";
        principal.className="oscuro";
        boton.innerText="Modo Claro";
        tablabody.className=modo+"-claro";
        tablon.className=modo+"-claro";
        modo="oscuro";
        Swal.fire({
            title: 'Modo-Oscuro',
            text: 'ACTIVADO',
            imageUrl: '/imagenes/negro.png',
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: 'oscuro',
            confirmButtonColor: 'rgb(211, 5, 5)',
          }).showToast();
    }else{
        document.body.className="claro";
        principal.className="claro";
        boton.innerText="Modo Oscuro";
        tablabody.className=modo+"-oscuro";
        tablon.className=modo+"-oscuro";
        modo="claro";
        Swal.fire({
            title: 'Modo-Claro',
            text: 'ACTIVADO',
            imageUrl: '/imagenes/blanco.png',
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: 'oscuro',
            confirmButtonColor: 'rgb(211, 5, 5)',
          }).showToast();
    }
    
    localStorage.setItem("modo",modo);
}
//After clase 10
let carrito=[];
 
if(localStorage.getItem("carrito")){
     carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
     
}
let lista=document.getElementById("milista");
    
//llamada a renderizar
renderizarProductos();

function renderizarProductos() {
    let cartas=document.getElementById("cartas");
let div1=document.createElement("div");
div1.className="container text-center tama";
cartas.append(div1);
let div2=document.createElement("div");
div2.className="row align-items-center";
div1.append(div2);
        for(const herramienta of herramientas){
            let carta=document.createElement("div");
            carta.className="card align-items-center m-3 pt-5 pb-5 ps-4 pe-4 ";
            carta.style="width: 18rem;";
            carta.innerHTML=`
                    <img src="./imagenes/${herramienta.nombre}.webp" class="card-img-top " alt="...">
                    <div class="card-body letraNegra ">
                      <h5 class="card-title">${herramienta.nombre.toUpperCase()}</h5>
                      <p class="card-text">MARCA: ${herramienta.marca.toUpperCase()}</p>
                      <p class="card-text">${herramienta.descripcion}</p>
                      <p class="card-text">CODIGO: ${herramienta.codigo}</p>
                      <p class="card-text">PRECIO: $${herramienta.precio}</p>
                      <button class='btn btn-danger' id='btn${herramienta.codigo}'>Agregar al Carrito</button>
                    </div>
            `;div2.append(carta);
    }
    //eventos boton
    herramientas.forEach(herramienta =>{
        //evento individual para cada boton
        document.getElementById(`btn${herramienta.codigo}`).addEventListener("click",function(){
            agregarAlCarrito(herramienta);
        });
    })
}

function agregarAlCarrito(herramienta){
    carrito.push(herramienta);
    console.log(carrito);
   Swal.fire({
        title: (herramienta.nombre).toUpperCase(),
        text: 'Agregado al carrito!',
        imageUrl:"./imagenes/carrito.png" ,
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: '',
        confirmButtonColor: 'rgb(211, 5, 5)',
      })
    document.getElementById("tablabody").innerHTML+=`
        <tr>
            <td>${herramienta.codigo}</td>
            <td>${herramienta.nombre}</td>
            <td>${herramienta.marca}</td>
            <td>$${herramienta.precio}</td>
            <td><button id="eliminar" class='btn btn-danger'>Eliminar</button></td>
            
        </tr>
    `;
    localStorage.setItem("carrito",JSON.stringify(carrito));
    
    };

    let finalizar=document.getElementById("finalizar");
    finalizar.onclick=()=>{
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
    
    // carritoAbandonado = JSON.parse(localStorage.getItem("carrito")) || [];
    // console.log(carritoAbandonado);
    // carritoAbandonado.forEach(herramienta =>{
        
    //         agregarAlCarrito(herramienta);
    //     });


    



// let respuesta=0;
// let nombre= prompt("Ingrese su nombre");

// function saludar() {
//     alert("Hola "+nombre.toUpperCase()+", ¡Bienvenido a Ferreteria Roca!");
// }
// saludar ();



// let precio=0;
// console.log("lista de herramientas:");
// for(const herramienta of herramientas){
//     console.log(herramienta.tipo);

// }
// let herramientaBuscar=prompt("Ingresa la herramienta a buscar");



// function calcular(){
    

// while(herramientaBuscar!="x" ){
//     switch(herramientaBuscar.toLowerCase()){
//         case "martillo":
//             for(const herramienta of herramientas){
//                 if(herramienta.tipo==herramientaBuscar.toLowerCase()){
//                     function mostrar(){
//                         console.log("La herramienta solicitada es: "+herramienta.tipo.toUpperCase());
//                         console.log("La marca es: "+herramienta.marca.toUpperCase());
//                         console.log("Su precio es: $"+herramienta.precio);
//                         }
//                 }
//             }
//             mostrar();
//             pregCarrito();
//             carrito();
//             if (respuesta.toLowerCase()=="si"){
//             precio=precio+900;
//             console.log("PRODUCTO AGREGADO: Martillo $900")}
//             else{
//                 console.log("Martillo no se agrego al carrito")
//             }
//             break;
//         case "pinza":
//             for(const herramienta of herramientas){
//                 if(herramienta.tipo==herramientaBuscar.toLowerCase()){
//                     function mostrar(){
//                         console.log("La herramienta solicitada es: "+herramienta.tipo.toUpperCase());
//                         console.log("La marca es: "+herramienta.marca.toUpperCase());
//                         console.log("Su precio es: $"+herramienta.precio);
//                         }
//                 }
//             }
//             mostrar();
//             pregCarrito();
//             carrito();
//             if (respuesta.toLowerCase()=="si"){
//             precio=precio+700;
//             console.log("PRODUCTO AGREGADO: Pinza $700")}
//             else{
//                 console.log("Pinza no se agrego al carrito")
//             }
//             break;
//         case "alicate":
//             for(const herramienta of herramientas){
//                 if(herramienta.tipo==herramientaBuscar.toLowerCase()){
//                     function mostrar(){
//                         console.log("La herramienta solicitada es: "+herramienta.tipo.toUpperCase());
//                         console.log("La marca es: "+herramienta.marca.toUpperCase());
//                         console.log("Su precio es: $"+herramienta.precio);
//                         }
//                 }
//             }
//             mostrar();
//             pregCarrito();
//             carrito();
//             if (respuesta.toLowerCase()=="si"){
//             precio=precio+650;
//             console.log("PRODUCTO AGREGADO: Alicate $650")}
//             else{
//                 console.log("Alicate no se agrego al carrito")
//             }
//             break;
//         case "maza":
//             for(const herramienta of herramientas){
//                 if(herramienta.tipo==herramientaBuscar.toLowerCase()){
//                     function mostrar(){
//                         console.log("La herramienta solicitada es: "+herramienta.tipo.toUpperCase());
//                         console.log("La marca es: "+herramienta.marca.toUpperCase());
//                         console.log("Su precio es: $"+herramienta.precio);
//                         }
//                 }
//             }
//             mostrar();
//             pregCarrito();
//             carrito();
//             if (respuesta.toLowerCase()=="si"){
//             precio=precio+450;
//             console.log("PRODUCTO AGREGADO: Maza $450")}
//             else{
//                 console.log("Maza no se agrego al carrito")
//             }
//             break;
//         case "serrucho":
//             for(const herramienta of herramientas){
//                 if(herramienta.tipo==herramientaBuscar.toLowerCase()){
//                     function mostrar(){
//                         console.log("La herramienta solicitada es: "+herramienta.tipo.toUpperCase());
//                         console.log("La marca es: "+herramienta.marca.toUpperCase());
//                         console.log("Su precio es: $"+herramienta.precio);
//                         }
//                 }
//             }
//             mostrar();
//             pregCarrito();
//             carrito();
//             if (respuesta.toLowerCase()=="si"){
//             precio=precio+1200;
//             console.log("PRODUCTO AGREGADO: Serrucho $1200")}
//             else{
//                 console.log("Serrucho no se agrego al carrito")
//             }
//             break;
//         case "cinta metrica":
//             for(const herramienta of herramientas){
//                 if(herramienta.tipo==herramientaBuscar.toLowerCase()){
//                     function mostrar(){
//                         console.log("La herramienta solicitada es: "+herramienta.tipo.toUpperCase());
//                         console.log("La marca es: "+herramienta.marca.toUpperCase());
//                         console.log("Su precio es: $"+herramienta.precio);
//                         }
//                 }
//             }
//             mostrar();
//             pregCarrito();
//             carrito();
//             if (respuesta.toLowerCase()=="si"){
//             precio=precio+500;
//             console.log("PRODUCTO AGREGADO: Cinta metrica $500")}
//             else{
//                 console.log("Cinta metrica no se agrego al carrito")
//             }
//             break;
//         case "nivel":
//             for(const herramienta of herramientas){
//                 if(herramienta.tipo==herramientaBuscar.toLowerCase()){
//                     function mostrar(){
//                         console.log("La herramienta solicitada es: "+herramienta.tipo.toUpperCase());
//                         console.log("La marca es: "+herramienta.marca.toUpperCase());
//                         console.log("Su precio es: $"+herramienta.precio);
//                         }
//                 }
//             }
//             mostrar();
//             pregCarrito();
//             carrito();
//             if (respuesta.toLowerCase()=="si"){
//             precio=precio+450;
//             console.log("PRODUCTO AGREGADO: Nivel $450")}
//             else{
//                 console.log("Nivel no se agrego al carrito")
//             }
//             break;
//             case "llave ajustable":
//             for(const herramienta of herramientas){
//                 if(herramienta.tipo==herramientaBuscar.toLowerCase()){
//                     function mostrar(){
//                         console.log("La herramienta solicitada es: "+herramienta.tipo.toUpperCase());
//                         console.log("La marca es: "+herramienta.marca.toUpperCase());
//                         console.log("Su precio es: $"+herramienta.precio);
//                         }
//                 }
//             }
//             mostrar();
//             pregCarrito();
//             carrito();
//             if (respuesta.toLowerCase()=="si"){
//             precio=precio+1050;
//             console.log("PRODUCTO AGREGADO: Llave ajustable $1050")}
//             else{
//                 console.log("Llave ajustable no se agrego al carrito")
//             }
//             break;
//         default:
//             console.log("Esa herramienta no está en stock");
//             break;
//     }
//     herramientaBuscar = prompt ("Ingresa la herramienta a buscar\nEscriba x para terminar");
    
// }


// alert("Total de todos los productos: $"+precio+"\nGracias por su compra!!");
// }

// calcular();

// function pregCarrito(){
//   respuesta=   prompt("Quieres agregarlo al carrito?\n-Si\n-No")}

// function carrito(){
//     if (respuesta.toLowerCase()=="si"){
//         alert("Agregado al carrito")

//     }else{
//         alert("No se agrego al carrito")
//     }
// }

// function inOf(){
//     let buscarHerramienta=prompt("Ingresa la herramienta a buscar, te dire su posicion y la mostrare por consola");
//     for(const herramienta of herramientas){
//         if(herramienta.tipo==buscarHerramienta){
//             let posicion=herramientas.indexOf(herramienta);
//             console.log("La herramienta "+buscarHerramienta+ " se encuentra en la posicion "+posicion);
//             console.table(herramienta);
//         }
//     }
// }
// inOf();
// herramientas.forEach((herramienta)=>console.log(herramienta.tipo));
// function stock(){
//     let pregHerram=prompt("Ingrese el nombre de la herramienta para saber si se encuentra en stock?");
//     let encontrado=herramientas.find((herramienta)=>herramienta.tipo==pregHerram.toLowerCase());
//     if(encontrado != undefined){
//         console.log("La herramienta "+pregHerram+ " se encuentra en stock");
//         console.table(encontrado);
//     }else{
//         console.log(pregHerram.toUpperCase()+" no se encuentra en stock !");
//         stock();
//     }
// };
// stock();
// let margenPrecio=parseFloat(prompt("Ingrese un precio y mostrare todos los productos por debajo de ese rango de precio"))
// const caro=herramientas.filter((herramienta)=>herramienta.precio<margenPrecio);
// if (caro.length!=0){
//     console.log("Herramientas con precio menor de $"+margenPrecio+" :");
//     console.table(caro);

// }else{
//     console.log("No hay Herramientas con esas propiedades")
// };
// function listaIva(){

//     let mostrarIva=prompt("Quieres ver la lista de precios con Iva incluido? \n-Si\n-No");
//     if (mostrarIva.toLowerCase()=="si"){
    
//         console.log("Herramientas con Iva incluido:");
//         const preciosConIva=herramientas.map((herramienta)=>{
//             return {
//                 codigo:herramienta.codigo,
//                 tipo:herramienta.tipo,
//                 marca:herramienta.marca,
//                 precio:herramienta.precio * 1.21
//             }
//         });
        
//         console.table( preciosConIva);
//         const totalPrecios=preciosConIva.reduce((acumulador,herramienta)=>acumulador+herramienta.precio,0);
//         console.log("El total de todos las herramientas con Iva es: $"+totalPrecios);
//     }else if(mostrarIva.toLowerCase()=="no"){
//         console.log("No se muestra la lista de precios con Iva");
//     }else{
//         console.log("Ingrese una respuesta valida");
//         listaIva();
//     }
// };
// listaIva();


// function ordenar(){

//     let ordenarPrecio=prompt("Ingrese el numero correspondiente:\n1-Ordenar de mayor a menor precio\n2-Ordenar de menor a mayor precio");
//     if(ordenarPrecio=="1"){
//         herramientas.sort((a,b)=>b.precio - a.precio);
//     console.table(herramientas);
//     }else if(ordenarPrecio=="2"){
//         herramientas.sort((a,b)=>a.precio - b.precio);
//         console.table(herramientas); 
//     }else{
//         console.log("Ingrese un numero valido");
//         ordenar();
//     };
// };
// ordenar();
