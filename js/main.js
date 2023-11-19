const holidays = [
    {
        hdate: "12-11-2023",
        holiday: "Deepavali",
      },
      {
        hdate: "25-12-2023",
        holiday: "Christmas",
      },
    {
      hdate: "01-01-2024",
      holiday: "New Year Day",
    },
    {
      hdate: "15-01-2024",
      holiday: "Pongal",
    },
    {
      hdate: "16-01-2024",
      holiday: "Thiruvalluvar Day",
    },
    {
      hdate: "17-01-2024",
      holiday: "Uzhavar Thirunal",
    },
    {
      hdate: "26-01-2024",
      holiday: "Republic Day",
    },
    {
        hdate: "10-03-2024",
        holiday: "Ramzan (Idul Fitr)",
    },
    {
      hdate: "09-04-2024",
      holiday: "Telugu New Year Day",
    },
    {
      hdate: "01-04-2024",
      holiday: "Annual closing of Accounts for Commercial Banks and Co-operative Banks",
    },
    {
      hdate: "21-04-2024",
      holiday: "Mahaveer Jayanthi",
    },
    {
      hdate: "07-04-2024",
      holiday: "Good Friday",
    },
    {
      hdate: "14-04-2024",
      holiday: "Tamil New Years Day and Dr.B.R.Ambedkars Birthday",
    },
    {
      hdate: "01-05-2024",
      holiday: "May Day",
    },
    {
      hdate: "16-06-2024",
      holiday: "Bakrid(Idul Azha)",
    },
    {
      hdate: "29-07-2024",
      holiday: "Muharram",
    },
    {
      hdate: "15-08-2024",
      holiday: "Independence Day",
    },
    {
      hdate: "06-09-2024",
      holiday: "Krishna Jayanthi",
    },
    {
      hdate: "07-09-2024",
      holiday: "Vinayakar Chathurthi",
    },
    {
      hdate: "15-09-2024",
      holiday: "Milad-un-Nabi",
    },
    {
      hdate: "02-10-2024",
      holiday: "Gandhi Jayanthi",
    },
    {
      hdate: "12-10-2024",
      holiday: "Ayutha Pooja",
    },
    {
      hdate: "31-10-2024",
      holiday: "Deepavali",
    },
    {
      hdate: "25-12-2024",
      holiday: "Christmas",
    },
  ];

const calendar=document.querySelector('#calendar');
const monthBanner = document.querySelector('#month');
let navigation=0;      //managing click events left & right btns
let clicked = null;
let events=localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")):[];  
const weekDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


