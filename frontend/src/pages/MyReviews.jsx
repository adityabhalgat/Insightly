import BackButton from "../components/User/BackButton";
import Navbar from "../components/User/Navbar";
import Review from "../components/User/Review";

export default function MyReviews() {
    const Reviews = [
        {
          id: 1,
          title: "Dell XPS 15",
          category: "Electronics",
          brand: "Dell",
          description: "This laptop is fast and efficient, perfect for coding and multitasking.",
          rating: 5,
          timeUsed: "6 months",
          pros: "Fast performance, great battery life, lightweight",
          cons: "Expensive, can get warm under heavy load",
          recommend: true,
          suggestions: "Better cooling system would be great.",
          submittedAt: "2024-06-15",
          status: "accepted",
        },
        {
          id: 2,
          title: "Samsung Galaxy S23",
          category: "Smartphones",
          brand: "Samsung",
          description: "A decent smartphone for its price range.",
          rating: 4,
          timeUsed: "1 year",
          pros: "Affordable, good battery life, decent camera",
          cons: "Slower performance over time",
          recommend: true,
          suggestions: "More RAM would improve long-term usability.",
          submittedAt: "2024-07-02",
          status: "marked for review",
        },
        {
          id: 3,
          title: "Dyson V11 Vacuum Cleaner",
          category: "Appliances",
          brand: "Dyson",
          description: "Overpriced vacuum cleaner with mediocre performance.",
          rating: 2,
          timeUsed: "3 months",
          pros: "Stylish design, lightweight",
          cons: "Weak suction, overpriced",
          recommend: false,
          suggestions: "Improve suction power and lower price.",
          submittedAt: "2024-05-22",
          status: "rejected",
        },
      ];
      

    return (
        <>
            <Navbar />
            <div className="mx-auto p-5">
                <BackButton />
            
            </div>
            
            {Reviews.map((review) => (
                <Review key={review.id} review={review} />
            ))}
        </>
    );
}
