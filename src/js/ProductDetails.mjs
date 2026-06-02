import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { superscript } from "./countingElementCart.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);

        // the product details are needed before rendering the HTML
        this.renderProductDetails();
        this.renderComments();

        document.getElementById("commentForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const author = document.getElementById("commentAuthor").value;
            const text = document.getElementById("commentText").value;
            this.dataSource.saveComment(this.productId, { author, text });
            this.renderComments();
            e.target.reset();
        });

        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
        // added query selector for ".cart" for functionality when button is clicked item rotates back and forth to show something has been added to the cart
        document.getElementById("addToCart").addEventListener("click", () => {
            this.addProductToCart();
            const cart = document.querySelector(".cart");
            cart.classList.add("cart-update");
        });

    }
    addProductToCart() {
        if (!this.product || !this.product.Id) {
            console.error("Product data is missing or incomplete:", this.product);
            return;
        }

        let cartItems = getLocalStorage("so-cart");

        if (!Array.isArray(cartItems)) {
            cartItems = [];
        }

        cartItems.push(this.product);

        setLocalStorage("so-cart", cartItems);

        superscript();
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }

    renderComments() {
        const comments = this.dataSource.getComments(this.productId);
        const list = document.getElementById("commentsList");
        list.innerHTML = "";
        if (comments.length === 0) {
            list.innerHTML = "<li>No comments yet.</li>";
            return;
        }
        comments.forEach(comment => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${comment.author}</strong><p>${comment.text}</p>`;
            list.appendChild(li);
        });
    }

}
function productDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');

    // Gather all images (Primary + ExtraImages)
    const allImages = [];
    const primarySrc = product.Images?.PrimaryLarge || product.Images?.PrimaryMedium || product.Images?.PrimarySmall;
    if (primarySrc) {
        allImages.push({
            Src: primarySrc,
            Title: product.NameWithoutBrand
        });
    }

    const extraImages = product.Images?.ExtraImages;
    if (Array.isArray(extraImages) && extraImages.length > 0) {
        extraImages.forEach(img => {
            if (img.Src) {
                allImages.push({
                    Src: img.Src,
                    Title: img.Title || product.NameWithoutBrand
                });
            }
        });
    }

    if (productImage) {
        if (allImages.length > 1) {
            const container = document.createElement('div');
            container.className = 'carousel-container';

            const slidesWrapper = document.createElement('div');
            slidesWrapper.className = 'carousel-slides-wrapper';

            const slides = document.createElement('div');
            slides.className = 'carousel-slides';

            allImages.forEach((imgData) => {
                const img = document.createElement('img');
                img.className = 'carousel-slide';
                img.src = imgData.Src;
                img.alt = imgData.Title;
                img.onerror = () => {
                    img.src = product.Images?.PrimarySmall || '';
                };
                slides.appendChild(img);
            });

            slidesWrapper.appendChild(slides);
            container.appendChild(slidesWrapper);

            const prevBtn = document.createElement('button');
            prevBtn.className = 'carousel-btn prev';
            prevBtn.innerHTML = '&#10094;';
            container.appendChild(prevBtn);

            const nextBtn = document.createElement('button');
            nextBtn.className = 'carousel-btn next';
            nextBtn.innerHTML = '&#10095;';
            container.appendChild(nextBtn);

            const thumbnails = document.createElement('div');
            thumbnails.className = 'carousel-thumbnails';

            allImages.forEach((imgData, index) => {
                const thumb = document.createElement('img');
                thumb.className = 'carousel-thumb' + (index === 0 ? ' active' : '');
                thumb.src = imgData.Src;
                thumb.alt = `${imgData.Title} - Option ${index + 1}`;
                thumb.dataset.index = index;
                thumb.onerror = () => {
                    thumb.src = product.Images?.PrimarySmall || '';
                };
                thumbnails.appendChild(thumb);
            });

            container.appendChild(thumbnails);

            productImage.parentNode.replaceChild(container, productImage);

            let currentIndex = 0;
            const totalSlides = allImages.length;

            const updateCarousel = (index) => {
                if (index < 0) {
                    currentIndex = totalSlides - 1;
                } else if (index >= totalSlides) {
                    currentIndex = 0;
                } else {
                    currentIndex = index;
                }

                slides.style.transform = `translateX(-${currentIndex * 100}%)`;

                const thumbs = thumbnails.querySelectorAll('.carousel-thumb');
                thumbs.forEach((t, i) => {
                    if (i === currentIndex) {
                        t.classList.add('active');
                    } else {
                        t.classList.remove('active');
                    }
                });
            };

            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                updateCarousel(currentIndex - 1);
            });

            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                updateCarousel(currentIndex + 1);
            });

            thumbnails.addEventListener('click', (e) => {
                const clickedThumb = e.target.closest('.carousel-thumb');
                if (clickedThumb) {
                    e.preventDefault();
                    const index = parseInt(clickedThumb.dataset.index, 10);
                    updateCarousel(index);
                }
            });
        } else {
            productImage.src =
                product.Images?.PrimaryLarge ||
                product.Images?.PrimaryMedium;

            productImage.alt = product.NameWithoutBrand;

            productImage.onerror = () => {
                productImage.src = product.Images?.PrimarySmall;
            };
        }
    }

    document.getElementById('productPrice').textContent = `U$D ${product.FinalPrice}`;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}
