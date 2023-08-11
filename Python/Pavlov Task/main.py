from psychopy import visual, sound, core, event
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

win = visual.Window(size=(800,600), fullscr=False, allowGUI=True, color='white')

message0 = visual.TextBox2(win, text="""Instrucciones: En este experimento oiras una campana seguido por una imagen de un circulo azul, cuando veas la imagen, presiona la tecla G, solo cuando veas la imagen.""", color='black')

message0.draw()

win.flip()

c = kb.waitKeys()

win.flip()

directory = os.getcwd()

sonido = sound.Sound(directory + '/multimedia/bell-ring-01.wav')
imagen = visual.ImageStim(win, image=directory + '/multimedia/blue.png')

num_trials = 5

respuestas = []

kb.clock.reset()
#Primeras 5 iteraciones
for trial in range(num_trials):
    kb.clearEvents()

    sonido.play()              #Reproduce el sonido
    core.wait(sonido.getDuration())#Espera la duración del sonido
    sonido.stop()              #Es necesario detener el sonido

    imagen.draw()
    win.flip()
    #c = event.waitKeys(timeStamped=timer)
    c = kb.waitKeys()
    respuestas.append([c[0].name, c[0].rt])

    win.flip()      #limpia pantalla

    print(respuestas)

    kb.clock.reset()    #Reinicia reloj

#Siguientes 5 iteraciones
for trial in range(num_trials):
    kb.clearEvents()

    sonido.play()              #Reproduce el sonido
    core.wait(sonido.getDuration())#Espera la duración del sonido
    sonido.stop()              #Es necesario detener el sonido

    #core.wait(random.choice([1, 0.5, 5, 2, 3.5])) #Esperamos un momento indeterminado entre el sonido y la imagen
    #core.wait()

    turno = None #Utilizaremos turno para ver si ponemos una imagen o no, Si es True, imprime la imagen
    #En caso de no, espera 5 segundos y no imprime nada
    #print(turno)

    print(random.randint(1,5))

    if random.randint(1,5) == 1:#En este caso no imprime nada, solo reproduce sonido
        turno = False
    else:#Reproduce sonido
        turno = True
    print(turno)

    if turno == True:#Se imprime la imagen
        imagen.draw()
        win.flip()
        c = kb.waitKeys()
        respuestas.append([c[0].name, c[0].rt])    
    else:#Se espera 5 segundos, checamos si se presiona alguna tecla
        win.flip()
        c = kb.waitKeys(maxWait=5)
        if c == None:
            respuestas.append(['-','5'])
        else:
            respuestas.append([c[0].name,c[0].rt])
    
    

    win.flip()      #limpia pantalla

    kb.clock.reset()    #Reinicia reloj



with open('respuestas.csv','w',encoding='UTF8',newline='') as f:
    writer = csv.writer(f)

    writer.writerow(['tecla presionada','tiempo'])

    writer.writerows(respuestas)

#cierre programa
win.close()
core.quit()