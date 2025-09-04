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
    }
  ): void {
    const defaultConfig: MatSnackBarConfig = {
      duration: config?.duracion || 3000,
      panelClass: this.obtenerClasePorTipo(tipo),
      horizontalPosition: config?.posicionHorizontal || 'center',
      verticalPosition: config?.posicionVertical || 'bottom',
    };
    
    this.snackBar.open(mensaje, 'Cerrar', defaultConfig);
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
