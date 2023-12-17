//Html Elementleri
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

//Düzenleme Seçenekleri
let editElement; // Düzenleme yapılan öğeyi temsil eder
let editFlag = false// Düzenleme modunda olup olmadığını belirtir
let editID = ""; //Benzersiz ID


//Form gönderildiğinde addItem fonksiyonunu çağır
form.addEventListener("submit", addItem);
//Temizle düğmesine tıklanıldığında clearItems fonksiyonu çağırma
clearBtn.addEventListener("click", clearItems);
//Sayfa Yüklendiğinde setItems fonksiyonunu çağır
window.addEventListener("DOMContentLoaded", setupItems);


//! Functions
function addItem(e) {
    e.preventDefault();
    const value = grocery.value; //inputun giriş değerini al
    const id = new Date().getTime().toString();
    if (value !== "" && !editFlag) {
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id");// Yeni bir veri kimliği oluşturur
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item");
        //console.log(element);
        element.innerHTML = `
                <p class="title">${value}</p>
                <div class="btn-container">
                    <button class="edit-btn" type="button">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="delete-btn" type="button"><i class="fa-solid fa-trash"></i></button>
                </div>`;

        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);

        const editBtn = element.querySelector(".edit-btn")
        editBtn.addEventListener("click", editItem)
        



        list.appendChild(element);
        //alert
        displayAlert("Başarıyla Eklendi", "success");
        //show
        container.classList.add("show-container");
        //localStorage ekleme
        addToLocalStorage(id, value);
        //İçeriği Temizleme
        setBackToDefault();
    }else if(value !== "" && editFlag){
        editElement.innerHTML = value;
        displayAlert("Değer değiştirildi", "success");
        editLocalStorage(editID, value);
        setBackToDefault();   
    }else {
        displayAlert("Lütfen bir değer giriniz.", "danger")
    
    }
}


//Alert Fonksiyonu
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    console.log(alert);
    setTimeout(function(){
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 2000);
}
//Temizleme
function setBackToDefault(){
    grocery.value = "";
    editFlag =false;
    editID = "";
    submitBtn.textContent = "submit";
}
//Silme işlemi
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
   // console.log(element);
   const id = element.dataset.id; //locaStorage Da kullanılıcak
   list.removeChild(element);
 if(list.children.length == 0){
    container.classList.remove("show-container");
 }
 displayAlert("Ürün Kaldırıldı", "danger");

 //Yerel depodan kaldır
 removeFromLocalStorage(id);
}
//Düzenleme Fonksiyonu
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
editFlag = true;
editID = element.dataset.id; //Düzenlenen elementin kimliği
submitBtn.textContent = "edit";
}
//Listeyi Temizleme
function clearItems(){
    const items = document.querySelectorAll(".grocery-item");
    if(items.length>0){
        items.forEach(function(item){
            list.removeChild(item)
        })
    }
    container.classList.remove("show-container");
    displayAlert("Liste temizlendi", "danger")
    setBackToDefault();

}
//! localStorage İşlemleri

//Yerel Depoya Öğe Ekleme İşlemi
function addToLocalStorage(id, value){
    const grocery = {id, value};
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list",JSON.stringify(items));
}
//Local Storage'dan verileri alma işlemi
function getLocalStorage(){
    return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];

}
function removeFromLocalStorage(id){
    let items = getLocalStorage();

    items = items.filter(function(item){
      if(item.id !==id) {
        return item;
      }
    });

}
function editLocalStorage(id, value){
    console.log(id, value);
}
function setupItems(){
    let items = getLocalStorage();
}