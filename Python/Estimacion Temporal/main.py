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

posiciones=[[0,0],[0.75,0.75],[0.75,-0.75],[-0.75,0.75],[-0.75,-0.75]]

tiemposPrueba = [0.35, 1.2,0.35, 1.2]
random.shuffle(tiemposPrueba)

tiempos = [0.35, 1.2]
respuestas = []

#Pruebas, primeras 4, 2 largas y 2 cortas
for i in range(4):
    random.shuffle(posiciones)
    messageAtencion.draw()
    win.flip()
    core.wait(1)
    imagenAzul.pos=posiciones[0]
    imagenAzul.draw()
    win.flip()
    core.wait(tiemposPrueba[i])
    pantallaRoja.draw()
    if tiemposPrueba[i] == 1.2:
        messageL.draw()
        win.flip()
        c = kb.waitKeys(keyList=['l'])
    else:
        messageS.draw()
        win.flip()
        c = kb.waitKeys(keyList=['s'])




message = visual.TextBox2(win, text="""Los ensayos anteriores eran de prueba, los siguientes son la prueba, presiona la barra espaciadora para continuar""", color='black')
message.draw()
win.flip()
c = kb.waitKeys(keyList=['space'])

kb.clock.reset()
#Pruebas, son 8, intercaladas y totalmente al azar en cuanto a tiempos
for i in range(4):
    random.shuffle(posiciones)
    random.shuffle(tiempos)
    messageAtencion.draw()
    win.flip()
    core.wait(1)
    imagenAzul.pos=posiciones[0]
    imagenAzul.draw()
    win.flip()
    core.wait(tiempos[0])
    pantallaRoja.draw()
    win.flip()
    c = kb.waitKeys(maxWait = 5)
    if c == None:
        if tiempos[0] == 1.2:    
            respuestas.append(['L','-',False, 5])
        else:
            respuestas.append(['S','-',False, 5])
        kb.clock.reset()
        continue
    if c[0].name == 'l' and tiempos[0] == 1.2:
        respuestas.append(['L',c[0].name, True ,c[0].rt])
    elif c[0].name == 'l' and tiempos[0] == 0.35:
        respuestas.append(['L',c[0].name, False ,c[0].rt])
    elif c[0].name == 's' and tiempos[0] == 1.2:
        respuestas.append(['L',c[0].name, False ,c[0].rt])
    elif c[0].name == 's' and tiempos[0] == 0.35:
        respuestas.append(['L',c[0].name, True ,c[0].rt])
    else:
        if tiempos[0] == 1.2:    
            respuestas.append(['L',c[0].name,False, c[0].rt])
        else:
            respuestas.append(['S',c[0].name,False, c[0].rt])
    kb.clock.reset()

with open('respuestas.csv','w',encoding='UTF8',newline='') as f:
    writer = csv.writer(f)

    writer.writerow(['Tecla a presionar','Tecla presionada','Acertó','Tiempo'])

    writer.writerows(respuestas)


#cierre programa
win.close()
core.quit()