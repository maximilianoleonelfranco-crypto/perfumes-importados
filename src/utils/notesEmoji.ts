/**
 * Mapeo inteligente de notas olfativas a emojis e iconos visuales elegantes
 */
export interface NoteVisual {
  emoji: string;
  category: "cítrico" | "frutal" | "floral" | "especiado" | "gourmand" | "amaderado" | "resinoso" | "fresco";
}

export function getNoteVisual(noteName: string): NoteVisual {
  const n = noteName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Cítricos
  if (n.includes("naranja") || n.includes("mandarina") || n.includes("kumquat")) {
    return { emoji: "🍊", category: "cítrico" };
  }
  if (n.includes("limon") || n.includes("bergamota") || n.includes("citrico")) {
    return { emoji: "🍋", category: "cítrico" };
  }
  if (n.includes("pomelo")) {
    return { emoji: "🍈", category: "cítrico" };
  }

  // Frutales
  if (n.includes("manzana")) {
    return { emoji: "🍏", category: "frutal" };
  }
  if (n.includes("pera")) {
    return { emoji: "🍐", category: "frutal" };
  }
  if (n.includes("melon")) {
    return { emoji: "🍈", category: "frutal" };
  }
  if (n.includes("sandia")) {
    return { emoji: "🍉", category: "frutal" };
  }
  if (n.includes("pina") || n.includes("anana")) {
    return { emoji: "🍍", category: "frutal" };
  }
  if (n.includes("mango")) {
    return { emoji: "🥭", category: "frutal" };
  }
  if (n.includes("coco")) {
    return { emoji: "🥥", category: "frutal" };
  }
  if (n.includes("frambuesa") || n.includes("frutos rojos") || n.includes("arandano") || n.includes("grosella")) {
    return { emoji: "🫐", category: "frutal" };
  }
  if (n.includes("ciruela") || n.includes("melocoton") || n.includes("lichi")) {
    return { emoji: "🍑", category: "frutal" };
  }

  // Florales
  if (n.includes("rosa")) {
    return { emoji: "🌹", category: "floral" };
  }
  if (n.includes("jazmin") || n.includes("flor de azahar") || n.includes("flores blancas") || n.includes("peonia") || n.includes("tuberosa") || n.includes("ylang") || n.includes("loto") || n.includes("campanilla")) {
    return { emoji: "🌸", category: "floral" };
  }
  if (n.includes("lavanda") || n.includes("iris") || n.includes("violeta")) {
    return { emoji: "🪻", category: "floral" };
  }
  if (n.includes("geranio") || n.includes("davana") || n.includes("lirio")) {
    return { emoji: "🌺", category: "floral" };
  }

  // Especias & Hierbas
  if (n.includes("canela")) {
    return { emoji: "🪵", category: "especiado" };
  }
  if (n.includes("pimienta")) {
    return { emoji: "🌶️", category: "especiado" };
  }
  if (n.includes("cardamomo") || n.includes("jengibre") || n.includes("curcuma") || n.includes("nuez moscada") || n.includes("salvia") || n.includes("romero") || n.includes("artemisia")) {
    return { emoji: "🫚", category: "especiado" };
  }
  if (n.includes("azafran")) {
    return { emoji: "🌾", category: "especiado" };
  }
  if (n.includes("menta")) {
    return { emoji: "🍃", category: "fresco" };
  }

  // Gourmand & Dulces
  if (n.includes("vainilla")) {
    return { emoji: "🍦", category: "gourmand" };
  }
  if (n.includes("caramelo") || n.includes("creme brulee") || n.includes("merengue")) {
    return { emoji: "🍮", category: "gourmand" };
  }
  if (n.includes("chocolate") || n.includes("cacao") || n.includes("praline")) {
    return { emoji: "🍫", category: "gourmand" };
  }
  if (n.includes("miel")) {
    return { emoji: "🍯", category: "gourmand" };
  }
  if (n.includes("cafe")) {
    return { emoji: "☕", category: "gourmand" };
  }
  if (n.includes("datil") || n.includes("castana") || n.includes("almendra") || n.includes("frutos secos")) {
    return { emoji: "🌰", category: "gourmand" };
  }
  if (n.includes("haba tonka") || n.includes("azucar") || n.includes("leche")) {
    return { emoji: "🫘", category: "gourmand" };
  }

  // Amaderados & Resinosos
  if (n.includes("oud") || n.includes("agar") || n.includes("sandalo") || n.includes("cedro") || n.includes("guayaco") || n.includes("roble") || n.includes("madera")) {
    return { emoji: "🪵", category: "amaderado" };
  }
  if (n.includes("pachuli") || n.includes("vetiver") || n.includes("musgo") || n.includes("bambu")) {
    return { emoji: "🌿", category: "amaderado" };
  }
  if (n.includes("ambar")) {
    return { emoji: "🪔", category: "resinoso" };
  }
  if (n.includes("incienso") || n.includes("mirra") || n.includes("olíbano") || n.includes("benjui") || n.includes("ladano") || n.includes("opoponaco") || n.includes("resina")) {
    return { emoji: "💨", category: "resinoso" };
  }
  if (n.includes("almizcle") || n.includes("musk") || n.includes("cashmeran")) {
    return { emoji: "☁️", category: "resinoso" };
  }
  if (n.includes("cuero")) {
    return { emoji: "👞", category: "amaderado" };
  }
  if (n.includes("tabaco") || n.includes("humo")) {
    return { emoji: "🍂", category: "resinoso" };
  }
  if (n.includes("marino") || n.includes("agua") || n.includes("sal")) {
    return { emoji: "🌊", category: "fresco" };
  }

  // Por defecto (elegancia botánica)
  return { emoji: "✨", category: "fresco" };
}
