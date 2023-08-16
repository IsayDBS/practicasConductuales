from psychopy import visual, core, event
from psychopy.hardware import keyboard
import os , csv
import random

"""
Se muestran 4 imagenes de L por 350 ms, al final de cada impresión de imágenes, puedes
o no ver la letra L, si la ves, presiona g, en caso contrario, que sea h
"""

kb = keyboard.Keyboard()

win = visual.Window(fullscr=True, allowGUI=True, color='black')

message0 = visual.TextBox2(win, text="""Se mostrarán varias imagenes de la letra L, el objetivo es decir si se vió la imagen L con la orientación correcta, es decir, la del abecedario, presionaras la tecla G, en caso contrario, presiona la H. Presiona cualquier tecla para iniciar""", color='white')

message0.draw()

win.flip()

c = kb.waitKeys()

win.flip()

directory = os.getcwd()

#Imagenes usadas
imagenL0 = visual.ImageStim(win, image=directory + '/multimedia/n1.png', size=[0.2,0.2])
imagenL1 = visual.ImageStim(win, image=directory + '/multimedia/n2.png', size=[0.2,0.2])
imagenL2 = visual.ImageStim(win, image=directory + '/multimedia/n3.png', size=[0.2,0.2])
imagenL3 = visual.ImageStim(win, image=directory + '/multimedia/t1.png', size=[0.2,0.2])#L es correcta
imagenCaja0 = visual.ImageStim(win, image=directory + '/multimedia/box.png', size =[0.4,0.4], pos=[0.75, 0])
imagenCaja1 = visual.ImageStim(win, image=directory + '/multimedia/box.png', size =[0.4,0.4], pos=[-0.75, 0])
imagenCaja2 = visual.ImageStim(win, image=directory + '/multimedia/box.png', size =[0.4,0.4], pos=[0, -0.75])
imagenCaja3 = visual.ImageStim(win, image=directory + '/multimedia/box.png', size =[0.4,0.4], pos=[0, 0.75])
imagenCorrecto = visual.ImageStim(win, image=directory + '/multimedia/correct.png', size=[0.2,0.2])
imagenIncorrecto = visual.ImageStim(win, image=directory + '/multimedia/error.png', size=[0.2,0.2])

#cierre programa
win.close()
core.quit()