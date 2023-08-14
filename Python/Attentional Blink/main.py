from psychopy import visual, core, event
from psychopy.hardware import keyboard
import os , csv
import random

"""
Se muestran 4 imagenes de L por 350 ms, al final de cada impresión de imágenes, puedes
o no ver la letra L, si la ves, presiona g, en caso contrario, que sea h
"""

def dibujaCajas(imagenes):
    for i in imagenes:
        i.draw()

kb = keyboard.Keyboard()

win = visual.Window(size=(800,600), fullscr=True, allowGUI=True, color='black')

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

#Posiciones usadas para presentar las imagenes
posiciones = [[-0.75,0],[0.75,0],[0,-0.75],[0,0.75]]

letras = [imagenL0, imagenL1, imagenL2, imagenL3]

cajas = [imagenCaja0, imagenCaja1, imagenCaja2, imagenCaja3]

seEncuentra = False
acerto = False

respuestas = []
#Repetimos el experimento 5 veces
for i in range(5):
    dibujaCajas(cajas)
    win.flip()
    letrasEnCajas = random.choices(letras, k=4)
    random.shuffle(posiciones)
    #Numero de L's que van a aparecer
    apariciones = random.randint(0,3)
    dibujaCajas(cajas) 
    for j in range(apariciones + 1):
        letrasEnCajas[j].pos = posiciones[j]
        if letrasEnCajas[j] == imagenL3:
            seEncuentra = True
        letrasEnCajas[j].draw()
    win.flip()
    core.wait(.35)
    dibujaCajas(cajas)
    win.flip()
    c = kb.waitKeys(keyList=['g','h'])
    if c[0].name == 'g' and seEncuentra == True:
        imagenCorrecto.draw()
        acerto = True
        win.flip()
        core.wait(1)
    elif c[0].name == 'g' and seEncuentra == False:
        imagenIncorrecto.draw()
        acerto = False
        win.flip()
        core.wait(1)
    elif c[0].name == 'h' and seEncuentra == False:
        imagenCorrecto.draw()
        acerto = True
        win.flip()
        core.wait(1)
    elif c[0].name == 'h' and seEncuentra == True:
        imagenIncorrecto.draw()
        acerto = False
        win.flip()
        core.wait(1)
    respuestas.append([seEncuentra, acerto])
    seEncuentra = False


with open('respuestas.csv','w',encoding='UTF8',newline='') as f:
    writer = csv.writer(f)

    writer.writerow(['Se encuntra la L','Acertó el usuario'])

    writer.writerows(respuestas)
#cierre programa
win.close()
core.quit()