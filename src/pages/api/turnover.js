export default async function handler(req, res) {
  const response = await fetch('https://api.coincap.io/v2/assets/?limit=5');
  const data = await response.json();
  const chartData = {
    labels: data.data.map((crypto) => crypto.name),
    datasets: [
      {
        label: 'Price in USD',
        data: data.data.map((crypto) => crypto.priceUsd),
        backgroundColor: ['#ffbb11', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
      },
    ],
  };

  await res.status(200).json(chartData);
}
