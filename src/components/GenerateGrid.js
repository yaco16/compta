export default function GenerateGrid(data) {
  console.log('data:', data);
  return (
    <>
      <table>
        <thead>
          <tr>
            {data.data[0].data.map(
              (
                item,
                i //formule pour n'afficher que la 1re ligne avec les en-têtes
              ) => (
                <th key={i}>{item}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {data.data.slice(1).map(
            (
              item,
              i //on slice = on supprime la 1re ligne pour éviter qu'elle soit en doublon avec les en-têtes
            ) => (
              <tr key={i}>
                {item.data.map((item2, i2) => (
                  <td key={i2}>{item2}</td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
      <style jsx>{`
        table {
          font-family: 'Arial';
          font-size: 0.8em;
          margin: 1rem auto;
          border-collapse: collapse;
          border: 1px solid #eee;
          border-bottom: 2px solid #00cccc;
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.05), 0px 20px 20px rgba(0, 0, 0, 0.05),
            0px 30px 20px rgba(0, 0, 0, 0.05);
        }

        th,
        td {
          color: #999;
          border: 1px solid #eee;
          padding: 0.3em;
          border-collapse: collapse;
        }

        th {
          background: #00cccc;
          color: #fff;
          text-transform: uppercase;
          font-size: 1.2em;
          font-weight: bold;
          text-align: center !important;
        }

        td {
          border: 1px solid #eee;
          padding: 1em;
          text-align: center;
        }

        tr:nth-last-child(-n + 2) {
          // sélection des 2 dernières lignes
          font-weight: bold;
        }

        :nth-last-child(-n + 2) {
          //sélection des 2 dernières colonnes
          text-align: right;
        }

        :nth-last-child(3) {
          //sélection de l'avant-avant dernière colonne
          text-align: left;
        }

        tr:hover {
          background: #f4f4f4;
        }
      `}</style>
    </>
  );
}
