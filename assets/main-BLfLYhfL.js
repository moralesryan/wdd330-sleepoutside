import{i as e,t}from"./superscript-KdPnLWhP.js";/* empty css              */import{t as n}from"./ProductData-B5xCT5q8.js";function r(e){return`
    <li class="product-card">
      <a href="product_pages/index.html?product=${e.Id}">
        <img 
          src="${e.Image}" 
          alt="Image of ${e.Name}"
        >
        <h2 class="card__brand">${e.Brand.Name}</h2>
        <h3 class="card__name">${e.Name}</h3>
        <p class="product-card__price">$${e.FinalPrice}</p>
      </a>
    </li>
  `}new class{constructor(e,t,n){this.category=e,this.dataSource=t,this.listElement=n}async init(){let e=await this.dataSource.getData();this.renderList(e)}renderList(t){e(r,this.listElement,t)}}(`tents`,new n(`tents`),document.querySelector(`.product-list`)).init(),t();