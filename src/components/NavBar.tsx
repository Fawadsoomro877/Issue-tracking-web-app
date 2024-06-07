"use client";
import { Box } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";

const navLinks = [
  { id: 0, label: "Dashbaord", href: "/" },
  { id: 1, label: "Issues", href: "/issues/list" },
];

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  return (
    <nav className="flex items-center gap-6 p-6 mb-4 border-b">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex gap-6">
        {navLinks.map((link) => (
          <li key={link.id}>
            <Link
              className={`${
                link.href === currentPath && "text-zinc-900"
              } text-zinc-500 hover:text-zinc-800 transition-colors`}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Log out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
