# snackBarService
Servicio para manejar las notificaciones en componentes de lidertech.

## RECORDAR QUE SE DEBE ESTILIZAR EL SNACKBAR EN EL TEMA FINAL QUE ELIJAMOS ###

    .snackbar-exito {
      background-color: #4CAF50; /* Verde */
      color: white;
    }
    
    .snackbar-error {
      background-color: #f44336; /* Rojo */
      color: white;
    }
    .snackbar-notifications {
      background-color: #2196F3; /* Azul */
      color: white;
    }




## Informe de uso: SnackBarService
El SnackBarService es una herramienta genérica que te permite mostrar notificaciones a los usuarios de manera consistente en todas tus aplicaciones Lidertech. Este servicio centraliza la lógica de los mensajes, sus estilos y su posición, simplificando su uso en cualquier componente.

# Métodos del Servicio
El servicio contiene un único método público, mostrarMensaje, que se encarga de todo.

* mostrarMensaje(mensaje: string, tipo?: string, config?: object): void

Este es el método principal. Acepta los siguientes parámetros:
mensaje: La única propiedad requerida. Es la cadena de texto que se mostrará en la notificación.

* tipo: (Opcional) Define el estilo visual del SnackBar. Los valores aceptados son:

* 'exito' (Verde)

* 'error' (Rojo)

* 'info' (Azul, predeterminado si no se especifica)

* config: (Opcional) Un objeto para personalizar la posición y la duración. Acepta las siguientes propiedades:

* duracion: El tiempo en milisegundos que el mensaje permanecerá visible.

* posicionHorizontal: La posición horizontal ('start', 'center', 'end').

* posicionVertical: La posición vertical ('top', 'bottom').

# Ejemplos de Uso
A continuación, se presentan varios ejemplos de cómo usar el servicio en diferentes escenarios para que puedas ver cómo se aplican los parámetros.

# Ejemplo 1: Mensaje de Éxito Básico
Este es el uso más común. Simplemente pasas el mensaje y el tipo de notificación.

TypeScript

        // Mensaje de éxito simple con la configuración predeterminada
        this.snackBarService.mostrarMensaje('¡Datos guardados exitosamente!', 'exito');

        
# Ejemplo 2: Mensaje de Error Personalizado
 Aquí se muestra cómo personalizar la duración de la notificación para que el usuario tenga más tiempo para leer el error.
        
        TypeScript
        
        // Mensaje de error con una duración personalizada
        this.snackBarService.mostrarMensaje('Error al procesar la solicitud.', 'error', {
          duracion: 5000
        });
        
# Ejemplo 3: Notificación Informativa con Posición Personalizada
En este ejemplo, el SnackBar se ubicará en la parte superior-derecha (top-end) de la pantalla.

TypeScript

    // Mensaje informativo con posición personalizada
    this.snackBarService.mostrarMensaje('El servidor está en mantenimiento.', 'info', {
      posicionVertical: 'top',
      posicionHorizontal: 'end'
    });

# Ejemplo 4: Combinación de Parámetros
Puedes combinar todos los parámetros opcionales para una personalización completa.

TypeScript

    // Combinación de duración, tipo y posición
    this.snackBarService.mostrarMensaje('¡Cuidado, tu vida está en peligro!', 'error', {
      duracion: 8000,
      posicionVertical: 'bottom',
      posicionHorizontal: 'center'
    });
