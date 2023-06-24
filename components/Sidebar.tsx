"use client";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { useMemo } from "react";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";

const Sidebar: React.FC<React.PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Home",
        active: pathname !== "/search",
        href: "/",
        icon: HiHome,
      },
      {
        label: "Search",
        active: pathname === "/search",
        href: "/search",
        icon: BiSearch,
      },
    ],
    []
  );

  return (
    <div className="flex h-full">
      <div
        className="hidden 
      md:flex
      flex-col
      gap-y-2
      bg-black
      h-full
      w-[300px]
      p-2
      "
      >
        <Box>
          <div
            className="
                  flex
                  flex-col
                  gap-y-4
                  px-5
                  py-4
                  "
          >
            {routes.map((item) => (
              <SidebarItem {...item} key={item.label} />
            ))}
          </div>
        </Box>
        <Box
          className="
        overflow-y-auto h-full"
        >
          <Library />
        </Box>
      </div>
      <main
        className="
      h-full
      flex-1
      overflow-y-auto
      py-2"
      >
        {children}
      </main>
    </div>
  );
};
export default Sidebar;