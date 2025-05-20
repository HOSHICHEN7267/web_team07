import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState(""); // ← 使用者名稱而不是 email
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await fetch("http://localhost:8001/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      // console.log("Response:", res); // Debugging line

      const data = await res.json();

      console.log("Data:", data); // Debugging line

      if (res.ok) {
        localStorage.setItem("token", data.access);
        alert("✅ 登入成功！");
        navigate("/"); // 登入成功導回首頁
      } else {
        setErrorMessage("帳號或密碼錯誤！");
      }
    } catch (err) {
      setErrorMessage(err.message || "伺服器錯誤，請稍後再試");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-[#50E3C2] via-blue-600 to-[#ad4beb]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">購物平台登入</h2>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">使用者名稱</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="輸入帳號"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">密碼</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="輸入密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="text-blue-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-600">記住我</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">忘記密碼？</Link>
          </div>

          {errorMessage && (
            <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2"
          >
            登入
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          還沒有帳號？ <Link to="/register" className="text-blue-500 hover:underline">註冊</Link>
        </p>
      </div>
    </div>
  );
}
