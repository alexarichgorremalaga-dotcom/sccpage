import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GraduationCap, BookOpen, Building, ExternalLink } from "lucide-react";
import EnrollmentDialog from "@/components/EnrollmentDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const admissionRequirements = [
  {
    level: "Pre-Kindergarten & Kindergarten",
    requirements: [
      "Birth Certificate (PSA)",
      "Baptismal Certificate (photocopy)",
      "2x2 ID Photo (4 pcs)",
      "Report Card (if transferee)",
    ],
  },
  {
    level: "Elementary",
    requirements: [
      "Birth Certificate (PSA)",
      "Report Card (Form 138)",
      "Certificate of Good Moral Character",
      "2x2 ID Photo (4 pcs)",
    ],
  },
  {
    level: "Junior High School",
    requirements: [
      "Birth Certificate (PSA)",
      "Report Card (Form 138)",
      "Certificate of Good Moral Character",
      "2x2 ID Photo (4 pcs)",
      "ESC/QVR Certificate (if applicable)",
    ],
  },
  {
    level: "Senior High School",
    requirements: [
      "Birth Certificate (PSA)",
      "Report Card (Form 138)",
      "Certificate of Good Moral Character",
      "2x2 ID Photo (4 pcs)",
      "Junior High School Diploma",
    ],
  },
  {
    level: "College (Higher Education)",
    requirements: [
      "Birth Certificate (PSA)",
      "Form 137 / Transcript of Records",
      "Certificate of Good Moral Character",
      "Senior High School Diploma",
      "2x2 ID Photo (4 pcs)",
      "Medical Certificate",
    ],
  },
];

type EducationLevel = "basic" | "higher" | null;

const BASIC_ED_OLD_LEARNER_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSf8k95H0N5PA8pO_ISi1ycatzt2JROk4-Pr8WbtgrBpE08Jbw/viewform";
const BASIC_ED_NEW_LEARNER_FORM = "https://docs.google.com/forms/d/e/1FAIpQLScPwCEEpSAxCO5E6l0WrWInGmCGStXPP8QeW-KuJzDfu_EGXw/viewform";
const HIGHER_ED_NEW_LEARNER_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSfjK9yx1Niq0WP2dz4Cbu1EQ57So7Y28bYUEl6x9V48uYbC8Q/viewform?usp=publish-editor";
const HIGHER_ED_OLD_LEARNER_FORM = "https://forms.gle/icJ5CTkfvVEwiWZZA";

const Admission = () => {
  const [showBasicOptions, setShowBasicOptions] = useState(false);
  const [showHigherOptions, setShowHigherOptions] = useState(false);

  const openDialog = (level: EducationLevel) => {
    if (level === "basic") {
      setShowBasicOptions(true);
    } else if (level === "higher") {
      setShowHigherOptions(true);
    }
  };




  return (
    <div className="min-h-screen bg-background font-body">
      <Header />

      <main className="pt-[72px]">
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <GraduationCap className="w-16 h-16 mx-auto mb-6 text-gold" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Admission
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              Begin your journey with St. Catherine's College. Enroll today and
              be part of a community committed to excellence.
            </p>
          </div>
        </section>

        {/* Online Enrollment */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Online Enrollment
              </h2>
              <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg italic">
                "We believe that education is a process of transforming the
                Young into holistic person, in preparation for his eternal
                destiny with the Creator."
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Basic Education Card */}
              <button
                onClick={() => openDialog("basic")}
                className="group bg-card p-8 rounded-lg shadow-lg border border-border hover:border-gold transition-all hover:shadow-xl text-center cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center group-hover:bg-gold transition-colors">
                  <BookOpen className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  Basic Education
                </h3>
                <p className="text-muted-foreground text-sm">
                  Pre-K, Elementary, Junior & Senior High School
                </p>
              </button>

              {/* Higher Education Card */}
              <button
                onClick={() => openDialog("higher")}
                className="group bg-card p-8 rounded-lg shadow-lg border border-border hover:border-gold transition-all hover:shadow-xl text-center cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center group-hover:bg-gold transition-colors">
                  <Building className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  Higher Education
                </h3>
                <p className="text-muted-foreground text-sm">
                  College Programs — Education, Business, IT
                </p>
              </button>
            </div>
          </div>
        </section>

        {/* Basic Education Options Dialog */}
        <Dialog open={showBasicOptions} onOpenChange={setShowBasicOptions}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-heading text-lg text-foreground text-center">
                Basic Education Enrollment
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <a
                href={BASIC_ED_NEW_LEARNER_FORM}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-primary text-primary-foreground font-bold px-6 py-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                New Learner (Enroll)
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <a
                href={BASIC_ED_OLD_LEARNER_FORM}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-gold text-accent-foreground font-bold px-6 py-4 rounded-lg hover:bg-gold-dark transition-colors"
              >
                Returning Learner (Re-enroll)
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </DialogContent>
        </Dialog>

        {/* Higher Education Options Dialog */}
        <Dialog open={showHigherOptions} onOpenChange={setShowHigherOptions}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-heading text-lg text-foreground text-center">
                Higher Education Enrollment
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <a
                href={HIGHER_ED_NEW_LEARNER_FORM}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-primary text-primary-foreground font-bold px-6 py-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                New Learner (Enroll)
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <a
                href={HIGHER_ED_OLD_LEARNER_FORM}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-gold text-accent-foreground font-bold px-6 py-4 rounded-lg hover:bg-gold-dark transition-colors"
              >
                Returning Learner (Re-enroll)
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </DialogContent>
        </Dialog>

        {/* Admission Requirements */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Admission Requirements
              </h2>
              <div className="w-24 h-1 bg-gold mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {admissionRequirements.map((item) => (
                <div
                  key={item.level}
                  className="bg-card p-6 rounded-lg shadow-lg border border-border"
                >
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4 text-center">
                    {item.level}
                  </h3>
                  <ul className="space-y-2">
                    {item.requirements.map((req) => (
                      <li
                        key={req}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Have Questions?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Contact us for more information about admission and enrollment.
            </p>
            <a
              href="#contact"
              className="inline-block bg-gold text-accent-foreground font-semibold px-8 py-3 rounded-md hover:bg-gold-dark transition-colors"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Admission;
