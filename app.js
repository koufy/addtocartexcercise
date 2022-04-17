const allProducts=document.querySelector(".products");
const cartProducts=document.querySelector(".cartProducts");
const total = document.querySelector(".total");
const buyout = document.querySelector(".buyout");


function renderProduct(){
    products.forEach( (product) => {
        allProducts.innerHTML += `
        <div class="item">
        <div class="item-container">
            <div class="description">
                <h2>${product.name}</h2>
              
                <h2>price:${product.price}</h2>
                <button onclick="changeQuantity('decrease', ${product.id})">-</button>quantity
                <button onclick="changeQuantity('increase', ${product.id})">+</button>
            </div><button>
            <div class="addToCartBtn" onclick="addToCart(${product.id})">Add ${product.name} to cart!
            </div>
            </button>
            
            <div class="addToCart" >
            </div>
        </div>
    </div>`
    })
}
renderProduct();



let cart=JSON.parse(localStorage.getItem("CART")) || [] ;
updateCart();

function addToCart(id){
    if (cart.some((item) => item.id === id)){
        changeQuantity("increase",id);
    }else {
   const item = products.find((product) => product.id === id);

   cart.push({
       ...item,
       quantity:1,
   });
}
updateCart();
}

function updateCart(){
    displayCartProducts();
    displayTotal();
    localStorage.setItem("CART",JSON.stringify(cart))
}

function displayCartProducts(){
    cartProducts.innerHTML = ""
    cart.forEach((product) => {
        cartProducts.innerHTML += `
        <div class="cartProducts">
        <div class="item-info">
            <h4>${product.name}</h4>
        </div>
        <div class="unit-price">
           price: ${product.price} euros
        </div>
        <div class="units">
            <div class="number">quantity:${product.quantity}</div>          
        </div>
        <button onclick="removeItem(${product.id})">Remove ${product.name} from cart </button>
    </div>
        `
    })
}

function changeQuantity (action , id){
        cart = cart.map((product) => {
        let quantity = product.quantity;
        if (product.id===id){
        if (action ==="decrease" && quantity > 1){
            quantity--;
        } else if (action==="increase" && quantity < product.stock) {
            quantity++;
        }
    }
        return {
            ...product,
            quantity,
        };
        
    });
    updateCart();
}

function displayTotal(){
    let totalCost=0;
    let totalProducts=0;
    cart.forEach((product) => {
        totalCost += product.price * product.quantity;
        totalProducts += product.quantity;
    });
    
const finalPrice = totalCost >= 100 ? totalCost - (totalCost * 10 / 100) : totalCost;

    total.innerHTML = `total (${totalProducts} products): ${finalPrice} euros <br>
    ${totalCost >=100 ? `Total price is over 100 euro. You have 10% discount. <br>` : ''}
      <button onclick='buyoutProducts(${JSON.stringify(cart)},${finalPrice}))'>buyout</button>`

  
}

function removeItem(id) {
    cart = cart.filter((product) => product.id !== id);
  
    updateCart();
  }

  function buyoutProducts(totalCost,cart){
      console.log(cart,totalCost);
  }