'use client';

import { PhotoGallery } from '@/components/ui/gallery';

export default function Gallery() {
  return (
    <section className="lmb-gallery-section" id="gallery" aria-labelledby="gallery-title">
      <PhotoGallery animationDelay={0.3} />
    </section>
  );
}
