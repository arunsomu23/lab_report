import Link from "next/link";
import { useRouter } from "next/router";
import LogoutButton from "@/components/LogoutButton";

export default function Menu() {
  const router = useRouter();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/lab", label: "Health Records" },
  ];

  return (
    <nav aria-label="Main Navigation" className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex space-x-6">
          {navLinks.map(({ href, label }) => {
            const isActive = router.pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
