export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 px-6">
      <h1 className="text-base font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">User</span>
        <div className="h-8 w-8 rounded-full bg-gray-300" />
      </div>
    </header>
  );
}
