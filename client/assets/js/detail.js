  // Je récupère l'ensemble des informations de mon formulaire
  var nom = document.querySelector('#nom');
  var description = document.querySelector('#description');
  var prix = document.querySelector('#prix');
  var stock = document.querySelector('#stock');
  var date = document.querySelector('#date');


  // Récupérer l'identifiant du film
  // Objet window contient plein d'information lié au navigateur
  // y compris son url
  var url = window.location;
  console.log(url);
  // J'utilise la propriété hash de mon url pour récupérer l'identifiant
  var filmId = url.hash;
  // J'utilise la méthode substring(<indiceDepart>, <indiceFin>) indiceFin est optionel
  // 'Bonjour'.substring(1, 3) => 'onj'
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
  
  fetch(urlFinal, options)
    .then((res) => {
      if(res.ok) {
        // on extraie le résultat en JSON
        return res.json();
      }
    })
    .then((response) => {
      console.log(response)
      nom.innerText = response.name;
      description.innerText = response.description;
      prix.innerText = response.price;
      stock.innerText = response.stock;
      date.innerText = response.createdAt;
    });

