import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GraduationCap, BookOpen, Briefcase, Monitor } from "lucide-react";

const basicEducation = [
  { name: "Pre-kindergarten & Kindergarten", description: "Building strong foundations for early learners" },
  { name: "Elementary", description: "Developing fundamental skills and knowledge" },
  { name: "Junior High School", description: "Preparing students for higher education" },
  { name: "Senior High School", description: "Specialized tracks for college readiness" },
];

const higherEducation = [
  {
    department: "Education",
    icon: BookOpen,
    programs: [
      "Bachelor of Elementary Education",
      "Bachelor of Secondary Education",
    ],
    majors: ["English", "Science", "Mathematics"],
  },
  {
    department: "Business Administration",
    icon: Briefcase,
    programs: [
      "Bachelor of Science in Business Administration",
    ],
    majors: ["Human Resource Devt. Mgt.", "Management", "Marketing"],
  },
  {
    department: "Computer Studies",
    icon: Monitor,
    programs: [
      "Associate in Computer Technology (ACT)",
      "Bachelor of Science in Information Technology",
    ],
    majors: [],
  },
];

const Academics = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      
      <main className="pt-[72px]">
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <GraduationCap className="w-16 h-16 mx-auto mb-6 text-gold" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Academic Programs
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              Discover our comprehensive educational offerings designed to nurture 
              holistic individuals prepared for their eternal destiny.
            </p>
          </div>
        </section>

        {/* Basic Education */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Basic Education
              </h2>
              <div className="w-24 h-1 bg-gold mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {basicEducation.map((level) => (
                <div
                  key={level.name}
                  className="bg-card p-6 rounded-lg shadow-lg border border-border hover:border-gold transition-colors text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {level.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {level.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Higher Education */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Higher Education
              </h2>
              <div className="w-24 h-1 bg-gold mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {higherEducation.map((dept) => (
                <div
                  key={dept.department}
                  className="bg-card p-8 rounded-lg shadow-lg border border-border"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold flex items-center justify-center">
                    <dept.icon className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 text-center">
                    {dept.department}
                  </h3>
                  
                  <div className="space-y-3">
                    {dept.programs.map((program) => (
                      <div
                        key={program}
                        className="bg-secondary p-3 rounded-md text-center"
                      >
                        <p className="text-foreground font-medium text-sm">
                          {program}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {dept.majors.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-muted-foreground text-xs text-center mb-2">
                        Majors Available:
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {dept.majors.map((major) => (
                          <span
                            key={major}
                            className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded"
                          >
                            {major}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join our community of learners and discover the path to excellence.
            </p>
            <a
              href="#admission"
              className="inline-block bg-gold text-accent-foreground font-semibold px-8 py-3 rounded-md hover:bg-gold-dark transition-colors"
            >
              Apply Now
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Academics;
