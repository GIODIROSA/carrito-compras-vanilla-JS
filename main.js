const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
// para acceder al contenido del template no olvidar .content
const templateCard = document.getElementById("template-card").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
const fragment = document.createDocumentFragment();
let carrito = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

cards.addEventListener("click", (e) => {
  addCarrito(e);
});

const fetchData = async () => {
  try {
    const res = await fetch("./api.json");
    const data = await res.json();
    // console.log(data);
    pintarCards(data);
  } catch (error) {
    console.log(error);
  }
};

const pintarCards = (data) => {
  //console.log(data);
  data.forEach((producto) => {
    const { title, id, precio, thumbnailUrl } = producto;
    templateCard.querySelector("img").setAttribute("src", thumbnailUrl);
    templateCard.querySelector("h5").textContent = title;
    templateCard.querySelector("p").textContent = precio;
    templateCard.querySelector(".btn-dark").dataset.id = id;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });

  cards.appendChild(fragment);
};

const addCarrito = (e) => {
  //console.log(e.target);
  //console.log(e.target.classList.contains("btn-dark"));
  if (e.target.classList.contains("btn-dark")) {
    //console.log("opa flaitingo");
    setCarrito(e.target.parentElement);
  }

  e.stopPropagation();
};

const setCarrito = (objeto) => {
  //console.log(objeto);
  const producto = {
    id: objeto.querySelector(".btn-dark").dataset.id,
    title: objeto.querySelector("h5").textContent,
    precio: objeto.querySelector("p").textContent,
    cantidad: 1,
  };

  //esto permite que aumente la cantidad por la veces repetidas que el usuario le dio clic a comprar
  //generado que el producto se repita y aumente su cada.
  //por eso se accede a carrito (si tiene la propiedad id es true)
  //entonces producto.cantidad es = a el id del carrito. cantidad le sumas 1

  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }

  carrito[producto.id] = { ...producto };
  pintarCarrito();
};

const pintarCarrito = () => {
  //console.log(carrito);
  //convertir el objeto para que se pueda recorrer como un array
  //se usa el object.values

  Object.values(carrito).forEach((producto) => {
    const { id, title, cantidad, precio } = producto;
    //inicializar en cero para que no se repita en el DOM
    items.innerHTML = "";
    templateCarrito.querySelector("th").textContent = id;
    templateCarrito.querySelectorAll("td")[0].textContent = title;
    templateCarrito.querySelectorAll("td")[1].textContent = cantidad;
    templateCarrito.querySelector(".btn-info").dataset.id = id;
    templateCarrito.querySelector(".btn-danger").dataset.id = id;
    templateCarrito.querySelector("span").textContent = cantidad * precio;
    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
};
