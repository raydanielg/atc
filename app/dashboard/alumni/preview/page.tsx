import { Suspense } from "react";
import CertificatePreviewClient from "./CertificatePreviewClient";

export default function CertificatePreviewPage() {
  return (
    <Suspense>
      <CertificatePreviewClient />
    </Suspense>
  );
}
