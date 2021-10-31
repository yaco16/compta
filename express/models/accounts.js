const pgp = require('pg-promise')({
  capSQL: true,
});
const db = require('../lib/database');

class Accounts {
  static async getAllAccounts() {
    try {
      const rows = await db.any(`SELECT * FROM accounts`);
      return rows;

    } catch (error) {
      console.error(error);
      return 'error';
    }
  }

  static async uploadTb(csv) {
    try {
      await csv.shift(); // supprime la 1re ligne avec les libellés

      //conversion des datas au format de la query de pg-promise
      //créer les variables cs et values
      const cs = new pgp.helpers.ColumnSet(['number', 'label', 'total'], { table: 'accounts' });

      let values = [];
      await csv.forEach((item) => {
        if (item.data[0] !== '') {
          values.push({
            number: +item.data[0].slice(1),
            label: item.data[1],
            total: parseInt(item.data[2], 10), //on parse car le + devant ne permet pas de convertir en number des valeurs à zéro
          });
        }
      });

      const query = pgp.helpers.insert(values, cs) + 'RETURNING *';

      try {
        const response = await db.tx('upload TB', async (t) => {
          const deleteAccounts = await t.any('DELETE FROM accounts'); //on commence par effacer le contenu de la table
          const addAccounts = await t.any(query);
          return { deleteAccounts, addAccounts };
        });

        if (response.addAccounts.length > 0) {
          console.log('dans addaccounts');
          return response.addAccounts.length;
        } else {
          return 'error';
        }
      } catch (error) {
        console.log('upload failed');
        console.error(error);
        return 'error';
      }
    } catch (error) {
      console.error(error);
      return 'error';
    }
  }
}

module.exports = Accounts;