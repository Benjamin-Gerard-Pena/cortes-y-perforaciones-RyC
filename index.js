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

    const formCotizacion = document.getElementById('form-cotizacion');
    if (formCotizacion) {
        formCotizacion.addEventListener('submit', function(e) {
            e.preventDefault();

            const CORREO_PRINCIPAL = "contacto@rycortes.cl";
            const CORREO_RESPALDO = "operaciones@rycortes.cl";

            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const correo = document.getElementById('correo').value;
            const descripcion = document.getElementById('descripcion').value;
            const btnSubmit = document.getElementById('btn-submit-cotizacion');
            const aviso = document.getElementById('mensaje-exito');

            btnSubmit.disabled = true;
            btnSubmit.textContent = "Enviando solicitud...";

            fetch("https://formsubmit.co/ajax/" + CORREO_PRINCIPAL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    _subject: "Nuevo Proyecto RyCortes - " + nombre,
                    _cc: CORREO_RESPALDO,
                    _replyto: correo,
                    Nombre_o_Empresa: nombre,
                    Telefono_Cliente: telefono,
                    Correo_Cliente: correo,
                    Descripcion_del_Proyecto: descripcion
                })
            })
                .then(response => response.json())
                .then(data => {
                    aviso.style.display = "block";
                    aviso.textContent = "¡Solicitud enviada con éxito! Nos pondremos en contacto a la brevedad.";
                    formCotizacion.reset();
                    btnSubmit.disabled = false;
                    btnSubmit.textContent = "Enviar Requerimiento";
                })
                .catch(error => {
                    const asunto = encodeURIComponent("Evaluación de Proyecto - " + nombre);
                    const cuerpo = encodeURIComponent(
                        "Nombre / Empresa: " + nombre + "\n" +
                        "Teléfono: " + telefono + "\n" +
                        "Correo: " + correo + "\n\n" +
                        "Descripción del Proyecto:\n" + descripcion
                    );
                    window.location.href = "mailto:" + CORREO_PRINCIPAL + "?cc=" + CORREO_RESPALDO + "&subject=" + asunto + "&body=" + cuerpo;
                    btnSubmit.disabled = false;
                    btnSubmit.textContent = "Enviar Requerimiento";
                });
        });
    }
});