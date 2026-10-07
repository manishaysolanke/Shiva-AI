export interface ImprovedPromptResponse {
  original: string;
  improved: string;
  suggestedStyle: string;
  suggestedAspectRatio: string;
  addedKeywords: string[];
}

const STYLE_ENHANCERS: Record<string, string[]> = {
  Photorealistic: [
    "hyperrealistic 8k resolution",
    "volumetric natural sunlight",
    "shot on Hasselblad H6D-100c with 85mm f/1.4 lens",
    "sharp focus and intricate subsurface scattering textures",
    "award-winning National Geographic photography",
  ],
  "3D": [
    "octane 3D render with soft ambient occlusion",
    "Pixar and Dreamworks inspired aesthetics",
    "vibrant chromatic lighting and volumetric glow",
    "sculpted clay and polished metallic shaders",
    "ray-traced reflections in Unreal Engine 5",
  ],
  Cinematic: [
    "cinematic anamorphic widescreen lighting",
    "atmospheric mist and dramatic chiaroscuro contrast",
    "color graded in 35mm Arri Alexa teal and orange",
    "masterpiece shot directed by Denis Villeneuve",
    "epic depth of field and motion blur particles",
  ],
  "Anime-inspired": [
    "Makoto Shinkai and Studio Ghibli visual style",
    "glowing celestial skies with pastel clouds",
    "crisp hand-drawn line art and vibrant cell shading",
    "magical sparkling wind particles and emotional atmosphere",
  ],
  Watercolor: [
    "dreamy fluid watercolor on cold-press textured cotton paper",
    "gentle translucent color bleeding and ink splashes",
    "soft botanical washes and expressive brushstrokes",
  ],
  Fantasy: [
    "enchanted mythical concept art",
    "bioluminescent flora and ethereal starlight glow",
    "ancient architectural runes and floating crystal relics",
    "trending on ArtStation HQ",
  ],
  "Product photography": [
    "high-end commercial studio lighting with softboxes",
    "clean minimalist podium with subtle acrylic reflections",
    "razor-sharp edge definition and luxury packaging texture",
  ],
  Poster: [
    "bold Swiss graphic design poster layout",
    "striking dynamic typography hierarchy and screenprint textures",
    "vibrant contrasting duotone palette",
  ],
};

export function improvePrompt(rawPrompt: string, preferredStyle?: string): ImprovedPromptResponse {
  const clean = rawPrompt.trim();
  const lower = clean.toLowerCase();

  // Detect appropriate style if not provided
  let style = preferredStyle || "Cinematic";
  if (!preferredStyle) {
    if (lower.includes("robot") || lower.includes("toy") || lower.includes("cute") || lower.includes("mascot")) {
      style = "3D";
    } else if (lower.includes("anime") || lower.includes("manga") || lower.includes("ghibli")) {
      style = "Anime-inspired";
    } else if (lower.includes("product") || lower.includes("shoe") || lower.includes("perfume") || lower.includes("car")) {
      style = "Product photography";
    } else if (lower.includes("magic") || lower.includes("dragon") || lower.includes("castle")) {
      style = "Fantasy";
    } else if (lower.includes("portrait") || lower.includes("person") || lower.includes("face")) {
      style = "Photorealistic";
    }
  }

  const enhancers = STYLE_ENHANCERS[style] || STYLE_ENHANCERS.Cinematic;
  const pickedKeywords = enhancers.slice(0, 3);

  // Synthesize improved description
  let improved = `${clean}, ${pickedKeywords.join(", ")}`;

  // Add composition touch if not present
  if (!lower.includes("composition") && !lower.includes("shot")) {
    improved += ", professional master composition, ultra-high detail";
  }

  return {
    original: clean,
    improved,
    suggestedStyle: style,
    suggestedAspectRatio: style === "Cinematic" ? "16:9" : "1:1",
    addedKeywords: pickedKeywords,
  };
}
