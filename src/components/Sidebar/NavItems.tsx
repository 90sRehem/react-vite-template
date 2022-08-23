import { useLocation } from "@/lib/react-router-dom";
import { Fragment } from "react";
import { NavItem } from "./NavItem";
import { INavItems } from "./types";

export function NavItems({ items }: INavItems) {
  const path = useLocation();
  return (
    <>
      {items.map(item => (
        <Fragment key={item.title}>
          <NavItem
            navSize={item.navSize}
            icon={item.icon}
            title={item.title}
            description={item.description}
            active={path.pathname.startsWith(item.url)}
            url={item.url}
          />
        </Fragment>
      ))}
    </>
  );
}
