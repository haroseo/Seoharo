export default function About() {
  const details = [
    {
      title: 'Creative process',
      description:
        '브랜드와 서비스를 위한 전략적 아이디어를 설계하고, 실행 가능한 형태로 연결합니다.',
    },
    {
      title: 'Service design',
      description:
        '고객 경험을 중심으로 한 플랫폼과 인터랙션을 정의하여 명확한 흐름을 만듭니다.',
    },
    {
      title: 'Design systems',
      description:
        '타이포그래피와 시각 규칙을 통해 일관성과 확장성을 제공합니다.',
    },
    {
      title: 'Reliable execution',
      description:
        '직관적인 디자인과 안정적인 구현을 함께 고려하여 완성도 높은 결과물을 만듭니다.',
    },
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-100 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="section-overline">About</p>
              <h2 className="section-title mt-2">
                디자인과 경험을 연결하는, 서하루입니다.
              </h2>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
                사용자 중심의 인터페이스와 브랜드 감각을 결합해, 명확하고
                신뢰감 있는 비주얼 경험을 만들어냅니다. 프로젝트의 목적에 맞는
                디자인 구조를 빠르게 제안하고 완성합니다.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {details.map((item, index) => (
                <div
                  key={index}
                  className="glass-card p-8"
                >
                  <h3 className="text-xl font-semibold text-slate-950 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-slate-700">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-10">
            <p className="section-overline">Profile</p>
            <div className="mt-8 space-y-6 text-slate-700">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  Role
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-950">
                  Brand Designer & CEO
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  Approach
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-950">
                  깔끔한 아이디어, 고객과의 활발한 교류, 빠른 연락
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  Focus
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-950">
                  브랜드 · UX · Programming
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
