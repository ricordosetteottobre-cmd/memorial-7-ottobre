import React, { useState, useEffect } from 'react';
import { Music, Home, Heart, MapPin } from 'lucide-react';

export default function App() {
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('locations.json')
      .then(res => res.json())
      .then(data => setLocations(data));
  }, []);

  const total = locations.reduce((sum, loc) => sum + loc.victims, 0);

  const getIcon = (type) => {
    switch (type) {
      case 'festival': return <Music className="w-5 h-5" />;
      case 'kibbutz': return <Home className="w-5 h-5" />;
      case 'city': return <MapPin className="w-5 h-5" />;
      case 'base': return <div className="w-5 h-5 border-2 border-current" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'festival': return 'bg-purple-600';
      case 'kibbutz': return 'bg-blue-600';
      case 'city': return 'bg-red-600';
      case 'base': return 'bg-green-700';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <header className="text-center mb-6">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Heart className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-bold">7 Ottobre 2023</h1>
          <Heart className="w-8 h-8 text-red-500" />
        </div>
        <p className="text-xl text-slate-300">In Memoria delle Vittime</p>
        <p className="text-3xl font-semibold text-red-400">{total}+ vite spezzate</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-3 flex gap-2 items-center">
            <MapPin className="w-5 h-5 text-red-400" /> Luoghi Colpiti
          </h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {locations.map(loc => (
              <button
                key={loc.id}
                onClick={() => setSelected(loc)}
                className={`w-full flex gap-3 items-center p-3 rounded-lg border transition ${
                  selected?.id === loc.id ? 'bg-slate-700 border-slate-500' : 'bg-slate-750 border-slate-600 hover:bg-slate-700'
                }`}
              >
                <div className={`${getColor(loc.type)} p-2 rounded-full`}>
                  {getIcon(loc.type)}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">{loc.name}</h3>
                  <p className="text-sm text-red-300">{loc.victims} vittime</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          {selected ? (
            <>
              <div className="flex gap-3 mb-4 items-center">
                <div className={`${getColor(selected.type)} p-3 rounded-full`}>
                  {getIcon(selected.type)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selected.name}</h2>
                  <p className="text-red-300 font-semibold">{selected.victims} vittime</p>
                </div>
              </div>
              <p className="text-slate-200">{selected.description}</p>
              {selected.type === 'festival' && (
                <div className="mt-4 bg-purple-900/30 border border-purple-700 p-4 rounded-lg">
                  <h3 className="text-purple-300 font-bold mb-2">Ricordo Speciale</h3>
                  <p className="italic text-purple-100 mb-3">"{selected.memorial}"</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-slate-400 text-center">
              <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Seleziona un luogo per vedere i dettagli</p>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center mt-6 text-slate-400 text-sm">
        זכרונם לברכה - Che la loro memoria sia una benedizione
      </footer>
    </div>
  );
}
