# Restaurant list
這是一個使用node.js及express框架所架構的餐廳網站，在這裡可以您可以瀏覽該網站全部的餐廳詳細資訊且可使用查詢快速查找您所喜歡的餐廳。

## 專案畫面
![img](/public/img/index_page.jpg)
![img](/public/img/show_page.jpg)

## Features 產品功能

1. 使用者點擊餐廰圖片或Detail按鈕即可觀看該餐廳詳細資訊
2. 使用者可使用搜尋表單輸入想搜尋的關於該餐廳的名稱或種類關鍵字搜尋餐廳
3. 使用者搜尋的關鍵字無符合餐廳，會顯示沒有符合的資訊給使用者
4. 使用者可以新增餐廳資料
5. 使用者可以刪除餐廳資料
6. 使用者可以修改餐廳詳細資料

## Environment Setup 環境建置
* Node.js： ^14.16.0
* Express： ^4.17.1
* Express-handlebars： ^5.3.4
* mongoose： ^6.0.12
* mongodb

## Installing 專案安裝流程
1. 打開您的終端機(terminal)，複製(clone)專案至本機
```
git clone https://github.com/deansyue/restaurant_list
```

2. 進入存放此專案資料夾
```
cd restaurant_list
```

3. 安裝npm套件
```
npm install
```

4. 使用腳本，創建種子資料
```
npm run seed
```

5. 使用腳本，即可啟動伺服器
```
npm run dev
```

6. 當終端機(terminal)出現以下文字，代表伺服器已啟動
```
Express is running on http://localhost:3000
```

## Contributor 專案開發人員
[deansyue](https://github.com/deansyue)
