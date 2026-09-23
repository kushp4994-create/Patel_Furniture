const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createAdmin() {
    const email = "admin@gmail.com";
    const password = "Admin@12345";

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.upsert({
        where: {
            email: email,
        },
        update: {
            password: hashedPassword,
            role: "ADMIN",
        },
        create: {
            name: "Admin",
            email: email,
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("=================================");
    console.log("ADMIN CREATED SUCCESSFULLY");
    console.log("Email:", admin.email);
    console.log("Password:", password);
    console.log("Role:", admin.role);
    console.log("=================================");
}

createAdmin()
    .catch((error) => {
        console.error("ERROR:", error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });