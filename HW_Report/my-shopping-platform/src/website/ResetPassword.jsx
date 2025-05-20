import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // ⬇️ 從網址讀取 token 和 email
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    const tokenParam = params.get("token");
    console.log("[DEBUG] email from URL:", emailParam);
    console.log("[DEBUG] token from URL:", tokenParam);
    if (emailParam) setEmail(emailParam);
    if (tokenParam) setToken(tokenParam);
  }, [location]);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (password !== confirm) {
    return setMessage("❌ 密碼不一致！");
  }
  console.log("[DEBUG] submit with:", { email, token, password });

  const res = await fetch("http://localhost:8001/api/password_reset/confirm/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      token,
      password,
    }),
  });

    if (res.ok) {
      alert("✅ 密碼重設成功！");
      navigate("/login");
    } else {
      setMessage("⚠️ 無效或過期的連結，請重新申請。");
    }
  };

  return (
    <div className="w-screen h-screen min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">設定新密碼</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm">新密碼：</label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="block mb-2 text-sm">再次輸入：</label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-4"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            提交
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
}