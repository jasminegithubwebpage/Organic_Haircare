function Card2(props) {
  return (
    <div className="bg-white rounded-2xl p-5 card2">
      <img
        src={props.src}
        alt={props.heading}
        className="rounded-2xl card2Img"
      />
      <h4 className="text-m300">{props.heading}</h4>
      <p className="text-n600 text-justify r16">{props.detail}</p>
    </div>
  );
}

export default Card2;