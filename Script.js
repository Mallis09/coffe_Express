// Variable global para acumular el costo total de los productos
let totalCuenta = 0;

// Captura de elementos del DOM mediante sus IDs
const productoSelect = document.getElementById('producto-select');
const btnAgregar = document.getElementById('btn-agregar');
const listaCompras = document.getElementById('lista-compras');
const totalCuentaSpan = document.getElementById('total-cuenta');
const pagoInput = document.getElementById('pago-input');
const btnCalcularVueltas = document.getElementById('btn-calcular-vueltas');
const resultadoVueltas = document.getElementById('resultado-vueltas');
const btnLimpiar = document.getElementById('btn-limpiar');

// --- 1. EVENTO PARA AGREGAR UN PRODUCTO ---
btnAgregar.addEventListener('click', () => {
    // Obtenemos el texto limpio del producto (ej: "Chocorramo")
    const nombreProducto = productoSelect.options[productoSelect.selectedIndex].text.split(' - ')[0];
    // Convertimos el value a número entero (ej: 2500)
    const precioProducto = parseInt(productoSelect.value);

    // Si es el primer producto que agregamos, borramos el mensaje "No hay productos..."
    if (totalCuenta === 0) {
        listaCompras.innerHTML = '';
    }

    // Creamos una nueva etiqueta <div> para meter el producto a la lista visual
    const item = document.createElement('div');
    item.classList.add('item-carrito');
    item.innerHTML = `<span>${nombreProducto}</span> <span>+$${precioProducto.toLocaleString()}</span>`;
    
    // Lo inyectamos dentro de la caja de la lista
    listaCompras.appendChild(item);

    // Sumamos el valor al acumulador general
    totalCuenta += precioProducto;
    
    // Actualizamos el total en pantalla con formato de miles local
    totalCuentaSpan.textContent = totalCuenta.toLocaleString();
    
    // Desplazamos el scroll automáticamente hacia abajo si hay muchos elementos
    listaCompras.scrollTop = listaCompras.scrollHeight;
});

// --- 2. EVENTO PARA CALCULAR LAS VUELTAS (RESTA) ---
btnCalcularVueltas.addEventListener('click', () => {
    const dineroRecibido = parseInt(pagoInput.value);

    // Validación por si el input está vacío o ingresan números negativos
    if (isNaN(dineroRecibido) || dineroRecibido <= 0) {
        alert("Por favor, ingresa una cantidad válida de dinero con la que te pagan.");
        return;
    }

    // Si pagan con menos de lo que cuesta la cuenta
    if (dineroRecibido < totalCuenta) {
        resultadoVueltas.style.backgroundColor = '#fce4e4';
        resultadoVueltas.style.color = '#c0392b';
        resultadoVueltas.innerHTML = `⚠️ ¡Falta dinero! Te deben $${(totalCuenta - dineroRecibido).toLocaleString()}`;
        resultadoVueltas.style.display = 'block';
    } else {
        // Operación matemática para calcular el cambio
        const vueltas = dineroRecibido - totalCuenta;
        resultadoVueltas.style.backgroundColor = '#e8f8f0';
        resultadoVueltas.style.color = '#27ae60';
        resultadoVueltas.innerHTML = `💸 Vueltas a entregar:<br><strong>$${vueltas.toLocaleString()}</strong>`;
        resultadoVueltas.style.display = 'block';
    }
});

// --- 3. EVENTO PARA REINICIAR LA CALCULADORA ---
btnLimpiar.addEventListener('click', () => {
    totalCuenta = 0;
    totalCuentaSpan.textContent = '0';
    listaCompras.innerHTML = '<p class="sin-productos">No hay productos en la cuenta</p>';
    pagoInput.value = '';
    resultadoVueltas.style.display = 'none';
    productoSelect.selectedIndex = 0;
});