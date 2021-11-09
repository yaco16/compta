function parseSurcoms(surcoms) {
  //array dont on va remplacer les valeurs
  let cutoffData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  surcoms.forEach((item) => {
    switch (JSON.stringify(item.date).substring(6, 8)) {//on ne garde que 09
      case '07':
        cutoffData[0] = item.total;
        break;
      case '08':
        cutoffData[1] = item.total;
        break;
      case '09':
        cutoffData[2] = item.total;
        break;
      case '10':
        cutoffData[3] = item.total;
        break;
      case '11':
        cutoffData[4] = item.total;
        break;
      case '12':
        cutoffData[5] = item.total;
        break;
      case '01':
        cutoffData[6] = item.total;
        break;
      case '02':
        cutoffData[7] = item.total;
        break;
      case '03':
        cutoffData[8] = item.total;
        break;
      case '04':
        cutoffData[9] = item.total;
        break;
      case '15':
        cutoffData[10] = item.total;
        break;
      case '16':
        cutoffData[11] = item.total;
        break;
      default:
        break;
    }
  });
  return cutoffData;
};

module.exports = {parseSurcoms}