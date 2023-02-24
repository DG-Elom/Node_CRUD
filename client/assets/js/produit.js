
function addProduct() {
    var name = document.querySelector('#name');
    var description = document.querySelector('#description');
    var price = document.querySelector('#prix');
    var stock = document.querySelector('#stock');
  
    var tmp = {
      name: name.value,
      description: description.value,
      price: price.value,
      stock: stock.value,
    };
  
    let url = '/produit';
  
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(tmp)
    }
  
    fetch(url, options)
    .then((res) => {
      if(res.ok) {
        console.log("Formulaire envoyé avec succès! ");
        //addOneLine(tmp);
        document.forms['formProduit'].reset();
        window.location.href = '/pages/affiche_produit.html';
      }
    });
  }
  
  var btn = document.querySelector('#valid');
btn.addEventListener('click', (e) => {
  e.preventDefault();
  addProduct();
});
