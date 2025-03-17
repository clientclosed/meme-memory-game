import GameBoard from '@/components/GameBoard';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Meme Memory Game</h1>
          <p className="text-gray-600">Match pairs of meme cards to win!</p>
        </header>
        
        <GameBoard />
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Created with Next.js and Tailwind CSS</p>
          <p className="mt-1">Meme images from popular internet memes</p>
        </footer>
      </div>
    </main>
  );
};

export default Home;