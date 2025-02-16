var inputName = document.getElementById("productName");
var inputPrice = document.getElementById("productPrice");
var inputCatgory = document.getElementById("productCategory");
var inputDescription = document.getElementById("floatingTextarea2");
var inputImage = document.getElementById("productImage");
var inputSearch = document.getElementById("productSearch");
var buttonAdd = document.getElementById("btnAdd");
var tbody = document.getElementById("displayData");
var btnUpdate = document.getElementById("btnUpdate");
var productList = [];

if (localStorage.getItem("AllProduct") !== null) {
  productList = JSON.parse(localStorage.getItem("AllProduct"));

  displayData();
}

function addProduct() {
  var product = {
    name: inputName.value,
    price: inputPrice.value,
    category: inputCatgory.value,
    description: inputDescription.value,
    image: `./../image/${inputImage.files[0]?.name}`
  };

  productList.push(product);

  localStorage.setItem("AllProduct", JSON.stringify(productList));
  clearInput();
  displayData();
}

function clearInput() {
  inputName.value = "";
  inputPrice.value = "";
  inputCatgory.value = "";
  inputDescription.value = "";
  inputImage.value = "";
}

function displayData() {
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    cartona += `   <tr >
              <td>${i + 1}</td>
              <td>${productList[i].name}</td>
              <td class="price">${productList[i].price}</td>
              <td>${productList[i].category}</td>

              <td>${productList[i].description}</td>

              <td class="imgMax">
                <img src="${productList[i].image}" width=" 100px " alt="" />
              </td>
              <td>
                <button class="btn btn-danger mt-2"onclick="deleteItem(${i})" id="deleteProduct">
                  Delete
                </button>
                <button class="btn btn-warning mt-2" onclick="updateProduct(${i})"   id="updateP">Update</button>
              </td>
            </tr>
        `;
  }
  tbody.innerHTML = cartona;
}

function deleteItem(indexItem) {
  productList.splice(indexItem, 1);

  displayData();
  localStorage.setItem("AllProduct", JSON.stringify(productList));
}

function search() {
  var searchName = inputSearch.value;

  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].name.toLowerCase().includes(searchName.toLowerCase()) ==
      true
    ) {
      cartona += `   <tr >
    <td>${i + 1}</td>
    <td>${productList[i].name}</td>
    <td class="price">${productList[i].price}</td>
    <td>${productList[i].category}</td>

    <td>${productList[i].description}</td>

    <td class="imgMax">
      <img src="./image/download (1).jpg" width=" 100px " alt="" />
    </td>
    <td>
      <button class="btn btn-danger mt-2"onclick="deleteItem(${i})" id="deleteProduct">
        Delete
      </button>
      <button class="btn btn-warning mt-2" onclick="updateProduct(${i})"    id="updateP">Update</button>
    </td>
  </tr>
`;
    }
  }
  tbody.innerHTML = cartona;
}
var index = 0;
function updateProduct(indexElemnt) {
  inputName.value = productList[indexElemnt].name;
  inputPrice.value = productList[indexElemnt].price;
  inputCatgory.value = productList[indexElemnt].category;
  inputDescription.value = productList[indexElemnt].description;
  buttonAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
  index = indexElemnt;
}

function setNewUpdate() {
  var product = {
    name: inputName.value,
    price: inputPrice.value,
    category: inputCatgory.value,
    description: inputDescription.value,
    image: `./../image/${inputImage.files[0]?.name}`
  };

  productList.splice(index, 1, product);
  localStorage.setItem("AllProduct", JSON.stringify(productList));
  displayData();
  clearInput();
}
