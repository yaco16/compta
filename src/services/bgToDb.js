import getAllAccounts from './getAllAccounts';

export default async function convertCsvBgToInsertIntoDb(csv) {
  // const allAccounts = await getAllAccounts();
  // let data2 = [];
  // allAccounts.map((item, i) => data2.push(item.number));

  // for (let i = 0; i < csv.length; i++) {
  //   for (let j = 0; j < data2.length; j++) {
  //     if (+csv[i].data[0].slice(1) === data2[j]) {
  //       console.log(csv[i].data)
  //     } else {
  //       console.log('false');
  //     }
  //   }
  // }

  await csv.shift(); //supprime la 1re ligne (libellé)

  let dataQuery = [];
  await csv.forEach((item) => {
    if (item.data[0] !== '') {
      dataQuery.push([+item.data[0].slice(1), item.data[1], item.data[2]]);
    }
  });
  // console.log('dataQuery:', dataQuery);
  return dataQuery;
}
