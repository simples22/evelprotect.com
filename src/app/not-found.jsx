"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import EvelButton from "@/components/publics/ui/EvelButton";
import Footer from "@/components/Footer";
import EvelSearchBar from "@/components/publics/ui/EvelSearchBar";
import Header from "@/components/Header";

export default function NotFound() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  function submitSearch(e) {
    e.preventDefault();

    const query = search.trim();
    if (!query) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <>
    <Header />
      <main className="evel404">
        <div className="evelContainer">
          <div className="evel404Inner">
            <span className="evel404Code">Oup&apos;s 404</span>

            <h1>The page you&apos;re looking for cannot be found.</h1>

            

            <form className="SearchForme" onSubmit={submitSearch}>
              <h2>Use the search bar to find news, products, or pages.</h2>

              <EvelSearchBar
                label=""
                value={search}
                className="SearchBarForm"
                onChange={setSearch}
                onClear={() => setSearch("")}
                placeholder="Search products, news, pages, leadership..."
              />
            </form>

            <div className="evel404Links">
              <h2>Popular destinations</h2>

              <div className="evel404Grid">
                <Link href="/our-company">Our Company</Link>
                <Link href="/leadership">Leadership</Link>
                <Link href="/shop">Products</Link>
                <Link href="/news">News</Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}