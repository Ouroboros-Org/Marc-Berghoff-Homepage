import GermanOpenGraphImage from "../opengraph-image";

export const dynamic = "force-static";

export function GET() {
  return GermanOpenGraphImage();
}
