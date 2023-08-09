var jsPsych = initJsPsych();

var timeline = [];


var imagenes = ["img/blue.png", 
"img/white.png", 
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

timeline.push(preload)

var matrix0 = {
  type: jsVisualArray,
  cuadros: jsPsych.timelineVariable('numeroCuadros'),
  random: jsPsych.timelineVariable('random'),
  arreglo: jsPsych.timelineVariable('arreglo')
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
    return jsPsych.data.get().last(2).values()[0].posiciones[0]// no podemos acceder directamente a ellos, necesitamos una funcion
  },
  arreglo: function(){
    return jsPsych.data.get().last(2).values()[0].arreglo
  },
  cambioColor: jsPsych.timelineVariable('cambioColor'),
  colorPosicion: function(){
    return jsPsych.data.get().last(2).values()[0].color
  },
  color: jsPsych.timelineVariable('color')
}


var lista = [
  {
    numeroCuadros: 4,
    arreglo: [
      [1,0,0,1],
      [1,0,0,1],
      [1,0,0,1],
      [1,0,0,1]
    ],
    random: true,
    color: 'white',
    cambioColor: false,
  },
  {
    numeroCuadros: 6,
    arreglo: [
    ],
    random: true,
    color: 'white',
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