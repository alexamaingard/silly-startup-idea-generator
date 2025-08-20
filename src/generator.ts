import { adjectives, nouns, targets } from './data';

export const generateSillyIdea = () => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const target = targets[Math.floor(Math.random() * targets.length)];

  return `${adj} ${noun} for ${target}`;
}
