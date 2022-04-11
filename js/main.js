// VARIABLES
const contenederPoductos=document.querySelector("#contenedorProductos")
const contenederCarrito=document.querySelector("#contenedorCarrito")
const btnCarrito=document.querySelector("#btnCarrito")
const divCarrito=document.querySelector("#divCarrito")
const burbujaCarrito=document.querySelector("#burbujaCarrito")
const totalCarrito=document.querySelector("#totalCarrito")


//FUNCIONES
function mostrarProductos(array){
    contenederPoductos.innerHTML=""
    array.forEach((producto)=>{
        contenederPoductos.innerHTML+=`
        <div class="col mb-5">
            <div class="card h-100">
                <!-- Product image-->
                <img class="card-img-top" src=${producto.img} alt="..." />
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder">${producto.nombre}</h5>
                        <!-- Product price-->
                        <h3>$${producto.precio}</h3>
                        <p>${producto.detalle}</p>
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <button onclick=agregarAlCarrito(${producto.id}) class="btn btn-outline-dark mt-auto" href="#">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        </div>
        `
    })
}

function mostrarCarrito(){
    const carrito=capturarStorage()
    contenederCarrito.innerHTML=""
    carrito.forEach((producto)=>{
        contenederCarrito.innerHTML+=`
        <tr>
            <th scope="row"><button onclick="restarCantidad(${producto.id})" class="btn"><</button>${producto.cantidad}<button onclick="incrementarCantidad(${producto.id})" class="btn">></button></th>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.precio*producto.cantidad}</td>
            <td><button class="btn btn-danger" onclick="eliminarProductoCarrito(${producto.id})">x </button></td>
        </tr>
        `
    })
    cantidadCarrito()
    mostrarTotalarrito()

}

function verCarrito(){
    if(divCarrito.style.display==="none"){
        divCarrito.style.display="inline"
    }else{
        divCarrito.style.display="none"
    }
}

// Funciones de Storage 
function capturarStorage(){
    return JSON.parse( localStorage.getItem("carrito")) || [] // si el storage no existe retorno un array vacio
}

function guardarStorage(elemento){
    localStorage.setItem("carrito", JSON.stringify(elemento))
}
// funcines del carrito
function cantidadCarrito(){
    const carrito = capturarStorage()
    burbujaCarrito.innerHTML=carrito.length
}

function dentroDeCarrito(id){  //verifico si el producto esta dentro del carrito retorna true o false
    const carrito=capturarStorage()
    return carrito.find(e=>e.id===id)
}

function mostrarTotalarrito(){ //calculo el valor total 
    const carrito= capturarStorage()
    const total= carrito.reduce((acc, elem)=> acc+elem.cantidad*elem.precio,0)
    totalCarrito.innerHTML=total
}

function agregarAlCarrito(id){  
    const carrito=capturarStorage()
    if(dentroDeCarrito(id)){  //si esta dentro de carrito ejecuto incrementar para que no se duplique el producto
        incrementarCantidad(id)
    }else{  // sino esta lo bucso dentro de productos y lo agrego al array sumandole una propiedad cantidad
        const productoAgregar=productos.find(prod=>prod.id===id)
        carrito.push({...productoAgregar, cantidad:1})
        guardarStorage(carrito)
        mostrarCarrito()
    }
}

function eliminarProductoCarrito(id){
    const carrito=capturarStorage()
    const resultado= carrito.filter(prod=>prod.id!==id) //me devuelve todo menos el que conicida con el id
    guardarStorage(resultado)
    mostrarCarrito()
}

function incrementarCantidad(id){
    const carrito=capturarStorage()
    const indice = carrito.findIndex(e=>e.id===id) // busco la posicion del objeto
    carrito[indice].cantidad++ //segun la posucion le sumo uno a cantidad
    guardarStorage(carrito)
    mostrarCarrito()
}

function restarCantidad(id){
    const carrito=capturarStorage()
    const indice = carrito.findIndex(e=>e.id===id) // busco la posicion del objeto
    carrito[indice].cantidad-- //segun la posucion le sumo uno a cantidad
    guardarStorage(carrito)
    mostrarCarrito()
}

function eliminarCarrito(){
    localStorage.removeItem("carrito")
    mostrarCarrito()
}

function confirmarCompra(){
    eliminarCarrito()
    alert("Gracias por su compra")
}


// LOGICA
mostrarProductos(productos)
mostrarCarrito()
cantidadCarrito()