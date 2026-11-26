import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RegimentView } from "@/components/regiment/RegimentView";
import { getRegiment, regiments } from "@/lib/data";

export function generateStaticParams() {
  return regiments.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const r = getRegiment((await params).id);
  return { title: r ? `${r.shortName}, ${r.name}` : "Régiment" };
}

export default async function RegimentPage({ params }: { params: Promise<{ id: string }> }) {
  const r = getRegiment((await params).id);
  if (!r) notFound();
  return <RegimentView r={r} />;
}
