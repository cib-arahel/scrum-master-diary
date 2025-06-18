function ReflectionTip() {
  const tips = [
    'Como você apoiou o time hoje?',
    'Qual impedimento você ajudou a resolver?',
    'O que aprendeu ao facilitar a Daily Scrum?',
    'Como pode melhorar sua escuta ativa amanhã?'
  ];
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  return <p className="fst-italic text-muted mb-4">{randomTip}</p>;
}

export default ReflectionTip;