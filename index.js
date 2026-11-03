fetch('zona-superior.html')
    .then(response => {
        if (!response.ok) throw new Error("No se encontró zona-superior.html");
        return response.text();
    })
    .then(text => {
        const contenedorHeader = document.getElementById('zona-superior');
        if (contenedorHeader) {
            contenedorHeader.innerHTML = text;
        }

        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdown = document.querySelector('.dropdown');

        if (dropdownToggle && dropdown) {
            dropdownToggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 850) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                }
            });

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

    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });
});