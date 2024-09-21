function Card2(props){
    return(
        <div className="bg-white rounded-lg border border-indigo-400 p-5 card2">
            <img src={props.src} alt={props.heading} className="rounded-lg card2Img"/>
            <h3>{props.heading} hello</h3>
            <p>{props.detail}</p>
        </div>
    );
}

export default Card2;