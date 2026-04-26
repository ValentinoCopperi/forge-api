import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding tasks...");

  const tasks = [];

  for (let i = 1; i <= 1000; i++) {
    tasks.push({
      title: `Task seeded ${i}`,
      userId: 3,
    });
  }

  await prisma.task.createMany({
    data: tasks,
  });

  console.log("Created 1000 tasks");
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });