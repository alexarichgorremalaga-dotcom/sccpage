import { MapPin, Phone, Mail, Facebook, Globe } from "lucide-react";
import schoolLogo from "@/assets/school-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* School Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={schoolLogo}
                alt="St. Catherine's College Logo"
                className="h-16 w-16 object-contain"
              />
              <div>
                <h3 className="font-heading text-xl font-bold">
                  St. Catherine's College Inc.
                </h3>
                <p className="text-xs opacity-80">Veritas Et Excelsior</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Committed to providing quality Catholic education since 1923, 
              nurturing holistic individuals prepared for their eternal destiny.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6 text-gold">
              Contact Information
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-gold" />
                <p className="text-sm text-primary-foreground/80">
                  6019, Poblacion 1, Carcar City, Cebu, Philippines
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold" />
                <p className="text-sm text-primary-foreground/80">
                  (032) 487-8261
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold" />
                <p className="text-sm text-primary-foreground/80">
                  info@scc.edu.ph
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6 text-gold">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Admission", "Academics", "Student Portal", "News & Events", "Contact Us"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-primary-foreground/80 hover:text-gold transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} St. Catherine's College Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold transition-colors"
                aria-label="Website"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
