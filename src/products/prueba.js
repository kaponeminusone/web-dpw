// Obtén todas las imágenes de productos
const productImages = document.querySelectorAll('.products .product-image');

// Agrega un evento de clic a cada imagen
productImages.forEach((image) => {
  image.addEventListener('click', () => {
    // Agrega la clase 'active' para aplicar la transformación
    image.classList.add('active');
    console.log("Click")
    // Después de 5 segundos, elimina la clase 'active' para volver a la posición normal
    setTimeout(() => {
      image.classList.remove('active');
    }, 300); // 5000 milisegundos = 5 segundos
  });
});


const arrowIcons = document.querySelectorAll(".button");
const products = document.querySelector(".products");


arrowIcons.forEach(icon =>{

  icon.addEventListener("click",(e) =>{

    console.log(products)
    products.scrollLeft += icon.classList.contains("button--left") ? -productImages[0].clientWidth - 14 : productImages[0].clientWidth + 14;

  })

})


document.addEventListener("DOMContentLoaded", function() {
  const productImages = document.querySelectorAll(".product-image");

  productImages.forEach(function(image) {
      image.addEventListener("mouseenter", function() {
          productImages.forEach(function(otherImage) {
              if (otherImage !== image) {
                  otherImage.style.filter = "brightness(0.5)"; // Cambia el filtro de brillo de las otras imágenes
              }
          });
      });

      image.addEventListener("mouseleave", function() {
          productImages.forEach(function(otherImage) {
              otherImage.style.filter = "brightness(1)"; // Restaura el filtro de brillo de las otras imágenes
          });
      });
  });
});


document.addEventListener("DOMContentLoaded", function () {

  const productImage = document.querySelector(".view");
  const productTitle = document.querySelector(".title");
  const productInfo = document.querySelector(".info");
  const productList = document.querySelectorAll(".product-image");

  // Cargar el archivo JSON y actualizar la información del producto seleccionado
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      // Agregar clics a los elementos de la lista de productos

      productList.forEach(product => {

        product.addEventListener("click", function (event) {

          const productId = parseInt(event.target.getAttribute("data-product-id"));
          const selectedProduct = data.productos.find(product => product.id === productId);

          if(selectedProduct) {
            // Agregar una clase para ocultar el texto con una transición de opacidad
            productTitle.classList.add("hide-text");
            productInfo.classList.add("hide-text");

            // Esperar un breve período antes de cambiar el contenido
            setTimeout(function() {
                productImage.src = selectedProduct.imagen;
                productTitle.textContent = selectedProduct.nombre;
                productInfo.textContent = selectedProduct.descripcion;

                // Eliminar la clase para activar la transición de opacidad
                productTitle.classList.remove("hide-text");
                productInfo.classList.remove("hide-text");
            }, 300); // 300 ms, coincide con la duración de la transición

          }else{
            const product404 = data.productos.find(product => product.id === 404);
            if (product404) {
              productImage.src = product404.imagen;
              productTitle.textContent = product404.nombre;
              productInfo.textContent = product404.descripcion;
            }
          }

        });

      })

    })
    .catch(error => {
      console.error("Error al cargar el archivo JSON:", error);
    });
});


