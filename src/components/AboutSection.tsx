const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* About Us Header */}
        <div className="text-center mb-16">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
            About Us
          </h3>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            We believe that education is a process of transforming the Young into holistic person, 
            in preparation for his eternal destiny with the Creator
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
