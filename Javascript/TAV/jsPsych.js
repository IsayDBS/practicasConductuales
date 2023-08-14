/*
* La prueba visual de arreglo (TAV) es un experimento, en el cual el usuario
* intenta percibir los cambios entre dos imagenes
*
*/
var jsPsych = initJsPsych({
  on_finish: function(){
      jsPsych.data.get().localSave('csv','informacion.csv');
  },
});

var timeline = [];


var imagenes = ["img/blue.png",  
"img/black.png", 
"img/yellow.png", 
"img/green.png", 
"img/red.png", 
"img/purple.png", 
"img/circle.png"]


var preload = {
  type: jsPsychPreload,
  images: imagenes,
};

/*
* Estructuras auxiliares
*/
//numeros utilizados para representar los colores
var auxDiccionario = {
  0: 'grey',
  1: 'red',
  2: 'green',
  3: 'blue',
  4: 'purple',
  5: 'yellow',
  6: 'black',
}

timeline.push(preload)

var bienvenida = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <p>En este experimento, apareceran distintos cuadros en la pantalla de diferentes colores,</p>
  <p>estos estarán presentes por .9 segundos, despues, aparecerá una cruz en medio, tras cual aparecerán de nuevo,</p>
  <p>el objetivo de esto, es apretar las teclas <strong>S</strong> si cambia el color del recuadro circulado</p>
  <p> o <strong>K</strong> en caso de que no haya cambios.</p>`
}

timeline.push(bienvenida)

var matrix0 = {
  type: jsVisualArray,
  random: jsPsych.timelineVariable('random'),
  arreglo: jsPsych.timelineVariable('arreglo'),
  posicionDelCirculo: jsPsych.timelineVariable('posicionDelCirculo'),
}

var fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function(){
    return '<div style="font-size:40px;">+</div>'
  },
  choices: "NO_KEYS",
  trial_duration: 1000,
  data: {
    task: 'fixation'
  }
}

var revision = {
  type: jsVisualArrayResponse,
  posicion: function(){
    return jsPsych.data.get().last(2).values()[0].posicionCirculo// no podemos acceder directamente a ellos, necesitamos una funcion
  },
  arreglo: function(){
    return jsPsych.data.get().last(2).values()[0].arreglo
  },
  cambioColor: jsPsych.timelineVariable('cambioColor'),
  colorPosicion: function(){
    return jsPsych.data.get().last(2).values()[0].color
  },
  color: function(){
    if(jsPsych.timelineVariable('color') === jsPsych.data.get().last(2).values()[0].color){//el color es el mismo, hacmeos un random
      return auxDiccionario[Math.floor(Math.random()*7) + 1]
    }else{// los colores no son iguales, seguimos normal
      return jsPsych.timelineVariable('color')
    } 
  }
}


var lista = [
  {
    arreglo: [
      [1,0,0,1],
      [4,1,1,4],
      [4,1,1,4],
      [1,0,0,1]
    ],
    random: false,
    color: 'red',
    cambioColor: true,
    posicionDelCirculo: [1,2]    
  },
  {
    arreglo: [
    ],
    random: true,
    color: 'black',
    cambioColor: false,
  }
]

var test_procedure = {
  timeline: [matrix0, fixation, revision],
  timeline_variables: lista,
  //repetitions: 2,
}

timeline.push(test_procedure)

jsPsych.run(timeline);