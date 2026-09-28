import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-4 text-center">
      <div>
        <p className="font-display text-8xl text-[#d84a43]">404</p>
        <h1 className="mt-3 font-display text-3xl text-[#14231d]">Vous avez rate la correspondance.</h1>
        <p className="mt-3 text-stone-500">Cette etape ne figure pas dans le carnet de route.</p>
        <Button asChild className="mt-7 rounded-full bg-[#14231d] text-white hover:bg-[#253d32]"><Link to="/"><ArrowLeft />Retour au voyage</Link></Button>
      </div>
    </div>
  );
}
