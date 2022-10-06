import { useLocation } from "@/lib/react-router-dom";
import { Fragment } from "react";
import { INavItems } from "@/types";
import { NavItem } from "./NavItem";

export function NavItems({ items }: INavItems) {
  const path = useLocation();
  return (
    <ul>
      {items.map(item => (
        <Fragment key={item.title}>
          <NavItem
            isOpen={item.isOpen}
            icon={item.icon}
            title={item.title}
            description={item.description}
            active={path.pathname.endsWith(item.url)}
            url={item.url}
          />
        </Fragment>
      ))}
    </ul>
  );
}
