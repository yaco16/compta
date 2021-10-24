import Navbar from './Sidebar';
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <style jsx global>{`
        main {
          margin-left: 16%;
          margin-top: 0.5rem;
        }

        h1 {
          text-align: center;
          font-size: 1.5rem;
          font-weight: bold;
          padding: 0.5rem;
        }
      `}</style>
    </>
  );
}
