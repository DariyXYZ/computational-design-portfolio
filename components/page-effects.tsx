'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Per-page progressive enhancement: clip playback, scroll reveal, and the one
 * layout correction that CSS could not carry.
 *
 * Lives in the root layout but keys its effect on the pathname, because App
 * Router navigations swap page content without remounting the layout.
 *
 * The one behavioural change from the old `field.js`: clips are `preload="none"`
 * and only start once they scroll into view. The index page carries three of
 * them, and eagerly playing all three meant three range requests competing with
 * the hero during initial load.
 */
export function PageEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: Array<() => void> = [];

    // --- Looping case clips ------------------------------------------------
    // Part of the cases' visual content, so they are not gated behind reduced
    // motion; they are paused when the tab is hidden or the clip leaves view.
    const clips = Array.from(
      document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]'),
    );

    if (clips.length > 0) {
      const play = (clip: HTMLVideoElement) => {
        void clip.play().catch(() => {
          /* Autoplay can be refused; the poster frame stands in. */
        });
      };

      const visible = new Set<HTMLVideoElement>();
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const clip = entry.target as HTMLVideoElement;
            if (entry.isIntersecting) {
              visible.add(clip);
              if (!document.hidden) play(clip);
            } else {
              visible.delete(clip);
              clip.pause();
            }
          }
        },
        { rootMargin: '200px 0px' },
      );
      clips.forEach((clip) => observer.observe(clip));

      const onVisibility = () => {
        visible.forEach((clip) => (document.hidden ? clip.pause() : play(clip)));
      };
      document.addEventListener('visibilitychange', onVisibility);

      cleanups.push(() => {
        observer.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
      });
    }

    // --- Scroll reveal ----------------------------------------------------
    // Content is visible by default in CSS, so a no-JS or reduced-motion visit
    // sees everything; the hidden -> visible transition is only armed here.
    if (!reduceMotion) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
      );
      document
        .querySelectorAll('[data-reveal]')
        .forEach((target) => revealObserver.observe(target));
      cleanups.push(() => revealObserver.disconnect());
    }

    // --- About column baselines -------------------------------------------
    // The About section's two side-by-side lists (contacts / education facts)
    // should land on the same bottom line. Grid row-alignment left a residual
    // gap that varied with font metrics rather than layout, so it is measured
    // and corrected directly. No-ops below 781px, where the lists stack.
    const contacts = document.querySelector<HTMLElement>('.about__contacts');
    const facts = document.querySelector<HTMLElement>('.about__facts');

    if (contacts && facts) {
      const align = () => {
        contacts.style.transform = '';
        facts.style.transform = '';
        if (window.innerWidth <= 780) return;
        const diff =
          contacts.getBoundingClientRect().bottom - facts.getBoundingClientRect().bottom;
        if (Math.abs(diff) < 0.5) return;
        if (diff > 0) facts.style.transform = `translateY(${diff}px)`;
        else contacts.style.transform = `translateY(${-diff}px)`;
      };

      align();
      window.addEventListener('resize', align);

      const portrait = document.querySelector<HTMLImageElement>('.about__portrait img');
      if (portrait && !portrait.complete) portrait.addEventListener('load', align);

      cleanups.push(() => {
        window.removeEventListener('resize', align);
        portrait?.removeEventListener('load', align);
      });
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname]);

  return null;
}
