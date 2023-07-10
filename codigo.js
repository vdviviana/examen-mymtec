let personas =[{nombre:"Carla", 
jornadaLaboral:{inicio:"0900",fin:"1800"}, 
actividades:[{inicio:"0900", fin:"1130"}, 
 {inicio:"1300", fin:"1400"}, 
 {inicio:"1500", fin:"1540"}] 
}, 
{nombre:"José", 
jornadaLaboral:{inicio:"0830",fin:"1730"}, 
actividades:[{inicio:"1200", fin:"1400"}, 
 {inicio:"1645", fin:"1730"}] 
}, 
{nombre:"Maria", 
jornadaLaboral:{inicio:"1000",fin:"1700"}, 
actividades:[{inicio:"1000", fin:"1100"}, 
 {inicio:"1530", fin:"1600"}] 
}] 

//crae un variable para guardar codigo html
let innerHTMLCode =``;

innerHTMLCode =`
<div>
<h1>Arreglo personas</h1>
</div>
`;

//** RECORRO ARREGLO */
//for recorre personas
for(persona in personas){
    let items = personas[persona];
    let nombre = items["nombre"];
    let jornadaLaboral_inicio= items["jornadaLaboral"].inicio;
    let jornadaLaboral_fin= items["jornadaLaboral"].fin;
    let actividades = items["actividades"];

    innerHTMLCode +=`
    <div class="item-nombre" ><b>${nombre}</b></div>
    <div class="item-jornadaLaboral" >
    <table>
    <tr><td>Jornada Laboral</td></tr>
    <tr><td>Inicio</td><td>Fin</td></tr>
    <tr><td>${jornadaLaboral_inicio}</td><td>${jornadaLaboral_fin}</td></tr>
    </table>
    </div>
    `;

    innerHTMLCode +=`
    <div class="item-actividad-confirmada" >
    <table>
    <tr><td>Actividad confirmada</td></tr>
    <tr><td>Inicio</td><td>Fin</td></tr>
    `;


    //for recorre actividades 
    for(actividad in actividades){
        let items_actividad = actividades[actividad];
        let actividad_inicio = items_actividad.inicio;
        let actividad_fin = items_actividad.fin;

        //imprimo en pantalla las actividades confirmadas de cada uno
        innerHTMLCode +=`
        <tr><td>${actividad_inicio}</td><td>${actividad_fin}</td></tr>
        `;
    }
    //termina for actividades
    innerHTMLCode += `
    </table>
    </div>
    `;

}
//termina for personas

document.querySelector(".contenedor-js").innerHTML = innerHTMLCode;

//** FUNCION PRINCIPAL*/
function devolverHorariosPosibles(personas, duracion){
  let arreglo = [];
//for recorre personas
for(persona in personas){
  
    let items = personas[persona];
    let nombre = items["nombre"];
    let jornadaLaboral_inicio= items["jornadaLaboral"].inicio;
    let jornadaLaboral_fin= items["jornadaLaboral"].fin;
    let actividades = items["actividades"];

    let actividad_fin =""; //declaro variable antes del for porque necesito usarla desps
    //for recorre actividades 
    for(actividad in actividades){
        let items_actividad = actividades[actividad];
        let actividad_inicio = items_actividad.inicio;
        actividad_fin = items_actividad.fin;

        //condicional if
        if(jornadaLaboral_inicio < actividad_inicio){
            let diferencia = minDif(jornadaLaboral_inicio,actividad_inicio);

            //condicional if duracion
            if(diferencia > duracion){
                const disponibilidad ={
                    desde: jornadaLaboral_inicio,
                    hasta: actividad_inicio,
                };
                const nombre_persona={
                    nombre: nombre,
                    disponibilidad: disponibilidad
                };
                //sumo al arreglo con un push
                arreglo.push(nombre_persona);
            }
        }
        jornadaLaboral_inicio = actividad_fin;
    }
    //termina for actividades

    //condicional if
    if(jornadaLaboral_fin > actividad_fin){
        let diferencia = minDif(jornadaLaboral_fin,actividad_fin);

        //condicional if duracion
        if(diferencia > duracion){
            const disponibilidad ={
                desde: jornadaLaboral_fin,
                hasta: actividad_fin,
            };
            const nombre_persona={
                nombre: nombre,
                disponibilidad: disponibilidad
            };
            //sumo al arreglo con un push
            arreglo.push(nombre_persona);
        }
    }
}
//termina for personas

//imprimir respuesta arreglo en consola
console.log(arreglo);

}
//** TERMINA FUNCION PRINCIPAL */

//** EVENTO CLICK QUE LLAMA A FUNCION PRINCIPAL */
const boton = document.querySelector(".btn-nueva-actividad");
boton.addEventListener("click",()=>{
    let duracion = prompt("Ingrese duración en minutos de la nueva reunión");
    devolverHorariosPosibles(personas, duracion);
})
//** TERMINA EVENTO CLICK */


//funcion tansforma hora en minutos (recibe parametro de tipo hhmm)
function getMinutos(strHora){
let h = strHora.substr(0,2);
let m = strHora.substr(2,4);

//convierto la hora en mimutos
let hora_a_minutos = parseInt(h) * 60;

//obtengo el total de mimutos
let total_minutos = parseInt(hora_a_minutos) + parseInt(m);
return total_minutos;

}

//obtengo min diferencia en minutos
function minDif(strInicio,strFin){
    let minutos_strInicio = getMinutos(strInicio);
    let minutos_strFin = getMinutos(strFin);

    //realizo la resta para obtener la diferencia entre inicio y fin
    let diferencia = parseInt(minutos_strFin) - parseInt(minutos_strInicio)
    return diferencia;
}