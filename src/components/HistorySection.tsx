import campusAerial from "@/assets/campus-aerial.jpg";

const HistorySection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* History Content */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
              OUR HISTORY
            </h2>
            
            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <p>
                June 15, 1923 marked the beginning of an envisioned commitment of educating the young 
                in Carcar, Cebu through the dynamic leadership of Father Anastacio del Corro, fondly 
                called "Padre Tationg." He was competently assisted by four Belgian sisters of the 
                Immaculate Heart of Mary (ICM) congregation headed by Sister Marie Allix.
              </p>
              
              <p>
                Initially, the school opened its door to 57 students coming from North and South of 
                Carcar and Cebu City. The school year 1924-1925 was a period with steady growth as 
                Kindergarten, a complete Elementary Course (Grade 1 to 7), and First Year High School 
                was offered. It was in first commencement exercises were held.
              </p>
              
              <p>
                To meet the demand of the growing population, the physical plant was improved with 
                the construction of additional buildings in 1927. This enabled the school to open its 
                Secondary Course with dual curricula the General and the Vocational Secondary Courses 
                which were approved to the Bureau of Education.
              </p>

              <p>
                Enrollees in the Vocational Secondary Course earned units in Business English, 
                Geography, Bookkeeping, Typing, and Stenography. This curricular offering was 
                concluded in 1930 due to lack of enrollees.
              </p>
            </div>
          </div>

          {/* Campus Image */}
          <div className="lg:sticky lg:top-32">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src={campusAerial}
                alt="St. Catherine's College Campus Aerial View"
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground text-center italic">
              Aerial view of St. Catherine's College Campus
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
