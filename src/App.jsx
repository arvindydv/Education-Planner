import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState(0);

  const dataHandler = () => {
    if (!subject || hours < 1) {
      alert("please enter a subject");
      return;
    }
    let count = data.length - 1;
    count = count + 1;
    let newData = {
      id: count,
      sub: subject,
      hou: hours,
    };
    let newArray = [...data, newData];

    setData(newArray);

    localStorage.setItem("plannerData", JSON.stringify(newArray));
    setSubject("");
    setHours(0);
  };

  useEffect(() => {
    const plannerData = localStorage.getItem("plannerData");
    if (plannerData) {
      setData(JSON.parse(plannerData));
    }
  }, []);
  return (
    <>
      <div className="conatiner">
        <div className="box">
          <h1 className="text-center">Geekster Education Planner</h1>
          <div className="flex-column">
            <div className="form">
              {" "}
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              />
              <input
                type="number"
                name=""
                id=""
                value={hours}
                placeholder="Hours"
                onChange={(e) => {
                  setHours(e.target.value);
                }}
              />
              <button className="btn" onClick={dataHandler}>
                Add
              </button>
            </div>

            <div className="items">
              {data.map((list, idx) => {
                return (
                  <div className="item" key={idx}>
                    <span>{list.sub} - </span>{" "}
                    <span className="hours">{list.hou} </span>{" "}
                    <span> -hours</span>
                    <div className="buttons">
                      <input type="hidden" name="" value={list.id} />
                      <button
                        className="add"
                        onClick={(e) => {
                          let idx = e.target.previousSibling.value;
                          let getHours = data[idx].hou;
                          getHours = Number(getHours);
                          let updateHours = getHours + 1;
                          let updateArr = [...data];
                          updateArr[idx].hou = updateHours;
                          setData(updateArr);
                        }}
                      >
                        +
                      </button>
                      <input type="hidden" name="" value={list.id} />
                      <button
                        className="remove"
                        onClick={(e) => {
                          let idx = e.target.previousSibling.value;
                          let getHours = data[idx].hou;
                          getHours = Number(getHours);
                          if (getHours >= 1) {
                            let updateHours = getHours - 1;
                            let updateArr = [...data];
                            updateArr[idx].hou = updateHours;
                            setData(updateArr);
                          }
                        }}
                      >
                        -
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
