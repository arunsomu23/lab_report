import { useEffect, useState } from "react";

export default function Header() {
  const [username, setUsername] = useState(null);
  const [loginTime, setLoginTime] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem("username");
    const time = sessionStorage.getItem("loginTime");
    if (user && time) {
      setUsername(user);
      setLoginTime(new Date(time).toLocaleString());
    }
  }, []);

  return (
    <header className="bg-blue-700 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          🧪 Laboratory Report - Hematology
        </h1>
        {username && (
          <div className="text-sm text-right">
            <p className="font-medium">👤 {username}</p>
            <p className="text-white/80">📅 {loginTime}</p>
          </div>
        )}
      </div>
    </header>
  );
}
