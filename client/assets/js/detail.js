   var nom = document.querySelector('#nom');
  var description = document.querySelector('#description');
  var prix = document.querySelector('#prix');
  var stock = document.querySelector('#stock');
  var date = document.querySelector('#date');

  var url = window.location;
  console.log(url);
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

