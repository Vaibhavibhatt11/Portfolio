import { PrismaClient, MessageTag } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set to seed the admin user."
    );
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      name: "Admin",
      passwordHash,
    },
  });

  await prisma.siteSettings.deleteMany();
  await prisma.siteSettings.create({
    data: {
      name: "Vaibhavi Bhatt",
      role: "Full Stack Developer & Creative Tech Specialist",
      tagline:
        "Building modern web and mobile experiences with Flutter, Java, and full-stack tooling.",
      heroBadge: "Full Stack Developer",
      resumeUrl: "",
      heroImageUrl: "/vaibhavi.jpg",
      availabilityNote: "Available for freelance work and collaborative projects.",
      specialties: "Flutter, Full-Stack",
      delivery: "Design to Deployment",
      focusAreas: [
        "Cross-platform mobile development with Flutter",
        "Full-stack web development with modern frameworks",
        "Creative tech solutions for digital products",
      ],
      freelanceFit:
        "Ideal for mobile apps, web platforms, UI/UX design, and brand-focused digital experiences.",
      skillsHeading: "Technical Skills",
      servicesHeading: "Services",
      projectsHeading: "Projects",
      experienceHeading: "Experience",
      contactBadge: "Contact",
      contactHeading: "Let's build your next product",
      contactBody:
        "Anyone can reach out — students, startups, or companies. Share your goals and I’ll respond with next steps.",
    },
  });

  await prisma.about.deleteMany();
  await prisma.about.create({
    data: {
      headline: "Computer Engineering student focused on Flutter and full-stack development.",
      bio: "Enthusiastic Computer Engineering student skilled in Flutter, Java, Python, and web technologies. Experienced in building real-time apps, chatbot integrations, and hardware prototypes. Passionate about creating reliable, user-friendly digital products.",
      location: "Anand, Gujarat, India",
      email: "vhbh1114@gmail.com",
    },
  });

  await prisma.skill.deleteMany();
  await prisma.skill.createMany({
    data: [
      { name: "Flutter", category: "Languages & Frameworks", order: 1 },
      { name: "Java", category: "Languages & Frameworks", order: 2 },
      { name: "HTML", category: "Languages & Frameworks", order: 3 },
      { name: "Python", category: "Languages & Frameworks", order: 4 },
      { name: "C Language", category: "Languages & Frameworks", order: 5 },
      { name: "Next.js", category: "Frameworks", order: 6 },
      { name: "Express.js", category: "Frameworks", order: 7 },
      { name: "React.js", category: "Libraries & Tools", order: 8 },
      { name: "Prisma", category: "Libraries & Tools", order: 9 },
      { name: "Tailwind CSS", category: "Libraries & Tools", order: 10 },
      { name: "MongoDB", category: "Database", order: 11 },
      { name: "MySQL", category: "Database", order: 12 },
      { name: "Git", category: "Tools & Technologies", order: 13 },
      { name: "GitHub", category: "Tools & Technologies", order: 14 },
      { name: "VS Code", category: "Tools & Technologies", order: 15 },
      { name: "MongoDB Atlas", category: "Tools & Technologies", order: 16 },
      { name: "Postman", category: "Tools & Technologies", order: 17 },
      { name: "Vercel", category: "Tools & Technologies", order: 18 },
      { name: "Cloudinary", category: "Tools & Technologies", order: 19 },
      { name: "Effective Communication", category: "Soft Skills", order: 20 },
      { name: "Team Collaboration & Leadership", category: "Soft Skills", order: 21 },
      { name: "Problem-Solving", category: "Soft Skills", order: 22 },
      { name: "Time Management", category: "Soft Skills", order: 23 },
      { name: "Adaptability & Continuous Learning", category: "Soft Skills", order: 24 },
      { name: "Presentation Skills", category: "Soft Skills", order: 25 },
    ],
  });

  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: [
      {
        title: "Website Development & Redesign",
        description: "Modern, responsive websites tailored to your brand.",
        order: 1,
      },
      {
        title: "Application & UI/UX Design",
        description: "User-centered app design with clean, intuitive flows.",
        order: 2,
      },
      {
        title: "Logo & Brand Creation",
        description: "Visual identity and brand assets for digital presence.",
        order: 3,
      },
      {
        title: "AI-Powered Posters & Products",
        description: "Creative AI-assisted assets for marketing and promotion.",
        order: 4,
      },
      {
        title: "AI-Powered Posters & Product Videos",
        description: "Short-form product visuals with creative automation.",
        order: 5,
      },
      {
        title: "Custom Portfolio & Resume Design",
        description: "Professional personal brand sites and resume layouts.",
        order: 6,
      },
      {
        title: "Custom Websites for All Industries",
        description: "Event, ecommerce, DJ, and niche business websites.",
        order: 7,
      },
    ],
  });

  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        title: "Flutter Chat Application",
        slug: "flutter-chat-application",
        description: "Real-time chat application with modern Flutter UI.",
        techStack: ["Flutter", "Firebase"],
        featured: true,
        order: 1,
      },
      {
        title: "Brahmin Marriage App",
        slug: "brahmin-marriage-app",
        description: "Matchmaking app focused on community profiles and filters.",
        techStack: ["Flutter", "Firebase"],
        featured: true,
        order: 2,
      },
      {
        title: "Palpal Selection",
        slug: "palpal-selection",
        description:
          "Ordering clothes platform with admin dashboard to track daily visitors and activity.",
        techStack: ["React", "Express"],
        featured: true,
        order: 3,
      },
      {
        title: "Chatbot using IBM Watson",
        slug: "ibm-watson-chatbot",
        description:
          "AI-powered chatbot integrated with WhatsApp using IBM Watson Assistant and Twilio API.",
        techStack: ["Python", "Watson Assistant", "Flask", "Twilio"],
        featured: false,
        order: 4,
      },
      {
        title: "Pick and Place Robot",
        slug: "pick-and-place-robot",
        description:
          "Hardware prototype robotic arm controlled via Bluetooth using Arduino Nano and servo motors.",
        techStack: ["Arduino Nano", "HC-05", "Android"],
        featured: false,
        order: 6,
      },
    ],
  });

  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        company: "Tech Elecon Pvt. Ltd.",
        role: "Flutter Developer Intern",
        startDate: new Date("2025-05-01"),
        endDate: new Date("2025-06-30"),
        description: "Summer internship focused on Flutter app development.",
        order: 1,
      },
      {
        company: "Tech Elecon Pvt. Ltd.",
        role: "Flutter Developer & Lead Intern",
        startDate: new Date("2025-11-01"),
        endDate: null,
        description: "Currently leading Flutter development initiatives.",
        order: 2,
      },
      {
        company: "TPC MBIT",
        role: "TNP Coordinator",
        startDate: new Date("2025-01-01"),
        endDate: null,
        description: "Coordinated training and placement initiatives.",
        order: 3,
      },
      {
        company: "ISTE MBIT",
        role: "Chairperson",
        startDate: new Date("2024-07-01"),
        endDate: new Date("2025-06-30"),
        description: "Led student technical events and initiatives.",
        order: 4,
      },
      {
        company: "PDC MBIT",
        role: "Chairperson",
        startDate: new Date("2024-07-01"),
        endDate: new Date("2025-06-30"),
        description: "Organized professional development activities.",
        order: 5,
      },
      {
        company: "IEEE WIE MBIT",
        role: "Secretary",
        startDate: new Date("2024-07-01"),
        endDate: new Date("2025-06-30"),
        description: "Supported events and communications for IEEE WIE.",
        order: 6,
      },
      {
        company: "MBIT",
        role: "SSIP Cell & EDC Cell Member",
        startDate: new Date("2024-01-01"),
        endDate: null,
        description: "Associated with innovation and entrepreneurship cells.",
        order: 7,
      },
    ],
  });

  await prisma.education.deleteMany();
  await prisma.education.createMany({
    data: [
      {
        school: "Madhuben & Bhanubhai Patel Institute of Technology, CVMU",
        program: "B.E. in Computer Engineering",
        startDate: new Date("2022-08-01"),
        endDate: new Date("2026-07-01"),
        description: "CGPA: 8.55",
        order: 1,
      },
      {
        school: "RPTP Science School, Anand",
        program: "Class XII (Higher Secondary)",
        startDate: new Date("2021-03-01"),
        endDate: new Date("2022-04-01"),
        description: "",
        order: 2,
      },
      {
        school: "Vir Vitthalbhai Patel High School, Anand",
        program: "Class X",
        startDate: new Date("2019-03-01"),
        endDate: new Date("2020-03-01"),
        description: "",
        order: 3,
      },
    ],
  });

  await prisma.socialLink.deleteMany();
  await prisma.socialLink.createMany({
    data: [
      { label: "GitHub", url: "https://github.com/Vaibhavibhatt11", order: 1 },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/vaibhavi-bhatt-h",
        order: 2,
      },
      { label: "Email", url: "mailto:vhbh1114@gmail.com", order: 3 },
      {
        label: "WhatsApp",
        url: "https://wa.me/919909949320?text=Hello%20Vaibhavi%2C%20I%27d%20like%20to%20discuss%20a%20project.",
        order: 4,
      },
    ],
  });

  await prisma.contactMessage.deleteMany();
  await prisma.contactMessage.create({
    data: {
      name: "Sample Inquiry",
      email: "sample@client.com",
      company: "Demo Co",
      message: "Looking for a Flutter MVP and UI/UX support.",
      tag: MessageTag.GENERAL,
      sourcePath: "/",
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
