import { Target, Eye, Heart } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-card p-8 rounded-lg shadow-lg text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center">
              <Target className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Our Mission
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              To provide quality Catholic education that develops the whole person 
              intellectually, spiritually, and morally, preparing students to become 
              responsible citizens and effective leaders.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-card p-8 rounded-lg shadow-lg text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold flex items-center justify-center">
              <Eye className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Our Vision
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              A premier Catholic educational institution that forms competent, 
              compassionate, and Christ-centered individuals who are committed to 
              the transformation of society.
            </p>
          </div>

          {/* Core Values */}
          <div className="bg-card p-8 rounded-lg shadow-lg text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Core Values
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Faith, Excellence, Service, Integrity, and Compassion – guiding 
              principles that shape our community and inspire our students to 
              reach their fullest potential.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
