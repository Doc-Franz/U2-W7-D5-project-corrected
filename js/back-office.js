const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MGVmZThhZDEyOTAwMTU4NzZiY2MiLCJpYXQiOjE3MzE2NjE1NjYsImV4cCI6MTczMjg3MTE2Nn0.zyjCSsZJqhSVs7f1I4y0KNB5Z_WWwhG3F8sAEHzpQ98";
const form = document.getElementById("form");
const resetBtn = document.getElementById("reset-btn");
const id = new URLSearchParams(window.location.search).get("productId");
const URL = id ? `https://striveschool-api.herokuapp.com/api/product/${id}` : "https://striveschool-api.herokuapp.com/api/product/";
method = id ? "PUT" : "POST";

const handleSubmit = (e) => {
  e.preventDefault();

  const product = {
    name: form.elements.name.value,
    description: form.elements.description.value,
    brand: form.elements.brand.value,
    imageUrl: form.elements.image.value,
    price: form.elements.price.value
  };

  fetch(URL, {
    method,
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
    .then((resp) => {
      console.log(resp);
      if (resp.ok) {
        console.log(resp);
        return resp.json();
      } else {
        throw new Error("errore nella chiamata");
      }
    })
    .then((product) => {
      console.log(product);
      form.reset();
    })
    .catch((error) => {
      throw new Error("errore nella chiamata");
    });
};

const fillForm = (product) => {
  form.elements.name.value = product.name;
  form.elements.description.value = product.description;
  form.elements.brand.value = product.brand;
  form.elements.image.value = product.imageUrl;
  form.elements.price.value = product.price;
};

const resetForm = () => {
  form.reset();
};

window.addEventListener("DOMContentLoaded", () => {
  form.onsubmit = handleSubmit;
  resetBtn.onclick = resetForm;

  if (id) {
    fetch(URL, {
      headers: {
        Authorization: apiKey
      }
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("errore nella chiamata");
        }
      })
      .then((product) => {
        fillForm(product);
      })
      .catch((error) => {
        console.log("errore nella chiamata");
      });
  }
});
