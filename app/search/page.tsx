"use client";

import SearchContentSection from "./SearchContentSection";
import PageSection from "../components/PageSection";
import { Suspense } from "react";


export default function SearchPage() {
  return (
    <>
      <PageSection>
        <Suspense>
          <SearchContentSection />
        </Suspense>
      </PageSection>
    </>
  );
}