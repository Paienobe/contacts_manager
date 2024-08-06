import ContactsTable from "./components/ContactsTable/ContactsTable";
import Navbar from "./components/Navbar/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ContactsTable />
    </main>
  );
}
