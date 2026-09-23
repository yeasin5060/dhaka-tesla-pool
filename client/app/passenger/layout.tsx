import DashboardLayout from "../components/layout/DashboardLayout";

export default function PassengerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}