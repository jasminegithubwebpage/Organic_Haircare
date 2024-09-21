import WhyUsContent from "../json/WhyUsContent";
import Card2 from "./Card2";

function WhyUs() {
  return (
    <div>
      <h2>Why Us?</h2>
      <div className="grid grid-cols-3 gap-10 p-10">
        {WhyUsContent.map((why) => (
          <Card2 src={why.src} alt={why.heading} detail={why.detail} />
        ))}
      </div>
    </div>
  );
}

export default WhyUs;
