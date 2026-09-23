"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

export default function Sidebar() {
  const pathname =
    usePathname();

  const { user } = useAuth();

  if (!user) return null;

  const passengerLinks = [
    {
      label: "Dashboard",
      href: "/passenger/dashboard",
    },
    {
      label: "Request Ride",
      href: "/passenger/request-ride",
    },
    {
      label: "My Rides",
      href: "/passenger/rides",
    },
    {
      label: "History",
      href: "/passenger/history",
    },
  ];

  const driverLinks = [
  {
    label: "Dashboard",
    href: "/driver/dashboard",
  },
  {
    label: "Ride Requests",
    href: "/driver/requests",
  },
  {
    label: "Current Pool",
    href: "/driver/current-ride",
  },
  {
    label: "History",
    href: "/driver/history",
  },
];
  const links =
    user.role === "PASSENGER"
      ? passengerLinks
      : driverLinks;

  return (
    <aside className="hidden w-64 border-r bg-white md:block">
      <nav className="space-y-1 p-4">
        {links.map((link) => {
          const active =
            pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                block rounded-lg px-4 py-3 text-sm
                ${
                  active
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}