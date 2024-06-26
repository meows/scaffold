import { Inter, Roboto, Quicksand } from "next/font/google"
import localFont from "next/font/local"

import { space } from "~/constant/string"

// —————————————————————————————————————————————————————————————————————————————
// English

export const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  subsets: ["latin"],
})

export const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
})

export const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  subsets: ["latin"],
})

// export const geist_sans = localFont({
//   src: "./font/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// })

// export const geist_mono = localFont({
//   src: "./font/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// })

// —————————————————————————————————————————————————————————————————————————————
// Export

/** Magic string for fonts, placed under `className` of body. */
export default [
  inter.variable, 
  roboto.variable, 
  quicksand.variable,
  // geist_sans.variable,
  // geist_mono.variable,
].join(space)

// https://nextjs.org/docs/app/building-your-application/optimizing/fonts
