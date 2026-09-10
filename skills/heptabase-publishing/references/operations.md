# 操作入口與 Review → CI/CD

預設 repository：`/Users/jarvis/projects/self-2026/personal-site`。先讀該 repo 的 `AGENTS.md` 與 `docs/publishing.md`；稿件 schema 範例是 `docs/release.example.json`。本 skill 可安裝在 Codex 全域 skills，repo 路徑不依賴 skill 的安裝位置。

下面命令在 personal-site checkout 執行。示例中的私人路徑與 UUID / hash 應使用本次實際值，不能照抄或自行猜測。

## 準備可修改的候選稿

先在公開 repository 以外建立私人工作目錄，例如 `PUBLISHING_HOME` 下的 `drafts/<article>/`（預設 `~/.local/share/personal-site-publishing`）。限制私人檔案權限，不在公開 repo 的 output / public 資料夾保存內部來源。

- `candidate-draft.json`：符合 v2 schema 的完整中英文正文、Heptabase sourceUrl、證據與最終社群 `posts`。
- `hero-r1.png`：image_gen 生成並由 Codex 檢視的圖片。生成結果需複製到此處；用戶 review 的圖片和發佈圖必須是同一份 bytes。
- `summary.md`：讀者、論點、3–5 個重點、來源查核、圖片構想／最終 prompt、渠道、待確認事項。

```sh
pnpm publish:content release review \
  --input /private/path/candidate-draft.json \
  --hero /private/path/hero-r1.png \
  --summary /private/path/summary.md \
  --output /private/path/review-r1
```

LinkedIn 的短摘要、個人帳號授權與文字／圖片能力界線，見 [LinkedIn 操作](linkedin.md)。

需要納入本次發佈的社群，明確加 `--channels linkedin-main,x-main`，ID 取自 candidate。未選渠道仍可作為備用稿出現在審閱包，並標示不發佈。網站是此 review 工作流的必要目的地。

review 不建立 release store、不改網站、不寫 Git index、不提交或 push。它輸出：

- `review.html`：內嵌真正封面圖片、摘要、全文和社群逐則內容，可直接開檔，不需要 server。
- `review.md`：同一份審閱內容的 Markdown。
- `candidate.json`：已包含圖片 bytes 的候選稿；確認後直接 prepare 這個檔案。
- `artifacts/`：預期送到 Git 的公開 MDX 與圖片，便於比對。
- `review.json`：快照 hash、每個審閱檔案的 hash、選定渠道、Git target 與整份 reviewHash。

輸出目錄必須不存在。R2 使用新的目錄，直到使用者確認才封存 release；這樣可以維持同一 articleId/slug 來回改稿。用 inline image 展示回傳的 image 絕對路徑，並提供 review.html 與 review.md 的可點選絕對連結。可透過 Codex 的 open_in_codex 展示審閱檔，但不要公開部署 review 頁面。

## 使用者確認後

```sh
pnpm publish:content release verify-review \
  --input /private/path/review-r1 --review-hash REVIEW_HASH_FROM_PRESENTED_VERSION
pnpm publish:content release prepare --input /private/path/review-r1/candidate.json
pnpm publish:content release show RELEASE_UUID
pnpm publish:content release stage RELEASE_UUID --snapshot REVIEWED_SNAPSHOT_HASH
pnpm publish:content release publish RELEASE_UUID --snapshot REVIEWED_SNAPSHOT_HASH
```

verify-review 使用當時回傳並保留的 hash，不能從現在的檔案重新算一個 hash 來代替原審閱版本。CLI 也會核對目前 Git 目標與審閱時一致。prepare 回傳的 snapshotHash 應與 review 相同；不同即停止該次發佈並釐清版本。

發佈前檢查 Git status、目前分支、remote 與既有 deploy workflow。article publish 只會提交該稿件產物。若 checkout 有其他改動，先保留並隔離它們；若 publisher / releaseHash metadata 本身尚未上線，先把一次性工具上線改動列成獨立可審閱範圍，不能當作文章內容順便推送。這項 skill 的建立不代表已授權推送先前所有工具改動。

## CI/CD 與上線驗證

目前 `personal-site/.github/workflows/deploy.yml` 名稱為 `Deploy GitHub Pages`，push main 會自動建置、匯出並部署。每次使用仍應讀取 repository 中的實際設定。

從 Git remote 確認 owner/repo；目前預設為 `anomo06822/personal-site`。用收據中的 commit SHA 精確查詢，避免把別人的 run 算成本次成功：

```sh
gh run list --repo anomo06822/personal-site --workflow deploy.yml \
  --commit PUBLISHED_COMMIT_SHA --limit 5 \
  --json databaseId,headSha,status,conclusion,url
gh run view RUN_ID --repo anomo06822/personal-site \
  --json headSha,status,conclusion,url
```

run 尚未出現時短暫等待再查；run 執行中使用有節制的等待並保留進度更新。可用 `gh run watch RUN_ID --repo ... --exit-status`，透過工具的短 yield 取回控制，避免長時間無回應。失敗查 `gh run view RUN_ID --repo ... --log-failed`；一般建置／部署問題可在原授權範圍修復重試，若需更改核准文章或圖片，按使用者的版本授權處理。

成功後執行同一 release 的 `retry --snapshot HASH`。這時只會重新驗證已提交網站；必須看到兩種語言頁面的實際 article 及一致的 `ps:release-hash`。HTTP 200 或 workflow queued 都不足以稱為上線成功。

若已核准社群渠道，再執行：

```sh
pnpm publish:content:bws release publish RELEASE_UUID --snapshot HASH \
  --channels APPROVED_CHANNEL_IDS --social-only
```

社群憑證經 BWS 注入。原生圖片上傳不在目前 text/link publisher 能力內。結果不明先檢查帳號實際貼文，再依 docs/publishing.md 使用 `release resolve`，不能直接重發。沒有 gh 憑證時，回報已推送的 commit 與 CI 未能讀取的事實，不宣稱 CI 通過；也不要為了取得連線權限再觸發另一個 run。
