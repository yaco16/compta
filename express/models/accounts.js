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

  static async uploadSalesJournal(csv) {
    await csv.shift(); // supprime la 1re ligne avec les libellés

    const cs = new pgp.helpers.ColumnSet(['journal', 'date', 'number', 'label', 'debit', 'lettering', 'credit'], { table: 'accounts' });

    let values = [];
    csv.forEach((item) => {
      if (item.data[3] !== '') {
        values.push({
          journal: item.data[0],
          date: item.data[3],
          number: item.data[4],
          label: item.data[5],
          debit: parseInt(item.data[7], 10),
          lettering: item.data[8],
          credit: parseInt(item.data[9], 10),
        });
      }
    });
    values.pop(); //supprimer la dernière ligne vide

    const query = pgp.helpers.insert(values, cs) + 'RETURNING *';

      try {
        const response = await db.tx('upload SalesJournal', async (t) => {
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

module.exports = Accounts;