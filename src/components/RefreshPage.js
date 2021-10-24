export default function RefreshPage() {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
      <button onClick={refreshPage}>Effacer la recherche</button>
    </div>
  );
}
