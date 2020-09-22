const Router = require('express-promise-router');
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://hzicobyhcabdlv:446e981a7c1e06944092216da867f12d5c756c5f026d9fae83f838759b2d3b86@ec2-34-234-185-150.compute-1.amazonaws.com:5432/dakqjc8irbmilk',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/consultatotalpacientes', async (req, res) => {
  //const { id } = req.params
  const { rows } = await client.query('SELECT * FROM pacientes');
  res.send(rows);
});

router.post('/insertarpacientes', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  await client.query(
    `INSERT INTO pacientes(nombre, apellido, numid) VALUES('${nombre}','${apellido}','${numid}')`
  );
  res.send('INSERTADO');
});

router.delete('/borrarpaciente', async (req, res) => {
  const id = parseInt(req.params.id);
  await client.query('DELETE FROM pacientes where id = $1', [
      id
  ]);
  res.send(`Paciente ${id} eliminado satisfactoriamente`);
});

router.update('/actualizapaciente', async (req, res) => {
  //const id = parseInt(req.params.id);
  const { nombre, apellido, numid } = req.body;

  await client.query('UPDATE pacientes SET nombre = $1, apellido = $2 numid = $3', [
      nombre,
      apellido,
      numid
  ]);
  res.send('Paciente actualizado satisfactoriamente');
});