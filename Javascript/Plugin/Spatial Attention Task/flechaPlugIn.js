/*
*Plugin que muestra una flecha apuntando en una dirección
*(arriba, abajo, derecha, izquierda) siendo estos representados
* en una lista por los espacios 0,1,2,3 respectivamente
*/
var jsFlecha = (function (jspsych){
    "use strict"

    const info = {
        name: 'Flecha',
        parameters:{
            direccion: { //posicion de la imagen
                type: ,
                default: ,
            }
        }
    }

    class Flecha{

        constructor(jsPsych){
            this.jsPsych = jsPsych;
        }

        trial(display_element, trial){

            let arrows =  ['↑','↓' ,'→',' ←'];

            
        }

    }

    Flecha.info = info;

    return Flecha;
    
})(jsPsychModule)