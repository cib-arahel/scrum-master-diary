function ReflectionTip() {
  const tips = [
    'Como você apoiou o time hoje?',
    'Qual impedimento você ajudou a resolver?',
    'O que aprendeu ao facilitar a Daily Scrum?',
    'Como pode melhorar sua escuta ativa amanhã?',
    'Hoje você protegeu bem o time das interferências externas?',
    'Teve alguma situação em que você poderia ter sido mais facilitador e menos solucionador?',
    'Você encorajou o time a ser mais autogerenciável hoje?',
    'Como foi sua atuação na remoção de obstáculos? Pode ser melhorada?',
    'Houve alguma situação em que feedback poderia ter sido dado e não foi?',
    'Você promoveu algum momento de melhoria contínua além da Retrospectiva?',
    'Alguém do time precisou de apoio emocional? Como você reagiu?',
    'O que você fez hoje que contribuiu para o crescimento da cultura ágil?',
    'Teve espaço para celebrar pequenas conquistas hoje?',
    'Você conseguiu observar mais do que intervir? Como foi esse equilíbrio?',
    'Quais perguntas poderosas você fez hoje que ajudaram o time a refletir?',
    'Existe algo que você poderia ter delegado ao time ao invés de conduzir sozinho?',
    'O que você aprendeu hoje sobre o seu próprio papel como Scrum Master?'
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <p className="fst-italic text-muted mb-4">
      💡 <strong>Dica de Reflexão:</strong> {randomTip}
    </p>
  );
}

export default ReflectionTip;
