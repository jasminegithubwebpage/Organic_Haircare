import WhyUsContent from "../json/WhyUsContent";
import Card2 from "./Card2";

function WhyUs() {
  return (
    <div>
      <h2 className="text-m500">Why Us?</h2>
      <div className="grid grid-cols-3 gap-10 p-10">
        {WhyUsContent.map((why) => (
          <Card2 
            key={why.heading} // Added key for each item
            src={why.src} 
            alt={why.heading} 
            detail={why.detail} 
            title={why.heading} // Pass the heading as title prop
          />
        ))}
      </div>
    </div>
  );
}

export default WhyUs;
