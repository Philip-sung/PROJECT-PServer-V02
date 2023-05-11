import "./index.css"

function CurrentCalander(props) {
    let curTime = new Date();
    curTime.setHours(0,0,0,0);
    const curYear = curTime.getFullYear();
    const curMonth = curTime.getMonth();
    const curFirstDate = new Date(curYear,curMonth,1);
    const curLastDate = new Date(curYear, curMonth + 1, 0);
    const curMonthDays = [];

    for (let i = curFirstDate.getDate(); i <= curLastDate.getDate(); i++){
        let vday = curFirstDate;
        vday.setDate(i);
        curMonthDays.push(vday.getDate());
    }

    const dayList = curMonthDays.map((curDay) => (<EachDay year={curYear} month={curMonth} day={curDay}/>));
    console.log(dayList);

    return (
        <div className={props.className}>
            <div>{curYear} . {curMonth + 1}</div>
            <div className="Days">{dayList}</div>
        </div>
    )
}

function EachDay(props) {
    return(<div className="EachDay">{props.day}</div>)
}

export { CurrentCalander };