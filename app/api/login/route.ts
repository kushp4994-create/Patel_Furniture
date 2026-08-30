import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    console.log("Login Attempt:", email);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log("User not found");
      return NextResponse.json(
        { message: "Invalid Email or Password" },
        { status: 400 }
      );
    }

    console.log("User found:", user.email);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid Email or Password" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("userRole", user.role);
    cookieStore.set("userId", String(user.id));

    return NextResponse.json({
      message: "Login Success",
      role: user.role,
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}