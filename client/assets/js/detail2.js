var url = window.location;

var filmId = url.hash;
filmId = filmId.substring(1);
console.log(filmId);

let myHeaders = new Headers();
let urlFinal = '/produit/' + filmId;

let options = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

const title = document.querySelector('card-title');
const des = document.querySelector('card-text-des');
const price = document.querySelector('card-text-price');
const stock = document.querySelector('card-text-stock');

function showProduct(data){
    var produit = document.querySelector('#detail');

    let card = document.createElement('div');
    let card_body = document.createElement('div');
    let card_title = document.createElement('h5');
    let card_p_des = document.createElement('p');
    let card_p_price = document.createElement('p');
    let card_p_stock = document.createElement('p');

    card.className = "card";
    card_body.className = "card-body";
    card_title.className = "card_title";
    card_p_des.className = "card-text";
    card_p_price.className = "card-text";
    card_p_stock.className = "card-text";

    card_title.innerText = data.name;
    card_p_des.innerText = data.description;
    card_p_price.innerText = "Prix: " + data.price;
    card_p_stock.innerText = "Nombre en stock: " + data.stock;

    card_body.appendChild(card_title);
    card_body.appendChild(card_p_des);
    card_body.appendChild(card_p_price);
    card_body.appendChild(card_p_stock);
    card.appendChild(card_body);
    produit.appendChild(card);

}

fetch(urlFinal, options)
  .then((res) => {
    if(res.ok) {
      return res.json();
    }
  })
  .then((response) => {
    console.log(response);
    title.innerText = response.name;
    des.innerText = response.description;
    price.innerText = response.price;
    stock.innerText = response.stock;
    // // showProduct(response);
    // window.location.href = '/pages/detail.html'
  });

