document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.fixed-nav');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    const bannerItems = document.querySelectorAll('.banner-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.banner-btn.prev');
    const nextBtn = document.querySelector('.banner-btn.next');
    let currentIndex = 0;
    let bannerInterval;

    function startBanner() {
        bannerInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }

    function goToSlide(index) {
        if (index >= bannerItems.length) index = 0;
        if (index < 0) index = bannerItems.length - 1;

        bannerItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
        });

        currentIndex = index;
    }

    indicators.forEach((ind, i) => {
        ind.addEventListener('click', () => {
            clearInterval(bannerInterval);
            goToSlide(i);
            startBanner();
        });
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(bannerInterval);
        goToSlide(currentIndex - 1);
        startBanner();
    });

    nextBtn.addEventListener('click', () => {
        clearInterval(bannerInterval);
        goToSlide(currentIndex + 1);
        startBanner();
    });

    const banner = document.querySelector('.banner');
    banner.addEventListener('mouseenter', () => clearInterval(bannerInterval));
    banner.addEventListener('mouseleave', startBanner);

    startBanner();

    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 300);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const addCartBtns = document.querySelectorAll('.add-cart');
    const cartCount = document.querySelector('.cart-count');
    let count = parseInt(cartCount.textContent);

    addCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            count++;
            cartCount.textContent = count;
            cartCount.classList.add('pulse');
            setTimeout(() => cartCount.classList.remove('pulse'), 500);
            
            const novelTitle = this.closest('.novel-card').querySelector('.novel-title').textContent;
            showToast(`${novelTitle} 已加入购物车`);
        });
    });

    function showToast(message, duration = 2000) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        toast.style.transform = 'translate(-50%, 0)';
        setTimeout(() => {
            toast.style.transform = 'translate(-50%, -20px)';
            setTimeout(() => {
                toast.classList.remove('show');
            }, 300);
        }, duration);
    }

    const loadingMask = document.querySelector('.loading-mask');
    window.addEventListener('load', () => {
        loadingMask.classList.add('fade-out');
        setTimeout(() => {
            loadingMask.classList.remove('active', 'fade-out');
        }, 500);
    });

    const noticeClose = document.querySelector('.notice-close');
    const topNotice = document.querySelector('.top-notice');
    noticeClose.addEventListener('click', () => {
        topNotice.style.display = 'none';
        document.querySelector('.fixed-nav').style.top = '0';
        document.body.style.paddingTop = '85px';
    });
});;
