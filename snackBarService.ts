// src/app/lidertech-lib-central/services/snack-bar.service.ts
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private readonly snackBar = inject(MatSnackBar);

  public mostrarMensaje(mensaje: string, duracion: number = 3000): void {  this.snackBar.open  (mensaje, 'Cerrar', {  duration: duracion });  }
  public mostrarExito(mensaje: string):                            void { this.snackBar.open   (mensaje, 'Cerrar', {  duration: 3000, panelClass: ['snackbar-exito']  });  }
  public mostrarError(mensaje: string):                            void { this.snackBar.open   (mensaje, 'Cerrar', {  duration: 5000, panelClass: ['snackbar-error'] });
  }
}
