const pgp = require('pg-promise')({
  capSQL: true,
});
const db = require('../lib/database');

class Accounts {

  static selectJournal(journal) {
    switch(journal) {
      case 'sales-journal':
        return 'VE';
      case 'purchases-journal':
        return 'AC';
      case 'OD-journal':
        return 'OD';
      case 'overhead-costs-journal':
        return 'FG';
      default:
        return;

    }
  }

    static async getAccounts(firstAccount, secondAccount, beginningDate, endDate) {
    try {
      // const rows = await db.any(`SELECT * FROM accounts`); //à réécrire avec les paramètres ci-dessus
      return rows;
    } catch (error) {
      console.error(error);
      return 'error';
    }
  }

  static async uploadTrialBalance(csv) {
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

  static async uploadJournal({csv, fileType, fiscal_year}) {
    await csv.shift(); // supprime la 1re ligne avec les libellés

    const cs = new pgp.helpers.ColumnSet(['journal', 'date', 'number', 'label', 'debit', 'lettering', 'credit'], { table: 'accounts' });

    //comme il est impossible d'effectuer les méthodes propres aux strings sur le tableau suivant, on crée un fichier temporaire
    let tempValues = [];
    csv.forEach((item) => {
      if (item.data[3] !== '') {
        tempValues.push({
          journal: item.data[0],
          date: item.data[3],
          number: item.data[4],
          label: item.data[5],
          debit: item.data[7],
          lettering: item.data[8],
          credit: item.data[9],
        });
      }
    });
    tempValues.pop(); //supprimer la dernière ligne vide

    //copie du fichier temp dans un nouveau fichier dans lequle on va déverser les données mises à jour
    let values = [...tempValues];

    //on ne modifie que les données nécessaires
    values.forEach((item) => {
      item.date = item.date.split('/').reverse().join('/').toString(); //conversion en format étranger pour respecter la contrainte Date
      item.debit = parseFloat(item.debit.replace(',', '.')); //125,13 => 125.13
      item.credit = parseFloat(item.credit.replace(',', '.')); //idem
      item.lettering.startsWith(' ')? item.lettering = item.lettering.replace(' ', '') : item.lettering = item.lettering; //suppression de l' espace en début de lettrage
      item.label.startsWith(' ')? item.label = item.label.replace('  ', '') : item.label = item.label;//suppression des 2 espaces en début de ligne
      item.label.startsWith('A ')? item.label = item.label.replace('A ', '') : item.label = item.label;//suppression de 'A ' en début de ligne
    });

    //on récupère le nom du journal pour MAJ uniquement la table concernée
    const journal = this.selectJournal(fileType);

    //on parse la date 2021-2022
    const year1 = fiscal_year.substring(0, 4); //2021 => 21
    const year2 = fiscal_year.substring(5, 9);


    const query = pgp.helpers.insert(values, cs) + 'RETURNING *';

    //utilisation de tx si multirequêtes qui modifient les données
    try {
      const response = await db.tx('upload journal', async (t) => {
        const deleteAccounts = await t.any(`DELETE FROM accounts WHERE journal = $1 AND date BETWEEN $2'/07/01' AND $3'/06/30'`, [journal, year1, year2]); //on commence par effacer le contenu de la table
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
  }
  catch(error) {
    console.error(error);
    return 'error';
  }
}

module.exports = Accounts;
