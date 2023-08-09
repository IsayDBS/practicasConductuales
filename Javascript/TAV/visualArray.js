var jsVisualArray = (function (jspsych){
    "use strict"

    const info = {
        name: 'Visual Array',
        parameters:{
            random:{
                type: jspsych.ParameterType.BOOL,// nos dice si el array se hara al azar
                default: true,
            },
            cuadros:{
                type: jspsych.ParameterType.INT,//cuantos cuadros a color tendrá el array
                default: -1,
            },
            arreglo:{
                type: jspsych.ParameterType.OBJECT, //0 no hay cambio de color, 1 rojo, 2 verde, 3 azul, 4 morado, 5 amarillo, 6 negro
                default: [
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ]
            }
        }
    }

    class VisualArray{

        constructor(jsPsych){
            this.jsPsych = jsPsych;
        }

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
                    /*
                    if(arreglo[i][j] == 0){//gris
                        arreglo[i][j] = `
                        <div class="parent">
                            <img src="img/grey.png" class="image2" />
                        </div>
                        `
                    }else if(arreglo[i][j] == 1){//rojo
                        if(i == posicion[0] && j == posicion[1]){
                            aux = 'red'
                        }
                        arreglo[i][j] = `
                        <div class="parent">
                            <img src="img/red.png" class="image2" />
                        </div>
                        `
                    }else if(arreglo[i][j] == 2){//verde
                        if(i == posicion[0] && j == posicion[1]){
                            aux = 'green'
                        }
                        arreglo[i][j] = `
                        <div class="parent">
                            <img src="img/green.png" class="image2" />
                        </div>
                        `
                    }else if(arreglo[i][j] == 3){//azul
                        if(i == posicion[0] && j == posicion[1]){
                            aux = 'blue'
                        }
                        arreglo[i][j] = `
                        <div class="parent">
                            <img src="img/blue.png" class="image2" />
                        </div>
                        `
                    }else if(arreglo[i][j] == 4){//morado
                        if(i == posicion[0] && j == posicion[1]){
                            aux = 'purple'
                        }
                        arreglo[i][j] = `
                        <div class="parent">
                            <img src="img/purple.png" class="image2" />
                        </div>
                        `
                    }else if(arreglo[i][j] == 5){//amarillo
                        if(i == posicion[0] && j == posicion[1]){
                            aux = 'yellow'
                        }
                        arreglo[i][j] = `
                        <div class="parent">
                            <img src="img/yellow.png" class="image2" />
                        </div>
                        `
                    }else if(arreglo[i][j] == 6){//negro
                        if(i == posicion[0] && j == posicion[1]){
                            aux = 'black'
                        }
                        arreglo[i][j] = `
                        <div class="parent">
                            <img src="img/black.png" class="image2" />
                        </div>
                        `
                    }
                    */
                }
            }
            return aux;
        }

        trial(display_element, trial){
            if(trial.cuadros == -1){
                trial.cuadros = Math.floor(Math.random()*12) + 4
            }
            //console.log(aux)
            var posColores = []


            if(trial.random){
                trial.arreglo = [
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ]
                while(trial.cuadros > 0){
                    console.log("Es random")
                    var row = Math.floor(Math.random()*4)
                    var col = Math.floor(Math.random()*4)
                    if(trial.arreglo[row][col] == 0){
                        posColores.push([row,col])
                        trial.arreglo[row][col] = Math.floor(Math.random() * 6) + 1
                        trial.cuadros--;
                    }
                }
            }else{
                console.log("No es random")
                for(var i = 0; i < trial.arreglo.length; i++){
                    for(var j = 0; j < trial.arreglo[i].length; j++){
                        if(trial.arreglo[i][j] != 0){
                            posColores.push([i,j])
                        }
                    }
                }
            }
            posColores = jsPsych.randomization.shuffle(posColores) //hace un shuffle al arreglo
            //posColores[0] es el cuadro que se va a cambiar de color
            var colorCirculo = this.coloresArreglo(trial.arreglo, posColores[0])//da la coordenada del que será circulado
            
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
                    arreglo: trial.arreglo,
                    color: colorCirculo,
                    posiciones: posColores,
                };
    
                this.jsPsych.finishTrial(trial_data);
            }, 900);//es 900
        }

        


    }

    VisualArray.info = info;

    return VisualArray

})(jsPsychModule)