// Navigation and smooth scroll management
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSlide = 0;
    let isScrolling = false;

    // Function to scroll to a specific slide
    function scrollToSlide(index) {
        if (isScrolling) return;
        isScrolling = true;

        if (index < 0) index = 0;
        if (index >= slides.length) index = slides.length - 1;

        currentSlide = index;
        const targetSlide = slides[index];
        
        targetSlide.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        updateActiveNav();
        
        setTimeout(() => {
            isScrolling = false;
        }, 800);
    }

    // Update active link in navigation menu
    function updateActiveNav() {
        navLinks.forEach((link, index) => {
            if (index === currentSlide) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Click event on navigation links
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSlide(index);
        });
    });

    // Detect current slide on scroll
    function updateCurrentSlide() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        slides.forEach((slide, index) => {
            const slideTop = slide.offsetTop;
            const slideBottom = slideTop + slide.offsetHeight;
            
            if (scrollPosition >= slideTop && scrollPosition < slideBottom) {
                currentSlide = index;
                updateActiveNav();
            }
        });
    }

    // Scroll event
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateCurrentSlide, 100);
    });

    // Keyboard event
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            scrollToSlide(currentSlide + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            scrollToSlide(currentSlide - 1);
        } else if (e.key === 'Home') {
            e.preventDefault();
            scrollToSlide(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            scrollToSlide(slides.length - 1);
        }
    });

    // Initialization
    updateCurrentSlide();
    updateActiveNav();

    // Slide animations on scroll
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    slides.forEach(slide => {
        slideObserver.observe(slide);
    });
});

// Bubble Sort Demo
document.addEventListener('DOMContentLoaded', function() {
    const arrayContainer = document.getElementById('array-container');
    const generateBtn = document.getElementById('generate-btn');
    const sortBtn = document.getElementById('sort-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    let array = [];
    let isSorting = false;
    let originalArray = [];

    // Generate random array
    function generateArray() {
        array = [];
        for (let i = 0; i < 10; i++) {
            array.push(Math.floor(Math.random() * 100) + 10);
        }
        originalArray = [...array];
        renderArray();
        sortBtn.disabled = false;
    }

    // Render array
    function renderArray() {
        arrayContainer.innerHTML = '';
        const maxValue = Math.max(...array, 1);
        
        array.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            element.textContent = value;
            element.style.height = `${(value / maxValue) * 250}px`;
            element.dataset.index = index;
            arrayContainer.appendChild(element);
        });
    }

    // Bubble sort with animation
    async function bubbleSort() {
        if (isSorting) return;
        isSorting = true;
        sortBtn.disabled = true;
        generateBtn.disabled = true;
        resetBtn.disabled = true;

        const n = array.length;
        let swapped;

        for (let i = 0; i < n - 1; i++) {
            swapped = false;
            
            for (let j = 0; j < n - i - 1; j++) {
                // Highlight comparing elements
                const elements = arrayContainer.querySelectorAll('.array-element');
                elements[j].classList.add('comparing');
                elements[j + 1].classList.add('comparing');
                
                await sleep(500);

                if (array[j] > array[j + 1]) {
                    // Swap elements
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    swapped = true;
                    
                    // Update display
                    renderArray();
                    await sleep(600);
                } else {
                    // Remove highlight
                    elements[j].classList.remove('comparing');
                    elements[j + 1].classList.remove('comparing');
                    await sleep(100);
                }
            }

            // Mark sorted element
            const elements = arrayContainer.querySelectorAll('.array-element');
            elements[n - i - 1].classList.add('sorted');
            elements[n - i - 1].classList.remove('comparing');

            if (!swapped) {
                // All elements are sorted
                const allElements = arrayContainer.querySelectorAll('.array-element');
                allElements.forEach(el => {
                    el.classList.add('sorted');
                    el.classList.remove('comparing');
                });
                break;
            }
        }

        isSorting = false;
        sortBtn.disabled = false;
        generateBtn.disabled = false;
        resetBtn.disabled = false;
    }

    // Helper function for delay
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Reset to initial state
    function resetArray() {
        if (isSorting) return;
        array = [...originalArray];
        renderArray();
        sortBtn.disabled = false;
    }

    // Event listeners
    generateBtn.addEventListener('click', generateArray);
    sortBtn.addEventListener('click', bubbleSort);
    resetBtn.addEventListener('click', resetArray);

    // Generate initial array
    generateArray();
});

