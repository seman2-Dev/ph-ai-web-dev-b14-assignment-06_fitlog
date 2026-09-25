import Image from "next/image";
import FooterLogo from "../../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-black px-4 py-8 text-sm text-zinc-400 sm:px-6">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Image src={FooterLogo} alt="FitLog Logo" width={20} height={20} className="rotate-80"/>
          <span className="font-bold text-white">FITLOG</span>
        </div>
        <span>© 2026 FitLog — Workout Library. Train hard, log honest.</span>
      </div>
    </footer>
  );
};

export default Footer;
