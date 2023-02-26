

function deleteMovie(id){
  let url = '/produit/' + id;
  let options = {
      method: 'DELETE',
  };

fetch(url, options)
  .then((res) => {
    if(res.ok) {
      window.location.href = '/pages/affiche_produit.html';
    }
  });
}

function showProduct(data) {
    var tab = document.querySelector('#produits');
    var newLine = document.createElement('tr');
    for (const prop in data) {
      if(prop != '_id' && prop != '__v') {
        var tmp = document.createElement('td');
        newLine.appendChild(tmp);
      }
    }
  
    var tdLink = document.createElement('td');
    var link = document.createElement('a');
    link.href = '/pages/detail.html#' + data._id;
    link.innerText = 'Détails';
    tdLink.appendChild(link);
    newLine.appendChild(tdLink);
  
    var tdSuppr = document.createElement('td');
    var btnSuppr = document.createElement('button');
    btnSuppr.innerText = 'Suppression';
    btnSuppr.classList.add('btn', 'btn-outline-danger');
    tdSuppr.appendChild(btnSuppr);
    newLine.appendChild(tdSuppr);
  
    btnSuppr.addEventListener('click', (e) => {
      deleteMovie(data._id);
    });
  
    tab.appendChild(newLine);
  }
  


let myHeaders = new Headers();
let url = '/produit';

let options = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

fetch(url, options)
  .then((res) => {
    if(res.ok) {
      return res.json();
    }
  })
  .then((response) => {
    response.forEach(elt => {
        showProduct(elt);
    });
  })
