import {
  ShieldCheckIcon,
  ViewGridIcon,
  DocumentTextIcon,
} from "@heroicons/react/outline";

export interface SidebarMenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.ComponentProps<"svg">>;
  exact?: boolean;
  external?: boolean;
}

export const sidebarMenu: SidebarMenuItem[] = [
  {
    name: "Fitur Utama",
    href: "/dashboard/notready",
    icon: ViewGridIcon,
  },
  {
    name: "Tes API",
    href: "/test/api",
    icon: ShieldCheckIcon,
  },
  {
    name: "Artikel",
    href: "/article/all",
    icon: DocumentTextIcon,
  },
];
