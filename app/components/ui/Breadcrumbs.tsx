import { Fragment } from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

/** Fil d'Ariane accessible : le dernier élément est la page courante (non cliquable). */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const lastIndex = items.length - 1;

  return (
    <nav aria-label="Fil d'Ariane">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink/70">
        {items.map((item, index) => {
          const isLast = index === lastIndex;
          return (
            <Fragment key={item.path}>
              <li className="flex items-center gap-1.5">
                {isLast ? (
                  <span aria-current="page" className="font-medium text-ink">
                    {item.name}
                  </span>
                ) : (
                  <Link to={item.path} className="hover:text-gold hover:underline">
                    {item.name}
                  </Link>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className="flex items-center">
                  <ChevronRight className="size-3.5" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
