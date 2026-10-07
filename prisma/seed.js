const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Shiv AI database...");

  // 1. Create Admin User
  const adminPassword = await bcrypt.hash("ShivAdmin2026!", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@shivai.com" },
    update: {},
    create: {
      email: "admin@shivai.com",
      name: "Shiv AI Commander",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      passwordHash: adminPassword,
      role: "ADMIN",
      subscription: {
        create: {
          plan: "MONTHLY",
          status: "ACTIVE",
          priceAmount: 200,
        },
      },
      creditBalance: {
        create: {
          currentBalance: 500,
          dailyAllowance: 100,
        },
      },
    },
  });

  // 2. Create Demo User
  const demoPassword = await bcrypt.hash("demo1234", 10);
  const demoUser = await prisma.user.upsert({
    where: { email: "creator@shivai.com" },
    update: {},
    create: {
      email: "creator@shivai.com",
      name: "Aarav Sharma",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      passwordHash: demoPassword,
      role: "USER",
      subscription: {
        create: {
          plan: "FREE",
          status: "ACTIVE",
          priceAmount: 0,
        },
      },
      creditBalance: {
        create: {
          currentBalance: 50,
          dailyAllowance: 50,
        },
      },
    },
  });

  // 3. Initial Gallery Showcase Generations & Images
  const showcaseItems = [
    {
      prompt: "A cute futuristic AI doodle robot holding a glowing crystal paintbrush in Mumbai at golden hour sunset, 3D animated cinematic style, volumetric lighting, 8k octane render",
      style: "3D",
      aspectRatio: "16:9",
      quality: "Ultra",
      creditsUsed: 9,
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=85",
      isFeatured: true,
    },
    {
      prompt: "Cinematic artistic portrait of Narendra Modi inaugurating a futuristic solar mega-city in 2040, golden sunlight, high realism, dignified composition, AI-generated concept",
      style: "Cinematic",
      aspectRatio: "1:1",
      quality: "High",
      creditsUsed: 7,
      imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=85",
      isFeatured: true,
    },
    {
      prompt: "Artistic historical-style portrait of Mahatma Gandhi walking along Dandi beach during sunrise with peaceful morning mist, watercolor texture and cinematic depth",
      style: "Watercolor",
      aspectRatio: "4:5",
      quality: "Ultra",
      creditsUsed: 9,
      imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200&auto=format&fit=crop&q=85",
      isFeatured: true,
    },
    {
      prompt: "Cyberpunk astronaut floating in a nebula garden over planet Earth, neon purple and electric cyan reflections, hyper-detailed cosmic atmosphere",
      style: "Photorealistic",
      aspectRatio: "9:16",
      quality: "Ultra",
      creditsUsed: 9,
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=85",
      isFeatured: true,
    },
    {
      prompt: "Cute playful robotic kitten playing with holographic glowing yarn in an AI creative lab, vibrant anime style, pastel lighting, sharp focus",
      style: "Anime-inspired",
      aspectRatio: "1:1",
      quality: "Standard",
      creditsUsed: 5,
      imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&auto=format&fit=crop&q=85",
      isFeatured: true,
    },
    {
      prompt: "Futuristic luxury electric supercar racing through the Himalayas under the aurora borealis, commercial product photography, dramatic reflections",
      style: "Product photography",
      aspectRatio: "16:9",
      quality: "High",
      creditsUsed: 7,
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=85",
      isFeatured: true,
    },
    {
      prompt: "Floating enchanted floating islands with waterfalls in the clouds, fantasy concept art, radiant god rays, Studio Ghibli inspired magic",
      style: "Fantasy",
      aspectRatio: "3:2",
      quality: "Ultra",
      creditsUsed: 9,
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=85",
      isFeatured: true,
    },
    {
      prompt: "Minimalist geometric architectural pavilion in the desert at twilight, warm ambient lights, glassmorphism walls, architectural digest photography",
      style: "Photorealistic",
      aspectRatio: "16:9",
      quality: "High",
      creditsUsed: 7,
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85",
      isFeatured: true,
    },
    {
      prompt: "Retro 80s synthwave poster of a futuristic Mumbai marine drive skyline with neon grids and chrome typography",
      style: "Poster",
      aspectRatio: "4:5",
      quality: "Standard",
      creditsUsed: 5,
      imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&auto=format&fit=crop&q=85",
      isFeatured: true,
    }
  ];

  for (const item of showcaseItems) {
    const gen = await prisma.generation.create({
      data: {
        userId: admin.id,
        prompt: item.prompt,
        style: item.style,
        aspectRatio: item.aspectRatio,
        quality: item.quality,
        creditsUsed: item.creditsUsed,
        status: "COMPLETED",
        provider: "shiv-neural-v2",
        images: {
          create: {
            userId: admin.id,
            imageUrl: item.imageUrl,
            width: item.aspectRatio === "16:9" ? 1792 : 1024,
            height: item.aspectRatio === "16:9" ? 1024 : item.aspectRatio === "9:16" ? 1792 : 1024,
            isPublic: true,
            isFeatured: item.isFeatured,
          },
        },
      },
      include: {
        images: true,
      },
    });

    // Add some favorites
    if (gen.images.length > 0) {
      await prisma.favorite.upsert({
        where: {
          userId_imageId: {
            userId: demoUser.id,
            imageId: gen.images[0].id,
          },
        },
        update: {},
        create: {
          userId: demoUser.id,
          imageId: gen.images[0].id,
        },
      });
    }
  }

  // 4. Initial Saved Prompts
  const samplePrompts = [
    {
      title: "Cyberpunk Mumbai",
      prompt: "A neon-lit cyberpunk street in Mumbai during monsoon rain, reflections on wet asphalt, flying auto-rickshaws, holographic billboards in Hindi and English, 8k cinematic shot",
      style: "Cinematic",
      tags: "cyberpunk,mumbai,neon,futuristic",
    },
    {
      title: "Cute AI Doodle Mascot",
      prompt: "A mini friendly AI robot floating on a cloud wearing artist glasses, sketching a star in the night sky, Pixar style 3D render, soft warm lighting, ultra cute",
      style: "3D",
      tags: "robot,mascot,3d,cute",
    },
    {
      title: "Himalayan Monolith",
      prompt: "Ancient futuristic temple carved inside a snow-covered Himalayan mountain summit, cosmic nebula in night sky, glowing mystical runes, photorealistic National Geographic style",
      style: "Photorealistic",
      tags: "himalayas,temple,nature,fantasy",
    },
  ];

  for (const sp of samplePrompts) {
    await prisma.savedPrompt.create({
      data: {
        userId: demoUser.id,
        title: sp.title,
        prompt: sp.prompt,
        style: sp.style,
        tags: sp.tags,
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
