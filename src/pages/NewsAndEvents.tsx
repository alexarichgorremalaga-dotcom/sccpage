import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, ChevronDown } from "lucide-react";
import nutritionMonth1 from "@/assets/nutrition-month-1.jpg";
import nutritionMonth2 from "@/assets/nutrition-month-2.jpg";
import nutritionMonth3 from "@/assets/nutrition-month-3.jpg";
import nutritionMonth4 from "@/assets/nutrition-month-4.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SchoolEvent {
  title: string;
  date?: string;
  description: string;
  images?: string[];
}

interface SchoolYear {
  year: string;
  events: SchoolEvent[];
}

const schoolYears: SchoolYear[] = [
  {
    year: "2025–2026",
    events: [
      {
        title: "Nutrition Month",
        date: "July 2025",
        description:
          "St. Catherine's College celebrated Nutrition Month, wherein students expressed their creativity and confidence through the Mascot Competition and the Mr. & Ms. Nutrition Month pageant. The event truly showcased the importance of living a healthy lifestyle.",
        images: [nutritionMonth1, nutritionMonth2, nutritionMonth3, nutritionMonth4],
      },
      {
        title: "Feast of St. Dominic",
        description:
          "St. Dominic de Guzman is the patron saint of St. Catherine's College. He is the role model of every Catherinean, inspiring them to live with faith, integrity, and compassion, while striving for excellence in all their endeavors. During his feast day, students showcased his life and experiences through a vibrant dance-drama, bringing his teachings and legacy to life. The event highlighted the values he stood for and encouraged students to follow his example in their daily lives.",
      },
      {
        title: "Buwan ng Wika",
        date: "August 2025",
        description:
          "The month of August is dedicated to the Filipino language and culture. Buwan ng Wika was celebrated by Catherineans with love and joy, showing their appreciation for Filipinos. They participated in various contests, such as essay writing (pagsusulat ng sanaysay) and dance competitions, reflecting the richness of Filipino culture and tradition. The celebration also featured cultural presentations and creative performances that highlighted traditional Filipino values and heritage. It was a meaningful event that encouraged students to take pride in their roots while enjoying the spirit of unity.",
      },
      {
        title: "Mama Mary's Birthday",
        date: "September 8",
        description:
          "September 8 marks the birthday of Mama Mary, our Blessed Mother, a guiding light of faith and love. With heartfelt devotion, Catherineans offered hand-written letters and prayed the Rosary in her honor, expressing their love, gratitude, and prayers. It inspires students to emulate her faith and humility.",
      },
      {
        title: "Science Month Culmination",
        date: "September 2025",
        description:
          "St. Catherine's College celebrated the Science month culmination. The event showcased the creativity and innovative mind of each Catherineans, through different creations and inventions. The Wandering Minds was one of the highlights of the said event, as it discussed dinosaurs — their types and background. Students enjoyed each part of the event while gaining knowledge as well.",
      },
      {
        title: "Rosary Month",
        date: "October 2025",
        description:
          '"The Rosary is the most powerful weapon one can have." The month of October is celebrated as Rosary Month, at St. Catherine\'s College, students prayed the Rosary together in unity and devotion. Through a tableau presentation, students showcased the five luminous mysteries, bringing each scene to life with creativity. The activity helped students reflect on the life of Christ and the teachings of the Church, while fostering a sense of community and spiritual growth among the Catherineans. The celebration emphasized the importance of prayer in daily life and encouraged students to deepen their faith through the Rosary.',
      },
      {
        title: "Division Meet",
        date: "2025",
        description:
          "Catherinean athletes proudly represented St. Catherine's College at the Division Meet 2025. In the different sports, they competed with discipline, courage, and determination, aiming to bring home the gold. Their teamwork, perseverance, and sportsmanship inspired fellow students and showcased the true spirit of being a Catherinean. The event not only highlighted their athletic skills but also strengthened their sense of pride, unity, and school spirit.",
      },
    ],
  },
  {
    year: "2024–2025",
    events: [],
  },
  {
    year: "2023–2024",
    events: [
      {
        title: "Welcoming Catherinians to a New A.Y.",
        description:
          '"New Students, new Years, new beginnings." Welcoming the new students, to a fun, exciting, educating, and memorable year, here in St. Catherine\'s College.',
      },
      {
        title: "Clean Up Drive",
        description:
          '"Small actions, big impacts." The school strives for a better and cleaner future as the school community cleans the beaches and shores, working together efficiently to provide the people a cleaner and safer experience when visiting the beach.',
      },
      {
        title: "Teacher's Day",
        date: "January 27, 2023",
        description:
          '"Dear second parents, thank you for guiding, disciplining the students to achieve their dreams! Happy teacher\'s day!" We celebrated the teacher\'s efforts in shaping the students to become role models, and to ensure a bright future for the pupils.',
      },
      {
        title: "Mr. & Ms. Palarong Panlungsod",
        description:
          '"Presenting confidence, excellence and character." Show your support as the representatives strive to show their gorgeous, stunning, and attractive features, while also showing their knowledge and empathy to world problems and solutions.',
      },
    ],
  },
];

const NewsAndEvents = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Header />

      <main className="pt-[72px]">
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-6 text-gold" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              News &amp; Events
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              Stay updated with the latest happenings, celebrations, and
              milestones at St. Catherine's College.
            </p>
          </div>
        </section>

        {/* Events by School Year */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="space-y-4"
            >
              {schoolYears.map((sy, idx) => (
                <AccordionItem
                  key={sy.year}
                  value={`item-${idx}`}
                  className="border border-border rounded-lg overflow-hidden bg-card shadow-md"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-secondary/50 transition-colors">
                    <span className="font-heading text-xl md:text-2xl font-bold text-foreground">
                      A.Y. {sy.year}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    {sy.events.length === 0 ? (
                      <p className="text-muted-foreground italic py-4 text-center">
                        Events coming soon.
                      </p>
                    ) : (
                      <div className="space-y-6 pt-2">
                        {sy.events.map((event) => (
                          <article
                            key={event.title}
                            className="border-l-4 border-gold pl-5 py-2"
                          >
                            <h3 className="font-heading text-lg font-bold text-foreground uppercase mb-1">
                              {event.title}
                            </h3>
                            {event.date && (
                              <p className="text-xs text-gold font-semibold mb-2">
                                {event.date}
                              </p>
                            )}
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {event.description}
                            </p>
                            {event.images && event.images.length > 0 && (
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                                {event.images.map((img, imgIdx) => (
                                  <img
                                    key={imgIdx}
                                    src={img}
                                    alt={`${event.title} photo ${imgIdx + 1}`}
                                    className="rounded-lg w-full h-32 md:h-40 object-cover shadow-sm"
                                    loading="lazy"
                                  />
                                ))}
                              </div>
                            )}
                          </article>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NewsAndEvents;
