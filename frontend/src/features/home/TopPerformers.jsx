import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Shield, Zap, TrendingUp, ChevronRight } from 'lucide-react';

const PlayerRow = ({ player, rank }) => {
  const getRankIcon = (r) => {
    if (r === 1) return <Trophy className="w-5 h-5 text-accent" />;
    if (r === 2) return <div className="w-5 h-5 flex items-center justify-center font-black text-slate-400">2</div>;
    if (r === 3) return <div className="w-5 h-5 flex items-center justify-center font-black text-amber-700">3</div>;
    return <div className="w-5 h-5 flex items-center justify-center font-bold text-white/40">{r}</div>;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-colors group cursor-pointer border border-white/5"
    >
      <div className="flex-shrink-0 w-10 flex justify-center uppercase font-black italic">
        {getRankIcon(rank)}
      </div>
      
      <div className="relative">
        <img 
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}`} 
          alt={player.name} 
          className="w-12 h-12 rounded-full bg-primary-foreground/10 border-2 border-white/10 group-hover:border-accent transition-colors"
        />
        {rank === 1 && (
          <div className="absolute -top-1 -right-1 bg-accent text-primary w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary">
            <Trophy className="w-3 h-3" />
          </div>
        )}
      </div>
      
      <div className="flex-grow">
        <h4 className="text-white font-bold group-hover:text-accent transition-colors">{player.name}</h4>
        <span className="text-[10px] text-white/50 font-black uppercase tracking-widest">{player.team}</span>
      </div>
      
      <div className="text-right flex flex-col items-end">
        <span className="text-xl font-black text-accent">{player.stat}</span>
        <span className="text-[10px] text-white/40 font-bold uppercase">{player.label}</span>
      </div>
      
      <div className="w-8 flex justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
        <ChevronRight className="w-5 h-5 text-accent" />
      </div>
    </motion.div>
  );
};

const TopPerformers = () => {
  const [activeTab, setActiveTab] = useState('runs');

  const data = {
    runs: [
      { name: "Rahul Sharma", team: "WIPRO XI", stat: "482", label: "Runs Scored" },
      { name: "Arjun Gupta", team: "TCS BLAZE", stat: "415", label: "Runs Scored" },
      { name: "Suresh Raina", team: "INFOSYS", stat: "392", label: "Runs Scored" },
      { name: "David Miller", team: "ACCENTURE", stat: "367", label: "Runs Scored" },
      { name: "Chris Gayle", team: "GOOGLE", stat: "348", label: "Runs Scored" },
    ],
    wickets: [
      { name: "Jasprit Bumrah", team: "COGNIZANT", stat: "24", label: "Wickets" },
      { name: "Rashid Khan", team: "AMAZON", stat: "21", label: "Wickets" },
      { name: "Trent Boult", team: "FLIPKART", stat: "19", label: "Wickets" },
      { name: "Mitchell Starc", team: "WIPRO XI", stat: "18", label: "Wickets" },
      { name: "Anil Kumble", team: "IBM", stat: "17", label: "Wickets" },
    ],
    economy: [
      { name: "Rashid Khan", team: "AMAZON", stat: "5.42", label: "Economy Rate" },
      { name: "Ravindra Jadeja", team: "INFOSYS", stat: "6.12", label: "Economy Rate" },
      { name: "Sunil Narine", team: "TCS BLAZE", stat: "6.35", label: "Economy Rate" },
      { name: "Glenn Maxwell", team: "WIPRO XI", stat: "6.88", label: "Economy Rate" },
      { name: "Axar Patel", team: "GOOGLE", stat: "7.02", label: "Economy Rate" },
    ]
  };

  const tabs = [
    { id: 'runs', label: 'MOST RUNS', icon: Zap },
    { id: 'wickets', label: 'MOST WICKETS', icon: Shield },
    { id: 'economy', label: 'BEST ECONOMY', icon: TrendingUp },
  ];

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 border-[40px] border-white rounded-full"></div>
        <div className="absolute bottom-24 left-24 w-128 h-128 border-[10px] border-accent/20 rounded-full"></div>
      </div>

      <div className="container px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-accent font-black text-sm uppercase tracking-[0.3em] mb-4">The Leaderboard</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Elite <span className="text-secondary italic underline decoration-accent underline-offset-8">Performers</span>
          </h2>
          <p className="text-white/60 max-w-xl font-medium">
            Celebrating the top athletes of the current season across all tournament categories.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Custom Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 border-2 ${
                  activeTab === tab.id 
                  ? 'bg-accent border-accent text-primary shadow-lg shadow-accent/20 scale-105' 
                  : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-primary' : 'text-white/30'}`} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-4 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {data[activeTab].map((player, idx) => (
                  <PlayerRow key={player.name} player={player} rank={idx + 1} />
                ))}
              </motion.div>
            </AnimatePresence>
            
            <div className="mt-10 pt-8 border-t border-white/10 flex justify-center">
              <button className="text-white/60 hover:text-white font-bold text-sm flex items-center gap-2 transition-colors group">
                View All Player Stats <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Internal Import for component
const ArrowRight = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default TopPerformers;
