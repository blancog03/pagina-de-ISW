// Validaciones para el formulario de reserva
document.getElementById('reservaForm').onsubmit = function(e) {
    e.preventDefault();
    let valido = true;

    // Obtener elementos
    const origen = document.getElementById('origen');
    const destino = document.getElementById('destino');
    const tipoCarga = document.getElementById('tipoCarga');
    const peso = document.getElementById('peso');
    const fecha = document.getElementById('fecha');

    // Resetear errores
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    // Validar origen
    if (origen.value === '') {
        document.getElementById('error-origen').textContent = 'Seleccione una provincia';
        valido = false;
    }

    // Validar destino
    if (destino.value === '') {
        document.getElementById('error-destino').textContent = 'Seleccione una provincia';
        valido = false;
    }

    // Validar origen y destino diferentes
    if (origen.value !== '' && destino.value !== '' && origen.value === destino.value) {
        document.getElementById('error-destino').textContent = 'El destino no puede ser igual al origen';
        valido = false;
    }

    // Validar tipo de carga
    if (tipoCarga.value === '') {
        document.getElementById('error-tipoCarga').textContent = 'Seleccione un tipo de carga';
        valido = false;
    }

    // Validar peso según tipo
    if (peso.value === '' || peso.value <= 0) {
        document.getElementById('error-peso').textContent = 'Ingrese un peso válido';
        valido = false;
    } else {
        const pesoNum = parseFloat(peso.value);
        
        if (tipoCarga.value === 'paquete' && pesoNum > 5) {
            document.getElementById('error-peso').textContent = 'Máximo 5kg para paquetes';
            valido = false;
        } else if (tipoCarga.value === 'caja' && pesoNum > 20) {
            document.getElementById('error-peso').textContent = 'Máximo 20kg para cajas';
            valido = false;
        } else if (tipoCarga.value === 'palet' && pesoNum > 500) {
            document.getElementById('error-peso').textContent = 'Máximo 500kg para palets';
            valido = false;
        }
    }

    // Validar fecha
    if (fecha.value === '') {
        document.getElementById('error-fecha').textContent = 'Seleccione una fecha';
        valido = false;
    } else {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaSelec = new Date(fecha.value);
        
        if (fechaSelec < hoy) {
            document.getElementById('error-fecha').textContent = 'No puede seleccionar fechas pasadas';
            valido = false;
        }
    }

    // Si todo es válido
    if (valido) {
        const resumen = `
            ✅ Reserva confirmada:
            --------------------------
            Origen: ${origen.value}
            Destino: ${destino.value}
            Tipo de carga: ${tipoCarga.value}
            Peso: ${peso.value} kg
            Fecha: ${fecha.value}
            --------------------------
            Gracias por su reserva!
        `;
        alert(resumen);
        this.reset();
    }
};