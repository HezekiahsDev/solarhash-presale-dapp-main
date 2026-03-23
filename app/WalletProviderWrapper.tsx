"use client"; // Mark this as a Client Component

import { ReactNode } from "react";

interface WalletProviderWrapperProps {
  children: ReactNode;
}
// Wallet connection plumbing is commented out while presale is disabled.
export default function WalletProviderWrapper({
  children,
}: WalletProviderWrapperProps) {
  // Original Solana connection logic:
  // const endpoint = useMemo(() => HELIUS_RPC_URL, []);
  // const wallets = useMemo(
  //   () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
  //   []
  // );
  // return (
  //   <ConnectionProvider endpoint={endpoint}>
  //     <WalletProvider wallets={wallets} autoConnect>
  //       <WalletModalProvider>{children}</WalletModalProvider>
  //     </WalletProvider>
  //   </ConnectionProvider>
  // );

  // Pass-through render while wallet integrations are disabled.
  return <>{children}</>;
}
