
# 🐳 HW_Report Django 專案部署指南（Docker + MySQL）

這個專案是使用 Django 框架開發，並透過 Docker 容器部署。資料庫最初使用 SQLite，後轉換為 MySQL 並封裝成可攜式映像檔（Docker image）。

---


## 🧳 部署到新電腦流程



### 🐳 步驟 1：拉取映像檔並啟動容器

```bash
docker pull ryan881225/backend-django:v2
docker pull ryan881225/my-mysql:v2

cd HW_Report/backend
docker compose up -d
```

---

### 🧱 步驟 2：建立資料表（migrate）

```bash
docker exec -it web_django python manage.py migrate
```

---

### 📥 步驟 3：匯入資料 (`data.json`)

```bash
# 將 data.json 傳入容器
docker cp data.json web_django:./data.json

# 在容器內執行 loaddata
docker exec -w ./ -it web_django python manage.py loaddata data
```

成功後會看到：
```
Installed XX object(s) from 1 fixture(s)
```
