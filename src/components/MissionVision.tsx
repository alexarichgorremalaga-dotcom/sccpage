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
              Inspired by the courage and virtues of St. Catherine of Alexandria and St. Dominic de Guzman, St. Catherine's College is a Catholic educational institution bridging Filipino tradition and global progress, nurturing Christ-like attitudes, and committing itself to excellence in knowledge for holistic transformation.
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
              We envision St. Catherine's College as prominent Catholic learning center, dynamic and exemplary in providing research skilled, competent and God-fearing individuals ready for the world of work in the service of God, country and community.
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
              <strong>Compassion</strong> for others • <strong>Conviction</strong> of faith • <strong>Commitment</strong> to harmony • <strong>Christ-centered</strong> in lifestyle • <strong>Competence</strong> and excellence
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
