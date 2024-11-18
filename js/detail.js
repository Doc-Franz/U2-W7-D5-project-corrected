const id = new URLSearchParams(window.location.search).get("productId");
const URL = `https://striveschool-api.herokuapp.com/api/product/${id}`;
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MGVmZThhZDEyOTAwMTU4NzZiY2MiLCJpYXQiOjE3MzE2NjE1NjYsImV4cCI6MTczMjg3MTE2Nn0.zyjCSsZJqhSVs7f1I4y0KNB5Z_WWwhG3F8sAEHzpQ98";

const handlePicture = () => {
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
    .then((pic) => {
      const photoContainer = document.querySelector(".photo-container");
      const detailImage = document.createElement("img");
      detailImage.src = pic.imageUrl;
      detailImage.style.width = "100%";
      detailImage.style.marginTop = "30px";

      const p = document.createElement("p");
      p.innerText = pic.description;
      p.style.fontSize = "30px";

      photoContainer.append(detailImage, p);
    })
    .catch((error) => {
      console.log(error);
    });
};

window.addEventListener("DOMContentLoaded", () => {
  handlePicture();
});
