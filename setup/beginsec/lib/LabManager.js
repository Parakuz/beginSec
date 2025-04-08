import prisma from "@/lib/auth/prisma";
import docker from "@/lib/auth/docker";

const START_PORT = 9080;
const MAX_RUNNING = 5;

export async function checkAndTerminateExpiredLabs() {
  try {
    const expiredLabs = await prisma.lab.findMany({
      where: {
        expiresAt: {
          lte: new Date(),
        },
      },
    });

    for (let lab of expiredLabs) {
      await terminateLab(lab.userId);
    }
    console.log(`Terminated ${expiredLabs.length} expired labs.`);
  } catch (error) {
    console.error("Error while checking and terminating expired labs:", error);
  }
}

export async function getAvailablePort() {
  const runningLabs = await prisma.lab.findMany();
  const usedPorts = runningLabs.map((lab) => lab.port);
  for (let port = START_PORT; port < START_PORT + MAX_RUNNING; port++) {
    if (!usedPorts.includes(port)) return port;
  }
  return null;
}

export async function startLabContainer(userId, labName) {
  const existingLab = await prisma.lab.findUnique({ where: { userId } });
  if (existingLab) {
    throw new Error("User already has a lab running.");
  }

  const currentRunning = await prisma.lab.count();
  if (currentRunning >= MAX_RUNNING) {
    throw new Error("Maximum number of labs is running.");
  }

  const port = await getAvailablePort();
  if (!port) throw new Error("No available ports.");

  setInterval(async () => {
    await checkAndTerminateExpiredLabs();
    await terminateAllInactiveLabs();
  }, 30000);

  try {
    const container = await docker.createContainer({
      Image: "jakkrapanptn/ctf-vulnerable-shop:v1",
      ExposedPorts: {
        "3000/tcp": {},
      },
      HostConfig: {
        PortBindings: {
          "3000/tcp": [{ HostPort: `${port}` }],
        },
        Memory: 512 * 1024 * 1024,
        NanoCpus: 0.5 * 1e9,
      },
    });

    await container.start();

    const now = new Date();
    const expiration = new Date(now.getTime() + 60 * 60 * 1000);

    await prisma.lab.create({
      data: {
        userId,
        labName,
        port,
        containerId: container.id,
        createdAt: now,
        remainingTime: 3600,
        timeExpand: 0,
        expiresAt: expiration,
      },
    });

    return { port, expiresAt: expiration };
  } catch (error) {
    if (error.message) {
      throw new Error("มีปัญหาขัดข้องเล็กน้อย");
    }
  }
}

export async function terminateLab(userId) {
  const lab = await prisma.lab.findUnique({ where: { userId } });
  if (!lab) throw new Error("No lab running for this user.");

  const container = docker.getContainer(lab.containerId);
  await container.stop();
  await container.remove();

  await prisma.lab.delete({ where: { userId } });
}

export async function terminateAllInactiveLabs() {
  const containers = await docker.listContainers({
    all: true,
    filters: {
      status: ["created"],
    },
  });

  if (containers.length === 0) {
    console.log("ไม่มีคอนเทนเนอร์ที่หยุดทำงาน");
    return;
  }

  for (const containerInfo of containers) {
    const container = docker.getContainer(containerInfo.Id);

    try {
      // await container.stop();
      await container.remove();
      console.log(`คอนเทนเนอร์ ${containerInfo.Id} ถูกหยุดและลบเรียบร้อย`);
    } catch (error) {
      console.error(
        `ไม่สามารถหยุดหรือลบคอนเทนเนอร์ ${containerInfo.Id}:`,
        error
      );
    }
  }
}

export async function extendLab(userId) {
  const lab = await prisma.lab.findUnique({ where: { userId } });
  if (!lab) throw new Error("No lab running for this user.");

  const now = new Date();
  const timeLeft = Math.max(0, (lab.expiresAt - now) / 1000);

  if (timeLeft + 1800 > 7200) {
    throw new Error("Cannot extend beyond 2 hours.");
  }

  const newRemainingTime = lab.remainingTime + 1800;
  const newExpiresAt = new Date(now.getTime() + newRemainingTime * 1000);

  await prisma.lab.update({
    where: { userId },
    data: {
      remainingTime: newRemainingTime,
      timeExpand: lab.timeExpand + 1,
      expiresAt: newExpiresAt,
    },
  });

  return { remainingTime: newRemainingTime, expiresAt: newExpiresAt };
}
