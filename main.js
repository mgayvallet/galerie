document.addEventListener('DOMContentLoaded', () => {
    const images = [
        {
            date: '2024-06-09',
            name: 'ferrari',
            category: 'formule 1',
            url: 'public/f1.png'
        },
        {
            date: '2002-02-08',
            name: 'M5 compétition',
            category: 'BMW',
            url: 'public/bmw.png'
        },
        {
            date: '2014-08-01',
            name: 'huracán',
            category: 'lamborghini',
            url: 'public/huracan.png'
        },
        {
            date: '1940-11-13',
            name: ' F-18',
            category: 'avion de chasse',
            url: 'public/avionDeChasse.png'
        },
        {
            date: '2008-12-09',
            name: 'tara',
            category: 'camion',
            url: 'public/camion.png'
        },
    ];

    const galleryContainer = document.getElementById('galleryContainer');
    const searchInput = document.getElementById('searchInput');

    function renderGallery(imagesToRender) {
        galleryContainer.innerHTML = '';
        imagesToRender.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.innerHTML = `
                <img src="${image.url}" alt="${image.name}">
                <h3>${image.name}</h3>
                <p>${image.category}</p>
                <p>${image.date}</p>
            `;
            galleryContainer.appendChild(galleryItem);
        });
    }

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredImages = images.filter(image => {
            return image.name.toLowerCase().includes(searchTerm) ||
                image.category.toLowerCase().includes(searchTerm) ||
                image.date.toLowerCase().includes(searchTerm);
        });
        renderGallery(filteredImages);
    });

    renderGallery(images);
});