function AboutContent(props) {
  return (
    <>
      <div className="flex flex-row">
        <div className="h-full w-1/2 rounded-2xl">
          <img src={props.src} alt={props.title} />
        </div>
        <div className="text-justify">
          <p>{props.content}</p>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="text-justify">
          <p>{props.content}</p>
        </div>
        <div className="h-full w-1/2 rounded-2xl">
          <img src={props.src} alt={props.title} />
        </div>
      </div>
    </>
  );
}

export default AboutContent;
