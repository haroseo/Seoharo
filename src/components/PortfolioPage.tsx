import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Compass, Sparkles, Award, ExternalLink } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useRouter } from "./router";
import SearchBar from "./SearchBar";

interface DisplayItem { id: string; type: "discord"|"site"|"workplace"; category: "brand"|"marketing"|"development"; title: string; slogan?: string; description: string; tags: string[]; link?: string; github?: string; achievements?: string[]; details?: { background: string; strategy: string; metrics?: string } }

export default function PortfolioPage() {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const { t } = useLanguage();
  const { currentPath, navigate } = useRouter();

  const displayItems = [
    { id: "rofolder", type: "discord", category: "brand", title: "RoFolder", slogan: t("당신의 스토리를 성공의 데이터로","Everything you need"), description: t("청소년 및 청년의 스타트업 창업을 독려...","A leading Discord community"), tags: ["CEO","Branding"] , link: "https://discord.gg/ABz6SQ74Yv" },
    { id: "designpick", type: "site", category: "brand", title: "Design Pick", slogan: t("엄선된 비주얼 디자인 큐레이션","Curated visuals"), description: t("타이포그래피와 정교한 구조적 레이아웃...","Visual design curation"), tags: ["UI/UX","Curation"], link: "https://designs.kro.kr" },
    { id: "typolab", type: "site", category: "development", title: "TypoLab", slogan: t("훈민정음 ...","Interactive typography"), description: t("한글의 조형적 가치...","An experimental web typing service"), tags: ["Typography","Experiment"], link: "https://xn--..." }
  ];

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    displayItems.forEach((it: any) => it.tags?.forEach((tg: string) => s.add(tg)));
    return Array.from(s);
  }, [displayItems]);

  const filteredItems = useMemo(() => {
    const byRoute = displayItems.filter((item: any) => {
      if (currentPath === "/design") return item.category === "brand";
      if (currentPath === "/marketing") return item.category === "marketing";
      if (currentPath === "/development") return item.category === "development";
      return true;
    });

    const q = query.trim().toLowerCase();
    return byRoute.filter((item: any) => {
      if (activeTag && !item.tags.map((t: string) => t.toLowerCase()).includes(activeTag.toLowerCase())) return false;
      if (!q) return true;
      const hay = (item.title + " " + (item.slogan||"") + " " + (item.description||"") + " " + (item.tags||[]).join(" ")).toLowerCase();
      return hay.includes(q);
    });
  }, [displayItems, currentPath, query, activeTag]);

  return (
    <div className="relative min-h-screen bg-black text-white select-none">
      <div className="sticky top-12 sm:top-[53px] z-30 w-full bg-black/60 backdrop-blur-md border-b border-white/5 py-4 px-6">
        <div className="max-w-6xl mx-auto">
          <SearchBar query={query} setQuery={setQuery} activeTag={activeTag} setActiveTag={setActiveTag} allTags={allTags} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24 sm:py-28">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item: any) => (
            <motion.div key={item.id} layout onClick={() => setSelectedItem(item)} className="bg-[#101010]/40 border border-white/5 rounded-xl overflow-hidden hover:border-white/12 transition-all duration-300 group flex flex-col justify-between cursor-pointer h-full">
              <div className="aspect-[1.6/1] w-full overflow-hidden relative border-b border-white/5 bg-zinc-950 flex items-center justify-center">
                <img src="/assets/default-project.png" alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-[12.5px] font-bold text-white">{item.title}</h3>
                <p className="text-[11px] text-zinc-400 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">{item.tags.map((tag: string) => <span key={tag} className="px-1.5 py-0.5 bg-white/5 rounded text-[8px]">{tag}</span>)}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
