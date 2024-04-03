document.addEventListener('DOMContentLoaded', function () {
    const imagesContainer = document.getElementById('images');
    const resetButton = document.getElementById('reset');
    const verifyButton = document.getElementById('verify');
    const para = document.getElementById('para');
    let clicks = 0;
    let selectedImages = [];

    const renderImages = () => {
        const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
        const randomIndex = Math.floor(Math.random() * imageClasses.length);
        const repeatClass = imageClasses[randomIndex];
        const shuffledClasses = [...imageClasses.filter((className) => className !== repeatClass), repeatClass];
        shuffledClasses.forEach(className => {
            const img = document.createElement('img');
            img.className = className;
            img.src = getImageUrl(className);
            img.addEventListener('click', () => handleImageClick(img));
            imagesContainer.appendChild(img);
        });
    };

    const getImageUrl = (className) => {
        switch (className) {
            case 'img1':
                return 'https://picsum.photos/id/237/200/300';
            case 'img2':
                return 'https://picsum.photos/seed/picsum/200/300';
            case 'img3':
                return 'https://picsum.photos/200/300?grayscale';
            case 'img4':
                return 'https://picsum.photos/200/300/';
            case 'img5':
                return 'https://picsum.photos/200/300.jpg';
            default:
                return '';
        }
    };

    const handleImageClick = (img) => {
        if (clicks < 2) {
            img.classList.toggle('selected');
            clicks++;
            selectedImages.push(img);
            if (clicks === 2) {
                if (selectedImages[0].className === selectedImages[1].className) {
                    para.innerText = 'You are a human. Congratulations!';
                } else {
                    para.innerText = 'We can\'t verify you as a human. You selected the non-identical tiles.';
                }
                verifyButton.style.display = 'block';
            }
        } else {
            para.innerText = 'You can select maximum two images.';
            para.style.color = 'red';
        }
    };

    resetButton.addEventListener('click', () => {
        clicks = 0;
        selectedImages.forEach(img => img.classList.remove('selected'));
        selectedImages = [];
        para.innerText = '';
        para.style.color = '';
        verifyButton.style.display = 'none';
        resetButton.style.display = 'none';
    });

    verifyButton.addEventListener('click', () => {
        verifyButton.innerText = 'Verifying...';
        setTimeout(() => {
            verifyButton.style.display = 'none';
            para.style.display = 'block';
        }, 2000);
    });

    renderImages();
});