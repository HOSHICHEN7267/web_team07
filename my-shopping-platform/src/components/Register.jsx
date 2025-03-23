import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("密碼與確認密碼不一致");
      return;
    }

    setErrorMessage("");
    console.log("註冊成功", { username, email, password });
    // 在這裡送出資料到後端 API（如需）
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700">註冊</h2>
      <form className="mt-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">使用者名稱</label>
          <input
            type="text"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="輸入使用者名稱"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="輸入 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">確認密碼</label>
          <input
            type="password"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="再次輸入密碼"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errorMessage && (
            <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 mt-8 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2"
        >
          註冊
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
        已經有帳號？ <Link to="/login" className="text-blue-500 hover:underline">登入</Link>
      </p>

    </div>
  );
}
