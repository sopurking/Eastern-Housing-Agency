// // app/api/users/route.ts (Next.js App Router)
// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function POST(req: NextRequest) {
//   try {
//     const { email, name }=await req.json();
//     console.log(email, name)

//     // Check if user already exists
//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     console.log(existingUser)
//     if (existingUser?.id) {
//       return NextResponse.json("signed in", { status: 200 });
//     }

//        const user = await prisma.user.create({
//       data: {
//         email,
//         name,
//       }
//     });
//       return NextResponse.json("signed in", { status: 200 });

    
//     }

//     // Create user
//     // const user = await prisma.user.create({
//     //   data: {
//     //     email,
//     //     name,
//     //   },
//     // });
    

//     // return NextResponse.json({ user }, { status: 201 });
//    catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }
