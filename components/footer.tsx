import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity inline-flex">
              <Image src="/logo_updated.jpg" alt="Beejbani Logo" width={60} height={60} className="rounded-full" />
              <span className="text-2xl font-bold">Beejbani</span>
            </Link>

            {/* Initiative Section Added */}
            <div className="flex items-center gap-3 mt-2">
              <Image
                src="/initiative.jpg" // your uploaded image
                alt="Innovative Agro Farm Logo"
                width={80}
                height={80}
              />
              <p className="text-sm text-background/70 leading-snug">
                An initiative by <br />
                <span className="font-semibold text-background">Innovative Agro Farm</span>
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <p className="text-background/80">beejbani@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <p className="text-background/80">8697199130</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <p className="text-background/80">
                    Patharberiya, South 24Pargana
                    <br />
                    West Bengal
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links and Social */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4 mb-6">
              <a
                href="https://www.facebook.com/profile.php?id=61552901554846"
                className="bg-primary/20 hover:bg-primary p-3 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/philicagro/"
                className="bg-primary/20 hover:bg-primary p-3 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@Krishiinitiative"
                className="bg-primary/20 hover:bg-primary p-3 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <p className="text-background/60 text-sm">
              Stay connected for updates on new collections and special offers.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60 text-sm">© {new Date().getFullYear()} Beejbani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
