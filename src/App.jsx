import { useRef, useState } from "react";
import { CHECKOUT_URL, VSL_VIDEO_PATH, VSL_POSTER_PATH, VSL_UNLOCK_SECONDS } from "./config";

const benefits = [
  { number: "01", title: "Estuda com direcção", text: "Deixa de estudar sem saber por onde começar. Organiza o teu esforço em torno do que realmente precisas de dominar." },
  { number: "02", title: "Compreende, não decora apenas", text: "Constrói uma base de conhecimento que te ajuda a interpretar perguntas e resolver exercícios com mais segurança." },
  { number: "03", title: "Chega à prova mais preparado", text: "Transforma a preparação num processo consistente, com foco, prática e uma estratégia clara." }
];

const faqs = [
  { q: "Como faço para aceder depois de comprar?", a: "Depois de concluíres a compra na página de checkout, segue as instruções apresentadas pela Kursinha para receberes o acesso." },
  { q: "Posso assistir pelo telemóvel?", a: "Sim. Esta página foi construída para funcionar em telemóveis, tablets e computadores." },
  { q: "Onde encontro o conteúdo e os detalhes da oferta?", a: "Assiste à apresentação completa. Nela serão explicados os detalhes da solução, o que está incluído e como avançar." }
];

function Brand() {
  return <a className="brand" href="#top" aria-label="MentorX início">Mentor<span>X</span><i>.</i></a>;
}

export default function App() {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const checkoutReady = Boolean(CHECKOUT_URL.trim());

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    const next = Math.min(100, (video.currentTime / video.duration) * 100);
    setProgress(next);
    if (video.currentTime >= VSL_UNLOCK_SECONDS) setUnlocked(true);
  };

  const goToCheckout = () => {
    if (!checkoutReady) return;
    window.location.href = CHECKOUT_URL;
  };

  return (
    <div className="page-shell" id="top">
      <header className="topbar">
        <Brand />
        <div className="topbar-note"><span className="status-dot" /> APRESENTAÇÃO ESPECIAL</div>
      </header>

      <main>
        <section className="hero section-container">
          <div className="eyebrow"><span className="eyebrow-line" /> MENTORX APRESENTA</div>
          <h1>O próximo resultado começa com a forma como te <em>preparas.</em></h1>
          <p className="hero-copy">Assiste à apresentação até ao fim e descobre como dar mais método, clareza e direcção à tua preparação para a prova.</p>
          <div className="hero-meta"><span>▶</span> ASSISTE À APRESENTAÇÃO COMPLETA <b>•</b> ACESSO AO CHECKOUT AOS 02:00</div>
        </section>

        <section className="video-section section-container" aria-label="Apresentação em vídeo">
          <div className="video-frame">
            <video
              ref={videoRef}
              className="vsl-video"
              controls
              playsInline
              preload="metadata"
              poster={VSL_POSTER_PATH}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleTimeUpdate}
              onError={() => setVideoError(true)}
            >
              <source src={VSL_VIDEO_PATH} type="video/mp4" />
              O teu navegador não suporta a reprodução deste vídeo.
            </video>
            {videoError && (
              <div className="video-placeholder">
                <div className="play-mark">▶</div>
                <strong>O vídeo de apresentação será disponibilizado aqui.</strong>
                <span>Verifica se o vídeo público do Vercel Blob está disponível.</span>
              </div>
            )}
          </div>
          <div className="watch-status">
            <div className="watch-status-top"><span>PROGRESSO DA APRESENTAÇÃO</span><strong>{Math.floor(progress)}%</strong></div>
            <div className="watch-track"><span style={{ width: progress + "%" }} /></div>
            <p>{unlocked ? "Apresentação concluída até ao ponto necessário. O acesso à oferta foi desbloqueado." : "O botão de acesso à oferta será desbloqueado quando o vídeo chegar aos 02:00."}</p>
          </div>
        </section>

        <section className="offer-gate section-container" aria-live="polite">
          {!unlocked ? (
            <div className="gate-locked">
              <div className="lock-icon">⌑</div>
              <div><span className="gate-kicker">ACESSO RESERVADO</span><h2>A tua próxima etapa está quase disponível.</h2><p>Continua a assistir. O botão para avançar será libertado automaticamente aos 02:00 da apresentação.</p></div>
              <div className="gate-percent">{Math.floor(progress)}<small>%</small></div>
            </div>
          ) : (
            <div className="gate-unlocked">
              <div className="unlock-check">✓</div>
              <div className="gate-content"><span className="gate-kicker">ACESSO DESBLOQUEADO</span><h2>Estás pronto para dar o próximo passo?</h2><p>Avança para a página segura de checkout e consulta as condições da oferta.</p></div>
              {checkoutReady ? (
                <button className="checkout-button" onClick={goToCheckout}>QUERO GARANTIR O MEU ACESSO <span>↗</span></button>
              ) : (
                <button className="checkout-button checkout-pending" disabled>CHECKOUT EM CONFIGURAÇÃO</button>
              )}
            </div>
          )}
        </section>

        <section className="value-section section-container">
          <div className="section-heading">
            <span className="section-kicker">PREPARAÇÃO COM INTENÇÃO</span>
            <h2>Não se trata apenas de estudar mais.<br /><em>Trata-se de estudar melhor.</em></h2>
            <p>Uma preparação mais consciente começa quando tens clareza sobre o que fazer e como avançar.</p>
          </div>
          <div className="benefit-grid">
            {benefits.map((item) => <article className="benefit-card" key={item.number}>
              <span className="benefit-number">{item.number}</span>
              <div className="benefit-rule" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>)}
          </div>
        </section>

        <section className="final-cta">
          <div className="section-container final-cta-inner">
            <span className="section-kicker">O TEU FUTURO MERECE PREPARAÇÃO</span>
            <h2>Assiste. Aprende. Decide.</h2>
            <p>Vê a apresentação completa para conheceres a proposta MentorX.</p>
            <a href="#top" className="outline-button">VOLTAR À APRESENTAÇÃO ↑</a>
          </div>
        </section>

        <section className="faq-section section-container">
          <div className="faq-intro"><span className="section-kicker">DÚVIDAS FREQUENTES</span><h2>Antes de avançares.</h2><p>Algumas respostas úteis sobre a apresentação e o acesso.</p></div>
          <div className="faq-list">
            {faqs.map((item, index) => <article className={"faq-item " + (openFaq === index ? "active" : "")} key={item.q}>
              <button className="faq-question" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
                <span>{item.q}</span><b>{openFaq === index ? "−" : "+"}</b>
              </button>
              {openFaq === index && <p className="faq-answer">{item.a}</p>}
            </article>)}
          </div>
        </section>
      </main>

      <footer className="footer section-container"><Brand /><span>© {new Date().getFullYear()} MentorX. Todos os direitos reservados.</span><a href="#top">Voltar ao início ↑</a></footer>
    </div>
  );
}