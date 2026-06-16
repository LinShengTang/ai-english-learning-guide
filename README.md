# AI 英語學習互動指南 v2.3 Static Fallback

這是 GitHub Pages 靜態完整內容版。  
本版不依賴 `fetch(data/*.json)` 才能顯示章節、資源卡與 Prompt 卡，因此可避免 GitHub Pages 路徑、資料夾漏傳或快取造成空白內容。

## 部署方式

把以下檔案上傳到 GitHub repo 根目錄：

```text
index.html
.nojekyll
README.md
LICENSE-NOTE.md
```

如果 repo 原本已有 `assets/`、`data/`、`appendix/`、`docs/`，可以保留；但本版首頁不依賴它們。

## 來源與授權

本網站為非商業學習輔助用途，基於 byoungd 的開源項目 English-level-up-tips 進行教材化整理、繁體中文轉寫、互動流程設計與 Prompt 工具化改編。

原項目作者：byoungd  
原項目網址：https://github.com/byoungd/English-level-up-tips  
原授權：CC BY-NC 4.0  
授權說明：https://creativecommons.org/licenses/by-nc/4.0/

本網站為非官方改編版本，不代表原作者立場，也未暗示原作者背書。

工具整理與互動設計：林勝堂（KimiLin）  
AI 協作輔助：使用 AI 工具進行內容整理、重構與測試
