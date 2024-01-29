// arry local storage ////////
var array = [];
if (localStorage.lili != null) {
  array = JSON.parse(localStorage.lili);
} else {
  array = [];
}
// validation variables /////////////
var validname = false;
var validbrand = false;
var validprice = false;
var validdate = false;
var validtype = false;
var validpromotion = false;

//   outside add function variables  ///////////
// var name =
var brand = document.getElementById("brand"); // inputs
var price = document.getElementById("price");
var type = document.getElementById("type");
var radio = document.querySelectorAll('input[name="typeradio"]');
var date = document.getElementById("date");
var nameOutput = document.getElementById("nameOutput"); // ERROR  output
var brandOutput = document.getElementById("brandOutput");
var priceOutput = document.getElementById("priceOutput");
var typeOutput = document.getElementById("typeOutput");
var radioOutput = document.getElementById("radioOutput");
var dateOutput = document.getElementById("dateOutput");

//  add function  START //////////////////////////////
function add() {
  // Name validation //////////////////////////////
  if (
    !document.getElementById("name").value.match(/^[a-z A-Z]+$/) ||
    document.getElementById("name").value.length > 30 ||
    document.getElementById("name").value == ""
  ) {
    validname = false;
    nameOutput.innerHTML = "Le nom ne doit pas dépassé 30 caractères";
    document.getElementById("name").style.border = "solid 1px red";
  } else {
    document.getElementById("name").style.border = "solid 0px black";
    validname = true;
  }
  //  brand function /////////////////////////////
  brandOutput.innerHTML = "";
  if (
    !brand.value.match(/^[a-z A-Z]+$/) ||
    brand.value.length > 30 ||
    brand.value == ""
  ) {
    validbrand = false;
    brandOutput.innerHTML = "La marque ne doit pas dépassé 30 caractères";
    brand.style.border = "solid 1px red";
  } else {
    brand.style.border = "solid 0px black";
    validbrand = true;
  }
  //  price function //////////////////////////////
  priceOutput.innerHTML = "";
  if (!price.value.match(/(^[0-9]+)([.,][0-9]+)?$/)) {
    validprice = false;
    priceOutput.innerHTML = "Le prix doit etre un reel";
    price.style.border = "solid 1px red";
  } else {
    price.style.border = "solid 0px black";
    validprice = true;
  }
  // type validation ////////////////////////
  var counter = 0;
  typeOutput.innerHTML = "";
  for (var i = 1; i < type.options.length; i++) {
    if (type.options[i].selected === true) {
      counter++;
    }
  }
  if (counter == 0) {
    typeOutput.innerHTML = "Choisie un type";
    validtype = false;
  } else {
    validtype = true;
  }
  // promotion validation ////////////////////////
  radioOutput.innerHTML = "";
  for (var k = 0; k < radio.length; k++) {
    if (
      !(
        document.getElementById("yes").checked ||
        document.getElementById("no").checked
      )
    ) {
      radioOutput.innerHTML = "Choisie un radio";
      validradio = false;
    } else {
      validradio = true;
    }
  }
  //  Date validation //////////////////////////////
  dateOutput.innerHTML = "";
  if (!date.value) {
    validdate = false;
    dateOutput.innerHTML = "choisie une date";
    date.style.border = "solid 1px red";
  } else if (date.value) {
    date.style.border = "solid 0px black";
    validdate = true;
  }
  if (
    validname === true &&
    validbrand === true &&
    validprice === true &&
    validdate === true &&
    validradio === true &&
    validtype === true
  ) {
    document.getElementById("form").style.boxShadow = "0px 0px 0px black";
    /////class //////////////
    class Article {
      constructor(name, brand, price, date, type, promo) {
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.date = date;
        this.type = type;
        this.promo = promo;
      }
      details() {
        return (
          "Nom : " +
          this.name +
          "<br>" +
          "Marque :" +
          this.brand +
          "<br>" +
          " Prix : " +
          this.price +
          "<br>" +
          " Date de publication :" +
          this.date +
          "<br>" +
          "Type :" +
          this.type +
          "<br>" +
          " En promotion :" +
          radioki
        );
      }
    }
    var radioki;
    if (document.getElementById("yes").checked) {
      radioki = "Oui";
    } else {
      radioki = "No";
    }
    // New object ////
    var userArticle = new Article(
      document.getElementById("name").value,
      brand.value,
      price.value,
      date.value,
      type.value,
      radioki
    );
    // locale storage //////
    array.push(userArticle);
    localStorage.setItem("lili", JSON.stringify(array));
    // modale  //////
    document.getElementById("modalconfirm").style.display = "flex";
    document.getElementById("ajouter").disabled = true;
    var modalOk = document.getElementById("modalOk");
    modalOk.onclick = ok;
    function ok() {
      document.getElementById("modalconfirm").style.display = "none";
      document.getElementById("ajouter").disabled = false;
    }
    document.getElementById("Output").innerHTML = userArticle.details();
    // Table function  start ////////////////////////////////
    // variables ///
    document.getElementById("table").style.display = "block";
    var row = -1;
    var table = document.getElementById("table");
    var trs = document.createElement("tr");
    var td = document.createElement("td");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    var td7 = document.createElement("td");
    td6.setAttribute("class", "btnCell");
    td7.setAttribute("class", "btnCell");
    // linking element to table ////
    table.appendChild(trs);
    trs.appendChild(td);
    trs.appendChild(td1);
    trs.appendChild(td2);
    trs.appendChild(td3);
    trs.appendChild(td4);
    trs.appendChild(td5);
    trs.appendChild(td6);
    trs.appendChild(td7);
    // table values ////////////////////////////////////////
    for (n = 0; n < array.length; n++) {
      td.innerHTML = array[n].name;
      td1.innerHTML = array[n].brand;
      td2.innerHTML = array[n].price;
      td3.innerHTML = array[n].date;
      td4.innerHTML = array[n].type;
      td5.innerHTML = radioki;
    }
    /////////////table sort /////////:
    var table = document.getElementById("table");
    var switching = true;
    while (switching) {
      switching = false;
      var rows = table.rows;
      for (var z = 1; z < rows.length - 1; z++) {
        var x = rows[z].getElementsByTagName("TD")[0];
        var y = rows[z + 1].getElementsByTagName("TD")[0];
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          rows[z].parentNode.insertBefore(rows[z + 1], rows[z]);
          break;
        }
      }
    }
    // edit btn ////
    var edit = document.createElement("input");
    edit.setAttribute("type", "button");
    edit.setAttribute("value", "modifier");
    edit.setAttribute("id", "editbtn");
    td6.appendChild(edit);
    // delet btn ////
    var delet = document.createElement("input");
    delet.setAttribute("type", "button");
    delet.setAttribute("value", "suprimmer");
    delet.setAttribute("id", "delet");
    td7.appendChild(delet);

    // Empty variables after click /////////////////////////
    document.getElementById("name").value = "";
    brand.value = "";
    price.value = "";
    date.value = "";
  } else {
    document.getElementById("form").style.boxShadow = "2px 2px 2px red";
  }
  // to delet row  //
  var table = document.getElementById("table");
  delet.onclick = deleteBtn;
  function deleteBtn() {
    document.getElementById("ajouter").disabled = true;
    document.getElementById("delet").disabled = true;
    document.getElementById("editbtn").disabled = true;
    document.getElementById("modalSuprimer").style.display = "flex";
    var modalDelet = document.getElementById("modalDelet");
    modalDelet.onclick = confirm;
    function confirm() {
      table.removeChild(trs);
      document.getElementById("modalSuprimer").style.display = "none";
      document.getElementById("ajouter").disabled = false;
      document.getElementById("delet").disabled = false;
      document.getElementById("editbtn").disabled = false;
    }
    var modalCancel = document.getElementById("modalCancel");
    modalCancel.onclick = cancel;
    function cancel() {
      document.getElementById("modalSuprimer").style.display = "none";
      document.getElementById("ajouter").disabled = false;
      document.getElementById("delet").disabled = false;
      document.getElementById("editbtn").disabled = false;
    }
  }
  // to edit table //
  edit.onclick = editBt;
  function editBt() {
    document.getElementById("name").value =
      table.rows[trs.rowIndex].cells[0].innerText;
    brand.value = table.rows[trs.rowIndex].cells[1].innerText;
    price.value = table.rows[trs.rowIndex].cells[2].innerText;
    date.value = table.rows[trs.rowIndex].cells[3].innerText;
    type.value = table.rows[trs.rowIndex].cells[4].innerText;
    if (td5.innerText == "Oui") {
      document.getElementById("yes").checked = true;
    } else {
      document.getElementById("no").checked = true;
    }
    document.getElementById("ajouter").value = "Modifier";
    document.getElementById("ajouter").style.backgroundColor = "#2E88E5";
    document.getElementById("ajouter").onclick = edited;
    function edited() {
      table.rows[trs.rowIndex].cells[0].innerText =
        document.getElementById("name").value;
      table.rows[trs.rowIndex].cells[1].innerText = brand.value;
      table.rows[trs.rowIndex].cells[2].innerText = price.value;
      table.rows[trs.rowIndex].cells[3].innerText = date.value;
      table.rows[trs.rowIndex].cells[4].innerText = type.value;
      if (document.getElementById("yes").checked) {
        td5.innerHTML = "Oui";
      } else {
        td5.innerHTML = "Non";
      }
      document.getElementById("ajouter").value = "Ajouter";
      document.getElementById("ajouter").style.backgroundColor =
        "#F05951";
      document.getElementById("ajouter").onclick = add;
    }
  }
}