// Quick Sort Demo
document.addEventListener('DOMContentLoaded', function() {
    const quicksortContainer = document.getElementById('quicksort-container');
    const quicksortGenerateBtn = document.getElementById('quicksort-generate-btn');
    const quicksortSortBtn = document.getElementById('quicksort-sort-btn');
    const quicksortResetBtn = document.getElementById('quicksort-reset-btn');
    
    let quicksortArray = [];
    let quicksortIsSorting = false;
    let quicksortOriginalArray = [];
    let sortedIndices = new Set();

    // Helper function for delay
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Generate random array
    function quicksortGenerateArray() {
        quicksortArray = [];
        sortedIndices.clear();
        for (let i = 0; i < 10; i++) {
            quicksortArray.push(Math.floor(Math.random() * 100) + 10);
        }
        quicksortOriginalArray = [...quicksortArray];
        quicksortRenderArray();
        quicksortSortBtn.disabled = false;
    }

    // Render array
    function quicksortRenderArray() {
        quicksortContainer.innerHTML = '';
        const maxValue = Math.max(...quicksortArray, 1);
        
        quicksortArray.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            if (sortedIndices.has(index)) {
                element.classList.add('sorted');
            }
            element.textContent = value;
            element.style.height = `${(value / maxValue) * 250}px`;
            element.dataset.index = index;
            quicksortContainer.appendChild(element);
        });
    }

    // Partition function for Quick Sort
    async function partition(low, high) {
        const pivotValue = quicksortArray[high];
        let i = low - 1;

        // Display pivot
        quicksortRenderArray();
        await sleep(300);
        let elements = quicksortContainer.querySelectorAll('.array-element');
        if (elements[high]) {
            elements[high].classList.add('pivot');
        }
        await sleep(600);

        for (let j = low; j < high; j++) {
            // Update elements after each render
            elements = quicksortContainer.querySelectorAll('.array-element');
            
            // Highlight element being compared
            if (elements[j]) {
                elements[j].classList.add('comparing');
            }
            await sleep(500);

            if (quicksortArray[j] < pivotValue) {
                i++;
                if (i !== j) {
                    // Swap elements
                    [quicksortArray[i], quicksortArray[j]] = [quicksortArray[j], quicksortArray[i]];
                    quicksortRenderArray();
                    await sleep(700);
                    // Update elements after render
                    elements = quicksortContainer.querySelectorAll('.array-element');
                    if (elements[high]) {
                        elements[high].classList.add('pivot');
                    }
                }
            }

            // Remove highlight
            elements = quicksortContainer.querySelectorAll('.array-element');
            if (elements[j]) {
                elements[j].classList.remove('comparing');
            }
            await sleep(100);
        }

        // Move pivot to final position
        [quicksortArray[i + 1], quicksortArray[high]] = [quicksortArray[high], quicksortArray[i + 1]];
        
        // Mark pivot in final position
        sortedIndices.add(i + 1);
        quicksortRenderArray();
        await sleep(600);

        return i + 1;
    }

    // Quick sort with animation
    async function quickSort(low = 0, high = quicksortArray.length - 1) {
        if (low < high) {
            // Display partition range
            quicksortRenderArray();
            await sleep(300);
            let elements = quicksortContainer.querySelectorAll('.array-element');
            for (let i = low; i <= high; i++) {
                if (elements[i] && !sortedIndices.has(i)) {
                    elements[i].classList.add('partition');
                }
            }
            await sleep(500);

            const pivotIndex = await partition(low, high);

            // Remove partition class
            quicksortRenderArray();
            await sleep(300);
            elements = quicksortContainer.querySelectorAll('.array-element');
            for (let i = low; i <= high; i++) {
                if (elements[i]) {
                    elements[i].classList.remove('partition');
                }
            }
            await sleep(200);

            // Recursive sorting
            await quickSort(low, pivotIndex - 1);
            await quickSort(pivotIndex + 1, high);
        } else if (low === high) {
            // Mark single element
            sortedIndices.add(low);
            quicksortRenderArray();
            await sleep(300);
        }
    }

    // Start sorting
    async function startQuickSort() {
        if (quicksortIsSorting) return;
        quicksortIsSorting = true;
        quicksortSortBtn.disabled = true;
        quicksortGenerateBtn.disabled = true;
        quicksortResetBtn.disabled = true;
        
        sortedIndices.clear();
        await quickSort();
        
        // Mark all elements as sorted
        for (let i = 0; i < quicksortArray.length; i++) {
            sortedIndices.add(i);
        }
        quicksortRenderArray();

        quicksortIsSorting = false;
        quicksortSortBtn.disabled = false;
        quicksortGenerateBtn.disabled = false;
        quicksortResetBtn.disabled = false;
    }

    // Reset to initial state
    function quicksortResetArray() {
        if (quicksortIsSorting) return;
        quicksortArray = [...quicksortOriginalArray];
        sortedIndices.clear();
        quicksortRenderArray();
        quicksortSortBtn.disabled = false;
    }

    // Event listeners
    quicksortGenerateBtn.addEventListener('click', quicksortGenerateArray);
    quicksortSortBtn.addEventListener('click', startQuickSort);
    quicksortResetBtn.addEventListener('click', quicksortResetArray);

    // Generate initial array
    quicksortGenerateArray();
});

// Scroll performance optimization
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll-related code
            ticking = false;
        });
        ticking = true;
    }
});

