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



No deberías reemplazar el botón de cierre por un enlace, ya que eso rompería la consistencia. Un botón de SnackBar siempre debe ser para una acción relacionada con la notificación, como cerrarla o revertir una acción.

Para manejar un enlace, la forma correcta es usar el tercer argumento de open(), el cual acepta un enlace.

Manejo de Enlaces en el SnackBar
Para notificaciones promocionales, en lugar de usar el botón de acción para cerrar, debes usar un tercer argumento en el método open() que le pase el enlace directamente.

Así puedes mantener la acción de "cerrar" y, a la vez, ofrecer un enlace para que el usuario pueda ver la promoción.

Solución en el Servicio
Para hacerlo de manera genérica, modifica tu SnackBarService para que el método mostrarMensaje acepte un string para el enlace, de manera opcional.

TypeScript

    // src/app/lidertech-lib-central/services/snack-bar.service.ts
    import { Injectable, inject } from '@angular/core';
    import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
    
    @Injectable({
      providedIn: 'root',
    })
    export class SnackBarService {
      private readonly snackBar = inject(MatSnackBar);
    
      public mostrarMensaje(
        mensaje: string,
        tipo: 'exito' | 'error' | 'info' = 'info',
        config?: {
          duracion?: number;
          posicionHorizontal?: MatSnackBarHorizontalPosition;
          posicionVertical?: MatSnackBarVerticalPosition;
          enlace?: string;
        }
      ): void {
        const defaultConfig: MatSnackBarConfig = {
          duration: config?.duracion || 3000,
          panelClass: this.obtenerClasePorTipo(tipo),
          horizontalPosition: config?.posicionHorizontal || 'center',
          verticalPosition: config?.posicionVertical || 'bottom',
        };
    
        if (config?.enlace) {
          this.snackBar.open(mensaje, 'Ver promoción', defaultConfig);
        } else {
          this.snackBar.open(mensaje, 'Cerrar', defaultConfig);
        }
      }
    
      private obtenerClasePorTipo(tipo: 'exito' | 'error' | 'info'): string[] {
        switch (tipo) {
          case 'exito':
            return ['snackbar-exito'];
          case 'error':
            return ['snackbar-error'];
          case 'info':
            return ['snackbar-info'];
          default:
            return [''];
        }
      }
    }

    
## Ejemplo de Uso para promociones !!!
Con este enfoque, si pasas un enlace, el botón de acción cambiará a "Ver promoción" y cuando el usuario haga clic, la notificación se cerrará automáticamente, pero tú tendrías que manejar el evento de clic en tu componente, ya que el servicio solo se encargará de abrir el SnackBar.

TypeScript

    // En tu componente o clase
    this.snackBarService.mostrarMensaje(
      '¡Nueva oferta exclusiva para ti!',
      'info',
      {
        duracion: 8000,
        enlace: 'https://tusitio.com/promociones'
      }
    );
