

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

function addOneProduct(data) {
    
    var del = document.querySelector("#delBtn");
        del.addEventListener('click', (e) => {
              deleteMovie(data._id);
            });
    
    //     var nom = document.querySelector('#nom');
    //     var description = document.querySelector('#description');
    //     var prix = document.querySelector('#prix');
    //     var stock = document.querySelector('#stock');
    //     var date = document.querySelector('#date');
        
    //     nom.innerText = data.name;
    //   description.innerText = data.description;
    //   prix.innerText = data.price;
    //   stock.innerText = data.stock;
    //   date.innerText = data.createdAt;
     
    // var tab = document.querySelector('#produits');
    // var newLine = document.createElement('tr');
    // for (const prop in data) {
    //   if(prop != '_id' && prop != '__v') {
    //     var tmp = document.createElement('td');
    //     tmp.innerText = data[prop];  // data.prop
    //     newLine.appendChild(tmp);
    //   }
    // }
  
    // // Je créé un lien vers la page détail
    // var tdLink = document.createElement('td');
    // var link = document.createElement('a');
    // link.href = '/pages/detail2.html#' + data._id;
    // link.innerText = 'Détails';
    // tdLink.appendChild(link);
    // newLine.appendChild(tdLink);
  
    // // Je créé le bouton suppression
    // var tdSuppr = document.createElement('td');
    // var btnSuppr = document.createElement('button');
    // btnSuppr.innerText = 'Suppression';
    // btnSuppr.classList.add('btn', 'btn-outline-danger');
    // tdSuppr.appendChild(btnSuppr);
    // newLine.appendChild(tdSuppr);
  
    // btnSuppr.addEventListener('click', (e) => {
    //   deleteMovie(data._id);
    // });
  
    // tab.appendChild(newLine);
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
      // on extraie le résultat en JSON
      return res.json();
    }
  })
  .then((response) => {
    
    response.forEach(elt => {
        var div = document.querySelector('#affiche');
        var carte = document.createElement('div');
        carte.innerHTML = `
          <div class="card">
            
            <div class="card-body">
              <div class="card-body">
                  <h5 class="card-title" id="nom">${elt.name}</h5>
                  <p class="card-text" id="description">${elt.description}</p>
                  <p class="card-text" id="prix">${elt.price}</p>
                  <p class="card-text" id="stock">${elt.stock}</p>
                  <p class="card-text" id="date">${elt.createdAt}</p>
                  <button class="btn btn-outline-danger" id="delBtn" >Supprimer</button>
                </div>
            </div>
        </div>
        `;
        div.appendChild(carte);
        addOneProduct(elt);
        
        
    });
  })
