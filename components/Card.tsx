import { Card as CardType } from '@/types';
import Image from 'next/image';
import { FC } from 'react';

interface CardProps {
  card: CardType;
  onClick: (id: number) => void;
  disabled: boolean;
}

const Card: FC<CardProps> = ({ card, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card.id);
    }
  };

  return (
    <div 
      className={`flip-card w-full h-full cursor-pointer ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
      onClick={handleClick}
    >
      <div className="flip-card-inner relative w-full h-full rounded-lg shadow-md">
        {/* Card Back (Hidden) */}
        <div className="flip-card-front bg-primary rounded-lg flex items-center justify-center">
          <div className="text-white text-4xl font-bold">?</div>
        </div>
        
        {/* Card Front (Meme Image) */}
        <div className="flip-card-back bg-white rounded-lg overflow-hidden">
          <Image 
            src={card.imageUrl} 
            alt="Meme Card" 
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Card;