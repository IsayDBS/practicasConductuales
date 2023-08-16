from psychopy.hardware import keyboard
from psychopy import visual, core
import csv, os, random
"""
Se muestra la imagen, se pregunta al usuario cuanto tiempo estuvo presente la imagen
Cada ensayo empieza con la palabra atención durante un segundo seguido de un estímulo visual
y este puede estar en la esquina superior derecha, en el centro o en la esquina inferior izquierda.
Habra dos secciones, una donde le diga si el estimulo estuvo un corto timepo(600ms) y otro donde
le diga si estuvo un largo tiempo(1200ms). En la siguiente seccion, no se mencionará nada, solo se presentara
la pantalla roja, esperamos 5 segundos para que nos den la respuesta.
"""
win = visual.Window(fullscr=True, allowGUI=True, color='white')

kb = keyboard.Keyboard()

directory = os.getcwd()

message = visual.TextBox2(win, text="""A continuación se le presentará una tarea en la que usted tendrá que discriminar entre dos estímulos visuales de diferentes duraciones, si usted cree que el estímulo es de duración corta presione la tecla S, o si usted cree que el estímulo es de duración larga presione la tecla L.
                          Corta = S  Larga = L.
                          Presione la barra espaciadora para comenzar.""", color='black')
messageS = visual.TextBox2(win, text='El estimulo anterior fue de duración corta presiona S', color= 'black')
messageL = visual.TextBox2(win, text='El estímulo anterior fue de duración larga presiona L', color='black')
messageAtencion = visual.TextBox2(win, text='Atención', color='black')
pantallaTamanio = win.windowedSize
pantallaRoja = visual.Rect(win, width = pantallaTamanio[0], height = pantallaTamanio[1], color='darkred')
imagenAzul = visual.ImageStim(win, image=directory + '/img/blue.png',size=[0.2,0.2])

message.draw()

win.flip()

c = kb.waitKeys(keyList=['space'])

win.flip()

#cierre programa
win.close()
core.quit()