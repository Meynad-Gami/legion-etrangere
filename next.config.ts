import type { NextConfig } from "next";

// STATIC_EXPORT=1 npm run build → site statique (dossier out/), hébergeable sur n'importe quel serveur de fichiers.
const isExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Un package-lock.json existe plus haut dans l'arborescence : on fixe la racine du projet.
  turbopack: { root: __dirname },
  ...(isExport ? { output: "export" as const, trailingSlash: true, images: { unoptimized: true } } : {}),
};

export default nextConfig;
