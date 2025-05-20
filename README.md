# 📦 Docker 與後端相關問題

## 🛠️ 說明

由於先前 Django 無法正確載入 CSS，因此我已在後端修正 `static files` 設定。若你之後要開發新功能並在本地使用 Docker 測試後端，請依照下列步驟執行，確保你的環境與最新設定一致。

---

## 🚀 啟動後端流程（使用 Docker）

```bash
cd HW_Report/backend

# 1️⃣ 拉取最新版後端 Image（每次後端更新後要跑）
docker pull ryan881225/backend-django:latest

# 2️⃣ 啟動服務（第一次或 Dockerfile 改過時加 --build）
docker-compose up --build

# 3️⃣ 資料庫遷移（model 改動後才需要）
docker exec -it web_django python manage.py migrate

# 4️⃣ 匯入初始資料（只有需要預設 admin、商品資料時才執行）
docker exec -it web_django python manage.py loaddata data.json

# 5️⃣ 收集靜態檔案（修改過 static 設定或 CSS 無法顯示時才需要）
docker exec -it web_django python manage.py collectstatic --noinput
```

---

## 📌 各指令執行時機說明

| 指令                          | 需要執行的時機                                                    |
| --------------------------- | ---------------------------------------------------------- |
| `docker pull`               | ✔️ 每次有新的後端 image 推到 Docker Hub 時（例如有人改後端設定並 rebuild image） |
| `docker-compose up --build` | ✔️ 第一次啟動或 Dockerfile/環境有改動才需要 `--build`，一般只用 `up`          |
| `migrate`                   | ✔️ 修改 `models.py` 或新增 migration 檔案後                        |
| `loaddata`                  | ⚠️ 只有需要預設帳號/商品時才執行。**不要每次都跑**，否則可能重複或報錯                    |
| `collectstatic`             | ✔️ 有動到 `static` 或 admin CSS 出不來時執行一次即可                     |

---

## ✅ 測試方式

開啟瀏覽器並進入：

```
http://localhost:8001/admin/
```

如果後台頁面載入正常（CSS 有樣式），即代表設定成功！
