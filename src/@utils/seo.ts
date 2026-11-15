import type { IGetSEOUrls } from "@types";

export const getSEOUrls = ({
  base,
  pathname,
  canonical,
  image,
}: IGetSEOUrls) => ({
  canonicalURL: new URL(canonical ?? pathname, base),
  imageURL: image ? new URL(image, base) : undefined,
});
