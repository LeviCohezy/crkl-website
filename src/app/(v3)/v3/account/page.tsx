import type { Metadata } from "next";
import { AccountView } from "@/components/shop/AccountView";
import { PageTitle } from "@/components/v3/PageTitle";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <PageTitle title={"Uw *account*"}>
      <AccountView />
    </PageTitle>
  );
}
