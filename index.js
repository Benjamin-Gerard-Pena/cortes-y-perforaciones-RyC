fetch('zona-superior.html')
    .then(response => response.text())
    .then(text => {
        document.getElementById('zona-superior').innerHTML = text;

        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdown = document.querySelector('.dropdown');

        if (dropdownToggle && dropdown) {
            dropdownToggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 850 && !dropdown.classList.contains('active')) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdown.classList.add('active');
                }
            });

            // Cerrar el submenú si tocan afuera en móvil
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    })
    .catch(error => console.error("Error al cargar la zona superior:", error));

document.addEventListener('DOMContentLoaded', () => {
    const btnRetroceder = document.querySelector('.btn-retroceder');
    if (btnRetroceder) {
        btnRetroceder.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.history.length > 1 && document.referrer !== "") {
                window.history.back();
            } else {
                window.location.href = 'index.html';
            }
        });
    }
});