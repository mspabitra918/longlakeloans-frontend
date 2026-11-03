import type { Metadata } from "next";
import T from "@/components/T";
import React from "react";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function page() {
  return (
    <div>
      <T />
    </div>
  );
}
