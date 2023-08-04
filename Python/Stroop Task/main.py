from psychopy import core, visual, event
from psychopy.hardware import keyboard
import random
import csv

kb = keyboard.Keyboard()

#red, green, yellow, blue
colorList = ["RED","GREEN","YELLOW","BLUE","RED","GREEN","YELLOW","BLUE","RED","GREEN","YELLOW","BLUE","RED","GREEN","YELLOW","BLUE"]
random.shuffle(colorList)

colorWords = ["red","green","yellow","blue"]

#Ventana
win = visual.Window([400,300], monitor="testMonitor", fullscr=True)

message0 = visual.TextBox2(win, text="""Instrucciones: En este experimento aparecerán palabras, estas estarán en un color, tendrás que escribir el color de la palabra, siendo 
                           rojo = r
                           verde = g
                           azul = b
                           amarillo = y""")

message0.draw()

win.flip()

c = kb.waitKeys()

respuestas = []


for i in colorList:
    kb.clock.reset()
    palabra = i
    colorPalabra = colorWords[random.randint(0,3)]
    messagePrueba = visual.TextBox2(win, text=palabra, color=colorPalabra, alignment='center')
    messagePrueba.draw()
    win.flip()
    c = kb.waitKeys()
    #c[0].insert(0,colorPalabra)
    #print(c)
    respuestas.append([colorPalabra, c[0].name, c[0].rt])

#print(respuestas)

with open('respuestas.csv','w',encoding='UTF8',newline='') as f:
    writer = csv.writer(f)

    writer.writerow(['respuesta_correcta','respuesta','tiempo'])

    writer.writerows(respuestas)


#cierre programa
win.close()
core.quit()