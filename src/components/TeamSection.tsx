'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, X, Mail, MessageSquare, Sparkles, Send, ArrowUpRight, Zap, Target, Film, Briefcase } from 'lucide-react';
import { useState } from 'react';

const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function TeamSection() {
  const t = useTranslations('Team');
  const [activeMember, setActiveMember] = useState<string | null>(null);

  const teamMembers = [
    {
      id: 'andre',
      image: '/images/andre.jpg',
      clients: ['Direção & Filmmaking', 'Inteligência Artificial', 'Sense Produtora', 'Color Grading'],
      hasStats: false,
      isContactOnly: true,
      email: 'aj.prodinc@gmail.com',
      phone: '+55 11 992874209',
      whatsappUrl: 'https://wa.me/5511992874209?text=Ol%C3%A1%20Andr%C3%A9,%20vim%20pelo%20site%20da%20AJ%20e%20gostaria%20de%20conversar!',
      instagram: '@andre3andrade',
      instagramUrl: 'https://www.instagram.com/andre3andrade/',
      videos: []
    },
    {
      id: 'joao',
      image: '/images/joao.jpg',
      clients: ['Roteiro & Storytelling', 'Alta Retenção', 'Tecnologia & IA', 'Estratégia Viral'],
      hasStats: false,
      isContactOnly: true,
      email: 'joaohsqa@gmail.com',
      phone: '+55 43 9872-4110',
      whatsappUrl: 'https://wa.me/554398724110?text=Ol%C3%A1%20Jo%C3%A3o,%20vim%20pelo%20site%20da%20AJ%20e%20gostaria%20de%20conversar!',
      videos: []
    },
    {
      id: 'bruno',
      image: '/images/bruno.png',
      clients: ['@Dumbck', '@SilverBlox_', '@PlayzKnoxy', '@Zoomy_prota'],
      hasStats: true,
      isContactOnly: false,
      videos: [
        { id: '9CN1pY9_rWA', views: '12.11M', likes: '706.3K' },
        { id: '2LZe-XBr5QI', views: '10.65M', likes: '329.4K' }
      ]
    },
    {
      id: 'thammy',
      image: '/images/thammy.png',
      clients: ['@Silver', '@Chewy', '@Dave Blox', '@Vixy Blox'],
      hasStats: true,
      isContactOnly: false,
      videos: [
        { id: 'H5k4KVm3Mcw', views: '4.69M', likes: '31.1K' },
        { id: 'c74FEFX5HlM', views: '4.55M', likes: '110.8K' }
      ]
    }
  ];

  const selectedMember = teamMembers.find(m => m.id === activeMember);

  return (
    <section id="team" className="w-full bg-[#15171B] text-[#F4F2ED] py-24 md:py-32 relative overflow-hidden">
      <div id="about" className="absolute -top-20" />
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E8B04B]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#E8B04B] font-bold tracking-widest text-sm uppercase mb-4">{t('subtitle')}</p>
          <h2 className="font-archivo font-black text-5xl md:text-7xl uppercase tracking-tighter">
            {t('title')}
          </h2>
        </motion.div>

        {/* Team Grid / Circular Avatars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 lg:gap-8 max-w-7xl mx-auto justify-items-center">
          {teamMembers.map((member, idx) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col items-center cursor-pointer group w-full max-w-[260px] text-center"
              onClick={() => setActiveMember(member.id)}
            >
              <div 
                className="relative w-44 h-44 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-[#E8B04B] transition-colors duration-500 mb-6 shadow-2xl"
                style={{ viewTransitionName: `team-image-${member.id}` }}
              >
                <img 
                  src={member.image} 
                  alt={t(`${member.id}.name`)} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 bg-white/5"
                  onError={(e) => e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {member.isContactOnly ? (
                    <div className="flex flex-col items-center gap-1.5">
                      <MessageSquare className="text-[#E8B04B] w-9 h-9" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8B04B] bg-black/80 px-2.5 py-0.5 rounded-full border border-[#E8B04B]/30">
                        Contato
                      </span>
                    </div>
                  ) : (
                    <PlayCircle className="text-[#E8B04B] w-12 h-12" />
                  )}
                </div>
              </div>
              <h3 className="font-archivo font-bold text-2xl group-hover:text-[#E8B04B] transition-colors mb-2">{t(`${member.id}.name`)}</h3>
              <p className="text-xs md:text-sm uppercase tracking-wider text-white/70 font-semibold leading-snug px-2">{t(`${member.id}.role`)}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Member Modal Overlay */}
      <AnimatePresence>
        {activeMember && selectedMember && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-[100] backdrop-blur-sm"
              onClick={() => setActiveMember(null)}
            />
            
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none">
              <motion.div 
                layoutId={`team-modal-${selectedMember.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-6xl max-h-[90vh] bg-[#15171B] border border-white/10 rounded-3xl overflow-y-auto pointer-events-auto shadow-2xl custom-scrollbar relative"
              >
                <button 
                  onClick={() => setActiveMember(null)}
                  className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 hover:bg-[#E8B04B] hover:text-[#15171B] rounded-full flex items-center justify-center transition-colors"
                >
                  <X />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3">
                  {/* Left Column: Image & Bio */}
                  <div className="lg:col-span-1 p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/10 bg-white/5">
                    <img 
                      src={selectedMember.image} 
                      alt={t(`${selectedMember.id}.name`)} 
                      className="w-32 h-32 rounded-full object-cover mb-6 border-2 border-[#E8B04B] shadow-xl"
                      onError={(e) => e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
                    />
                    <h3 className="font-archivo font-black text-3xl md:text-4xl text-[#E8B04B] mb-2">{t(`${selectedMember.id}.name`)}</h3>
                    <p className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-60 mb-6">{t(`${selectedMember.id}.role`)}</p>
                    
                    <p className="text-white/80 leading-relaxed mb-8">
                      {t(`${selectedMember.id}.bio`)}
                    </p>

                    {selectedMember.hasStats && (
                      <div className="space-y-4 mb-8">
                        <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                          <span className="block text-[#E8B04B] font-black text-2xl">{t(`${selectedMember.id}.stats.views`)}</span>
                          <span className="text-xs uppercase tracking-wider opacity-60">Total Views</span>
                        </div>
                        <div className="flex gap-4">
                          <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex-1">
                            <span className="block text-white font-bold text-lg">{t(`${selectedMember.id}.stats.videos`)}</span>
                          </div>
                          <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex-1">
                            <span className="block text-white font-bold text-lg">{t(`${selectedMember.id}.stats.likes`)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-widest opacity-60 mb-4">{t(`${selectedMember.id}.clientsTitle`)}</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.clients.map(client => (
                          <span key={client} className="px-3 py-1.5 bg-white/10 rounded-full text-sm font-medium border border-white/5">
                            {client}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Either Contact Hub (for André & João) or Embedded Videos / Showreel */}
                  {selectedMember.isContactOnly ? (
                    <div className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-between space-y-8">
                      {/* Header with status badge */}
                      <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          {t(`${selectedMember.id}.contactBadge`)}
                        </div>
                        <h4 className="font-archivo font-black text-3xl md:text-4xl text-white mb-3">
                          {t(`${selectedMember.id}.contactTitle`)}
                        </h4>
                        <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl font-inter">
                          {t(`${selectedMember.id}.contactSubtitle`)}
                        </p>
                      </div>

                      {/* Contact Cards Grid: 3 columns if has Instagram (André), 2 columns if WhatsApp+Email (João) */}
                      <div className={`grid grid-cols-1 ${selectedMember.instagram ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-5`}>
                        {/* WhatsApp Card */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950/40 via-white/[0.03] to-white/[0.01] border border-emerald-500/25 hover:border-emerald-500/50 p-6 flex flex-col justify-between transition-all group shadow-xl min-h-[240px]">
                          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                <MessageSquare className="w-6 h-6" />
                              </div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/90 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                                WhatsApp
                              </span>
                            </div>
                            <h5 className="font-archivo font-bold text-lg text-white mb-1.5">
                              {t(`${selectedMember.id}.whatsappLabel`)}
                            </h5>
                            <p className="text-xs text-white/70 mb-4 font-inter leading-relaxed">
                              {t(`${selectedMember.id}.whatsappDesc`)}
                            </p>
                          </div>

                          <div className="pt-2">
                            <a 
                              href={selectedMember.whatsappUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#15171B] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 text-xs sm:text-sm hover:scale-[1.02] cursor-pointer"
                            >
                              <Send className="w-4 h-4 flex-shrink-0" />
                              <span>{t(`${selectedMember.id}.whatsappCta`)}</span>
                              <ArrowUpRight className="w-4 h-4 opacity-70 flex-shrink-0" />
                            </a>
                          </div>
                        </div>

                        {/* Instagram Card (Only if member has instagram) */}
                        {selectedMember.instagram && (
                          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-950/40 via-purple-950/20 to-white/[0.01] border border-rose-500/25 hover:border-rose-500/50 p-6 flex flex-col justify-between transition-all group shadow-xl min-h-[240px]">
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-tr from-pink-500/15 to-purple-500/15 rounded-full blur-2xl pointer-events-none" />
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500/20 via-rose-500/20 to-purple-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                                  <InstagramIcon className="w-6 h-6" />
                                </div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400/90 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">
                                  Instagram
                                </span>
                              </div>
                              <h5 className="font-archivo font-bold text-lg text-white mb-1.5">
                                {t(`${selectedMember.id}.instagramLabel`)}
                              </h5>
                              <p className="text-xs text-white/70 mb-4 font-inter leading-relaxed">
                                {t(`${selectedMember.id}.instagramDesc`)}
                              </p>
                            </div>

                            <div className="pt-2">
                              <a 
                                href={selectedMember.instagramUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-900/30 text-xs sm:text-sm hover:scale-[1.02] cursor-pointer"
                              >
                                <InstagramIcon className="w-4 h-4 flex-shrink-0" />
                                <span>{t(`${selectedMember.id}.instagramCta`)}</span>
                                <ArrowUpRight className="w-4 h-4 opacity-70 flex-shrink-0" />
                              </a>
                            </div>
                          </div>
                        )}

                        {/* Email Card */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#E8B04B]/15 via-white/[0.03] to-white/[0.01] border border-[#E8B04B]/25 hover:border-[#E8B04B]/50 p-6 flex flex-col justify-between transition-all group shadow-xl min-h-[240px]">
                          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#E8B04B]/15 rounded-full blur-2xl pointer-events-none" />
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div className="w-12 h-12 rounded-xl bg-[#E8B04B]/20 border border-[#E8B04B]/30 flex items-center justify-center text-[#E8B04B] group-hover:scale-110 transition-transform">
                                <Mail className="w-6 h-6" />
                              </div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E8B04B]/90 bg-[#E8B04B]/10 px-2.5 py-1 rounded-md border border-[#E8B04B]/20">
                                E-mail
                              </span>
                            </div>
                            <h5 className="font-archivo font-bold text-lg text-white mb-1.5">
                              {t(`${selectedMember.id}.emailLabel`)}
                            </h5>
                            <p className="text-xs text-white/70 mb-4 font-inter leading-relaxed">
                              {t(`${selectedMember.id}.emailDesc`)}
                            </p>
                          </div>

                          <div className="pt-2">
                            <a 
                              href={`mailto:${selectedMember.email}?subject=Contato%20via%20AJ%20Produtora`} 
                              className="w-full bg-[#E8B04B] hover:bg-[#d89f3a] text-[#15171B] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#E8B04B]/20 text-xs sm:text-sm hover:scale-[1.02] cursor-pointer"
                            >
                              <Mail className="w-4 h-4 flex-shrink-0" />
                              <span>{t(`${selectedMember.id}.emailCta`)}</span>
                              <ArrowUpRight className="w-4 h-4 opacity-70 flex-shrink-0" />
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Value pillars: Dynamic for André or João */}
                      {selectedMember.id === 'andre' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-2 mb-2 text-[#E8B04B]">
                              <Film className="w-4 h-4" />
                              <h6 className="font-archivo font-bold text-xs uppercase tracking-wider text-white">
                                {t(`${selectedMember.id}.features.cinemaTitle`)}
                              </h6>
                            </div>
                            <p className="text-xs text-white/60 leading-relaxed font-inter">
                              {t(`${selectedMember.id}.features.cinemaDesc`)}
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-2 mb-2 text-[#E8B04B]">
                              <Sparkles className="w-4 h-4" />
                              <h6 className="font-archivo font-bold text-xs uppercase tracking-wider text-white">
                                {t(`${selectedMember.id}.features.aiTitle`)}
                              </h6>
                            </div>
                            <p className="text-xs text-white/60 leading-relaxed font-inter">
                              {t(`${selectedMember.id}.features.aiDesc`)}
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-2 mb-2 text-[#E8B04B]">
                              <Briefcase className="w-4 h-4" />
                              <h6 className="font-archivo font-bold text-xs uppercase tracking-wider text-white">
                                {t(`${selectedMember.id}.features.leadershipTitle`)}
                              </h6>
                            </div>
                            <p className="text-xs text-white/60 leading-relaxed font-inter">
                              {t(`${selectedMember.id}.features.leadershipDesc`)}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-2 mb-2 text-[#E8B04B]">
                              <Target className="w-4 h-4" />
                              <h6 className="font-archivo font-bold text-xs uppercase tracking-wider text-white">
                                {t(`${selectedMember.id}.features.viralTitle`)}
                              </h6>
                            </div>
                            <p className="text-xs text-white/60 leading-relaxed font-inter">
                              {t(`${selectedMember.id}.features.viralDesc`)}
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-2 mb-2 text-[#E8B04B]">
                              <Zap className="w-4 h-4" />
                              <h6 className="font-archivo font-bold text-xs uppercase tracking-wider text-white">
                                {t(`${selectedMember.id}.features.viewsTitle`)}
                              </h6>
                            </div>
                            <p className="text-xs text-white/60 leading-relaxed font-inter">
                              {t(`${selectedMember.id}.features.viewsDesc`)}
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-2 mb-2 text-[#E8B04B]">
                              <Sparkles className="w-4 h-4" />
                              <h6 className="font-archivo font-bold text-xs uppercase tracking-wider text-white">
                                {t(`${selectedMember.id}.features.techTitle`)}
                              </h6>
                            </div>
                            <p className="text-xs text-white/60 leading-relaxed font-inter">
                              {t(`${selectedMember.id}.features.techDesc`)}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Footer banner */}
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-dashed border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
                        <span className="flex items-center gap-2 text-center sm:text-left">
                          <span className="w-2 h-2 rounded-full bg-[#E8B04B] flex-shrink-0" />
                          {t(`${selectedMember.id}.ctaBanner`)}
                        </span>
                        <a 
                          href={selectedMember.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#E8B04B] hover:underline font-bold whitespace-nowrap flex items-center gap-1"
                        >
                          <span>WhatsApp Direto</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    /* Right Column: Embedded Videos or Coming Soon for Editors/Showreel */
                    <div className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-center">
                      <h4 className="font-archivo font-bold text-2xl md:text-3xl mb-8 flex items-center gap-3">
                        <PlayCircle className="text-[#E8B04B]" />
                        {t(`${selectedMember.id}.topVideosTitle`)}
                      </h4>
                      
                      {selectedMember.videos && selectedMember.videos.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {selectedMember.videos.map(video => (
                            <div key={video.id} className="bg-white/5 rounded-2xl overflow-hidden border border-white/5 group hover:border-white/20 transition-colors flex flex-col">
                              <div className="aspect-[9/16] relative bg-black flex-1">
                                <iframe 
                                  className="w-full h-full absolute inset-0"
                                  src={`https://www.youtube.com/embed/${video.id}?autoplay=0&controls=1&rel=0&modestbranding=1`}
                                  title="YouTube video player" 
                                  frameBorder="0" 
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                  allowFullScreen
                                ></iframe>
                              </div>
                              <div className="p-4 flex justify-between items-center bg-black/40">
                                <div className="flex flex-col">
                                  <span className="text-xs uppercase tracking-wider opacity-60 mb-1">Views</span>
                                  <span className="font-bold text-lg">{video.views}</span>
                                </div>
                                <div className="flex flex-col text-right">
                                  <span className="text-xs uppercase tracking-wider opacity-60 mb-1">Likes</span>
                                  <span className="font-bold text-lg text-[#E8B04B]">{video.likes}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-full min-h-[340px] flex flex-col items-center justify-center p-8 border border-dashed border-white/10 rounded-2xl bg-white/[0.02] text-center">
                          <div className="w-16 h-16 rounded-full bg-[#E8B04B]/10 flex items-center justify-center text-[#E8B04B] mb-4">
                            <PlayCircle className="w-8 h-8" />
                          </div>
                          <h5 className="font-archivo font-bold text-xl mb-2 text-white/90">
                            {t(`${selectedMember.id}.topVideosTitle`)}
                          </h5>
                          <p className="text-white/60 max-w-md font-inter text-sm">
                            {t(`${selectedMember.id}.comingSoon`)}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}


