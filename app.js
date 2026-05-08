// Mountain Merchants · 山地商人
// Plain JS · template literals throughout for CJK safety

(function () {
  "use strict";

  const root = document.documentElement;
  const LANG_KEY = "mm-lang";
  const THEME_KEY = "mm-theme";

  function applyLang(lang) {
    root.setAttribute("data-lang", lang);
    document.querySelectorAll(".lang-toggle button").forEach(b => {
      b.classList.toggle("active", b.dataset.langSet === lang);
    });
    document.querySelectorAll("[data-en-placeholder]").forEach(el => {
      const v = el.getAttribute(`data-${lang}-placeholder`);
      if (v) el.placeholder = v;
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (_) {}
  }
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    document.querySelectorAll(".theme-toggle button").forEach(b => {
      b.classList.toggle("active", b.dataset.themeSet === theme);
    });
    try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
  }
  document.querySelectorAll(".lang-toggle button").forEach(b => {
    b.addEventListener("click", () => applyLang(b.dataset.langSet));
  });
  document.querySelectorAll(".theme-toggle button").forEach(b => {
    b.addEventListener("click", () => applyTheme(b.dataset.themeSet));
  });
  try {
    const sl = localStorage.getItem(LANG_KEY); if (sl) applyLang(sl);
    const st = localStorage.getItem(THEME_KEY); if (st) applyTheme(st);
  } catch (_) {}

  // ─── Module 02 · Geography ↔ occupation table ────────────────────
  const compRows = [
    ["Land form", "地形",
      "Flat, irrigated, parcellated", "平坦、可灌溉、可分割",
      "Steep, terraced, fragmented", "陡峭、梯田、碎裂"],
    ["Carrying capacity", "承载力",
      "High — large nucleated villages", "高——大型核化村落",
      "Low — dispersed hamlets, kin-based", "低——分散小村,宗族化"],
    ["Bureaucratic visibility", "官府可见度",
      "High — easy to tax and conscript", "高——易于征税征役",
      "Low — hard to survey and reach", "低——难于丈量与到达"],
    ["Examination success/cap", "科举成功(人均)",
      "High in wealthy clusters", "在富裕集群中高",
      "Variable — Huizhou very high, others lower", "因地而异——徽州极高,其他偏低"],
    ["Risk of staying home", "留乡的风险",
      "Low — agriculture buffers", "低——农业缓冲",
      "High — bad year leaves no surplus", "高——歉年无余粮"],
    ["Mobility incentive", "流动激励",
      "Weak — exit cost outweighs gain", "弱——离乡成本高于收益",
      "Strong — exit may be the only path", "强——离乡可能是唯一出路"],
    ["Default occupational mix", "默认职业组合",
      "Farming · officialdom · craft", "农 · 官 · 工",
      "Trade · finance · transport · brokerage · seasonal labor", "商 · 金融 · 运输 · 中介 · 季节工"]
  ];
  function renderCompTable() {
    const tbody = document.querySelector(".comp-table tbody");
    if (!tbody) return;
    tbody.innerHTML = compRows.map(r => `
      <tr>
        <td><span lang="en">${r[0]}</span><span lang="zh">${r[1]}</span></td>
        <td><span lang="en">${r[2]}</span><span lang="zh">${r[3]}</span></td>
        <td><span lang="en">${r[4]}</span><span lang="zh">${r[5]}</span></td>
      </tr>
    `).join("");
  }
  renderCompTable();

  // ─── Module 03 · Five merchant groups ────────────────────────────
  const merchants = [
    {
      cls: "shanxi",
      tagEn: "Shanxi · 晋商",
      tagZh: "晋商",
      titleEn: "The bankers of the empire",
      titleZh: "帝国的银行家",
      subEn: "Home: central Shanxi (Pingyao, Taigu, Qixian) · Capital: Beijing",
      subZh: "故乡:晋中(平遥、太谷、祁县) · 都城:北京",
      bodyEn: `Shanxi merchants combined three structural advantages: proximity to the imperial capital, control of the salt-for-grain frontier-supply system (开中法) under the Ming, and the geographic position of Shanxi as a trade corridor between the steppe and the central plain. They built the country&apos;s first nationwide remittance and credit system — the piaohao (票号) draft banks — beginning around 1820, which financed inter-provincial trade and government revenue transfers for the entire late Qing.`,
      bodyZh: `晋商结合了三项结构优势:邻近京师、明代"开中法"下盐粮边塞供应权、以及山西作为草原与中原之间贸易走廊的地理位置。他们自约 1820 年起建立了中国首个全国性的汇兑与信用体系——票号——为整个晚清的省际贸易与政府税饷转运提供金融服务。`,
      stats: [["Peak draft banks", "≈30 firms", "鼎盛票号"], ["Branches", "400+ cities", "分号"], ["Era", "Tang → 1911", "活跃期"], ["Specialty", "Banking, salt", "专业"]]
    },
    {
      cls: "huizhou",
      tagEn: "Huizhou · 徽商",
      tagZh: "徽商",
      titleEn: "The scholar-merchants",
      titleZh: "士商",
      subEn: "Home: southern Anhui (Huangshan area) · Metro: Nanjing, Yangzhou, Hangzhou",
      subZh: "故乡:皖南(黄山一带) · 都市:南京、扬州、杭州",
      bodyEn: `Huizhou&apos;s mountains pushed people out; the Yangtze Delta&apos;s urban demand pulled them in. Salt-trade licenses concentrated in Yangzhou, pawnshops across the empire, timber and tea, and book-printing made Huizhou one of the wealthiest merchant communities in pre-modern China. Crucially, Huizhou families also dominated the civil-service examinations — fusing scholar prestige with merchant capital in a way few other regions matched.`,
      bodyZh: `徽州的山地把人推出,长三角的都市需求把人拉入。扬州的盐引、遍布全国的典当、木材与茶叶、再加刻书,使徽商成为前现代中国最富裕的商人群体之一。关键在于:徽州家族同时主导科举——以少有人匹敌的方式融合士绅声望与商人资本。`,
      stats: [["Era", "Song → late Qing", "活跃期"], ["Salt licenses", "Yangzhou, dominant", "扬州盐引"], ["Geo", "7 mts·1 water·2 fields", "七山一水二田"], ["Lineage HQs", "thousands", "宗祠数量"]]
    },
    {
      cls: "ningbo",
      tagEn: "Ningbo · 甬商",
      tagZh: "甬商(宁波)",
      titleEn: "Treaty-port modernizers",
      titleZh: "通商口岸的现代化者",
      subEn: "Home: eastern Zhejiang coast · Metro: Shanghai (1843 onward)",
      subZh: "故乡:浙东沿海 · 都市:上海(1843 后)",
      bodyEn: `Ningbo had been a maritime trading port for a thousand years before Shanghai existed as a city. When Shanghai was forced open as a treaty port in 1843, Ningbo merchants — already organized in native-place associations (huiguan) — moved up the coast and became the dominant native group in modern Shanghai banking, shipping, foreign trade, and early industry. The historical line from Qing-era Ningbo native banks (qianzhuang) to twentieth-century Shanghai finance is direct.`,
      bodyZh: `宁波在上海作为城市存在前的千年间已是海洋贸易港。1843 年上海被迫开埠时,早已以同乡会馆形式组织起来的宁波商人沿海岸北上,成为现代上海银行、航运、外贸与早期工业中的主导原籍群体。从清代宁波钱庄到二十世纪上海金融的历史脉络直接连贯。</p>`,
      stats: [["Earlier", "Maritime trade 1000y", "千年海贸"], ["Modern", "Shanghai banking", "上海钱庄业"], ["Diaspora", "Yokohama, Hong Kong", "横滨、香港"], ["Specialty", "Finance, shipping", "金融、航运"]]
    },
    {
      cls: "wenzhou",
      tagEn: "Wenzhou · 温商",
      tagZh: "温商",
      titleEn: "Small-firm cluster economy",
      titleZh: "小微企业集群经济",
      bodyEn: `Wenzhou is geographically isolated by mountains on three sides and ocean on the fourth — historically connected to the rest of China primarily by sea. After 1978 it pioneered family-firm cluster manufacturing in shoes, lighters, eyeglasses, buttons, garments — each town specializing in one product category. Wenzhou diaspora networks reached deep into Italy, France, and parts of Africa, often producing in Wenzhou and selling abroad.`,
      bodyZh: `温州被三面山地、一面海洋包围,历史上与中国其他地区主要靠海路联系。1978 年后,它率先在制鞋、打火机、眼镜、纽扣、服装等领域开展家族企业集群制造——每个乡镇专注一种产品。温商海外网络深入意大利、法国及非洲部分地区,常以温州生产、海外销售为模式。`,
      subEn: "Home: southern Zhejiang coast · Metro: Shanghai + global diaspora",
      subZh: "故乡:浙南沿海 · 都市:上海 + 海外侨网",
      stats: [["Era", "Post-1978 surge", "1978 后兴起"], ["Cluster towns", "specialized by product", "镇域专业化"], ["Diaspora", "Italy, France, Africa", "意法非"], ["Firm size", "family-scale", "家族规模"]]
    },
    {
      cls: "chaoshan",
      tagEn: "Chaoshan · 潮商",
      tagZh: "潮商",
      titleEn: "Diaspora-anchored capital",
      titleZh: "侨网锚定的资本",
      subEn: "Home: eastern Guangdong · Metro: Hong Kong + Southeast Asia",
      subZh: "故乡:粤东 · 都市:香港 + 东南亚",
      bodyEn: `The Chaoshan region (Chaozhou + Shantou + Jieyang) is mountainous behind, sea-facing, Teochew-speaking — a distinct linguistic and cultural region. Mass nineteenth-century emigration to Siam (Thailand), Vietnam, Singapore, and Malaya created a diaspora that, by the late twentieth century, controlled significant portions of the rice trade, banking, real estate, and conglomerate business across Southeast Asia. Hong Kong served as the financial hub linking these networks back to mainland investment.`,
      bodyZh: `潮汕地区(潮州+汕头+揭阳)背山面海、操潮州话——一个独立的语言文化区。十九世纪大规模移居暹罗(泰国)、越南、新加坡、马来亚,形成的侨网在二十世纪末控制了东南亚相当部分的米业、银行、房地产与综合企业。香港作为金融枢纽,将该网络与大陆投资重新连接。`,
      stats: [["Era", "1860s → present", "1860s 至今"], ["Diaspora", "TH, SG, MY, VN", "泰新马越"], ["HK role", "financial hub", "金融枢纽"], ["Industry", "rice, real estate, banking", "米、地产、银行"]]
    }
  ];

  function renderMerchants() {
    const host = document.getElementById("merchantGrid");
    if (!host) return;
    host.innerHTML = merchants.map(m => `
      <div class="merchant ${m.cls}">
        <div class="merchant-tag">${m.tagEn} · ${m.tagZh}</div>
        <h3><span lang="en">${m.titleEn}</span><span lang="zh">${m.titleZh}</span></h3>
        <div class="sub"><span lang="en">${m.subEn}</span><span lang="zh">${m.subZh}</span></div>
        <p><span lang="en">${m.bodyEn}</span><span lang="zh">${m.bodyZh}</span></p>
        <div class="stat-row">
          ${m.stats.map(s => `<div><span lang="en">${s[0]}</span><span lang="zh">${s[2]}</span><span class="v">${s[1]}</span></div>`).join("")}
        </div>
      </div>
    `).join("");
  }
  renderMerchants();

  // Shanxi deep-dive cards (extra detail beneath the merchant grid)
  const shanxiCards = [
    {
      kicker: ["Open-Centered Salt Law · 开中法"],
      titleEn: "Frontier supply gives Shanxi merchants the empire&apos;s first private credit network",
      titleZh: "边塞供应使晋商建成帝国最早的民间信用网",
      bodyEn: `From 1370 onward, the early Ming required salt-license holders to deliver grain to northern frontier garrisons in exchange for the right to trade salt. Shanxi merchants — adjacent to the frontier and already organized for it — captured the system. The result was a private logistics network that crossed dozens of provinces and required durable trust mechanisms. The piaohao draft banks four centuries later were not invented from scratch — they were the institutional offspring of this earlier infrastructure.`,
      bodyZh: `1370 年起,明初要求盐引持有者向北方边塞输送粮食,以交换盐业经营权。晋商邻近边塞、已为之组织,主导了该体系。其结果是一张跨数十省、要求持久信任机制的民间物流网。四百年后的票号并非从零发明——它是这一更早基础结构的制度后裔。`
    },
    {
      kicker: ["Piaohao 票号"],
      titleEn: "How Pingyao banked an empire",
      titleZh: "平遥如何为帝国融资"
,
      bodyEn: `The first piaohao, Rishengchang (日昇昌), opened in Pingyao around 1823. By 1900 the system had ~30 head firms with 400+ branches across China and outposts in Russia, Mongolia, Japan, and Southeast Asia. Piaohao moved silver — physically and through paper drafts — for merchants, lineages, and the Qing state itself. They collapsed within a decade after 1911, partly because the Qing state collapsed, partly because foreign-style banks could now operate freely.`,
      bodyZh: `首家票号"日昇昌"约 1823 年于平遥开业。至 1900 年,该体系约有 30 家总号、400 余家分号遍及中国,并延伸至俄、蒙、日及东南亚。票号为商人、宗族乃至清廷自身,以实银与纸券方式调度白银。1911 年后约十年间崩塌——一是清廷崩溃,二是新式外国银行此时可自由经营。`
    },
    {
      kicker: ["Pre-Ming · 明代之前"],
      titleEn: "What we can — and cannot — say about Tang and Song Shanxi commerce",
      titleZh: "关于唐宋晋地商业,我们可以说与不可说的事",
      bodyEn: `Tang-era timber and salt commerce in Bingzhou is well-documented; Song-era frontier supply is well-documented; Yuan-era frontier supply persisted under Mongol salt monopolies. What is <strong>not</strong> well-documented is continuous lineage-level identity from Tang merchant families to Ming-Qing piaohao founders. The structural conditions persisted; the specific actors usually did not. We treat this as an open historiographic question.`,
      bodyZh: `唐代并州的木材与盐业贸易,有明确记载;宋代边塞供应,有明确记载;元代蒙古盐法下,边塞供应延续。<strong>未</strong>明确记载的是:从唐代商人家族到明清票号创办者之间存在血脉级身份连续性。结构条件延续,具体行动者往往未延续。我们将此视为一个开放的史学问题。`
    }
  ];
  function renderShanxiDeep() {
    const host = document.getElementById("shanxiDeep");
    if (!host) return;
    host.innerHTML = shanxiCards.map(c => `
      <div class="card">
        <div class="kicker">${c.kicker[0]}</div>
        <h3><span lang="en">${c.titleEn}</span><span lang="zh">${c.titleZh}</span></h3>
        <p><span lang="en">${c.bodyEn}</span><span lang="zh">${c.bodyZh}</span></p>
      </div>
    `).join("");
  }
  renderShanxiDeep();

  // ─── Module 05 · Huizhou cards ───────────────────────────────────
  const huizhouCards = [
    {
      kicker: ["Geography · 地理"],
      titleEn: "Seven mountains, one water, two fields",
      titleZh: "七山一水二分田",
      bodyEn: `Southern Anhui&apos;s Huangshan range left only a sliver of arable river valley. The historical population pressed against this ceiling continuously from the Song onward; by the Ming, exporting young men to commerce had become the standard household strategy.`,
      bodyZh: `皖南黄山山脉仅留下狭窄的河谷耕地。自宋以降,人口持续抵达这一上限;至明代,把年轻男丁外派经商已成为家户的标准策略。`
    },
    {
      kicker: ["Salt · 盐"],
      titleEn: "Yangzhou salt licenses concentrate Huizhou wealth",
      titleZh: "扬州盐引集中徽商财富",
      bodyEn: `For most of the Ming and early Qing, the Yangzhou salt monopoly was the largest single concentration of mercantile wealth in the empire. Huizhou families — close enough to manage operations, far enough to need the move — captured a disproportionate share. Some single Huizhou families sat on fortunes comparable to small European principalities of the same period.`,
      bodyZh: `明中至清初,扬州盐法是帝国规模最大的商业财富集中。徽州家族近以管理、远以为需,占据了不成比例的份额。部分单一徽州家族的财富,可比同期欧洲小公国。`
    },
    {
      kicker: ["Lineage · 宗族"],
      titleEn: "Lineage temples as financial-and-educational infrastructure",
      titleZh: "祠堂作为金融与教育基建",
      bodyEn: `Huizhou&apos;s thousands of lineage temples were not just ritual buildings. They held collective land, ran schools, financed examination candidates, supported widows of merchants who died on the road, and underwrote the credit of family members trading hundreds of kilometers away. The temple was, functionally, a small bank with a clan boundary.`,
      bodyZh: `徽州数千座祠堂并非仅为礼仪建筑。它们持有族产、办学塾、资助科举、抚恤客死他乡的商人遗孀、为远方贸易的族人作信用背书。祠堂在功能上,是一所以宗族为边界的小型银行。`
    },
    {
      kicker: ["Scholar-merchant · 士商合流"],
      titleEn: "Why Huizhou produced both bankers and chancellors",
      titleZh: "徽州何以同时产出银行家与宰辅",
      bodyEn: `Most other merchant communities accepted a tradeoff between commercial wealth and examination success. Huizhou rejected that tradeoff: the same family bankrolled examination preparation with merchant capital, and a successful examiner uncle insulated the family&apos;s commercial operations politically. The fusion of literati prestige with mercantile capacity is the most distinctive feature of Huizhou compared to Shanxi or Ningbo.`,
      bodyZh: `多数商人群体接受商业财富与科举功名之间的取舍。徽州拒绝此取舍:同一家族以商人资本支持科举备试,而成功的科举叔伯则为家族商业运作提供政治屏障。士绅声望与商人能力的融合,是徽州相对晋商或宁波商人最具特色的特征。`
    }
  ];
  function renderHuizhou() {
    const host = document.getElementById("huizhouCards");
    if (!host) return;
    host.innerHTML = huizhouCards.map(c => `
      <div class="card">
        <div class="kicker">${c.kicker[0]}</div>
        <h3><span lang="en">${c.titleEn}</span><span lang="zh">${c.titleZh}</span></h3>
        <p><span lang="en">${c.bodyEn}</span><span lang="zh">${c.bodyZh}</span></p>
      </div>
    `).join("");
  }
  renderHuizhou();

  // ─── Module 06 · Coastal cards ───────────────────────────────────
  const coastalCards = [
    {
      kicker: ["Ningbo · 宁波"],
      titleEn: "From Tang maritime port to Shanghai banking elite",
      titleZh: "从唐代海港到上海银行业精英",
      bodyEn: `Ningbo handled Japan-bound shipping under the Tang and Song; Ningbo native banks (qianzhuang) handled the Yangtze Delta&apos;s silver clearing under the Ming and Qing. When Shanghai opened in 1843, Ningbo merchants and native-place associations migrated en masse and ran most of Shanghai&apos;s pre-1949 native banking, shipping, and early industry.`,
      bodyZh: `宁波于唐宋承担对日航运;明清两代,宁波钱庄承担长三角的白银清算。1843 年上海开埠后,宁波商人与同乡会大规模迁徙,运营 1949 年前上海多数的钱庄业、航运业与早期工业。`
    },
    {
      kicker: ["Wenzhou · 温州"],
      titleEn: "Mountain isolation breeds firm-cluster specialization",
      titleZh: "山地孤立催生集群专业化",
      bodyEn: `Wenzhou&apos;s geographic isolation kept it nearly invisible to Beijing through the entire Mao era — and that is part of why post-1978 reform took root there so explosively. Each Wenzhou town came to specialize in a single product (lighters, buttons, eyeglasses, valves) at micro-scale, with hundreds of small family firms competing locally and aggregating internationally.`,
      bodyZh: `温州的地理孤立使其在毛时代几乎不为北京所见——这正是 1978 年后改革在此爆发性扎根的部分原因。温州各乡镇逐渐专攻一种产品(打火机、纽扣、眼镜、阀门),以微小尺度本地竞争,以国际尺度集成。`
    },
    {
      kicker: ["Shanghai effect · 上海效应"],
      titleEn: "What changed in 1843",
      titleZh: "1843 年改变了什么",
      bodyEn: `The opening of Shanghai recreated overnight a coastal commercial gravity field of unprecedented scale. The merchant communities adjacent to that field — Ningbo, Shaoxing, Jiangsu, Wenzhou — were positioned to absorb the new demand. Inland merchant communities were not. The 1843 event is one of the cleanest natural experiments in Chinese economic geography.`,
      bodyZh: `上海开埠在一夜之间重塑了规模空前的沿海商业引力场。邻近该场的商人群体——宁波、绍兴、江苏、温州——具备吸纳新需求的位置;内陆商人群体则不具备。1843 年事件是中国经济地理史上最干净的自然实验之一。`
    },
    {
      kicker: ["Comparison · 对比"],
      titleEn: "Why Ningbo became finance and Wenzhou became manufacturing",
      titleZh: "宁波缘何为金融、温州缘何为制造",
      bodyEn: `Ningbo had pre-existing native-banking institutions and proximity to Shanghai; it integrated upward into modern finance. Wenzhou had no such pre-existing institutional stack and was further from Shanghai; when its turn came post-1978, it built family-firm manufacturing instead. Same coast, different prior infrastructure, different specialization paths.`,
      bodyZh: `宁波具备既有钱庄制度与靠近上海的优势,向上整合入现代金融。温州无此制度堆栈、且离上海更远;1978 年后轮到它时,转向家族企业制造业。同一海岸,既有基础不同,专业化路径不同。`
    }
  ];
  function renderCoastal() {
    const host = document.getElementById("coastalCards");
    if (!host) return;
    host.innerHTML = coastalCards.map(c => `
      <div class="card">
        <div class="kicker">${c.kicker[0]}</div>
        <h3><span lang="en">${c.titleEn}</span><span lang="zh">${c.titleZh}</span></h3>
        <p><span lang="en">${c.bodyEn}</span><span lang="zh">${c.bodyZh}</span></p>
      </div>
    `).join("");
  }
  renderCoastal();

  // ─── Module 07 · Chaoshan cards ──────────────────────────────────
  const chaoshanCards = [
    {
      kicker: ["Diaspora · 侨网"],
      titleEn: "From rice trade to conglomerate empires",
      titleZh: "从米贸到综合企业帝国",
      bodyEn: `Chaoshan emigrants dominated rice exporting in Bangkok by the late nineteenth century. From rice they integrated into milling, banking, shipping, and eventually multi-industry holding companies. By the late twentieth century, Chaoshan-rooted business families ran some of the largest private fortunes in greater China and Southeast Asia.`,
      bodyZh: `至十九世纪末,潮汕侨民在曼谷主导大米出口业。从大米入米厂、银行、航运,最终至多元化控股集团。至二十世纪末,以潮汕为根的商人家族掌握大中华与东南亚一些规模最大的民营财富。`
    },
    {
      kicker: ["HK amplifier · 港之放大器"],
      titleEn: "Hong Kong as financial bridge",
      titleZh: "香港作为金融桥梁",
      bodyEn: `Most major Chaoshan business groups maintain a Hong Kong corporate base that connects mainland investment, Southeast-Asian operations, and global finance. The structural role is that of a translator: between civil-law mainland regulation and common-law international contract, between RMB and USD, between SOE-dominant home markets and private-sector overseas operations.`,
      bodyZh: `多数大型潮汕商业集团在香港维持公司基地,连接大陆投资、东南亚运营与全球金融。其结构角色是"翻译":在大陆法规与普通法国际合同之间、人民币与美元之间、国营主导的本土市场与民营主导的海外业务之间。`
    },
    {
      kicker: ["Lineage capital · 宗族资本"],
      titleEn: "Family-firm continuity across generations",
      titleZh: "家族企业的代际延续",
      bodyEn: `Chaoshan business culture preserves an unusual degree of patrilineal succession in publicly-listed firms — eldest son to chairmanship, second son to a divisional COO role, daughters often educated and married into adjacent families. Whether this is changing under contemporary market pressure is itself an open empirical question.`,
      bodyZh: `潮汕商业文化在公开上市公司中保留了异常程度的父系继承——长子任董事长、次子任分管 COO、女儿常受高等教育并联姻邻近家族。当代市场压力下此模式是否在变,本身即是一个开放的实证问题。`
    },
    {
      kicker: ["Speech · 语言"],
      titleEn: "Why Teochew identity remained distinct",
      titleZh: "潮州身份何以保持独立"
,
      bodyEn: `Teochew (Chaozhou-hua) is mutually unintelligible with Cantonese and standard Mandarin. Mountain isolation behind the Chaoshan coast preserved this linguistic boundary; diaspora kinship preserved it abroad. A merchant network that speaks its own internal language has a built-in privacy mechanism for credit and contract enforcement — a small but real institutional advantage.`,
      bodyZh: `潮州话与粤语、普通话互不相通。潮汕沿海背后的山地孤立保护了这一语言边界;海外的宗族网络在异乡延续之。一个内部使用自有语言的商人网络,自带信用与合同执行的"隐私机制"——一项小而真实的制度优势。`
    }
  ];
  function renderChaoshan() {
    const host = document.getElementById("chaoshanCards");
    if (!host) return;
    host.innerHTML = chaoshanCards.map(c => `
      <div class="card">
        <div class="kicker">${c.kicker[0]}</div>
        <h3><span lang="en">${c.titleEn}</span><span lang="zh">${c.titleZh}</span></h3>
        <p><span lang="en">${c.bodyEn}</span><span lang="zh">${c.bodyZh}</span></p>
      </div>
    `).join("");
  }
  renderChaoshan();

  // ─── Module 08 · Global parallels ────────────────────────────────
  const globalCards = [
    {
      kicker: ["Armenian merchants · 亚美尼亚商人"],
      titleEn: "New Julfa to the Indian Ocean",
      titleZh: "新朱尔法至印度洋",
      bodyEn: `Armenian merchants based in New Julfa (Isfahan) ran one of the most sophisticated long-distance trading networks of the seventeenth century — silk to Europe, silver to Asia, double-entry bookkeeping in Armenian script. Mountain origins, minority status, multilingualism, dispersed kinship — every element rhymes structurally with Shanxi and Chaoshan.`,
      bodyZh: `以新朱尔法(伊斯法罕)为基地的亚美尼亚商人,运营了十七世纪最精密的长距离贸易网之一——丝绸至欧、白银至亚、用亚美尼亚文书写复式记账。山地起源、少数族群身份、多语能力、分散的宗族——每一要素都在结构上与晋商、潮商共鸣。`
    },
    {
      kicker: ["Jewish trading networks · 犹太商网"],
      titleEn: "Court Jews, Sephardi traders, Ashkenazi banking",
      titleZh: "宫廷犹太人、塞法迪商、阿什肯纳兹银行家"
,
      bodyEn: `Multiple Jewish trading networks across medieval and early-modern Europe specialized in finance and long-distance trade in part because access to land ownership and many craft guilds was legally restricted. Specialization is structural — under exclusion, mobile commerce is one of the few remaining strategies. The same exclusion produced cosmopolitan multilingualism that enabled long-distance arbitrage.`,
      bodyZh: `中世纪与近代早期欧洲多个犹太贸易网,部分因法律限制土地所有权与多种工匠行会准入而专业化于金融与长程贸易。专业化是结构性的——在排斥之下,流动商业是少数可走的策略。同一排斥催生了有助于长程套利的国际化多语能力。`
    },
    {
      kicker: ["Lebanese traders · 黎巴嫩商人"],
      titleEn: "From Mount Lebanon to West Africa",
      titleZh: "从黎巴嫩山到西非",
      bodyEn: `Mount Lebanon emigration from the late nineteenth century onward seeded merchant communities across West Africa, Latin America, and Australia. Mountain agricultural ceiling, late-Ottoman political volatility, and family-network discipline produced a diaspora commercial pattern that maps closely onto the Chaoshan-to-Southeast-Asia template.`,
      bodyZh: `自十九世纪末起的黎巴嫩山移民,在西非、拉美与澳洲播下商人社区。山地农业天花板、晚期奥斯曼政治动荡、与家族网络纪律,产生了与潮汕至东南亚模板高度对应的侨商模式。`
    },
    {
      kicker: ["Swiss alpine commerce · 瑞士山地商业"],
      titleEn: "Watches, banks, and mountain valleys",
      titleZh: "钟表、银行与山谷"
,
      bodyEn: `Swiss alpine valleys — mountainous, agriculturally constrained, but adjacent to wealthy European markets — developed early specialization in watchmaking, mercenary service, and eventually banking and asset management. The structural argument is the same: high mountains plus dense surrounding cities equals trade and finance specialization, not subsistence farming.`,
      bodyZh: `瑞士阿尔卑斯山谷——山地、农业受限,但邻近富裕的欧洲市场——较早专业化于钟表、雇佣兵服务,最终至银行与资产管理。结构性论点相同:高山 + 邻近密集都市 = 贸易与金融专业化,而非自给农耕。`
    }
  ];
  function renderGlobal() {
    const host = document.getElementById("globalCards");
    if (!host) return;
    host.innerHTML = globalCards.map(c => `
      <div class="card">
        <div class="kicker">${c.kicker[0]}</div>
        <h3><span lang="en">${c.titleEn}</span><span lang="zh">${c.titleZh}</span></h3>
        <p><span lang="en">${c.bodyEn}</span><span lang="zh">${c.bodyZh}</span></p>
      </div>
    `).join("");
  }
  renderGlobal();

  // ─── Module 09 · Gravity simulator ───────────────────────────────
  const gravityPairs = {
    shanxiBeijing: { en: "Shanxi → Beijing (imperial capital)", zh: "晋商 → 北京(帝都)",
      base: { mobility: 70, finance: 85, manufacturing: 30, diaspora: 45, dependency: 80, durability: 75 } },
    huizhouNanjing: { en: "Huizhou → Nanjing/Yangzhou (delta market)", zh: "徽商 → 南京/扬州(三角洲市场)",
      base: { mobility: 75, finance: 70, manufacturing: 35, diaspora: 40, dependency: 70, durability: 70 } },
    ningboShanghai: { en: "Ningbo → Shanghai (treaty port)", zh: "甬商 → 上海(通商口岸)",
      base: { mobility: 80, finance: 90, manufacturing: 60, diaspora: 65, dependency: 75, durability: 85 } },
    wenzhouShanghai: { en: "Wenzhou → Shanghai + global", zh: "温商 → 上海 + 海外",
      base: { mobility: 90, finance: 50, manufacturing: 90, diaspora: 80, dependency: 50, durability: 70 } },
    chaoshanHK: { en: "Chaoshan → Hong Kong + SE Asia", zh: "潮商 → 香港 + 东南亚",
      base: { mobility: 85, finance: 75, manufacturing: 60, diaspora: 95, dependency: 60, durability: 80 } }
  };
  const gravityDims = [
    ["mobility",      "Mobility / migration", "流动 / 迁徙"],
    ["finance",       "Financial specialization", "金融专业化"],
    ["manufacturing", "Manufacturing role",  "制造业角色"],
    ["diaspora",      "Diaspora reach",      "侨网辐射"],
    ["dependency",    "Capital-city dependency", "都城依赖"],
    ["durability",    "Network durability",  "网络持久性"]
  ];
  function fillGravity() {
    const sel = document.getElementById("gPair");
    sel.innerHTML = Object.keys(gravityPairs).map(k =>
      `<option value="${k}">${gravityPairs[k].en} · ${gravityPairs[k].zh}</option>`
    ).join("");
  }
  fillGravity();
  function clamp(n) { return Math.max(0, Math.min(100, Math.round(n))); }
  function runGravity() {
    const pair = gravityPairs[document.getElementById("gPair").value];
    const demand = +document.getElementById("gDemand").value;
    const dist   = +document.getElementById("gDist").value;
    const floor  = +document.getElementById("gFloor").value;
    const kin    = +document.getElementById("gKin").value;

    const mobility = clamp(pair.base.mobility + (50 - floor) * 0.3 + (50 - dist) * 0.2);
    const finance = clamp(pair.base.finance + (demand - 50) * 0.3 + (kin - 50) * 0.25 - (dist - 50) * 0.15);
    const manufacturing = clamp(pair.base.manufacturing + (demand - 50) * 0.2 + (50 - floor) * 0.2 - (dist - 50) * 0.1);
    const diaspora = clamp(pair.base.diaspora + (kin - 50) * 0.3 + (50 - floor) * 0.2 + (dist - 50) * 0.15);
    const dependency = clamp(pair.base.dependency + (demand - 50) * 0.4 - (dist - 50) * 0.2);
    const durability = clamp(pair.base.durability + (kin - 50) * 0.4 + (50 - floor) * 0.1);

    const scores = { mobility, finance, manufacturing, diaspora, dependency, durability };
    document.getElementById("gBars").innerHTML = gravityDims.map(d => `
      <div class="sbar">
        <span><span lang="en">${d[1]}</span><span lang="zh">${d[2]}</span></span>
        <span class="meter"><i style="width:${scores[d[0]]}%"></i></span>
        <span class="v">${scores[d[0]]}</span>
      </div>
    `).join("");

    const en = `Pair <strong>${pair.en}</strong>. Capital demand ${demand}, distance friction ${dist}, agricultural floor ${floor}, kinship infrastructure ${kin}. Mobility ${mobility}, finance ${finance}, manufacturing ${manufacturing}, diaspora ${diaspora}, dependency ${dependency}, durability ${durability}. Notice: kinship infrastructure correlates with both finance specialization and network durability — the social technology is doing the heavy lifting, not the geography alone.`;
    const zh = `配对 <strong>${pair.zh}</strong>。都城需求 ${demand},距离摩擦 ${dist},农业地板 ${floor},宗族基建 ${kin}。流动 ${mobility},金融 ${finance},制造 ${manufacturing},侨网 ${diaspora},依赖 ${dependency},持久 ${durability}。注意:宗族基建与金融专业化、网络持久性同时正相关——是社会技术在做主要工作,而非地理单方面。`;
    document.getElementById("gReadout").innerHTML = `<span lang="en">${en}</span><span lang="zh">${zh}</span>`;
  }
  ["gPair", "gDemand", "gDist", "gFloor", "gKin"].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener("input", runGravity);
    el.addEventListener("change", runGravity);
  });
  runGravity();

  // ─── Module 10 · Modern continuation ─────────────────────────────
  const modernCards = [
    {
      kicker: ["Wenzhou + Italy"],
      titleEn: "Prato as Wenzhou&apos;s European outpost",
      titleZh: "普拉托作为温州的欧洲前哨"
,
      bodyEn: `By 2010 the Italian textile city of Prato hosted ~30,000 Wenzhou-origin garment workers and small entrepreneurs, supplying European fast fashion from European soil. The structural pattern — kinship credit, micro-firm specialization, trans-continental supply chain — is recognizably the same one that took Wenzhou shoes to Russia in the 1990s. The technology updates; the architecture does not.`,
      bodyZh: `至 2010 年,意大利纺织城普拉托容纳约 3 万温州籍服装工人与小型创业者,从欧洲本土供应欧洲快时尚。结构性模式——宗族信用、微型企业专业化、跨大陆供应链——可识别地与 1990 年代把温州鞋送往俄罗斯的同一架构相同。技术更新,结构未变。`
    },
    {
      kicker: ["Yiwu · 义乌"],
      titleEn: "A small commodity hub for the world",
      titleZh: "供应全球的小商品枢纽",
      bodyEn: `Yiwu in central Zhejiang sells about 30% of the world&apos;s small commodities — buttons, ribbons, holiday decorations, plastic flowers. The merchants in Yiwu&apos;s wholesale markets are heavily Wenzhou-and-southern-Zhejiang-origin and operate the same family-firm cluster logic at a single market scale.`,
      bodyZh: `位于浙江中部的义乌销售全球约 30% 的小商品——纽扣、缎带、节庆装饰、塑料花。义乌批发市场的商户大量为温州与浙南籍商人,以单一市场尺度运作同一家族企业集群逻辑。`
    },
    {
      kicker: ["Diaspora · Quanzhou"],
      titleEn: "Hokkien networks across Southeast Asia",
      titleZh: "横跨东南亚的闽南网络",
      bodyEn: `Quanzhou and southern Fujian — also a mountain-and-coast region — sent decades of emigrants to the Philippines, Indonesia, and the Malay archipelago. The Sy, Tan, Lim, Go families of contemporary Philippine and Indonesian conglomerates trace home villages back to specific southern-Fujian counties. The Mountain-Merchant pattern remains fully active in modern Southeast-Asian capitalism.`,
      bodyZh: `泉州与闽南——同为山海地区——数十年间向菲律宾、印尼与马来群岛输出移民。当代菲律宾与印尼综合企业的施、陈、林、吴等家族,可追溯至闽南具体县邑。"山地商人"模式在当代东南亚资本主义中仍完全活跃。`
    },
    {
      kicker: ["Platform era · 平台时代"],
      titleEn: "Algorithm as new urban gravity",
      titleZh: "算法作为新都市引力",
      bodyEn: `In a platform economy, &quot;adjacency to a major capital&quot; is partly replaced by &quot;adjacency to a major platform&quot;. Tens of thousands of Wenzhou and Yiwu sellers operate on Amazon, Shopee, and TikTok Shop with no physical proximity to traditional capitals. Whether this fully substitutes for urban gravity, or merely supplements it, is one of the live empirical questions of contemporary Chinese commerce.`,
      bodyZh: `在平台经济中,"邻近大都城"部分被"邻近大平台"所替代。数以万计的温州、义乌卖家在亚马逊、Shopee、TikTok Shop 上经营,与传统都城无物理邻近。它究竟能否完全替代都市引力、抑或仅为补充,是当代中国商业最具实证活力的问题之一。`
    }
  ];
  function renderModern() {
    const host = document.getElementById("modernCards");
    if (!host) return;
    host.innerHTML = modernCards.map(c => `
      <div class="card">
        <div class="kicker">${c.kicker[0]}</div>
        <h3><span lang="en">${c.titleEn}</span><span lang="zh">${c.titleZh}</span></h3>
        <p><span lang="en">${c.bodyEn}</span><span lang="zh">${c.bodyZh}</span></p>
      </div>
    `).join("");
  }
  renderModern();

  // ─── AI ──────────────────────────────────────────────────────────
  const aiCanned = [
    {
      qEn: "Why mountains, not plains?",
      qZh: "为什么是山地,而非平原?",
      aEn: `<p><em>Geographer · structural answer</em></p>
        <p>Plains specialize in agriculture because they are good at it. Mountains do not. A mountain village that doubles down on its weak agricultural base in a year of bad weather may not survive. A village that splits its labor force — half farming, half walking to a nearby city to trade timber, salt, herbs, or labor — buffers against the bad year.</p>
        <p>Repeated across generations, this hedging strategy crystallizes into specialized institutions: native-place associations, lineage credit, kinship apprenticeships, secret commercial dialects, mobile capital. By the time the strategy has been running for centuries, the mountain region has become structurally a merchant region.</p>
        <p>Plains never need to develop these institutions because their primary insurance — the land itself — is already there.</p>`,
      aZh: `<p><em>地理学家 · 结构性答复</em></p>
        <p>平原专注于农业,因为它擅长农业。山地并不擅长。一个在歉年加倍依赖薄弱农业基础的山村,可能挺不过去。一个把劳动力一分为二——一半种田,一半步行至邻近都市贩卖木材、盐、草药或劳力——的村落,则可对冲歉年。</p>
        <p>世代延续之后,这一对冲策略结晶为专门制度:同乡会、宗族信用、宗亲学徒制、商人专用方言、流动资本。该策略运作数百年后,山地地区便在结构上成为一个商人地区。</p>
        <p>平原从不需要发展这些制度,因为它的主要保险——土地本身——已在。</p>`
    },
    {
      qEn: "How does urban gravity actually work?",
      qZh: "都市引力如何运作?",
      aEn: `<p><em>Geographer · gravity-model answer</em></p>
        <p>A simple model: a major city generates a demand field whose intensity scales with city population times city wealth. The reach of the field decays with distance — slowly along navigable rivers and good roads, faster across mountains. A mountain region inside that field, but with low local agricultural floor, has the largest gradient between &quot;stay home&quot; and &quot;go to the city&quot; — and so produces the most merchants per capita.</p>
        <p>Three predictions follow:</p>
        <p><strong>(1)</strong> Mountains close to capitals produce more merchants than mountains far from capitals.</p>
        <p><strong>(2)</strong> Mountain regions that lose proximity to a capital (because the capital moves) gradually lose their merchant networks.</p>
        <p><strong>(3)</strong> When a new metropolitan center appears (Shanghai 1843, Shenzhen 1980), nearby mountain regions activate as merchant suppliers within a single generation.</p>`,
      aZh: `<p><em>地理学家 · 引力模型答复</em></p>
        <p>一个简单模型:大型城市产生需求场,其强度随城市人口乘以财富而增。该场的辐射范围随距离衰减——沿可航河流与良道衰减缓慢,跨山地衰减快。位于该场内、但本地农业地板较低的山地区域,在"留乡"与"赴城"之间的梯度最大——因此人均商人数最多。</p>
        <p>由此可得三项预测:</p>
        <p><strong>(1)</strong> 离都城近的山地比远的山地产生更多商人。</p>
        <p><strong>(2)</strong> 一旦山地失去靠近都城的优势(都城迁移),其商人网络逐渐衰退。</p>
        <p><strong>(3)</strong> 新都市中心出现时(1843 年上海、1980 年深圳),邻近山地于一代之间被激活为商人供给。</p>`
    },
    {
      qEn: "Did Shanxi commerce really go back to the Tang?",
      qZh: "晋地商业真的可上溯至唐代吗?",
      aEn: `<p><em>Geographer · careful answer</em></p>
        <p>Some elements: yes. Some elements: probably yes. Some elements: not provable.</p>
        <p>Yes: Tang-era Shanxi (Bingzhou) had documented timber commerce, frontier military supply, and at least one merchant-family-to-founding-official trajectory in the Wu Zetian father&apos;s case. These are in the standard Tang histories.</p>
        <p>Probably yes: Sui-Tang grain-and-salt commerce networks involving Shanxi merchants persisted in some form through Song frontier supply, Yuan salt monopolies, and into the Ming &quot;exchange-salt-for-grain&quot; system. The structural conditions — frontier proximity, transport corridor — were continuous.</p>
        <p>Not provable: that the same families running Tang timber commerce became, in lineage terms, the ancestors of the Ming-Qing piaohao founders. The historical record does not support this strong claim and we treat it as a hypothesis.</p>`,
      aZh: `<p><em>地理学家 · 谨慎答复</em></p>
        <p>部分元素:是。部分元素:大概是。部分元素:不可证。</p>
        <p>是:唐代山西(并州)有可考的木材商业、边塞军事供应,以及至少一位商人家族至开国功臣的轨迹(武则天父亲)。皆见于正史。</p>
        <p>大概是:涉及晋地商人的隋唐粮盐商业网络,以某种形式经宋代边塞供应、元代盐法,延续至明代开中法。结构条件——靠近边塞、运输走廊——具有连续性。</p>
        <p>不可证:运营唐代木材商业的同样家族,在血脉意义上成为明清票号创办者的祖先。历史记录不支持此强主张,我们视为假说。</p>`
    },
    {
      qEn: "How is this different from saying &quot;some peoples are good at business&quot;?",
      qZh: `这与"某些族群天生会做生意"有何不同?`,
      aEn: `<p><em>Geographer · meta-answer</em></p>
        <p>Critically different. The structural argument predicts <em>which</em> populations specialize in commerce as a function of geography, agricultural ceiling, and adjacent urban demand. It also predicts the reverse: when those conditions disappear, the specialization fades.</p>
        <p>The essentialist claim (&quot;these people are inherently good at business&quot;) cannot make this prediction. It treats specialization as a permanent group trait. Wenzhou before 1978 did not look entrepreneurial — the structure was not yet activated. After 1978, the structure activated, and the entrepreneurship appeared.</p>
        <p>If the people had simply been &quot;born entrepreneurs,&quot; we would have expected the trait to be visible all along. It was not. So the trait was never the right unit of analysis.</p>`,
      aZh: `<p><em>地理学家 · 元层答复</em></p>
        <p>差异关键。结构性论点根据地理、农业天花板与邻近都市需求,预测<em>哪些</em>人群专业化于商业;同时也预测反向情形:条件消失时,专业化消退。</p>
        <p>本质论主张("这些人天生会做生意")无法做出此预测。它把专业化当作永恒的群体性状。1978 年前的温州并不显得创业活跃——结构尚未激活。1978 年后结构激活,创业现象随即出现。</p>
        <p>若人们果真"天生创业",我们本应一直看到该特质。事实并非如此。因此该特质从来不是合适的分析单位。</p>`
    },
    {
      qEn: "Are today's Chinese entrepreneurs continuing the mountain-merchant tradition?",
      qZh: "今日的中国企业家在延续山地商人传统吗?",
      aEn: `<p><em>Geographer · continuity-with-mutation answer</em></p>
        <p>Partly. The structural conditions are partly continuous: mountain or land-thin regions adjacent to dense urban or platform demand still over-produce entrepreneurs (Wenzhou, Quanzhou, Chaoshan, Yiwu). Family-firm clusters and kinship-credit institutions remain active.</p>
        <p>But the structure is also changing. Modern adjacency includes platform adjacency, not just physical proximity to a capital. Family-firm credit competes with venture capital and listed-company governance. Diaspora networks are partly being absorbed into formal multinationals.</p>
        <p>The honest answer: the merchant-civilization template is not gone, but it is being remixed. Some firms today are direct lineage descendants of late-Qing merchant houses (a small number); many others are structurally similar without any direct lineage connection. The pattern is robust to historical discontinuity precisely because it is geographic and institutional, not purely genealogical.</p>`,
      aZh: `<p><em>地理学家 · 延续与突变并存的答复</em></p>
        <p>部分是。结构条件部分延续:邻近密集都市或平台需求的山地或耕地稀薄地区,仍过度产出企业家(温州、泉州、潮汕、义乌)。家族企业集群与宗族信用制度依然活跃。</p>
        <p>但结构也在变化。现代"邻近"包括平台邻近,而非仅都城物理邻近。家族企业信用与风险资本、上市公司治理同时竞争。侨网部分被正规跨国公司吸纳。</p>
        <p>诚实的答复:商人文明模板未消失,但正被重混。今日有一小部分企业是清末商家的直接血脉后裔;许多其他企业在结构上相似,但无直接血脉联系。该模式对历史不连续具有韧性——正因它是地理与制度性的,而非纯血脉性的。</p>`
    }
  ];

  function renderPrompts() {
    const host = document.getElementById("aiPrompts");
    if (!host) return;
    host.innerHTML = aiCanned.map((c, i) => `
      <button class="ai-prompt" data-idx="${i}">
        <span lang="en">${c.qEn}</span><span lang="zh">${c.qZh}</span>
      </button>
    `).join("");
    host.querySelectorAll(".ai-prompt").forEach(b => {
      b.addEventListener("click", () => {
        const idx = +b.dataset.idx;
        const c = aiCanned[idx];
        document.getElementById("aiOutput").innerHTML =
          `<span lang="en">${c.aEn}</span><span lang="zh">${c.aZh}</span>`;
      });
    });
  }
  renderPrompts();

  function freeTextAnswer(qRaw) {
    const q = qRaw.toLowerCase();
    const lang = root.getAttribute("data-lang") || "en";

    const matches = [];
    aiCanned.forEach(c => {
      const en = c.qEn.toLowerCase();
      const zh = c.qZh;
      let score = 0;
      en.split(/\s+/).forEach(w => { if (w.length > 3 && q.includes(w)) score++; });
      [...zh].forEach(ch => { if (q.includes(ch)) score++; });
      if (score) matches.push({ c, score });
    });
    matches.sort((a, b) => b.score - a.score);
    if (matches.length && matches[0].score >= 2) {
      return lang === "zh" ? matches[0].c.aZh : matches[0].c.aEn;
    }

    const topics = [
      { kw: ["piaohao", "票号", "draft bank"],
        en: `Piaohao were Shanxi-merchant draft banks, active roughly 1823–1911. They moved silver across China through paper drafts, financing inter-provincial trade and Qing tax transfers. The institutional ancestor was the Ming &quot;salt-for-grain&quot; frontier-supply system that had organized Shanxi commerce four centuries earlier.`,
        zh: `票号为晋商汇兑银行,约 1823–1911 年间活跃。其以纸券方式调度白银,为省际贸易与清廷税饷服务。其制度祖先是明代开中法——四百年前已组织起晋地商业的边塞供应体系。` },
      { kw: ["wu zetian", "武则天", "wu shihuo", "武士彠"],
        en: `Wu Shihuo, Wu Zetian&apos;s father, is recorded in the standard Tang histories as a timber merchant in Bingzhou before joining Li Yuan&apos;s Tang-founding rebellion. He is one of the &quot;Loyal Founding Officials.&quot; This is one well-attested case of pre-Ming Shanxi merchant capital interacting with dynastic finance.`,
        zh: `武则天之父武士彠,在《旧唐书》《新唐书》中记为并州的木材商人,后参与李渊建唐之事,被列为元从功臣。这是明代之前晋地商业资本与朝代级金融互动的有据可考的一例。` },
      { kw: ["yangzhou", "扬州", "salt"],
        en: `Yangzhou&apos;s Ming-Qing salt monopoly concentrated extraordinary mercantile wealth. Huizhou families captured a disproportionate share of the salt licenses, making Yangzhou one of the most ostentatious wealth centers in pre-modern Asia. The wealth was never local to Yangzhou itself — most flowed back to Huizhou lineage temples and gardens.`,
        zh: `扬州明清盐法集中了惊人的商业财富。徽州家族占据了不成比例的盐引份额,使扬州成为前现代亚洲最炫目的财富中心之一。该财富并非扬州本地所有——多数最终回流至徽州祠堂与园林。` },
      { kw: ["hong kong", "香港", "chaoshan", "潮汕"],
        en: `Hong Kong functions as the financial bridge for Chaoshan-rooted business networks operating across mainland China and Southeast Asia. The mountain-and-coast Chaoshan home region produced the migration; HK&apos;s common-law institutions and free port amplified the network globally.`,
        zh: `香港作为以潮汕为根、运作于大陆与东南亚之间的商业网络的金融桥梁。山海相接的潮汕本土产生迁徙,香港的普通法制度与自由港在全球放大了该网络。` }
    ];
    for (const t of topics) {
      if (t.kw.some(k => q.includes(k.toLowerCase()))) {
        return lang === "zh" ? `<p><em>地理学家 · 主题答复</em></p><p>${t.zh}</p>` : `<p><em>Geographer · topic answer</em></p><p>${t.en}</p>`;
      }
    }

    return lang === "zh"
      ? `<p><em>地理学家 · 一般答复</em></p>
         <p>这一问题没有直接对应的预设回答。我会从地理、宗族制度、市场需求三方向重组,但不会作族群本质论。</p>
         <p>把问题落在具体的商帮、具体行业或具体时段,我能给出更结构化的回答。</p>`
      : `<p><em>Geographer · general answer</em></p>
         <p>I do not have a directly matching canned answer. I will recombine across geography, lineage institutions, and market demand — but I will not produce ethnic essentialism.</p>
         <p>Ground the question in a specific merchant group, industry, or period and I can answer more structurally.</p>`;
  }

  document.getElementById("aiSend").addEventListener("click", () => {
    const v = document.getElementById("aiInput").value.trim();
    if (!v) return;
    document.getElementById("aiOutput").innerHTML = freeTextAnswer(v);
  });
  document.getElementById("aiInput").addEventListener("keydown", e => {
    if (e.key === "Enter") document.getElementById("aiSend").click();
  });

})();
