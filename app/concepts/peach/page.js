"use client";

import { useEffect, useState } from "react";
import HeroCanvas from "./HeroCanvas";

const arrow = "↗";
const images = {
  feature1: "https://files.peachworlds.com/website/8056b15c-2739-49df-8a3a-131691083dc5/chatgpt-image-jun-15-2026-08-50-45-pm.webp",
  feature2: "https://files.peachworlds.com/website/c209c201-370c-4e3e-ac83-3599e528f690/chatgpt-image-jun-15-2026-08-53-36-pm.webp",
  feature3: "https://files.peachworlds.com/website/353a19a2-d02a-4005-aa0a-2d07eb23d24a/chatgpt-image-jun-15-2026-08-52-37-pm.webp",
  solution1: "https://files.peachworlds.com/website/ef3f779a-8b6a-4bd8-bcb9-0b77d639001a/chatgpt-image-jun-15-2026-08-59-34-pm.webp",
  solution2: "https://files.peachworlds.com/website/351c33a9-2727-4ead-96ba-0e84a1dfccfd/chatgpt-image-jun-15-2026-09-04-22-pm.webp",
  solution3: "https://files.peachworlds.com/website/969dfc0e-13eb-475b-8459-6d8e44a15e0a/chatgpt-image-jun-15-2026-09-05-41-pm.webp"
};

const partners = ["MEDIA-FIRST", "AI-NATIVE", "COMPLIANCE", "HEADLESS", "REGTECH", "CLOUD"];

function Button({ children, light = false }) {
  return <a className={`button ${light ? "button-light" : ""}`} href="#pricing"><span>{children}</span><b>{arrow}</b></a>;
}

function Eyebrow({ children }) {
  return <p className="eyebrow"><span />{children}</p>;
}

