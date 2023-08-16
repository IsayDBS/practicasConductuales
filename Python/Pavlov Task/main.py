from psychopy import visual, sound, core
from psychopy.hardware import keyboard
import os, csv, random

"""
Se pone el sonido seguido de una imagen,
esto por al menos 5 repeticiones,
despues, se ponen otras 5, donde el sonido
puede ser seguido o no por una imagen, en caso de que de
a una tecla cuando no haya imagen, se toma como falsa
"""

kb = keyboard.Keyboard()

win = visual.Window(fullscr=False, allowGUI=True, color='white')

message0 = visual.TextBox2(win, text="""Instrucciones: En este experimento oiras una campana seguido por una imagen de un circulo azul, cuando veas la imagen, presiona la tecla G, solo cuando veas la imagen.""", color='black')

message0.draw()

win.flip()

c = kb.waitKeys()

win.flip()

directory = os.getcwd()

#cierre programa
win.close()
core.quit()