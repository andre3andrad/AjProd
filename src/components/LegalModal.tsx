'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText, Mail, ArrowUpRight, Copy, Check } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  initialDoc?: 'privacy' | 'terms';
  onClose: () => void;
}

export default function LegalModal({ isOpen, initialDoc = 'privacy', onClose }: LegalModalProps) {
  const [activeDoc, setActiveDoc] = useState<'privacy' | 'terms'>(initialDoc);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialDoc) {
      setActiveDoc(initialDoc);
    }
  }, [initialDoc]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    if (typeof window !== 'undefined' && navigator?.clipboard) {
      navigator.clipboard.writeText('aj.prodinc@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-3xl bg-[#15171B] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl z-10 max-h-[85vh] flex flex-col my-8 text-[#F4F2ED] overflow-hidden"
          >
            {/* Header / Tabs */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 flex-shrink-0">
              {/* Document Switcher Tabs */}
              <div className="flex items-center gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
                <button
                  onClick={() => setActiveDoc('privacy')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeDoc === 'privacy'
                      ? 'bg-[#E8B04B] text-[#15171B] shadow-md'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Política de Privacidade</span>
                </button>
                <button
                  onClick={() => setActiveDoc('terms')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeDoc === 'terms'
                      ? 'bg-[#E8B04B] text-[#15171B] shadow-md'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Termos de Serviço</span>
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 ml-4 flex-shrink-0"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto py-6 pr-2 sm:pr-4 custom-scrollbar space-y-8 font-inter text-sm sm:text-base leading-relaxed text-white/80">
              {activeDoc === 'privacy' ? (
                /* POLÍTICA DE PRIVACIDADE */
                <article className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Documento Oficial
                    </div>
                    <h2 className="font-archivo font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase mb-2">
                      Política de Privacidade
                    </h2>
                    <p className="text-xs sm:text-sm text-white/50 font-mono">
                      Última atualização: 5 de outubro de 2026
                    </p>
                  </div>

                  <p className="text-white/90 leading-relaxed">
                    A sua privacidade é importante para nós. Esta Política de Privacidade descreve como a{' '}
                    <strong className="text-white">AJ Creative Studio</strong> trata as informações dos visitantes que acessam nossa página (
                    <span className="text-[#E8B04B]">ajcreativestudio.site</span>).
                  </p>

                  {/* Section 1 */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                    <h3 className="font-archivo font-bold text-lg text-white flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#E8B04B]/20 text-[#E8B04B] text-xs">
                        1
                      </span>
                      Coleta de Informações
                    </h3>
                    <p>
                      A <strong className="text-white">AJ Creative Studio</strong> opera primariamente como uma página de apresentação e redirecionamento. Não solicitamos dados de cadastro, senhas, documentos ou informações financeiras diretamente em nossa página.
                    </p>
                    <p className="text-white/70">Podemos coletar automaticamente apenas:</p>
                    <ul className="list-disc list-inside space-y-1.5 pl-2 text-white/70 text-sm">
                      <li>
                        Informações técnicas padrão de acesso geradas pelo servidor (como endereço IP, tipo de navegador, sistema operacional e horário de acesso).
                      </li>
                      <li>
                        Cookies e métricas de navegação através de ferramentas de análise (ex.: Google Analytics) para entender o volume de acessos e melhorar o desempenho da página.
                      </li>
                    </ul>
                  </div>

                  {/* Section 2 */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                    <h3 className="font-archivo font-bold text-lg text-white flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#E8B04B]/20 text-[#E8B04B] text-xs">
                        2
                      </span>
                      Links para Plataformas e Sites de Terceiros
                    </h3>
                    <p>
                      Nosso site contém links que direcionam você para plataformas externas (tais como redes sociais, aplicativos de mensagens, canais de vídeo ou plataformas de serviços).
                    </p>
                    <p className="text-white/70">
                      Não temos controle sobre a forma como essas plataformas tratam os seus dados. Ao clicar em qualquer link externo e sair da <strong className="text-white">AJ Creative Studio</strong>, recomendamos fortemente a leitura das Políticas de Privacidade específicas de cada destino.
                    </p>
                  </div>

                  {/* Section 3 */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                    <h3 className="font-archivo font-bold text-lg text-white flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#E8B04B]/20 text-[#E8B04B] text-xs">
                        3
                      </span>
                      Compartilhamento de Dados
                    </h3>
                    <p>
                      Não vendemos, alugamos ou comercializamos quaisquer dados de navegação ou informações de visitantes a terceiros.
                    </p>
                  </div>

                  {/* Section 4 */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                    <h3 className="font-archivo font-bold text-lg text-white flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#E8B04B]/20 text-[#E8B04B] text-xs">
                        4
                      </span>
                      Seus Direitos (LGPD)
                    </h3>
                    <p>
                      Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem o direito de solicitar confirmação, correção ou exclusão de qualquer dado pessoal que porventura tenhamos registrado.
                    </p>
                  </div>

                  {/* Section 5 */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#E8B04B]/10 to-transparent border border-[#E8B04B]/20 space-y-3">
                    <h3 className="font-archivo font-bold text-lg text-white flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#E8B04B] text-[#15171B] text-xs font-black">
                        5
                      </span>
                      Contato
                    </h3>
                    <p>
                      Caso tenha qualquer dúvida sobre esta Política de Privacidade, entre em contato através do e-mail oficial:
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <a
                        href="mailto:aj.prodinc@gmail.com"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E8B04B] text-[#15171B] font-bold text-xs sm:text-sm hover:bg-[#d89f3a] transition-all shadow-md"
                      >
                        <Mail className="w-4 h-4" />
                        <span>aj.prodinc@gmail.com</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                      </a>
                      <button
                        onClick={handleCopyEmail}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer relative"
                        title="Copiar e-mail"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </article>
              ) : (
                /* TERMOS DE SERVIÇO */
                <article className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#E8B04B] text-xs font-bold uppercase tracking-wider mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8B04B] animate-pulse" />
                      Documento Oficial
                    </div>
                    <h2 className="font-archivo font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase mb-2">
                      Termos de Serviço
                    </h2>
                    <p className="text-xs sm:text-sm text-white/50 font-mono">
                      Última atualização: 5 de outubro de 2026
                    </p>
                  </div>

                  <p className="text-white/90 leading-relaxed">
                    Ao acessar a <strong className="text-white">AJ Creative Studio</strong> (
                    <span className="text-[#E8B04B]">ajcreativestudio.site</span>), você concorda em cumprir estes Termos de Serviço e todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, recomendamos não utilizar este site.
                  </p>

                  {/* Section 1 */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                    <h3 className="font-archivo font-bold text-lg text-white flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#E8B04B]/20 text-[#E8B04B] text-xs">
                        1
                      </span>
                      Finalidade do Site
                    </h3>
                    <p>
                      A <strong className="text-white">AJ Creative Studio</strong> tem caráter meramente informativo e de divulgação, servindo como canal de apresentação e conexão para nossos conteúdos, canais e serviços hospedados em plataformas externas.
                    </p>
                  </div>

                  {/* Section 2 */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                    <h3 className="font-archivo font-bold text-lg text-white flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#E8B04B]/20 text-[#E8B04B] text-xs">
                        2
                      </span>
                      Isenção de Responsabilidade sobre Links Externos
                    </h3>
                    <p>
                      Nosso site inclui links para serviços, plataformas, páginas e redes mantidas por terceiros:
                    </p>
                    <ul className="list-disc list-inside space-y-1.5 pl-2 text-white/70 text-sm">
                      <li>
                        Não temos controle, não endossamos e não assumimos responsabilidade pelo conteúdo, precisão, práticas de privacidade, termos contratuais ou eventuais cobranças realizadas por essas plataformas de destino.
                      </li>
                      <li>
                        O uso de qualquer serviço ou aquisição de produto em plataformas externas é feito por sua própria conta e risco, regido exclusivamente pelas regras do respectivo prestador.
                      </li>
                    </ul>
                  </div>

                  {/* Section 3 */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                    <h3 className="font-archivo font-bold text-lg text-white flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#E8B04B]/20 text-[#E8B04B] text-xs">
                        3
                      </span>
                      Propriedade Intelectual
                    </h3>
                    <p>
                      Todo o design, logotipos, marcas, textos, elementos visuais e a disposição desta página pertencem à <strong className="text-white">AJ Creative Studio</strong> ou são utilizados com devida licença/autorização. É vedada a cópia, reprodução ou distribuição desses elementos sem autorização prévia por escrito.
                    </p>
                  </div>

                  {/* Section 4 */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                    <h3 className="font-archivo font-bold text-lg text-white flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#E8B04B]/20 text-[#E8B04B] text-xs">
                        4
                      </span>
                      Limitação de Responsabilidade
                    </h3>
                    <p>
                      O site é disponibilizado "como está", sem garantias de funcionamento contínuo, ininterrupto ou livre de falhas técnicas/instabilidades temporárias do servidor. Não nos responsabilizamos por eventuais indisponibilidades de links ou mudanças nos serviços de terceiros.
                    </p>
                  </div>

                  {/* Section 5 */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                    <h3 className="font-archivo font-bold text-lg text-white flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#E8B04B]/20 text-[#E8B04B] text-xs">
                        5
                      </span>
                      Modificações dos Termos
                    </h3>
                    <p>
                      Estes termos podem ser atualizados periodicamente para refletir mudanças no site ou em legislações aplicáveis. O uso continuado após alterações constitui aceitação dos novos termos.
                    </p>
                  </div>

                  {/* Section 6 */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                    <h3 className="font-archivo font-bold text-lg text-white flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#E8B04B]/20 text-[#E8B04B] text-xs">
                        6
                      </span>
                      Legislação e Foro
                    </h3>
                    <p>
                      Estes termos são regidos pelas leis da República Federativa do Brasil. Quaisquer disputas relativas ao uso deste site serão submetidas ao foro da comarca de Guarulhos/SP, renunciando a qualquer outro.
                    </p>
                  </div>

                  {/* Contact Section */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#E8B04B]/10 to-transparent border border-[#E8B04B]/20 space-y-3">
                    <h3 className="font-archivo font-bold text-lg text-white flex items-center gap-2">
                      <Mail className="w-5 h-5 text-[#E8B04B]" />
                      Canal de Atendimento
                    </h3>
                    <p>
                      Para dúvidas ou solicitações referentes aos Termos de Serviço:
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <a
                        href="mailto:aj.prodinc@gmail.com"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E8B04B] text-[#15171B] font-bold text-xs sm:text-sm hover:bg-[#d89f3a] transition-all shadow-md"
                      >
                        <Mail className="w-4 h-4" />
                        <span>aj.prodinc@gmail.com</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                      </a>
                      <button
                        onClick={handleCopyEmail}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer relative"
                        title="Copiar e-mail"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </article>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
