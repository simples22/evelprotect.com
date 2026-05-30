import AdminLeadershipManager from "@/components/admin/leadership/AdminLeadershipManager";


export const metadata = {
  title: "Leadership | Admin",
};

export default function AdminLeadershipPage() {
  return (
    <main className="evelAdminPage">
      <div className="adminPageHeader">
        <div>
          <h1>Leadership</h1>
          <p>Manage leadership content and company profiles.</p>
          <AdminLeadershipManager />
        </div>
      </div>
    </main>
  );
}