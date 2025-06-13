document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const mobileMenu = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navbar.classList.remove('active');
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Adiciona classe active ao link da página atual
    const currentPage = location.pathname.split('/').pop().replace('.html', '');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').replace('.html', '');
        
        if (currentPage === '' && linkPage === 'index') {
            link.classList.add('active');
        } else if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});


// Efeito de revelação dos cards ao scroll
const aboutCards = document.querySelectorAll('.about-card');

function animateCards() {
    const triggerBottom = window.innerHeight / 5 * 4;
    
    aboutCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        
        if (cardTop < triggerBottom) {
            setTimeout(() => {
                card.classList.add('show');
            }, index * 200);
        }
    });
}

// Otimização com Intersection Observer (mais eficiente)
function initScrollAnimation() {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('show');
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        aboutCards.forEach(card => {
            observer.observe(card);
        });
    } else {
        // Fallback para browsers antigos
        window.addEventListener('scroll', animateCards);
        animateCards(); // Executa uma vez ao carregar
    }
}

// Inicia a animação
initScrollAnimation();


// Animação dos cards de planos
const planCards = document.querySelectorAll('.plan-card');

function animatePlanCards() {
    planCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Inicia animação quando a seção for visível
const plansObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animatePlanCards();
            plansObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

plansObserver.observe(document.querySelector('.plans-section'));




document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os grupos de formulário
    const formGroups = document.querySelectorAll('.form-group');
    
    // Função para atualizar o estado do label
    function updateLabel(input) {
        const label = input.nextElementSibling;
        const underline = label.nextElementSibling;
        
        if (input.value || input === document.activeElement) {
            label.style.top = '-20px';
            label.style.fontSize = '0.8rem';
            label.style.color = 'var(--primary-color)';
            underline.style.width = '100%';
        } else {
            label.style.top = '10px';
            label.style.fontSize = '1rem';
            label.style.color = '#aaa';
            underline.style.width = '0';
        }
    }
    
    // Adiciona os event listeners para cada campo
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        const underline = group.querySelector('.underline');
        
        // Configura os estilos iniciais
        label.style.position = 'absolute';
        label.style.left = '0';
        label.style.pointerEvents = 'none';
        label.style.transition = 'all 0.3s ease';
        
        underline.style.position = 'absolute';
        underline.style.bottom = '0';
        underline.style.left = '0';
        underline.style.height = '2px';
        underline.style.backgroundColor = 'var(--primary-color)';
        underline.style.transition = 'all 0.3s ease';
        
        // Eventos para cada campo
        input.addEventListener('focus', () => updateLabel(input));
        input.addEventListener('blur', () => updateLabel(input));
        input.addEventListener('input', () => updateLabel(input));
        
        // Atualiza o estado inicial
        updateLabel(input);
    });
});