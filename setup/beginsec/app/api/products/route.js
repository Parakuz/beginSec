import { NextResponse } from 'next/server';
import prisma from '../../../lib/db';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        comments: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.error();
  }
}
