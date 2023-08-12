

var jsPsych = initJsPsych({
    on_finish: function(){
        jsPsych.data.get().localSave('csv','informacion.csv');
    },
});

var timeline = [];

var preload = {
    type: jsPsychPreload,
    images: ['img/circulo.png'],
    auto_preload: true,
}

var flecha = {
    type: jsFlecha,
}

var imagen = {
    type: jsImagen,
    posicion: jsPsych.timelineVariable('posicion'),
    imagen: jsPsych.timelineVariable('imagen'),
  }

var lista = [
    {
        posicion: 'top',
        imagen: 'img/circulo.png',
    },
    {
        posicion: 'bottom',
        imagen: 'img/circulo.png',
    },
    {
        posicion: 'top',
        imagen: 'img/circulo.png',
    },
    {
        posicion: 'left',
        imagen: 'img/circulo.png',
    },
    {
        posicion: 'right',
        imagen: 'img/circulo.png',
    },]
  
var procedure = {
    timeline: [flecha, imagen],
    timeline_variables: lista,
}

console.log(jsPsych.data.get().last());

timeline.push(procedure);

jsPsych.run(timeline);