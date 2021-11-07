//cette fonction recupère un array de CA par mois (format string)

export default function cumulativeTurnover(monthlyTurnover) {
  let monthlyTurnoverParsed = [];
  monthlyTurnover.forEach((item) => {
    monthlyTurnoverParsed.push(parseFloat(item)); //parse en number en gardant les décimales
  });

  let cumulativeTurnover = [];
  monthlyTurnoverParsed.reduce((prev, curr, i) => (cumulativeTurnover[i] = prev + curr), 0); //calcul cumulatif
  return cumulativeTurnover;
}
