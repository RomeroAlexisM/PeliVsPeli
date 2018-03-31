var conexion = require('../baseDeDatos/conexionDB.js');
var competenciaSeleccionada;

function buscarTodasLasCompetencias(req, res){
  var sql = "select * from competencia";
  conexion.query(sql, function(error, resultado, fields){
    if(error){
      console.log("Hubo un error en la consulta", error.message);
      return res.status(404).send("Hubo un error en la consulta");
    }
    res.send(JSON.stringify(resultado));
  });
}

function obtenerPeliculasAleatorias(req, res){
  var idCompetencia = req.params.id;
  var sql = "select pelicula.id, pelicula.poster, pelicula.titulo from pelicula order by rand() limit 2;";
  buscarCompentecia(idCompetencia);
  conexion.query(sql, function(error, resultado, fields){
    if(error){
      console.log("Hubo un error en la consulta", error.message);
      return res.status(404).send("Hubo un error en la consulta");
    }
    var response = {
      'peliculas': resultado,
      'competencia': competenciaSeleccionada
    }
    res.send(JSON.stringify(response));
  });
}

module.exports = {
    buscarTodasLasCompetencias: buscarTodasLasCompetencias,
    obtenerPeliculasAleatorias: obtenerPeliculasAleatorias
  }

function buscarCompentecia(id){
  var sql = "select nombre from competencia where id="+id;
  conexion.query(sql, function(error, resultado, fields){
    competenciaSeleccionada = resultado[0].nombre;
  });
}