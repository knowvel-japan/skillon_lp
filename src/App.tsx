import HeroSection from "./components/sections/HeroSection";
import ProblemSection from "./components/sections/ProblemSection";
import SolutionSection from "./components/sections/SolutionSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import PartnerSection from "./components/sections/PartnerSection";
import TeamSection from "./components/sections/TeamSection";
import AchievementsSection from "./components/sections/AchievementsSection";
import CTASection from "./components/sections/CTASection";
import FAQSection from "./components/sections/FAQSection";
import Footer from "./components/sections/Footer";
import { AlertCircle, Clock, Users } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#f97d0b] focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f97d0b]"
      >
        メインコンテンツへスキップ
      </a>
      <main id="main-content">
        {/* Hero Section */}
        <HeroSection
          title={
            <>
              現場の暗黙知を、
              <br />
              誰でも学べる形式知へ
            </>
          }
          subtitle="スマートフォンで撮影した作業風景から、自動的に研修動画や学習教材を生成。現場教育の負担を軽減し、技術継承を加速します。"
          ctaText="まずは担当者に相談してみる"
          ctaLink="#cta"
        />

        {/* Problem Section */}
        <ProblemSection
          problems={[
            {
              icon: AlertCircle,
              iconPath: "/images/kyoikutanto.svg",
              title: "教育担当の負担",
              description:
                "教育に時間を奪われて、本業に集中できていない。教材制作を行う余裕もない。",
            },
            {
              icon: Clock,
              iconPath: "/images/ichininmae.svg",
              title: "若手が育たない",
              description:
                "技能習得に時間がかかる。質問できず、自信をなくして辞めていく人も。",
            },
            {
              icon: Users,
              iconPath: "/images/kyoiku.svg",
              title: "不揃いな教育",
              description:
                "現場任せの教育で標準化できていない。若手が育っているか判断できない。",
            },
          ]}
          socialBenefit="技術継承の課題は、日本の製造業や建設業において深刻化しています。2030年には熟練技術者の約30%が退職すると予測されており、早急な対策が求められています。"
        />

        {/* Solution Section */}
        <SolutionSection
          concept="SkillONは、スマートフォンで撮影した作業風景を自動解析し、研修動画や学習教材を生成します。AIが作業手順を認識し、重要なポイントを抽出。誰でも簡単に、質の高い教育コンテンツを作成できます。"
          highlights={[
            "スマホ撮影だけで教材作成",
            "AI自動解析で手順を抽出",
            "教育コンテンツの標準化",
          ]}
          imagePlaceholder="solution-visual"
          beforeVideoUrl="https://www.youtube.com/embed/AETVeN4G6O0"
          afterVideoUrl="https://www.youtube.com/embed/Crf94djix8g"
        />

        {/* Features Section */}
        <FeaturesSection
          features={[
            {
              iconSrc: "/images/douga.svg",
              title: "学習教材の自動生成",
              description:
                "作業風景を撮影すると、AIがベテランの動きを解析し、研修動画を生成します。作業マニュアルも生成可能です。",
            },
            {
              iconSrc: "/images/mentor.svg",
              title: "AIメンタリング機能",
              description:
                "AIメンターが疑問の解消や、クイズを通した理解定着の判断、ベテランとの違いを説明します。",
            },
            {
              iconSrc: "/images/data.svg",
              title: "教材自動更新・補足",
              description:
                "学習者の理解度や各種データに応じて、教材の再編集や補足動画の生成を自動的に行います。",
            },
          ]}
          beforeAfterVideoPlaceholder="before-after-video"
          comparisonData={[
            {
              feature: "教材作成の手軽さ",
              trainingCompany: "専門スタッフが必要",
              existingLMS: "手動で作成",
              skillON: "スマホ撮影のみ",
            },
            {
              feature: "コスト",
              trainingCompany: "高額（数百万円〜）",
              existingLMS: "中程度",
              skillON: "低コスト",
            },
            {
              feature: "教材更新",
              trainingCompany: "都度依頼が必要",
              existingLMS: "手動更新",
              skillON: "AI自動更新",
            },
            {
              feature: "学習サポート",
              trainingCompany: "限定的",
              existingLMS: "基本機能のみ",
              skillON: "AIメンター常時対応",
            },
            {
              feature: "導入期間",
              trainingCompany: "数ヶ月",
              existingLMS: "1〜2ヶ月",
              skillON: "即日利用可能",
            },
          ]}
        />

        {/* Partner Section */}
        <PartnerSection
          partnerInfo={{
            target: [
              "製造業・建設業の企業",
              "現場教育に課題を感じている企業",
              "技術継承を推進したい企業",
            ],
            fields: [
              "製造現場の作業教育",
              "建設現場の安全教育",
              "メンテナンス作業の技術継承",
            ],
            schedule: "2025年1月〜3月（3ヶ月間のPoC実施）",
            conditions: [
              "月1回のフィードバックミーティングへの参加",
              "実際の現場での試用と評価",
              "改善提案へのご協力",
            ],
          }}
        />

        {/* Team Section */}
        <TeamSection
          members={[
            {
              name: "梅田 旭太朗",
              role: "CEO",
              bio: [
                "九州大学工学府量子物理学専攻修了。",
                "大手外資系IT企業にて、製造業のDXプロジェクトや生成AIを活用した新規事業創造支援を担当。",
              ],
              imagePlaceholder: "team-member-1",
            },
            {
              name: "成瀬 大毅",
              role: "CTO",
              bio: [
                "東京大学情報理工学系研究科修了。",
                "ドイツでのAI研究を経て、GAFA日本法人にてエンタープライズのアプリケーション開発支援を担当。",
              ],
              imagePlaceholder: "team-member-2",
            },
            {
              name: "鴇田 悠",
              role: "CAIO",
              bio: [
                "京都大学情報学研究科修了。",
                "ゲームAIで世界一の記録を持つ。GAFA日本法人にてパートナー企業の育成を担当。",
              ],
              imagePlaceholder: "team-member-3",
            },
            {
              name: "大野 亮太",
              role: "AI/ML",
              bio: [
                "東京大学工学系研究科修了。",
                "自動運転スタートアップを経て、GAFA日本法人にて製造業の数理最適化やDX支援を担当。",
              ],
              imagePlaceholder: "team-member-4",
            },
          ]}
        />

        {/* Achievements Section */}
        <AchievementsSection
          achievements={[
            {
              programName: "品川ソーシャルイノベーションアクセラレーター採択",
              year: "2025年",
              description:
                "品川区の社会課題解決を目指すスタートアップ支援プログラムに採択",
              logoPlaceholder: "/images/image.png",
              link: "https://shinagawa-startup.com/2025/",
            },
          ]}
        />

        {/* CTA Section */}
        <CTASection />

        {/* FAQ Section */}
        <FAQSection
          faqs={[
            {
              question: "PoCに参加するための費用はかかりますか？",
              answer:
                "PoC期間中は無償でご利用いただけます。フィードバックをいただくことで、より良いプロダクトを共創していきたいと考えています。",
            },
            {
              question: "どのような業種・業界が対象ですか？",
              answer:
                "製造業、建設業を中心に、現場での作業教育が必要な業種であればご参加いただけます。具体的な業務内容についてはお気軽にご相談ください。",
            },
            {
              question: "必要な機材はありますか？",
              answer:
                "スマートフォン（iOS/Android）があれば利用可能です。特別な機材は必要ありません。",
            },
            {
              question: "PoC期間中のサポート体制は？",
              answer:
                "専任の担当者が導入から運用までサポートします。月1回のミーティングに加え、チャットでの質問対応も行います。",
            },
            {
              question: "PoC終了後はどうなりますか？",
              answer:
                "PoC終了後、継続利用をご希望の場合は正式契約に移行いただけます。料金プランについては個別にご相談させていただきます。",
            },
          ]}
        />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
