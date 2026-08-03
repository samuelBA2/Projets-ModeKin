import {
  Palette,
  Ruler,
  Sparkles,
  PaintRoller,
  Brush,
  ShieldCheck,
  Grid3x3,
  Droplets,
  Layers,
  Wrench,
  Clock,
  Hammer,
  DoorOpen,
  TreePine,
  Circle,
  type LucideIcon,
} from "lucide-react";

/**
 * Registre des icônes référencées par leur nom dans la couche de données
 * (`Benefit.iconName`). On mappe explicitement les noms utilisés plutôt que
 * d'importer tout lucide-react, afin de préserver le tree-shaking.
 */
const REGISTRY: Record<string, LucideIcon> = {
  Palette,
  Ruler,
  Sparkles,
  PaintRoller,
  Brush,
  ShieldCheck,
  Grid3x3,
  Droplets,
  Layers,
  Wrench,
  Clock,
  Hammer,
  DoorOpen,
  TreePine,
};

type IconProps = {
  name: string;
  className?: string;
};

/** Rend l'icône Lucide correspondant au nom, avec un repli neutre. */
export function Icon({ name, className }: IconProps) {
  const Cmp = REGISTRY[name] ?? Circle;
  return <Cmp className={className} aria-hidden="true" />;
}
