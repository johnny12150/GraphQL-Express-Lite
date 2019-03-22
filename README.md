# GraphQL Express Lite
### 細節
使用express來建置簡單的graphql應用

(並沒有使用express-generator來產生完整的專案架構)

> https://graphql.org/graphql-js/running-an-express-graphql-server/

### 套件
> https://ithelp.ithome.com.tw/articles/10188294
* graphql 是實作了 GraphQL 核心的 JavaScript 套件負責解析 AST、執行 Validation、建構基礎的 Type 與 Schema 等
* express-graphql 則是讓 Express 可以處理 GraphQL Schema 的套件
* express做web server (API server)
* node-fetch做fetch API

### 檔案架構
1. server-test.js為測試與學習用
2. server.js會嘗試整合Rancher1.6的API

### 執行
Running a GraphQL API server at ` http://localhost:4000/graphql`
