# stock-simulator 開発仕様書

## **アプリ作成の目的**
- 例題のアプリケーションを作成し、Laravelの基本機能について理解する。
- E2Eテストの実装を通して、テストの構成を学ぶ。

# 株情報アプリ 開発仕様書

## **概要**
本アプリは、ユーザーが株式市場の情報を簡単に取得できる情報アプリです。

## **技術スタック**
- **バックエンド:** Laravel 10 (PHP 8.2)
- **フロントエンド:** Next.js (React 18)
- **データベース:** MySQL または Firebase
- **API:** Yahoo Finance API または Alpha Vantage API
- **E2Eテスト:** Playwright
- **CI/CD:** GitHub Actions

---


## **画面設計**

### **1. ホーム画面**
- 検索バー（銘柄検索）
- 人気銘柄のトレンド表示
- 最新ニュース一覧

### **2. 銘柄詳細画面**
- 企業情報
- 最新株価と値動き
- 株価チャート
- 「お気に入りに追加」ボタン

### **3. お気に入り一覧画面**
- 登録した銘柄のリスト
- タップで詳細画面へ遷移
- 「お気に入り解除」ボタン

### **4. ニュース一覧画面**
- 株関連ニュースのタイトル一覧
- タップで外部ニュースサイトへ遷移

---

## **機能一覧と要件定義**

### **1. 銘柄検索 & 情報表示**
#### **要件**
- ユーザーが銘柄コードまたは企業名で検索できる
- 検索結果を一覧表示し、クリックで詳細画面へ遷移できる
- 銘柄詳細画面で以下の情報を表示
  - 企業名
  - ティッカーシンボル（例: AAPL）
  - 業種・市場（例: IT・NASDAQ）
  - 時価総額
  - 52週間高値・安値
  - 1日の高値・安値
  - 直近の終値

#### **API設計**
- Laravel で `/api/stocks/search?q={query}` を提供
- Next.js から API を呼び出し、リアルタイム検索
- フロントエンドで検索バーを実装（Debounce でAPI負荷軽減）

---

### **2. 株価チャートの表示**
#### **要件**
- 指定した銘柄の過去の株価をチャートで表示
- 期間を選択可能（1週間 / 1ヶ月 / 3ヶ月）
- チャートのデータは API 経由で取得

#### **API設計**
- Laravel で `/api/stocks/{symbol}/chart?range={1w|1m|3m}` を提供
- Next.js から API を取得し、Recharts または Chart.js で描画

---

### **3. 株関連ニュースの取得**
#### **要件**
- 株式市場関連のニュースを一覧表示
- ニュースのタイトル、提供元、公開日時を表示
- ニュースの詳細リンクを外部サイトへ誘導

#### **API設計**
- Laravel で `/api/stocks/news` を提供
- ニュースAPIを活用し、定期的に更新（Laravel Scheduler を使用）
- Next.js でニュースを一覧表示

---

### **4. お気に入り銘柄リスト**
#### **要件**
- ユーザーが気になる銘柄を「お気に入り登録」できる
- お気に入りリストからすぐに情報取得
- ログインユーザーごとにお気に入りを管理

#### **API設計**
- Laravel で `/api/user/favorites`（取得）, `/api/user/favorites/{symbol}`（登録/削除）を提供
- Next.js で状態管理（Zustand または Redux Toolkit）を利用

---

## **開発スケジュール (1週間プラン)**

| 日数 | 作業内容 |
|---|---|
| **1日目** | プロジェクトセットアップ / API連携確認 |
| **2日目** | 銘柄検索・情報取得機能の実装 |
| **3日目** | 株価チャートの表示機能を実装 |
| **4日目** | 株関連ニュース取得・表示 |
| **5日目** | お気に入り機能の実装 |
| **6日目** | UIの改善・レスポンシブ対応 |
| **7日目** | テスト・バグ修正・デプロイ |

---

## **テスト設計**

### **1. ユニットテスト (Laravel)**
- 銘柄検索APIのレスポンス確認
- 株価データ取得APIの動作検証
- お気に入り機能の登録・削除の挙動確認

### **2. E2Eテスト (Playwright)**
- 銘柄検索 → 詳細画面の遷移テスト
- チャート表示の検証
- お気に入り登録・削除の動作テスト

### **3. CI/CD (GitHub Actions)**
- コードのLintチェック
- PHPUnitテスト実行
- PlaywrightのE2Eテスト実行
- 成功時にデプロイ (Vercel / Heroku / AWS など)

---
