import { useRouter } from "next/router";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        sessionStorage.clear();
        router.push("/login");
    };

    return (
        <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 hover:underline"
        >
            Logout
        </button>
    );
}
