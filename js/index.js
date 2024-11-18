const URL = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MGVmZThhZDEyOTAwMTU4NzZiY2MiLCJpYXQiOjE3MzE2NjE1NjYsImV4cCI6MTczMjg3MTE2Nn0.zyjCSsZJqhSVs7f1I4y0KNB5Z_WWwhG3F8sAEHzpQ98";

const retrieveProducts = () => {
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
    .then((products) => {
      console.log(products);
      products.forEach((product) => {
        const rowCard = document.getElementById("card-row");
        const col = document.createElement("div");
        col.classList.add("col", "g-4");
        const card = document.createElement("div");
        card.classList.add("card", "h-100");
        const anchorImage = document.createElement("a");
        anchorImage.href = "#";
        const cardImage = document.createElement("img");
        cardImage.classList.add("card-img-top");
        cardImage.src = product.imageUrl;
        cardImage.alt = "...";
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "d-flex", "flex-column", "justify-content-end");
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.innerText = product.name;
        const brand = document.createElement("p");
        brand.classList.add("brand");
        brand.innerText = product.brand;
        const price = document.createElement("p");
        price.classList.add("price");
        price.innerText = product.price + " $";
        const cardText = document.createElement("p");
        cardText.classList.add("card-text", "lead");
        cardText.innerText = product.description;
        const divBtn = document.createElement("div");
        divBtn.classList.add("d-flex", "flex-wrap");
        const deleteBtn = document.createElement("btn");
        deleteBtn.classList.add("btn", "btn-danger", "mb-4", "me-3");
        deleteBtn.innerText = "Delete";
        const modifyBtn = document.createElement("a");
        modifyBtn.innerText = "Modify";
        modifyBtn.classList.add("btn", "btn-primary", "mb-4");

        rowCard.appendChild(col);
        col.appendChild(card);
        card.append(anchorImage, cardBody);
        anchorImage.appendChild(cardImage);

        cardBody.append(cardTitle, brand, price, cardText, divBtn);
        divBtn.append(deleteBtn, modifyBtn);

        modifyBtn.onclick = () => {
          console.log(URL + product._id);
          modifyBtn.href = "./back-office.html?productId=" + product._id;
        };
        deleteBtn.onclick = () => {
          fetch(URL + product._id, {
            method: "DELETE",
            headers: {
              Authorization: apiKey
            }
          })
            .then((resp) => {
              if (resp.ok) {
                col.remove();
              } else {
                throw new Error("errore nella chiamata");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        };

        cardImage.onclick = () => {
          anchorImage.href = "./details.html?productId=" + product._id;
        };
      });
    })
    .catch((error) => {
      throw new Error("errore nelle chiamata");
    });
};

window.addEventListener("DOMContentLoaded", () => {
  retrieveProducts();
});
