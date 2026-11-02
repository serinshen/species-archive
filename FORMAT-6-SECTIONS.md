# 晨间物种卡 · 小知识六节格式

用于网站 `js/cards-data.js` / `data/cards.json`、Page 示例与聊天卡片模板。`facts` **不再**用扁平 `string[]`，改为按固定顺序的对象数组。

## Schema

```json
{
  "id": "YYYY-MM-DD-slug",
  "date": "YYYY-MM-DD",
  "zh": "中文名",
  "en": "English name",
  "enAlt": null,
  "latin": "Genus species",
  "group": "鸟类|哺乳类|…",
  "order": "目",
  "family": "科",
  "image": "images/….jpg",
  "thumb": "images/…-thumb.jpg",
  "conservationGlobal": "濒危 EN（IUCN）",
  "conservationChina": "国家一级重点保护野生动物；中国生物多样性红色名录：濒危 EN",
  "facts": [
    { "label": "栖息地区", "text": "1–2 句：中国（及更广）地理分布" },
    { "label": "生境描述", "text": "1–2 句：栖息地类型" },
    { "label": "外形特征", "text": "1–2 句：外形；有性二型时一并写清" },
    { "label": "食物喜好", "text": "1–2 句：食性" },
    { "label": "育幼特点", "text": "1–2 句：繁殖 / 亲代抚育" },
    { "label": "特殊习性", "text": "1–2 句：独特行为或习性" }
  ],
  "credit": "照片出处与许可"
}
```

## 保护等级字段（每卡必填）

放在名称/分类信息附近、六节小知识之前展示；**不要**再在「特殊习性」里重复写保护等级。

| 字段 | 含义 | 写法 |
| --- | --- | --- |
| `conservationGlobal` | 全球层面 | IUCN 红色名录等级，中英短写，如 `濒危 EN（IUCN）`；未评估则写 `未评估 / Not Evaluated` 或准确的 `数据缺乏 DD` |
| `conservationChina` | 中国层面 | 国家重点保护级别（一级/二级/未列入）及/或中国生物多样性红色名录等级；勿臆造 |

UI 标签固定为：**全球保护等级**、**中国保护等级**。出处与核验笔记见 `CONSERVATION.md`。

## 固定标签（顺序不可改）

1. **栖息地区** — geographic range in China (and broader if relevant)
2. **生境描述** — habitat types
3. **外形特征** — label shortened; body text must still cover appearance **and** sexual dimorphism when known
4. **食物喜好** — diet
5. **育幼特点** — breeding / parental care
6. **特殊习性** — distinctive behaviors / habits（不含保护等级）

## 写作约定

- 中文为主；站点现有模式里一般不强制英译正文。
- 每节约 1–2 短句；事实可核，勿臆造。
- 卡片身份字段（名、日期、拉丁/中英、大类、保护等级、照片路径与 credit）与六节小知识分开维护。
- 晨间例行：生成当日卡时填满保护等级两字段 + 六节，再写入网站数据与聊天/Page 模板。

## 参考实现

已按本 schema 维护三张示例卡：`2026-11-01` 朱鹮、`2026-10-31` 赤腹松鼠、`2026-10-30` 獐。完整内容见 `cards-rewritten.json` 与 `data/cards.json`。
