document.addEventListener('DOMContentLoaded', () => {
    const images = [
        {   
            date: '2024-06-09',
            name: 'Ferrari',
            category: 'Formule 1',
            url: 'public/f1.png'
        },
        {
            date: '2002-02-08',
            name: 'M5 Compétition',
            category: 'BMW',
            url: 'public/bmw.png'
        },
        {
            date: '2014-08-01',
            name: 'Huracán',
            category: 'Lamborghini',
            url: 'public/huracan.png'
        },
        {
            date: '1940-11-13',
            name: 'F-18',
            category: 'Avion de chasse',
            url: 'public/avionDeChasse.png'
        },
        {
            date: '2008-12-09',
            name: 'Tara',
            category: 'Camion',
            url: 'public/camion.png'
        },
    ];

    const galleryContainer = document.getElementById('galleryContainer');
    const searchInput = document.getElementById('searchInput');
    const addImageBtn = document.getElementById('addImageBtn');
    const addImageForm = document.getElementById('addImageForm');
    const submitImageBtn = document.getElementById('submitImageBtn');
    const cancelImageBtn = document.getElementById('cancelImageBtn');
    const carouselBtn = document.getElementById('carouselBtn');
    const carouselContainer = document.getElementById('imageCarousel');
    const header = document.querySelector('.header');

    let currentImageIndex = 0;

    function renderGallery(imagesToRender) {
        galleryContainer.innerHTML = '';
        imagesToRender.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.innerHTML = `
                <div class="image-container">
                    <img src="${image.url}" alt="${image.name}">
                </div>
                <h3>${image.name}</h3>
                <p>${image.category}</p>
                <p>${image.date}</p>
            `;
            galleryContainer.appendChild(galleryItem);
        });
    }

    function renderCarousel(imagesToRender) {
        carouselBtn.textContent = "Gallery";
        addImageBtn.style.display = 'none'; 
        galleryContainer.style.display = 'none'; 
        searchInput.style.display = 'none';

        carouselContainer.innerHTML = `
            <div class="carousel-controls">
                <img src="https://cdn.icon-icons.com/icons2/1674/PNG/512/chevronleft_111012.png" alt="Previous" id="prevBtn">
                <div class="carousel-slide">
                    <img src="${imagesToRender[currentImageIndex].url}" alt="${imagesToRender[currentImageIndex].name}">
                </div>
                <img src="https://cdn.icon-icons.com/icons2/1674/PNG/512/chevronright_111007.png" alt="Next" id="nextBtn">
            </div>
        `;

        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + imagesToRender.length) % imagesToRender.length;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % imagesToRender.length;
            updateCarousel();
        });

        document.addEventListener('keydown', handleKeyPress);
    }

    function handleKeyPress(event) {
        if (event.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateCarousel();
        } else if (event.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateCarousel();
        }
    }

    function updateCarousel() {
        const carouselSlide = document.querySelector('.carousel-slide img');
        carouselSlide.src = images[currentImageIndex].url;
        carouselSlide.alt = images[currentImageIndex].name;
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

    addImageBtn.addEventListener('click', () => {
        addImageForm.style.display = 'block';
        galleryContainer.classList.add('hidden');
    });

    cancelImageBtn.addEventListener('click', () => {
        addImageForm.style.display = 'none';
        galleryContainer.classList.remove('hidden');
    });

    submitImageBtn.addEventListener('click', () => {
        const imageName = document.getElementById('imageName').value;
        const imageCategory = document.getElementById('imageCategory').value;
        const imageDate = document.getElementById('imageDate').value;
        const imageURL = document.getElementById('imageURL').value;

        if (imageName && imageCategory && imageDate && imageURL) {
            images.push({
                date: imageDate,
                name: imageName,
                category: imageCategory,
                url: imageURL
            });

            renderGallery(images);
            addImageForm.style.display = 'none';
            galleryContainer.classList.remove('hidden');
        } else {
            alert('Please fill in all fields.');
        }
    });

    carouselBtn.addEventListener('click', () => {
        if (carouselBtn.textContent === "Carousel") {
            renderCarousel(images);
        } else {
            carouselBtn.textContent = "Carousel";
            addImageBtn.style.display = 'inline-block'; 
            galleryContainer.style.display = 'flex'; 
            searchInput.style.display = 'inline-block';
            carouselContainer.innerHTML = '';
        }
    });

    renderGallery(images);
});