function loadCalendar(){
    
        const dt = new Date();
        //console.log(dt);

        if(navigation != 0){    
            dt.setMonth(new Date().getMonth() + navigation);
        }

        const day= dt.getDate();
        const month = dt.getMonth();
        const year =dt.getFullYear();
         console.log(day,month,year);
        monthBanner.innerText = `${dt.toLocaleDateString("en-US",
        {
            month:"long",
        })}  ${year}`;

        calendar.innerHTML="";    

        const lastDateInMonth = new Date(year,month+1 , 0).getDate();
        // console.log(lastDateInMonth);  30

        const firstDayOfMonth = new Date(year,month,1);
        // console.log(firstDayOfMonth);  wed

        const dateText = firstDayOfMonth.toLocaleDateString("en-US",{
            weekday: "long",
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });

        //console.log(day);  15(current day)
        console.log(dateText);
        const dayString = dateText.split(",")[0];
        //console.log(dayString);    //eg:wednesday  
        const emptyDays = weekDays.indexOf(dayString);
        //console.log(emptyDays);    //eg:3

        for(let i=1 ; i<=lastDateInMonth + emptyDays ; i++){
            const dayBox = document.createElement("div");
            dayBox.classList.add("day");

            //display date 
            const dateVal = i-emptyDays <10 ? "0" + (i-emptyDays) :i-emptyDays;

            //display month 
            const monthVal =  month+1 <10 ? "0" + (month +1) : month +1; 

            const dateText = `${dateVal}-${monthVal}-${year}`;
            //console.log(dateText);    // display total no of days

            if(i>emptyDays){
                dayBox.innerText = i-emptyDays;

                //event
                const eventOfTheDay = events.find((e)=> e.date == dateText);
                //console.log(eventOfTheDay);

                //holiday
                const holidayOfTheDay = holidays.find((e)=> e.hdate == dateText);
                //console.log(holidayOfTheDay);

                if(i - emptyDays === day && navigation == 0){     
                    dayBox.id="currentDay";
                }

                if(eventOfTheDay){
                    const eventDiv = document.createElement("div");
                    eventDiv.classList.add("event");
                    eventDiv.innerText = eventOfTheDay.title;
                    dayBox.appendChild(eventDiv);
                }

                if(holidayOfTheDay){
                    const eventDiv = document.createElement("div");
                    eventDiv.classList.add("event");
                    eventDiv.classList.add("holiday");
                    eventDiv.innerText = holidayOfTheDay.holiday;
                    dayBox.appendChild(eventDiv);
                }

                // Check if the day is a Sunday 
                const currentDay = new Date(year, month, i - emptyDays);
                //console.log(currentDay);
                if (currentDay.getDay() === 0) {
                    dayBox.classList.add("sunday");
                }

                dayBox.addEventListener("click" , ()=>{   //when clicks the date it will show modal
                    showModal(dateText);
                })
            }
            else{
                dayBox.classList.add("plain");
            }
            calendar.append(dayBox);
        }
    }
    function buttons(){
        const btnBack = document.querySelector('#btnBack');
        const btnNext = document.querySelector('#btnNext');
        const btnDelete = document.querySelector('#btnDelete');
        const btnSave = document.querySelector('#btnSave');
        const txtTitle = document.querySelector('#txtTitle');
        const goBtn = document.querySelector(".goBtn");
        const dateInput = document.querySelector(".date-input");


        btnBack.addEventListener("click", () =>{
            navigation--;
            loadCalendar();
        })
        btnNext.addEventListener("click",()=>{
            navigation++;
            loadCalendar();
        })

        modal.addEventListener("click",closeModal);     //when clicks modal it will close

        const closeBtns = document.querySelectorAll(".btnClose");   //when clicks close btn it will close
        closeBtns.forEach(btn => {
          btn.addEventListener("click",closeModal);
        });


      //click delete button event will be deleted
        btnDelete.addEventListener("click", function () {
          alert("Are you sure to delete the event?");
          events = events.filter((e) => e.date !== clicked);
          localStorage.setItem("events", JSON.stringify(events));
          closeModal();
      });


      //save event
      btnSave.addEventListener("click",function(){
        if(txtTitle.value){
          txtTitle.classList.remove("error");
          events.push({
            date:clicked,
            title:txtTitle.value.trim(),
          })
          
          txtTitle.value = "";    //clear the textfield after added the event
          localStorage.setItem("events", JSON.stringify(events));   //add event to localstorage
          closeModal();
        }else{
          txtTitle.classList.add("error");
        }
      });


      goBtn.addEventListener("click", function () {
        const selectedDate = new Date(dateInput.value);
        if (!isNaN(selectedDate.getTime())) {
            // Check if the selected date is valid
            navigation = calculateNavigation(selectedDate);
            loadCalendar();
            // Clear the input field
            dateInput.value = "";
        } 
    });
    }

        // Function to calculate the navigation value based on the selected date
        function calculateNavigation(selectedDate) {
            const currentDate = new Date();
            const monthsDiff = (selectedDate.getFullYear() - currentDate.getFullYear()) * 12 + (selectedDate.getMonth() - currentDate.getMonth());
            console.log(monthsDiff);
            return monthsDiff;

        }

        const modal = document.querySelector("#modal");
        const viewEventModal =document.querySelector("#viewEvent");
        const addEventModal = document.querySelector("#addEvent");
        function showModal(dateText){
            clicked = dateText;
            const eventOfTheDay = events.find((e)=> e.date == dateText);
            if(eventOfTheDay){
              //event already present
                document.querySelector("#eventText").innerText = eventOfTheDay.title;    //get the event title in text input field
                viewEventModal.style.display = "block";
            }else{
              //add new event
                addEventModal.style.display = "block";
            }
            modal.style.display = "block";
        }

        //close modal
        function closeModal(){
          viewEventModal.style.display = "none";
          addEventModal.style.display = "none";
          modal.style.display = "none";
          clicked = null;
          loadCalendar();     
        }


        //get today date
        const todayBtn = document.querySelector(".todayBtn");

        todayBtn.addEventListener("click", ()=>{
          let today = new Date();
          console.log(today);
          month = today.getMonth();
          year = today.getFullYear();
          navigation=0;
          loadCalendar();
        });


buttons();
loadCalendar();

