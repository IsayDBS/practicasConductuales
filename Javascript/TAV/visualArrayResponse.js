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
                type: jspsych.ParameterType.OBJECT, //posicion que se cambai de color
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
                default: "img/grey.png",
            }
        }
    }

    class VisualArrayResponse{

        constructor(jsPsych){
            this.jsPsych = jsPsych;
        }

        circuloPosicionCambioColor(arreglo, posicion, color){
            arreglo[posicion[0]][posicion[1]] = `
            <div class="parent">
                <img src="img/circle.png" class="image1" />
                <img src="img/${color}.png" class="image2" />
            </div>
            `
        }

        circuloPosicionSinCambioColor(arreglo, posicion, color){
            arreglo[posicion[0]][posicion[1]] = `
            <div class="parent">
                <img src="img/circle.png" class="image1" />
                <img src="img/${color}.png" class="image2" />
            </div>
            `
        }

        trial(display_element, trial){
            const array = trial.arreglo

            if(trial.cambioColor == true){
                this.circuloPosicionCambioColor(array, trial.posicion, trial.color)
            }else{
                this.circuloPosicionSinCambioColor(array, trial.posicion, trial.colorPosicion)
            }

            var html_content = `
            <table>
              <tr>
                <td>
                    ${array[0][0]}
                </td>
                <td>
                    ${array[0][1]}
                </td>
                <td>
                    ${array[0][2]}    
                </td>
                <td>
                    ${array[0][3]}
                </td>
              </tr>
              <tr>
                <td>
                    ${array[1][0]}
                </td>
                <td>
                    ${array[1][1]}
                </td>
                <td>
                    ${array[1][2]}    
                </td>
                <td>
                    ${array[1][3]}
                </td>
              </tr>
              <tr>
                <td>
                    ${array[2][0]}
                </td>
                <td>
                    ${array[2][1]}
                </td>
                <td>
                    ${array[2][2]}    
                </td>
                <td>
                    ${array[2][3]}
                </td>
              </tr>
              <tr>
                <td>
                    ${array[3][0]}
                </td>
                <td>
                    ${array[3][1]}
                </td>
                <td>
                    ${array[3][2]}    
                </td>
                <td>
                    ${array[3][3]}
                </td>
              </tr>
            </table>
            `
            display_element.innerHTML = html_content;

            const after_key_response = (info) => {
                //Esconde imagen
                display_element.innerHTML = '';
            
                // informacion que se va a guardar
                let data = {
                  rt: info.rt,
                }
            
                // end the trial
                this.jsPsych.finishTrial(data);
              }
            

            this.jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: after_key_response,
                valid_responses: ['s','k'],
                persist: false,});
        }
    }

    VisualArrayResponse.info = info;

    return VisualArrayResponse

})(jsPsychModule)