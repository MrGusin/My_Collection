document.addEventListener('DOMContentLoaded', () => {
    /* manipulacao do menu */
    const navMenu = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuBtn = document.getElementById('menu-btn');
    const menuIcon = menuBtn.querySelector('i');

    menu_click_handler = (() => {
        navMenu.classList.toggle('active');

        /* logica para alterar o icone */
        if (navMenu.classList.contains('active')) {
            menuIcon.classList.replace('ph-list', 'ph-x');
        }
        else {
            menuIcon.classList.replace('ph-x', 'ph-list');
        }
    })

    menuBtn.addEventListener('click', menu_click_handler)
    
    /* sections array */
    const main_content_sections = document.querySelectorAll('.content')

    const home_btn = document.getElementById('home-btn');
    home_btn.addEventListener('click', menu_click_handler)

    /* defining each button that toggles a hidden */

    /* Generic toggle function */
    const createToggle = (targetSection) => () => {
        
        main_content_sections.forEach(section => {
            if (section !== targetSection && !section.classList.contains('hidden')) {
                section.classList.add('hidden')
            }
        })

        if (targetSection.classList.contains('hidden')) {
            targetSection.classList.remove('hidden')
        } else {
            targetSection.classList.add('hidden')
        }
    }

    /* gallery */
    const gallery_btn = document.getElementById('gallery-btn')
    const gallery_btn_nav = document.getElementById('gallery-btn-nav')
    const gallery_section = document.getElementById('gallery-section')
    const gallery_tgl = createToggle(gallery_section)

    gallery_btn.addEventListener('click', gallery_tgl)
    gallery_btn_nav.addEventListener('click', gallery_tgl)
    gallery_btn_nav.addEventListener('click', menu_click_handler)

    /* vehicles */
    const vehicles_btn = document.getElementById('vehicles-btn')
    const vehicles_btn_nav = document.getElementById('vehicles-btn-nav')
    const vehicles_section = document.getElementById('vehicles-section')
    const vehicles_tgl = createToggle(vehicles_section)

    vehicles_btn.addEventListener('click', vehicles_tgl)
    vehicles_btn_nav.addEventListener('click', vehicles_tgl)
    vehicles_btn_nav.addEventListener('click', menu_click_handler)

    /* experiences */
    const experiences_btn = document.getElementById('experiences-btn-menu')
    const experiences_btn_nav = document.getElementById('experiences-btn-nav')
    const experiences_section = document.getElementById('experiences-section')
    const experiences_tgl = createToggle(experiences_section)

    experiences_btn.addEventListener('click', experiences_tgl)
    experiences_btn_nav.addEventListener('click', experiences_tgl)
    experiences_btn_nav.addEventListener('click', menu_click_handler)

    /* calendar */
    const calendar_btn = document.getElementById('calendar-btn-menu')
    const calendar_btn_nav = document.getElementById('calendar-btn-nav')
    const calendar_section = document.getElementById('calendar-section')
    const calendar_tgl = createToggle(calendar_section)

    calendar_btn.addEventListener('click', calendar_tgl)
    calendar_btn_nav.addEventListener('click', calendar_tgl)
    calendar_btn_nav.addEventListener('click', menu_click_handler)

    //Contadores

    //seleciona os itens estaticos (numeros)
    const counters = document.querySelectorAll('.stat-num')

    //funcao responsavel por subir progressivmente a numeracao
    function runCounterAnimation(el) {
        //pega o valor data target
        const targetNumber = parseInt(el.getAttribute('data-target'));
        //definir o tempo da animacao
        const durationLimit = 2000;//ms
        //iniciar uma variavel contador
        let counterValue = 0;
        //divide o numero alvo pela quantidade de frames
        const incrementAmount = targetNumber / (durationLimit / 20);
        //cria um looping temporal a cada 20ms
        const updateVisualsTimer = setInterval(() => {
            //Adiciona o incremento no valor atual
            counterValue += incrementAmount;
            //Verificar se ja atingiu  o valor alvo
            if (counterValue >= targetNumber) {
                //garante que o valor final eh o alvo
                el.innerText = targetNumber;
                //interrompe o setInterval()
                clearInterval(updateVisualsTimer);
            } else {
                //se ainda nao chegou no alvo, altera o valor atual
                el.innerText = Math.ceil(counterValue);
            }
        }, 20);
    }//fecha a funcao runCounterAnimation

    //API MODERNA! O Observer que "observa" os elementos
    const scrollObserver = new IntersectionObserver((entries, observerInstance) => {
        //se observou algo
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounterAnimation(entry.target);
                observerInstance.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.6 //pelo menos 60% do elemento tem que estar visivel
    });

    //Habilita o observer para cada entrada
    counters.forEach(counterItem => {
        scrollObserver.observe(counterItem)
    });

    /* Preview image */
    const imageInput = document.getElementById('image-attachment');
    const imagePreview = document.getElementById('image-preview');

    imageInput.addEventListener('change', () => {
        const file = imageInput.files[0];

        if (file) {
            // Create local URL and assign it to the image source
            imagePreview.src = URL.createObjectURL(file);
            imagePreview.style.display = 'block'; // Show the image
        } else {
            // Hide the preview if the user cancels selection
            imagePreview.style.display = 'none';
            imagePreview.src = '#';
        }
    });


    /* dark mode e light mode */
    /* selecionar o botao que faz a troca */
    const themeBtn = document.getElementById('theme-toggle');
    /* Selecionar o icone para troca*/
    const themeIcon = themeBtn.querySelector('i');

    /* Recuperar tema salvo */
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode')
        themeIcon.classList.replace('ph-cloud-moon', 'ph-sun');
    }

    /* Adiciona o evento no botao */
    themeBtn.addEventListener('click', () => {
        /* Liga a classe quando esta desligada e desliga quando esta ligada */
        document.body.classList.toggle('dark-mode');
        /* verifica se esta no darkmode (true) ou (false) */
        const isDark = document.body.classList.contains('dark-mode');

        if (isDark) {
            themeIcon.classList.replace('ph-cloud-moon', 'ph-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('ph-sun', 'ph-cloud-moon');
            localStorage.setItem('theme', 'light');
        }
    })
})