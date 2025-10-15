document.addEventListener('DOMContentLoaded', () => {
    console.log('Welcome to VAXTOP!');

    const products = [
        { name: 'סמארטפון דגם X', price: '₪1,200', image: 'https://picsum.photos/seed/phone/300/200' },
        { name: 'אוזניות אלחוטיות Pro', price: '₪350', image: 'https://picsum.photos/seed/headphones/300/200' },
        { name: 'שעון חכם Fit+', price: '₪580', image: 'https://picsum.photos/seed/watch/300/200' },
        { name: 'מצלמת אבטחה HD', price: '₪250', image: 'https://picsum.photos/seed/camera/300/200' },
        { name: 'רחפן קומפקטי 4K', price: '₪950', image: 'https://picsum.photos/seed/drone/300/200' },
        { name: 'מטען נייד 20000mAh', price: '₪180', image: 'https://picsum.photos/seed/powerbank/300/200' },
        { name: 'רמקול Bluetooth נייד', price: '₪220', image: 'https://picsum.photos/seed/speaker/300/200' },
        { name: 'טאבלט 10 אינץ\'', price: '₪850', image: 'https://picsum.photos/seed/tablet/300/200' },
        { name: 'מקלדת מכנית למשחקים', price: '₪420', image: 'https://picsum.photos/seed/keyboard/300/200' },
        { name: 'עכבר גיימינג אלחוטי', price: '₪280', image: 'https://picsum.photos/seed/mouse/300/200' },
        { name: 'מסך מחשב 27 אינץ\'', price: '₪1,500', image: 'https://picsum.photos/seed/monitor/300/200' },
        { name: 'כיסא גיימינג ארגונומי', price: '₪1,100', image: 'https://picsum.photos/seed/chair/300/200' }
    ];

    const productsGrid = document.getElementById('products-grid');

    if (productsGrid) {
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="price">${product.price}</div>
                <a href="checkout.html"><button>קנה עכשיו</button></a>
            `;
            productsGrid.appendChild(card);
        });
    }
});