let entryList = [];
let badlist = [];
const weekhours = 7 * 24;

// get the dat aon form submit
const handleOnSubmit = (e) => {
  const formDt = new FormData(e);
  const task = formDt.get("task");
  const hr = +formDt.get("hr");

  const ttlhrs = gettotalhours();
  console.log(ttlhrs);
  if (ttlhrs + hr > weekhours) {
    return alert("sorry, you have already exceeded the hours");
  }

  const obj = {
    task,
    hr,
  };
  entryList.push(obj);

  display(entryList);
  gettotalhours();
};

// display list on the dom
const display = (taskArg) => {
  let str = "";
  taskArg.map((item, i) => {
    str += `
        <tr>
        <td>
        ${item.task}
        </td>
        <td> ${item.hr}</td>

        <td class="text-end">
          <button onclick="handleondeleteentrylist(${i})"
          class="btn btn-danger">
          <i class="fa-solid fa-trash-can"></i></button>
         <button onclick="switchtobadlist(${i})" class="btn btn-success"> <i class="fa-solid fa-arrow-right"></i> </button>
        </td>
        </tr>
        `;
  });
  document.getElementById("entryList").innerHTML = str;
  gettotalhours();
};

// display badlist from the DOM
const badlistDisplay = (arg) => {
  let str = "";
  arg.map((item, i) => {
    str += `
        <tr>
        <td>
        ${item.task}
        </td>
        <td> ${item.hr}</td>
      
          <td class="text-end">
           <button onclick="switchtoentrylist(${i})" class="btn btn-warning"> <i class="fa-solid fa-arrow-left"></i> </button>
            <button onclick="handleondeletbadlist(${i})" class="btn btn-danger"><i  class="fa-solid fa-trash-can"></i></button>
          </td>
        `;
  });
  document.getElementById("badlist").innerHTML = str;
  badtotalhours();
  gettotalhours();
};

// delet item from entry list
const handleondeleteentrylist = (i) => {
  if (!confirm("Are you sure you want to delet?")) return;
  const filteredArg = entryList.filter((item, index) => index !== i);
  entryList = filteredArg;

  display(entryList);
};
// switch data from entry lit  to the bad list
const switchtobadlist = (i) => {
  const itemtobeswitched = entryList.splice(i, 1);
  badlist.push(itemtobeswitched[0]);
  display(entryList);
  badlistDisplay(badlist);
};
const switchtoentrylist = (i) => {
  const itemtobeswitched = badlist.splice(i, 1);
  entryList.push(itemtobeswitched[0]);
  display(entryList);
  badlistDisplay(badlist);
};
const handleondeletbadlist = (i) => {
  if (!confirm("Are you sure you want to delet?")) return;
  const filteredArg = badlist.filter((item, index) => index !== i);
  badlist = filteredArg;

  badlistDisplay(badlist);
};

const gettotalhours = () => {
  const totalentrylist = entryList.reduce((acc, item) => acc + item.hr, 0);
  const totalbadlist = badlist.reduce((acc, item) => acc + item.hr, 0);
  const total = totalbadlist + totalentrylist;
  document.getElementById("totalhours").innerText = total;
  return total;
};

const badtotalhours = () => {
  const totalbadlist = badlist.reduce((acc, item) => acc + item.hr, 0);
  document.getElementById("totalbadhours").innerText = totalbadlist;
};
