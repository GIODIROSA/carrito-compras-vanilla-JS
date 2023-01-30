const items = document.getElementById("items");
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();
let carrito = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

items.addEventListener("click", (e) => {
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

  items.appendChild(fragment);
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

  console.log("este es el producto:", carrito);
};