export default function Home() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const items = document.querySelectorAll(".section-head,.partners>*:not(.eyebrow),.feature-cards article,.feature-row,.solution-grid article,.benefits>*,.quotes article,.price-grid article,.cta>*,footer>*");
    items.forEach((item, i) => {
      item.classList.add("reveal");
      item.style.setProperty("--delay", `${(i % 3) * 90}ms`);
    });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    }), { threshold: .12 });
    items.forEach(item => observer.observe(item));

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      root.style.setProperty("--scroll", `${max ? scrollY / max * 100 : 0}%`);
      if (!reduced) root.style.setProperty("--parallax", `${Math.min(scrollY * .16, 105)}px`);
    };
    const onPointer = e => {
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);
    };
    const interactive = [...document.querySelectorAll(".feature-cards article,.solution-grid article,.price-grid article")];
    const handlers = interactive.map(card => {
      const move = e => {
        if (reduced) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.setProperty("--rx", `${-y * 4}deg`);
        card.style.setProperty("--ry", `${x * 5}deg`);
        card.style.setProperty("--cx", `${(x + .5) * 100}%`);
        card.style.setProperty("--cy", `${(y + .5) * 100}%`);
      };
      const leave = () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      return [card, move, leave];
    });
    const magnets = [...document.querySelectorAll(".button")].map(button => {
      const move = e => {
        if (reduced) return;
        const r = button.getBoundingClientRect();
        button.style.setProperty("--tx", `${(e.clientX - r.left - r.width / 2) * .14}px`);
        button.style.setProperty("--ty", `${(e.clientY - r.top - r.height / 2) * .14}px`);
      };
      const leave = () => {
        button.style.setProperty("--tx", "0px");
        button.style.setProperty("--ty", "0px");
      };
      button.addEventListener("pointermove", move);
      button.addEventListener("pointerleave", leave);
      return [button, move, leave];
    });
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("pointermove", onPointer, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("pointermove", onPointer);
      handlers.forEach(([el, move, leave]) => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
      magnets.forEach(([el, move, leave]) => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    };
  }, []);
  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <HeroCanvas />
      <header className="nav">
        <a className="brand" href="#">NEXT 증권</a>
        <nav className={open ? "open" : ""}>
          <a href="#solutions">비전</a><a href="#features">차별점</a>
          <a href="#benefits">아키텍처</a><a href="#pricing">파트너십</a>
        </nav>
        <Button>시작하기</Button>
        <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? "×" : "☰"}</button>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <h1>기술 위에서 금융을<br />새롭게 설계합니다.</h1>
          <div className="hero-lower">
            <div className="trust">
              <b>COMPLIANCE-BY-DESIGN</b>
              <div className="faces">
                <img src="https://files.peachworlds.com/website/ffb41913-0004-4a71-b48c-757fe7c42dfb/4.png" alt="" />
                <img src="https://files.peachworlds.com/website/19adf321-fa4e-4000-adb7-40e6caa44c8f/1.png" alt="" />
                <img src="https://files.peachworlds.com/website/3f7de391-28d0-48c8-b3da-e17e8c1eb83b/3.png" alt="" />
                <img src="https://files.peachworlds.com/website/88da0e8e-95c6-450d-9654-ce846fe84905/2.png" alt="" />
              </div>
            </div>
            <div className="hero-action">
              <p>Media-First Trading, AI-Native Intelligence, Headless Architecture를 하나의 준법 중심 기술 구조로 연결합니다.</p>
              <div className="hero-buttons"><Button>파트너십 문의</Button><a href="#solutions">기술 살펴보기</a></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section solutions-intro" id="solutions">
        <div><Eyebrow>OUR STANDARD</Eyebrow><h2>금융의 새로운 기준은<br/>구조에서 시작됩니다.</h2><Button>비전 알아보기</Button></div>
        <div className="dashboard-card">
          <div className="dash-head"><span>Campaign overview</span><b>•••</b></div>
          <div className="dash-body"><div className="ring"><b>76%</b></div><div className="bars">{[50,80,65,95,72,88,60].map((n,i)=><i key={i} style={{height:`${n}%`}} />)}</div></div>
          <p>기존 금융 시스템에 기술을 덧붙이는 방식이 아니라, 클라우드 네이티브와 Compliance-by-Design 위에서 금융 경험을 새롭게 정의합니다.</p>
        </div>
      </section>

      <section className="partners">
        <Eyebrow>ENTERPRISE FOUNDATION</Eyebrow><h2>차세대 테크 증권사를 완성하는 여섯 가지 기반.</h2>
        <div className="logo-row">{partners.map(x=><span key={x}>{x}</span>)}</div>
      </section>

      <section className="section features" id="features">
        <div className="section-head"><div><Eyebrow>WHAT MAKES IT DIFFERENT</Eyebrow><h2>금융과 기술을 연결하는<br/>세 가지 차별점.</h2></div><p>개인의 역량이 아닌 시스템, 데이터, 준법 및 글로벌 R&D 운영 체계로 지속 가능한 경쟁력을 만듭니다.</p></div>
        <div className="feature-cards">
          {[["✦","Media-First Trading","콘텐츠 탐색과 투자 정보 확인 사이의 마찰을 줄이는 미디어 융합형 파이프라인."],["⌁","AI-Native Intelligence","준법 가이드라인 안에서 시장 데이터를 구조화하고 정보 탐색을 지원하는 지능형 데이터 레이어."],["✎","Global RegTech Agility","글로벌 R&D 네트워크와 제도권 금융 수준의 RegTech 전문성을 결합한 운영 체계."]].map((x,i)=>
            <article key={x[1]}><span className="icon">{x[0]}</span><div><small>0{i+1}</small><h3>{x[1]}</h3><p>{x[2]}</p></div></article>
          )}
        </div>
      </section>

      <section className="section platform">
        <div className="section-head"><div><Eyebrow>CORE STRENGTHS</Eyebrow><h2>Enterprise by Design</h2></div><p>확장성, 준법, 데이터 인텔리전스를 제품 개발 이후가 아닌 아키텍처의 출발점에 배치합니다.</p></div>
        <div className="feature-list">
          {[
            ["01","HEADLESS ARCHITECTURE","채널은 빠르게, 핵심 시스템은 안정적으로.","API-First 기반의 분리된 아키텍처가 채널 확장, 독립 배포, 장애 격리와 지속적인 금융 서비스 운영을 지원합니다.",images.feature1],
            ["02","COMPLIANCE-FIRST","혁신과 준법을 하나의 설계 안에서.","관련 규정과 내부 통제 기준을 AI 콘텐츠, 데이터 처리, 배포 과정의 선행 조건으로 반영합니다.",images.feature2],
            ["03","DATA INTELLIGENCE","시장 노이즈를 객관적 신호로.","실시간 데이터 레이어가 시장 정보를 구조화하고 출처와 기준 시점이 명확한 리스크 정보를 제공합니다.",images.feature3]
          ].map((f)=><article className="feature-row" key={f[0]}><div className="feature-num">{f[0]}</div><img src={f[4]} alt="" /><div className="feature-copy"><Eyebrow>{f[1]}</Eyebrow><h3>{f[2]}</h3><p>{f[3]}</p><Button>아키텍처 보기</Button></div></article>)}
        </div>
      </section>

      <section className="section tailored">
        <div className="section-head"><div><Eyebrow>VISUALIZATION LAB</Eyebrow><h2>숫자에서 살아있는<br/>금융 토폴로지로.</h2></div><p>복잡한 금융 데이터를 밀도, 연결, 궤적과 변동성으로 변환해 공간적으로 탐색할 수 있는 인터페이스를 설계합니다.</p></div>
        <div className="solution-grid">
          {[["3D Capital Topology",images.solution1],["AI Neural Constellation",images.solution2],["Cross-Border Trajectories",images.solution3],["Volatility Spectrum",images.feature2]].map((s,i)=><article key={s[0]}><img src={s[1]} alt="" /><div><h3>{s[0]}</h3><p>{["자본 유동성과 데이터 밀집도를 입체적인 등고선과 파티클 지형으로 표현합니다.","공시, 뉴스와 리서치 데이터가 AI 레이어에서 연결되는 구조를 노드와 연결선으로 보여줍니다.","통화와 글로벌 자산 사이의 정산 및 이동 구조를 3D 궤적으로 시각화합니다.","시장 변동성을 초미세 캔들 파티클과 밀도 스펙트럼으로 재해석합니다."][i]}</p><span>{arrow}</span></div></article>)}
        </div>
      </section>

      <section className="benefits" id="benefits">
        <div><Eyebrow>TECHNOLOGY FOUNDATION</Eyebrow><h2>확장성과 신뢰를<br/>동시에 설계합니다.</h2><p>엔터프라이즈 금융 서비스를 위한 기술 운영 기준.</p></div>
        <div className="stats">{[["API","Headless 확장성"],["AI","준법 기반 인텔리전스"],["CMS","승인 중심 콘텐츠 운영"],["RISK","데이터 기반 리스크 정보"]].map(x=><div key={x[1]}><b>{x[0]}</b><span>{x[1]}</span></div>)}</div>
      </section>

      <section className="testimonials section">
        <Eyebrow>COMPLIANCE OVERLAY</Eyebrow><h2>신뢰는 보이지 않는 구조에서 시작됩니다.</h2>
        <div className="quotes">{[
          ["출처가 명확한 데이터","DATA GOVERNANCE","모든 시각화와 인사이트에 데이터 출처, 기준 시점과 갱신 상태를 명확하게 연결합니다."],
          ["설계에 포함된 준법","COMPLIANCE-BY-DESIGN","준법 검토를 마지막 단계가 아니라 AI 가공, 콘텐츠 승인과 배포 과정 전체에 포함합니다."],
          ["감사 가능한 운영","AUDITABLE CMS","작성, 데이터 확인, 준법 승인과 예약 발행의 모든 이력을 구조화된 워크플로로 관리합니다."]
        ].map((q,i)=><article key={q[0]}><div className="avatar">{q[0][0]}</div><div><b>{q[0]}</b><small>{q[1]}</small></div><p>“{q[2]}”</p><span>0{i+1}</span></article>)}</div>
      </section>

      <section className="pricing section" id="pricing">
        <Eyebrow>ENTERPRISE MODULES</Eyebrow><h2>차세대 금융 경험을 구성하는 세 가지 모듈.</h2>
        <div className="price-grid">{[
          ["Headless Platform","다양한 금융 채널과 서비스를 독립적으로 확장하는 엔터프라이즈 기반.","API",["API-First 구조","독립적인 채널 배포","장애 격리 설계","클라우드 네이티브"],"기술 문의"],
          ["Intelligence Engine","준법 체계 안에서 시장 데이터를 구조화하는 AI 데이터 레이어.","AI",["공시·뉴스 데이터 구조화","정보 탐색 개인화","리스크 신호 큐레이션","출처·시점 관리"],"협업 문의"],
          ["Governed CMS","비개발자 운영과 준법 승인 과정을 연결하는 구조화된 콘텐츠 시스템.","CMS",["3D 데이터 블록","실시간 미리보기","준법 승인 워크플로","예약 발행·감사 로그"],"운영 문의"]
        ].map((p,i)=><article className={i===1?"featured":""} key={p[0]}>{i===1&&<small className="popular">MOST POPULAR</small>}<h3>{p[0]}</h3><p>{p[1]}</p><strong>{p[2]}</strong><ul>{p[3].map(x=><li key={x}>✓ {x}</li>)}</ul><Button light={i===1}>{p[4]}</Button></article>)}</div>
      </section>

      <section className="cta"><div><h2>차세대 금융 경험을, 함께.</h2><p>NEXT 증권의 기술과 운영 체계로 새로운 금융 표준을 설계합니다.</p></div><div><Button light>파트너십 문의</Button><a href="#features">기술 역량 보기 →</a></div></section>
      <footer><div><a className="brand" href="#">NEXT 증권</a><a href="mailto:recruit@nextsecurities.com">recruit@nextsecurities.com</a></div><div><b>Menu</b><a href="#solutions">비전</a><a href="#features">차별점</a><a href="#benefits">아키텍처</a><a href="#pricing">파트너십</a></div><div><b>Company</b><a href="#">LinkedIn</a><a href="#">Blog</a><a href="#">Newsroom</a></div><p>© 2026 NEXT Securities Co., Ltd. · 본 페이지의 데이터 시각화는 이해를 돕기 위한 샘플입니다.</p></footer>
    </main>
  );
}
