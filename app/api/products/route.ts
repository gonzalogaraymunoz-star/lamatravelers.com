import { NextRequest, NextResponse } from 'next/server';
import { getPublicProduct, getPublicProducts, publicGroup } from '@/lib/catalog';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug');
  const category = request.nextUrl.searchParams.get('category');

  if (slug) {
    const product = await getPublicProduct(slug);
    return product ? NextResponse.json(product) : NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const products = await getPublicProducts();
  const result = category ? products.filter((product) => publicGroup(product) === category) : products;
  return NextResponse.json(result, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' } });
}
