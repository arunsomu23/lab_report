export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t text-sm text-gray-600 text-center py-4">
      © {new Date().getFullYear()} Diagnostic Report Viewer
    </footer>
  );
}
