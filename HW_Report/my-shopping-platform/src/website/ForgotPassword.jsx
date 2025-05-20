import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8001/api/password_reset/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setMessage("📩 我們已寄出重設密碼連結，如有註冊此 Email 請查看信箱！");
    } else {
      setMessage("⚠️ 發送失敗，請確認信箱格式或稍後再試。");
    }
  };

  return (
    <div className="w-screen h-screen min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">忘記密碼</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm text-black">註冊時使用的 Email：</label>
          <input
            type="email"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            發送重設連結
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-black">{message}</p>}
      </div>
    </div>
  );
}
