var jsVisualArray = (function (jspsych){
    "use strict"

    const info = {
        name: 'Visual Array',
        parameters:{
            random:{
                type: jspsych.ParameterType.BOOL,// nos dice si el array se hara al azar
                default: true,
            },
            arreglo:{
                type: jspsych.ParameterType.OBJECT, //0 no hay cambio de color, 1 rojo, 2 verde, 3 azul, 4 morado, 5 amarillo, 6 negro
                default: [
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ]
            },
            posicionDelCirculo:{
                type: jspsych.ParameterType.OBJECT,//lista con [renglon,columna] del que sera circulado
                default: []
            }
        }
    }

    class VisualArray{

        constructor(jsPsych){
            this.jsPsych = jsPsych;
        }

        /*
        * Funcion usada para cambiar el arreglo, de numeros a etiquetas de html
        * nos regresa el color de la celda que va a cambiar el color
        * que seria la primer posicion del arreglo
        */
        coloresArreglo(arreglo, posicion){
            var aux = 'color'
            var auxDiccionario = {
                0: 'grey',
                1: 'red',
                2: 'green',
                3: 'blue',
                4: 'purple',
                5: 'yellow',
                6: 'black',
            }
            for(var i = 0; i < arreglo.length; i++){
                for(var j = 0; j < arreglo[i].length; j++){
                    if(i == posicion[0] && j == posicion[1]){
                        aux = auxDiccionario[arreglo[i][j]]
                    }
                    arreglo[i][j] = `
                    <div class="parent">
                        <img src="img/grey.png" class="image1" />
                        <img src="img/${auxDiccionario[arreglo[i][j]]}.png" class="image2" />
                    </div>
                    `
                }
            }
            return aux;
        }

        trial(display_element, trial){
            //Lista donde guardaremos las posiciones de los recuadros pintados
            //de la forma [renglo, columna]
            var posColores = []

            var colorCirculo = 'color'

            if(trial.random){
                //Revisamos si nos dieron cuantos cuadros tendra, en caso de que no, le damos un valor
                //al azar entre 4 y 12
                var cuadros = Math.floor(Math.random()*12) + 4
                //Agregamos esto al arreglo, en caso de que pasen algo al arreglo
                trial.arreglo = [
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ]
                /*
                *Llena aleatoriamente el arreglo con numeros del 1 al 6
                * que representan colores de la siguiente manera
                * 0: 'grey',
                * 1: 'red',
                * 2: 'green',
                3: 'blue',
                4: 'purple',
                5: 'yellow',
                6: 'black',
                * Llenamos posColores con las posiciones de los colores
                * */
                while(cuadros > 0){
                    var row = Math.floor(Math.random()*4)
                    var col = Math.floor(Math.random()*4)
                    if(trial.arreglo[row][col] == 0){
                        posColores.push([row,col])
                        trial.arreglo[row][col] = Math.floor(Math.random() * 6) + 1
                        cuadros--;
                    }
                }
                /*
                * Hace un shuffle al arreglo
                * Dejandonos el que está en la posicion posColores[0] como el que podria cambiar de color
                */
                posColores = jsPsych.randomization.shuffle(posColores) 

                //Colorea nuestro arreglo, de numeros a html
                colorCirculo = this.coloresArreglo(trial.arreglo, posColores[0])
            }else{

                colorCirculo = this.coloresArreglo(trial.arreglo, trial.posicionDelCirculo)
                
                //Utilizamos la lista para simplificar codigo, solo utilizamos el primer elemento
                posColores.push(trial.posicionDelCirculo)
            }

            
            /*
            *Arreglo convertido en html
            */
            var html_content = `
            <table>
              <tr>
                <td>
                    ${trial.arreglo[0][0]}
                </td>
                <td>
                    ${trial.arreglo[0][1]}
                </td>
                <td>
                    ${trial.arreglo[0][2]}    
                </td>
                <td>
                    ${trial.arreglo[0][3]}
                </td>
              </tr>
              <tr>
                <td>
                    ${trial.arreglo[1][0]}
                </td>
                <td>
                    ${trial.arreglo[1][1]}
                </td>
                <td>
                    ${trial.arreglo[1][2]}    
                </td>
                <td>
                    ${trial.arreglo[1][3]}
                </td>
              </tr>
              <tr>
                <td>
                    ${trial.arreglo[2][0]}
                </td>
                <td>
                    ${trial.arreglo[2][1]}
                </td>
                <td>
                    ${trial.arreglo[2][2]}    
                </td>
                <td>
                    ${trial.arreglo[2][3]}
                </td>
              </tr>
              <tr>
                <td>
                    ${trial.arreglo[3][0]}
                </td>
                <td>
                    ${trial.arreglo[3][1]}
                </td>
                <td>
                    ${trial.arreglo[3][2]}    
                </td>
                <td>
                    ${trial.arreglo[3][3]}
                </td>
              </tr>
            </table>
            `
            display_element.innerHTML = html_content;

            this.jsPsych.pluginAPI.setTimeout(() =>{
                this.jsPsych.pluginAPI.clearAllTimeouts();
                display_element.innerHTML = "";
                var trial_data = {
                    rt: info.rt,
                    arreglo: trial.arreglo, //arreglo convertido en html
                    color: colorCirculo,    //Color de la posicion que sera circulada, es decir, posColores[0]
                    posicionCirculo: posColores[0], //primera posicion que es la que se va a circular
                };
    
                this.jsPsych.finishTrial(trial_data);
            }, 900);//es 900
        }
    }

    VisualArray.info = info;

    return VisualArray

})(jsPsychModule)