// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('#menu a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

// Header com sombra ao rolar
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Botão voltar ao topo
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Link ativo conforme rolagem
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Formulário de contato
const form = document.getElementById('formContato');
const formMsg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const mensagem = form.querySelector('textarea').value.trim();

    if (nome && email && mensagem) {
        formMsg.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
        formMsg.style.color = '#2e7d32';
        form.reset();
        setTimeout(() => {
            formMsg.textContent = '';
        }, 5000);
    } else {
        formMsg.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        formMsg.style.color = '#c62828';
    }
});

// Animação de entrada dos cards (Intersection Observer)
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card-diferencial, .card-produto, .dado-item, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Suavizar rolagem para links internos (fallback)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

console.log('Fortaleza Distribuidora MRO - Site carregado com sucesso!');
