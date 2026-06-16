# DEPLOY.md

## GitHub Pages 部署方式

1. 建立一個新的 GitHub repository，例如：

```text
english-level-up-ai-guide
```

2. 將本資料夾內所有檔案上傳到 repo 根目錄。

3. 到 GitHub repo：

```text
Settings → Pages
```

4. Source 選擇：

```text
Deploy from a branch
```

5. Branch 選擇：

```text
main / root
```

6. 儲存後等待 GitHub Pages 產生網址：

```text
https://<your-github-username>.github.io/english-level-up-ai-guide/
```

## 注意

請使用 GitHub Pages 開啟，不建議直接用 file:// 打開 index.html，因為部分瀏覽器會阻擋本地 JSON 載入。

## 發佈前檢查

- index.html 可開啟
- data/*.json 都在正確位置
- assets/app.js 可載入
- Prompt 卡數為 60
- Resource Cards 為 29
- About 有原項目、GitHub 連結、CC BY-NC 4.0
- 前台無 Word Lists / Word Packs
