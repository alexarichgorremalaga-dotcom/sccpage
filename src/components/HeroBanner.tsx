import heroBuilding from "@/assets/hero-building.jpg";

const HeroBanner = () => {
  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBuilding})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-primary/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground tracking-wide">
          Veritas Et Excelsior
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/80 font-body">
          Truth and Excellence
        </p>
      </div>
    </section>
  );
};

export default HeroBanner;
