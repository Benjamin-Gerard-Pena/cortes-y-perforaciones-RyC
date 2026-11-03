fetch('zona-superior.html')
    .then(response => response.text())
    .then(text => {
        document.getElementById('zona-superior').innerHTML = text;

        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdown = document.querySelector('.dropdown');

        if (dropdownToggle && dropdown) {
            // Abrir/cerrar al tocar el botón en móviles
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle('active');
            });
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    })
    .catch(error => console.error("Error al cargar la zona superior:", error));