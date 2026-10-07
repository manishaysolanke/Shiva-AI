export interface ModerationResult {
  allowed: boolean;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "BLOCKED";
  flags: string[];
  publicFigureDetected?: {
    name: string;
    category: "Historical" | "Contemporary" | "Celebrity" | "Leader";
    disclaimer: string;
    allowedArtisticOnly: boolean;
  };
  reason?: string;
  sanitizedPrompt: string;
}

const PUBLIC_FIGURES = [
  { name: "narendra modi", canonical: "Narendra Modi", category: "Leader" },
  { name: "mahatma gandhi", canonical: "Mahatma Gandhi", category: "Historical" },
  { name: "elon musk", canonical: "Elon Musk", category: "Contemporary" },
  { name: "cristiano ronaldo", canonical: "Cristiano Ronaldo", category: "Celebrity" },
  { name: "lionel messi", canonical: "Lionel Messi", category: "Celebrity" },
  { name: "taylor swift", canonical: "Taylor Swift", category: "Celebrity" },
  { name: "abp abdul kalam", canonical: "Dr. A.P.J. Abdul Kalam", category: "Historical" },
  { name: "virat kohli", canonical: "Virat Kohli", category: "Celebrity" },
  { name: "sachin tendulkar", canonical: "Sachin Tendulkar", category: "Celebrity" },
  { name: "albert einstein", canonical: "Albert Einstein", category: "Historical" },
  { name: "bill gates", canonical: "Bill Gates", category: "Contemporary" },
  { name: "steve jobs", canonical: "Steve Jobs", category: "Historical" },
] as const;

const BLOCKED_PATTERNS = [
  /\b(csam|child\s*abuse|underage\s*explicit|non-consensual|deepfake\s*nude|nude\s*leak)\b/i,
  /\b(bomb\s*making|assassination\s*guide|terrorist\s*attack\s*plan|weapon\s*blueprint)\b/i,
  /\b(hate\s*crime|genocide\s*glorification|lynching)\b/i,
];

const DECEPTIVE_PATTERNS = [
  /\b(arrested\s*for\s*murder|signing\s*fake\s*treaty|caught\s*stealing\s*confidential|leaked\s*surveillance\s*tape)\b/i,
];

export function moderatePrompt(rawPrompt: string): ModerationResult {
  const prompt = rawPrompt.trim();

  if (!prompt || prompt.length < 2) {
    return {
      allowed: false,
      riskLevel: "BLOCKED",
      flags: ["EMPTY_PROMPT"],
      reason: "Please enter a descriptive prompt with at least 2 characters.",
      sanitizedPrompt: prompt,
    };
  }

  if (prompt.length > 2000) {
    return {
      allowed: false,
      riskLevel: "BLOCKED",
      flags: ["PROMPT_TOO_LONG"],
      reason: "Prompt exceeds the maximum character limit of 2,000 characters.",
      sanitizedPrompt: prompt.slice(0, 2000),
    };
  }

  // 1. Check severe blocked patterns
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(prompt)) {
      return {
        allowed: false,
        riskLevel: "BLOCKED",
        flags: ["SAFETY_POLICY_VIOLATION"],
        reason: "This prompt contains content that violates our safety and ethical guidelines.",
        sanitizedPrompt: prompt,
      };
    }
  }

  // 2. Check public figures
  const lower = prompt.toLowerCase();
  let detectedFigure: {
    name: string;
    category: "Historical" | "Contemporary" | "Celebrity" | "Leader";
    disclaimer: string;
    allowedArtisticOnly: boolean;
  } | undefined;

  for (const fig of PUBLIC_FIGURES) {
    if (lower.includes(fig.name)) {
      // Check for deceptive/defamatory framing with public figure
      for (const dec of DECEPTIVE_PATTERNS) {
        if (dec.test(prompt)) {
          return {
            allowed: false,
            riskLevel: "BLOCKED",
            flags: ["DECEPTIVE_PUBLIC_FIGURE_CONTENT"],
            reason: "AI generation of deceptive scenarios or defamatory claims involving real people is prohibited.",
            sanitizedPrompt: prompt,
          };
        }
      }

      detectedFigure = {
        name: fig.canonical,
        category: fig.category,
        disclaimer: `AI-generated artistic representation of ${fig.canonical}. Fictional and artistic concept; not an authentic photograph.`,
        allowedArtisticOnly: true,
      };
      break;
    }
  }

  return {
    allowed: true,
    riskLevel: detectedFigure ? "MEDIUM" : "LOW",
    flags: detectedFigure ? ["PUBLIC_FIGURE_ARTISTIC"] : [],
    publicFigureDetected: detectedFigure,
    sanitizedPrompt: prompt,
  };
}
