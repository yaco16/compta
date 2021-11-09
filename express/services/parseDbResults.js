function parseSurcoms(surcoms) {
  //array dont on va remplacer les valeurs
  let surcomsData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  surcoms.forEach((item) => {
    switch (
      JSON.stringify(item.date).substring(6, 8) //on ne garde que 09
    ) {
      case '07':
        surcomsData[0] = item.total;
        break;
      case '08':
        surcomsData[1] = item.total;
        break;
      case '09':
        surcomsData[2] = item.total;
        break;
      case '10':
        surcomsData[3] = item.total;
        break;
      case '11':
        surcomsData[4] = item.total;
        break;
      case '12':
        surcomsData[5] = item.total;
        break;
      case '01':
        surcomsData[6] = item.total;
        break;
      case '02':
        surcomsData[7] = item.total;
        break;
      case '03':
        surcomsData[8] = item.total;
        break;
      case '04':
        surcomsData[9] = item.total;
        break;
      case '15':
        surcomsData[10] = item.total;
        break;
      case '16':
        surcomsData[11] = item.total;
        break;
      default:
        break;
    }
  });
  return surcomsData;
}

function parseCutoff(cutoff) {
  let cutoffData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  cutoffData[0] = (cutoff.openingCutoff[0].sum);
  cutoffData[11] = (cutoff.closingCutoff[0].sum);
  return cutoffData;
}

module.exports = { parseSurcoms, parseCutoff };
