import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const reviews = [
  {
    name: 'Kevin Balazic',
    initial: 'K',
    color: '#1a73e8',
    date: 'il y a 2 semaines',
    text: "Merci pour votre gentillesse ! Alors qu'ils fermaient dans 15 minutes, ils ont accepté d'attendre que j'accoste en bateau pour me servir ma pizza, délicieuse en plus. Super accueil, je recommande !",
  },
  {
    name: 'Violette Vayssette',
    initial: 'V',
    color: '#e91e63',
    date: 'il y a 8 mois',
    text: "Ça fait plusieurs fois que je commande, à chaque fois c'est une bonne ambiance, de la bonne humeur et des sourires ! Et c'est toujours un régal !! Jamais déçue !",
  },
  {
    name: 'Julien Madaro',
    initial: 'J',
    color: '#ff9800',
    date: 'il y a 5 mois',
    text: "La pizza Brésil est juste incroyable et prenez en dessert la yo-yo, faites moi confiance ! Le chef est aux petits soins et très souriant.",
  },
  {
    name: 'Noémie Ossant',
    initial: 'N',
    color: '#4caf50',
    date: 'il y a un an',
    text: "La Case de Thom est un endroit chaleureux où l'accueil est des plus agréable. Les pizzas sont excellentes et confectionnées avec des produits de qualité.",
  },
  {
    name: 'Sabrina Sab',
    initial: 'S',
    color: '#9c27b0',
    date: 'il y a 11 mois',
    text: "De passage à Palavas, nous sommes venus commander et nous n'avons pas été déçus. Très bon service, un accueil super et souriant et les pizzas étaient délicieuses.",
  },
  {
    name: 'Adeline',
    initial: 'A',
    color: '#00bcd4',
    date: 'il y a 11 mois',
    text: "De passage sur Palavas, nous avons mangé des Pizzas au top et vraiment très bien garnies ! Vous pouvez y aller les yeux fermés !",
  },
  {
    name: 'Diane Artémis',
    initial: 'D',
    color: '#f44336',
    date: 'il y a un an',
    text: "Je connais ce spot à pizza depuis très longtemps… Jamais déçue. Rapide, poli et efficace. Pizza qui me contente à chaque fois. Bien garnie.",
  },
  {
    name: 'Flora',
    initial: 'F',
    color: '#8bc34a',
    date: 'il y a un an',
    text: "Une VRAIE maison de burgers, des pains faits maison le jour même et on sent la différence. Je recommande à 100% !",
  },
  {
    name: 'Juliana Furtado',
    initial: 'J',
    color: '#ff5722',
    date: 'il y a 3 ans',
    text: "La meilleure pizzeria de la région !",
  },
  {
    name: 'philou virufen',
    initial: 'P',
    color: '#607d8b',
    date: 'il y a un an',
    text: "La bonne adresse pour LA pizza à manger. Bien garnie, bonne, très bonne même ! Trouvée sur le net en lisant les avis, je vais même y retourner avant la fin de la saison !",
  },
  {
    name: 'Annabel Jaffrennou',
    initial: 'A',
    color: '#795548',
    date: 'il y a 7 mois',
    text: "Les pizzas sont excellentes et l'accueil est super. Merci !",
  },
  {
    name: 'Christophe Lignon',
    initial: 'C',
    color: '#e91e63',
    date: 'il y a un mois',
    text: "Au top, très bon et ultra sympa !!!",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]" />
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" aria-label="Google">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

export default function GoogleReviews() {
  const { ref, isVisible } = useScrollAnimation();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const offsetRef = useRef(0);
  const animRef = useRef<number>(0);
  const CARD_WIDTH = 340;
  const GAP = 24;
  const SPEED = 0.5;

  // Duplicate reviews for seamless loop
  const doubled = [...reviews, ...reviews];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = reviews.length * (CARD_WIDTH + GAP);

    const animate = () => {
      if (!isPaused) {
        offsetRef.current += SPEED;
        if (offsetRef.current >= totalWidth) offsetRef.current = 0;
        track.style.transform = `translateX(-${offsetRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPaused]);

  return (
    <section className="py-20 bg-gradient-to-b from-[#2D1F12] to-[#1F110C] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <GoogleLogo />
            <h2 className="font-['Cinzel'] text-4xl sm:text-5xl font-bold text-[#E8D5BC]">
              Avis Google
            </h2>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#D2691E] to-transparent mx-auto mb-6" />

          {/* Global rating */}
          <div className="inline-flex items-center gap-4 bg-[#5D4037]/40 border border-[#8B4513] rounded-2xl px-8 py-4">
            <span className="text-5xl font-bold text-[#E8D5BC]">4,7</span>
            <div>
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${i < 5 ? 'fill-[#FBBC04] text-[#FBBC04]' : 'text-[#FBBC04]'}`}
                  />
                ))}
              </div>
              <p className="text-[#E8D5BC]/70 text-sm">192 avis Google</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling carousel — full width */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left gradient fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#2D1F12] to-transparent z-10 pointer-events-none" />
        {/* Right gradient fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#1F110C] to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ gap: GAP, paddingLeft: 24, paddingRight: 24, width: 'max-content' }}
        >
          {doubled.map((review, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 bg-gradient-to-br from-[#5D4037] to-[#1F110C] border border-[#8B4513] rounded-2xl p-6 flex flex-col justify-between shadow-xl"
              style={{ width: CARD_WIDTH }}
            >
              <div>
                <Quote className="w-8 h-8 text-[#D2691E]/40 mb-3" />
                <p className="text-[#E8D5BC]/90 text-sm leading-relaxed line-clamp-4">
                  {review.text}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#8B4513]/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: review.color }}
                  >
                    {review.initial}
                  </div>
                  <div>
                    <p className="text-[#E8D5BC] font-semibold text-sm leading-tight">{review.name}</p>
                    <p className="text-[#E8D5BC]/50 text-xs">{review.date}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StarRating />
                  <GoogleLogo />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
