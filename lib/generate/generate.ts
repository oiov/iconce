import prisma from "@/lib/prisma";

export async function getGenerateInfo() {
  return await prisma.generate.findFirst();
}

export async function updateGenerateInfo(type: string) {
  const data = await prisma.generate.findFirst();
  if (data) {
    if (type === "0") {
      await prisma.generate.update({
        where: { id: data.id },
        data: {
          generate: data.generate + 1,
        },
      });
    } else if (type === "1") {
      await prisma.generate.update({
        where: { id: data.id },
        data: {
          share: data.share + 1,
        },
      });
    } else if (type === "2") {
      await prisma.generate.update({
        where: { id: data.id },
        data: {
          api: data.api + 1,
        },
      });
    }
  }
}
