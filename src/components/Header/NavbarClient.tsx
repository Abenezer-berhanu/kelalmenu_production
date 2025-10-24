"use client";

import { constants, images, links, navLinks } from "@/lib/exporter";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NavbarClient({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <header className="py-5 border-b bg-white sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link className="block text-primary" href={links.home}>
          <span className="sr-only">Home</span>
          <Image
            src={images.logo}
            width={220}
            height={220}
            className="w-24 h-24"
            alt={constants.name + "_logo"}
            priority
          />
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          {/* Desktop Nav */}
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    className="text-gray-500 transition hover:text-gray-700 capitalize"
                    href={link.url}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth Buttons (Desktop) */}
          {!user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href={links.login}>
                <Button>Login</Button>
              </Link>

              <Link href={links.register}>
                <Button>Register</Button>
              </Link>
            </div>
          ) : (
            <Link className="mr-2" href={links.hotel_dashboard + `/${user.id}`}>
              <Button>Dashboard</Button>
            </Link>
          )}

          {/* Mobile Menu (Sheet) */}
          <div className="md:hidden flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-sm bg-primary hover:bg-primary-hover text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-full max-w-52 p-3">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <Image
                        src={images.logo}
                        width={50}
                        height={50}
                        quality={100}
                        className="w-12 h-12"
                        alt={constants.name + "_logo"}
                        priority
                      />
                      <span className="font-semibold text-lg">
                        {constants.name}
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <nav className="mt-6">
                  <ul className="flex flex-col gap-4">
                    {navLinks.map((link, idx) => (
                      <li key={idx}>
                        <Link
                          className="block text-gray-700 hover:text-primary transition capitalize"
                          href={link.url}
                          onClick={handleClose}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {!user ? (
                  <div className="mt-8 flex flex-col gap-3">
                    <Link
                      className="block text-center rounded-md px-5 py-2.5 text-sm font-medium transition bg-primary hover:bg-primary-hover text-primary-foreground"
                      href={links.login}
                      onClick={handleClose}
                    >
                      Login
                    </Link>
                    <Link
                      className="block text-center rounded-md px-5 py-2.5 text-sm font-medium transition bg-secondary hover:bg-primary-hover hover:text-primary-foreground"
                      href={links.register}
                      onClick={handleClose}
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <Link href={links.hotel_dashboard + `/${user.id}`}>
                    <Button>Dashboard</Button>
                  </Link>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
