export const experiments = [
  {
    id: "acid-base-neutralization",
    tags: ["酸碱中和", "滴定", "热效应"],
    title: {
      zh: "盐酸与氢氧化钠中和反应",
      en: "Neutralization of HCl and NaOH"
    },
    principle: {
      zh: "酸与碱发生中和反应，生成盐和水，同时放出热量。",
      en: "An acid reacts with a base to form salt and water, releasing heat."
    },
    equation: {
      zh: "HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)",
      en: "HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)"
    },
    steps: {
      zh: [
        "取50 mL稀盐酸于烧杯中，测量初始温度。",
        "缓慢加入等体积稀NaOH溶液，并持续搅拌。",
        "记录最高温度并计算温升。",
        "观察温度变化，分析中和反应的放热特性。"
      ],
      en: [
        "Add 50 mL dilute HCl to a beaker and measure initial temperature.",
        "Slowly add an equal volume of dilute NaOH while stirring.",
        "Record the peak temperature and calculate the rise.",
        "Analyze the exothermic nature of neutralization."
      ]
    }
  },
  {
    id: "oxygen-preparation",
    tags: ["气体制备", "催化", "分解"],
    title: {
      zh: "过氧化氢制氧气",
      en: "Oxygen from Hydrogen Peroxide"
    },
    principle: {
      zh: "过氧化氢在二氧化锰催化下分解，生成水和氧气。",
      en: "Hydrogen peroxide decomposes with MnO₂ catalyst to produce water and oxygen."
    },
    equation: {
      zh: "2H₂O₂(aq) → 2H₂O(l) + O₂(g)",
      en: "2H₂O₂(aq) → 2H₂O(l) + O₂(g)"
    },
    steps: {
      zh: [
        "向集气瓶中加入适量MnO₂。",
        "用滴管向反应瓶中滴加H₂O₂溶液。",
        "用排水集气法收集氧气。",
        "用带火星木条检验氧气。"
      ],
      en: [
        "Add MnO₂ to the reaction flask.",
        "Drop H₂O₂ solution into the flask.",
        "Collect oxygen by water displacement.",
        "Test oxygen with a glowing splint."
      ]
    }
  },
  {
    id: "copper-sulfate-crystallization",
    tags: ["结晶", "溶解度", "过滤"],
    title: {
      zh: "硫酸铜结晶",
      en: "Copper Sulfate Crystallization"
    },
    principle: {
      zh: "硫酸铜在热水中溶解度较大，冷却后溶解度降低形成晶体。",
      en: "CuSO₄ has higher solubility in hot water and crystallizes upon cooling."
    },
    equation: {
      zh: "CuSO₄·5H₂O(s) ⇌ Cu²⁺(aq) + SO₄²⁻(aq)",
      en: "CuSO₄·5H₂O(s) ⇌ Cu²⁺(aq) + SO₄²⁻(aq)"
    },
    steps: {
      zh: [
        "在烧杯中加入少量硫酸铜晶体和蒸馏水加热溶解。",
        "过滤除去不溶物，得到澄清的饱和溶液。",
        "让溶液自然冷却，观察晶体析出。",
        "记录晶体形态并分析结晶条件。"
      ],
      en: [
        "Heat CuSO₄ crystals in water to dissolve.",
        "Filter to obtain a clear saturated solution.",
        "Cool naturally and observe crystal formation.",
        "Record crystal shape and analyze conditions."
      ]
    }
  }
];
