// Esperamos a que todo el HTML (DOM) esté cargado
document.addEventListener('DOMContentLoaded', () => {

   /* =========================================================
       1. FUNCIONALIDAD DEL MENU HAMBURGUESA (con animacion JS)
       ========================================================= */
    const btnMenu = document.getElementById('btn-menu');
    const navMenu = document.getElementById('nav-menu');

    if (btnMenu && navMenu) {
        btnMenu.addEventListener('click', () => {
            
            // Si el menu YA está abierto (vamos a cerrarlo)
            if (navMenu.classList.contains('is-active')) {
                // 1. Iniciamos la animación de salida
                navMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                navMenu.style.opacity = '0';
                navMenu.style.transform = 'translateY(-15px)';
                
                // 2. esperamos 300ms (lo que dura la transicion) antes de quitar el display: flex
                setTimeout(() => {
                    navMenu.classList.remove('is-active');
                    // Limpiamos los estilos inyectados para no ensuciar el HTML
                    navMenu.style.transition = '';
                    navMenu.style.transform = '';
                    navMenu.style.opacity = '';
                }, 300);
                
            } 
            // Si el menu esta CERRADO (vamos a abrirlo)
            else {
                // 1. agregamos la clase que le da 'display: flex'
                navMenu.classList.add('is-active');
                
                // 2. lo preparamos invisible y un poco mas arriba
                navMenu.style.opacity = '0';
                navMenu.style.transform = 'translateY(-15px)';
                navMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                // 3. forzamos un "reflow" (obligamos al navegador a procesar los cambios anteriores)
                void navMenu.offsetWidth; 
                
                // 4. disparamos la animacion hacia su estado normal
                navMenu.style.opacity = '1';
                navMenu.style.transform = 'translateY(0)';
            }
        });
    }

    //funcional
    /* =========================================================
       2. FUNCIONALIDAD DEL MODO OSCURO (Dark Theme)
       ========================================================= */
    // Usamos querySelectorAll para atrapar los dos botones (movil y escritorio)
    const themeButtons = document.querySelectorAll('.btn-theme-toggle');
    
    // Revisamos si el usuario ya había elegido un tema antes
    const currentTheme = localStorage.getItem('theme');

    // Si habia elegido oscuro, se lo aplicamos de inmediato al cargar la pagina
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Recorremos todos los botones de tema que encontremos en la pagina
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Verificamos qué tema está activo en la etiqueta <html>
            let theme = document.documentElement.getAttribute('data-theme');
            
            if (theme === 'dark') {
                // Cambiar a Claro
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                // Cambiar a Oscuro
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    });
});