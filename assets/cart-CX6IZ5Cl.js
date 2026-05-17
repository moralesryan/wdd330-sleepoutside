import{n as e,t}from"./superscript-KdPnLWhP.js";/* empty css              */function n(){let t=e(`so-cart`);Array.isArray(t)||(t=[]);let n=t.map(e=>r(e));if(document.querySelector(`.product-list`).innerHTML=n.join(``),t.length>0){let e=t.reduce((e,t)=>e+t.FinalPrice,0);document.querySelector(`.cart-footer`).classList.remove(`hide`),document.querySelector(`.cart-total`).textContent=`Total: $${e.toFixed(2)}`}}function r(e){return`<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${e.Image}'
      alt='${e.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${e.Name}</h2>
  </a>
  <p class='cart-card__color'>${e.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${e.FinalPrice}</p>
</li>`}n(),t();