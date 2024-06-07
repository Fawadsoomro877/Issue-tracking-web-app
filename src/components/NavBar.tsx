"use client";
import { Box, Container, Flex } from "@radix-ui/themes";
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
    <nav className=" px-5 py-3 mb-5 border-b">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
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
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Link href="/api/auth/signout">Log out</Link>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
