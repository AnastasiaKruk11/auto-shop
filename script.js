const items = [{
        title: 'Mercedes-Benz',
        description: 'GLC250 4MATIC Coupe',
        tags: ['В наличии', 'Выгодно'],
        price: 67000,
        img: './images/mercedes-glc.JPG',
        rating: 4.8,
    },
    {
        title: 'Mercedes-Benz',
        description: 'A200 HB',
        tags: ['В наличии', 'С пробегом'],
        price: 74990,
        img: './images/mercedes-a200.JPG',
        rating: 4.4,
    },
    {
        title: 'AUDI',
        description: 'A4 TFSI S-line',
        tags: ['Под заказ', 'Выгодно'],
        price: 48000,
        img: './images/audi-a4.jpg',
        rating: 3.9,
    },
    {
        title: 'AUDI',
        description: 'E-tron',
        tags: ['В наличии'],
        price: 54000,
        img: './images/audi-e-tron.jpg',
        rating: 4.9,
    },
    {
        title: 'AUDI',
        description: 'Q5 Sportback S-line',
        tags: ['В наличии', 'Выгодно'],
        price: 52000,
        img: './images/audi-q5.jpg',
        rating: 4.4,
    },
    {
        title: 'BMW',
        description: 'X2 sDrive 18',
        tags: ['Под заказ'],
        price: 60000,
        img: './images/bmw-sdrive.jpg',
        rating: 3.8,
    },
    {
        title: 'BMW',
        description: '520d Sedan',
        tags: ['В наличии', 'С пробегом'],
        price: 68000,
        img: './images/bmw-520d.jpg',
        rating: 4.7,
    },
    {
        title: 'Opel',
        description: 'Crossland',
        tags: ['В наличии', 'Выгодно'],
        price: 40000,
        img: './images/opel.JPG',
        rating: 2.9,
    },
    {
        title: 'Porsche',
        description: '911 Carrera',
        tags: ['Под заказ'],
        price: 214970,
        img: './images/porsche-carrera.JPG',
        rating: 5.0,
    },
    {
        title: 'Porsche',
        description: 'Cayenne S Coupe',
        tags: ['Под заказ'],
        price: 244890,
        img: './images/porsche-cayene.JPG',
        rating: 4.9,
    },
    {
        title: 'Volkswagen',
        description: 'Golf hatchback',
        tags: ['В наличии', 'Выгодно'],
        price: 40000,
        img: './images/volkswagen-golf.JPG',
        rating: 2.9,
    },
    {
        title: 'Volkswagen',
        description: 'Touareg R-line',
        tags: ['Под заказ', 'Выгодно'],
        price: 50000,
        img: './images/volkswagen-touareg.JPG',
        rating: 3.8,
    },
]

let currentState = [...items];

const container = document.querySelector('#auto-items');
const itemTemplate = document.querySelector('#item-template');
const nullResult = document.querySelector('#nothing-found');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const sortSelect = document.querySelector('#sort');

function renderItems(arr) {

    nullResult.textContent = '';
    container.innerHTML = '';

    arr.forEach((item) => {
        container.append(prepareShopItem(item));
    });

    if (!arr.length) {
        nullResult.textContent = 'По Вашему запросу ничего не найдено';
    }
}

function prepareShopItem(shopItem) {

    const { title, description, tags, price, img, rating } = shopItem;

    const item = itemTemplate.content.cloneNode(true);

    item.querySelector('h1').textContent = title;
    item.querySelector('p').textContent = description;
    item.querySelector('img').src = img;
    item.querySelector('.price').textContent = `от ${price} $`;

    const starsContainer = item.querySelector('.popularity');

    for (let i = 0; i < rating; i++) {
        const star = document.createElement('i');
        star.classList.add("fa", "fa-star");
        starsContainer.append(star);
    }

    if (rating > 4) {
        const fire = document.createElement('i');
        fire.classList.add('fa-brands', 'fa-gripfire', 'fire-style');
        starsContainer.append(fire);
    }

    const tagsHolder = item.querySelector('.tags');

    tags.forEach((tag) => {
        const tagElement = document.createElement('span');
        tagElement.textContent = tag;
        tagElement.classList.add('tag');

        tagsHolder.prepend(tagElement);

    });

    return item;
}

function sortByAlphabet(a, b) {

    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }

    return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function applySearch() {

    const searchValue = searchInput.value.trim().toLowerCase();

    currentState = items.filter((item) => item.title.toLowerCase().includes(searchValue) || item.description.toLowerCase().includes(searchValue));
    renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));
    sortSelect.selectedIndex = 0;

    if (!searchInput.value) {
        currentState = [...items];
    }
}

searchButton.addEventListener('click', applySearch);
searchInput.addEventListener('search', applySearch);

sortSelect.addEventListener('change', (event) => {
    const sortOption = event.target.value;

    switch (sortOption) {
        case 'alphabet':
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
        case 'rating':
            {
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case 'expensive':
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case 'cheap':
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
    }
    renderItems(currentState);
});