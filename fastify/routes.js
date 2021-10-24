const routes = async (app, options) => {
  const client = app.db.client;

	app.get('/accounts', async (req, res) => {
		const { rows } = await client.query('SELECT * FROM accounts');
		res.code(200).send(rows);
	});
};

export default routes;
