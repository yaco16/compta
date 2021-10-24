//Fichier de connexion à la DB
import pgPromise from 'pg-promise';

const pgp = pgPromise({
	noWarnings: true,
});

export const db = pgp(`${process.env.DB_URL}`);
