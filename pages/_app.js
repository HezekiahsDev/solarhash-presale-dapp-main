import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import "../styles/globals.css";

// Change to Mainnet
const network = WalletAdapterNetwork.Mainnet;

// Helius RPC Endpoint
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=02e72add-2a17-408d-89c3-5cb3192648fd`;

function MyApp({ Component, pageProps }) {
  // Use Helius RPC as the endpoint
  const endpoint = useMemo(() => HELIUS_RPC_URL, []);

  // Initialize wallets
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
