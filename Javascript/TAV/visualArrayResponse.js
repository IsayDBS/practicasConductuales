/*
*Plugin jsVisualArrayResponse, el cual hace una colección de cuadrados de colores con una posición circulada
*Parámetros:
*           -arreglo: un arreglo de 4*4, cada elemento es un string en html.
*           -cambioColor: valor booleano, true si hay cambio de color, false si no hay cambio
*           -posicion: la posicion dentro del arreglo que sera circulada en forma de lista con dos elementos [renglon, columna]
*           -colorPosicion: color actual de la celda a circular
*           -color: color al que se va a cambiar la celda circulada
*Salida:
*           -rt: tiempo de respuesta
*           -cambioDeColor: booleano si nos dice si cambia el color, true para si, false para no
*           -correcto: booleano si nos dice si el participante presiono la tecla correcta, true para si, false para no
*           -colorCeldaAntesDePrueba: color antes de circular el cuadrado
*           -colorCeldaDespuesDePrueba: color despues de circular el cuadrado
*           -posicionCelda: posicion del cuadrado circulado, en forma de lista de dos elementos [renglon, columna]
*           -arreglo: arreglo despues de circular el cuadrado
*
*/
var jsVisualArrayResponse = (function (jspsych){
    "use strict"

    const info = {
        name: 'Visual Array Response',
        parameters:{
            arreglo:{
                type: jspsych.ParameterType.OBJECT, //arreglo de 4*4
                default: undefined
            },
            posicion:{
                type: jspsych.ParameterType.OBJECT, //posicion que se cambia de color [renglon, columna]
                default: undefined,
            },
            cambioColor:{
                type: jspsych.ParameterType.BOOL, //nos avisa si se va a cambiar el color o no
                default: undefined,
            },
            colorPosicion:{
                type: jspsych.ParameterType.STRING,//color actual de la celda
                default: undefined
            },
            color:{
                type:jspsych.ParameterType.STRING, //color a cambiar de la posicion del circulo
                default: undefined,
            }
        }
    }

    class VisualArrayResponse{

        constructor(jsPsych){
            this.jsPsych = jsPsych;
        }

        /*
        * Funcion que agrega el circulo
        */
        circuloPosicion(arreglo, posicion, color){
            arreglo[posicion[0]][posicion[1]] = `
            <div class="parent">
                <img src="img/circle.png" class="image1" />
                <img src="img/${color}.png" class="image2" />
            </div>
            `
        }

        trial(display_element, trial){
            
        }
    }

    VisualArrayResponse.info = info;

    return VisualArrayResponse

})(jsPsychModule)