# LinkedIn 摘要與網站交接

使用者要求 LinkedIn 摘要、加入 LinkedIn 發佈或設定個人帳號時讀本頁。沿用 personal-site 的 text/link publisher，不增加 Content Studio、社群管理 UI 或常駐服務。

## 使用者怎麼提出需求

「這篇也準備發到我的 LinkedIn，繁體中文短摘要，附全文連結，先給我 review。」

Codex 準備一則適合 LinkedIn 閱讀的短文：一個具體開場、文章最值得帶走的重點、全文連結。繁體中文可先以約 150–250 字（不含網址）作為起點，依使用者要求調整；這是寫作建議，不是平台限制。跟隨指定語言，不因網站雙語就自動發兩則。CLI 目前每個 LinkedIn 渠道接受一則文字，最多 3,000 字元。

摘要必須忠於核准文章的主張、日期與完成狀態，不增加沒有證據的節省比例、已部署聲明或成果。完整最終文字放進 channels 的 posts，發送時不再生成或改寫。

只有詢問「如果要發怎麼做」時，先提供備稿；明確要求納入 LinkedIn 發佈時，才將渠道選入 review。準備與選入 review 均不代表現在就能公開發文。

## 審閱包需要多出什麼

- 文章、封面與來源彙總沿用同一版，新增 LinkedIn 完整摘要及正式文章 URL。需要成效區分時，使用已確認網站的 URL，加 utm_source=linkedin、utm_medium=social、utm_campaign=文章 slug。
- 顯示發佈對象：個人檔案名稱／profile URL 或指定公司頁。從已知設定核對；不要將 /in/ 後的公開名稱當成 API person ID。linkedin-main 是渠道 ID，不是帳號 ID。
- 顯示目前 publisher 固定 PUBLIC / MAIN_FEED，可被公開閱讀；使用者要求不同可見度時，先處理程式能力，不能照預設送出。
- 顯示格式是「文字＋網址」。目前沒有原生圖片上傳，也沒有送出 Posts API 的 article media payload；不保證 LinkedIn 一定呈現網站 OG 封面或預覽卡。
- 需要的連線還未驗證時，清楚寫在摘要裡；可完成文稿與 review，不用以一則真實測試貼文驗證權限。

網站稿件尚未 prepare 時，在私人 candidate JSON 加入：

```json
{"id":"linkedin-main","provider":"linkedin","posts":["已完成且可審閱的短摘要，包含實際全文網址"]}
```

將此物件放進既有 channels 陣列，維持 articleId / slug / releaseId。以新目錄生成 review R2；明確選入才傳 --channels linkedin-main。未傳此參數時，文案會標成「備用稿，不發佈」。

新審閱版本的 reviewHash / snapshotHash 取代當前待審版本，舊包保留。已 prepare 的 release 是不可變快照；不能直接加入文案再沿用舊 hash。已發佈文章的原快照沒有該渠道時，現有 CLI 不支援直接追加，需另行處理並審閱社群發佈流程，不能偽裝成原 release 的 retry。

## 個人 LinkedIn 首次連線

先執行 doctor，只顯示設定是否齊備；它不代表帳號或 token 已驗證。

1. 沿用使用者的 LinkedIn developer app（若存在），確認 Share on LinkedIn 產品及 w_member_social 權限。使用者透過官方 OAuth 在本機登入並同意個人發文授權。不要請使用者把 token、client secret 或 BWS machine token 貼進對話。
2. 透過官方身份 API／既有已驗證授權資料取得 person ID，核對為預期個人帳號，組成 urn:li:person:ID。若要使用 /v2/userinfo，依官方 OIDC 文件取得 openid / profile 權限。不可從公開 profile URL 猜 ID。
3. 將有效憑證依既有 BWS 專案與受限存取規則配置給執行程序。需要 LINKEDIN_ACCESS_TOKEN、LINKEDIN_PUBLISHING_ACTOR；OAuth 核對另用 LINKEDIN_CLIENT_ID、LINKEDIN_CLIENT_SECRET。本機入口讀取私人 `~/.local/share/personal-site-publishing/credentials.json` 的 secret ID 綁定（可用 PUBLISHING_CREDENTIALS_FILE 指定），BWS_ACCESS_TOKEN 由程序環境或 macOS Keychain 提供。只讀取綁定的必要 secrets，不注入整個專案。API version 沿用目前受支援的 LINKEDIN_API_VERSION 設定；過期或權限不足時重新授權，不宣稱能無條件自動更新。
4. 執行 `pnpm publish:content:bws verify-linkedin`：從 BWS 讀回憑證，透過官方 token introspection 與 userinfo 檢查 active、到期時間、必要 scopes 與綁定的 person actor，只輸出非機密結果，不發送測試貼文。再執行 `pnpm publish:content:bws doctor` 確認發文程序接線；doctor 本身仍不代表身份或權限有效。

已有本機設定時先執行上述驗證，不重複要求登入或建立新 machine token。依私人綁定記錄確認 OAuth 與 BWS token 各自到期日；網頁登入不能取代 machine token。機器憑證更新保存至同一 Keychain 項目，LinkedIn 憑證更新對應 BWS secret，身份變更須重新核對並更新私人綁定。不要在公開 skill / repo 保存 token、secret ID 清單或私人授權紀錄。

官方依據：[Share on LinkedIn 授權](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin)、[OIDC 身份資料](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2)、[Posts API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api)。實際設定時查核當時文件與權限，不回復已退役的 AIPW OAuth callback。

## 確認後怎麼送出

「這版網站和 LinkedIn 摘要都可以發佈」即涵蓋已展示的版本與目的地，不再追加一次發送確認。使用者只批准網站時，LinkedIn 備稿維持未發佈。

依 operations.md 核對 reviewHash、prepare、處理既有未提交改動，先發網站。確認指定 commit 的 CI/CD 及兩種語言公開頁面後，再透過 BWS 執行同一 release：

```sh
pnpm publish:content:bws release publish RELEASE_UUID --snapshot REVIEWED_HASH --channels linkedin-main --social-only
```

這個操作由 Codex 在網站驗證後執行；現有 GitHub Actions 只負責網站，不會因 push 就自行發 LinkedIn。回報網站 URL 與 LinkedIn 貼文 URL。若網站已成功但 LinkedIn 失敗，保留網站結果，只恢復未完成社群步驟；結果不明時核對平台貼文後再 resolve，不直接重發。
