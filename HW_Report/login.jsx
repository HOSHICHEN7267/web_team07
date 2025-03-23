import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password, "Remember Me:", rememberMe);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#50E3C2] via-blue-600 to-[#ad4beb]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">購物平台登入</h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="輸入 Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">密碼</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="輸入密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <a href="#" className="text-sm text-blue-500 hover:underline">忘記密碼？</a>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2"
          >
            登入
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          還沒有帳號？ <a href="register.html" className="text-blue-500 hover:underline">註冊</a>
        </p>
        <p className="mt-3 text-sm text-center text-gray-600">
          <a href="info.html" className="text-blue-500 hover:underline">使用說明</a>
        </p>
      </div>
    </div>
  );
}

